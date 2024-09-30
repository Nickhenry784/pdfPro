import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  TextInput,
  NativeModules,
  Vibration,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './styles';
import {BackBtn, DeleteModal, FunctionBtn, RenameModal} from '../../components';
import RNFS from 'react-native-fs';
import {images} from '../../assets';
import {COLORS} from '../../constants';
import {pick, types} from 'react-native-document-picker';
import {useSelector} from 'react-redux';
import Sound from 'react-native-sound';
const {PDFSplitModule, PdfUtilsModule} = NativeModules;

const SplitPDF = () => {
  const [imagesPicker, setImagesPicker] = useState([]);
  const [fileCreate, setFileCreate] = useState(null);
  const [enableCreateFile, setEnableCreateFile] = useState(false);
  const [enableRenameModal, setEnableRenameModal] = useState(false);
  const [enableDeleteModal, setEnableDeleteModal] = useState(false);
  const [newName, setNewName] = useState();
  const [status, setStatus] = useState();
  const [fromPage, onChangeFromPage] = useState(0);
  const [toPage, onChangeToPage] = useState(0);

  const setting = useSelector(state => state.setting);

  const sound = new Sound('done.mp3', Sound.MAIN_BUNDLE);

  const pickPDFFile = () => {
    setImagesPicker([]);
    pick({
      allowMultiSelection: false,
      type: [types.pdf],
      copyTo: 'cachesDirectory',
    }).then(res => {
      setImagesPicker(res);
      if (res[0].fileCopyUri.startsWith('file://')) {
        let filePath = res[0].fileCopyUri.slice(7);
        const pageCount = PdfUtilsModule.getPageCount(filePath);
        onChangeToPage(pageCount);
        console.log(toPage);
      }
    });
  };

  const formatBytes = bytes => {
    if (bytes === 0) {
      return '0 Bytes';
    }

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const toggleReloadImage = () => {
    setEnableCreateFile(false);
    setImagesPicker([]);
    setFileCreate(null);
    onChangeToPage(0);
    onChangeFromPage(0);
  };

  const SplitPDF = async (fileUri, fromInt, toInt, outputFilePath) => {
    try {
      const result = await PDFSplitModule.splitPDF(
        fileUri,
        parseInt(fromInt, 10),
        parseInt(toInt, 10),
        outputFilePath,
      );
      console.log('Merged PDF saved at:', result);
      return result;
    } catch (error) {
      console.error('Error merging PDFs:', error);
      throw error;
    }
  };

  const onClickConvertBtn = async () => {
    if (parseInt(fromPage) > parseInt(toPage)) {
      Alert.alert('Notification', 'Enter a valid value!');
      return;
    }
    if (parseInt(toPage) === 0 || parseInt(fromPage) === 0) {
      Alert.alert('Notification', 'Enter a valid value!');
      return;
    }
    if (fileCreate !== null) {
      return;
    }
    console.log('toPage: ' + toPage);
    console.log('fromPage: ' + fromPage);
    try {
      setEnableCreateFile(true);
      let filePathItem = imagesPicker[0].fileCopyUri.slice(7);
      console.log(filePathItem);
      const currentDate = new Date();
      const dateString = `${currentDate.getFullYear()}${(
        '0' +
        (currentDate.getMonth() + 1)
      ).slice(-2)}${('0' + currentDate.getDate()).slice(-2)}${(
        '0' + currentDate.getHours()
      ).slice(-2)}${('0' + currentDate.getMinutes()).slice(-2)}${(
        '0' + currentDate.getSeconds()
      ).slice(-2)}`;

      const splitPdfPath = `${RNFS.DocumentDirectoryPath}/splitpdf-${dateString}.pdf`;

      const item = {
        name: `splitpdf-${dateString}.pdf`,
        path: splitPdfPath,
      };
      SplitPDF(filePathItem, fromPage, toPage, splitPdfPath)
        .then(() => {
          if (setting.sound) {
            sound.play();
          }
          if (setting.vibration) {
            Vibration.vibrate(2000);
          }
          setFileCreate(item);
          Alert.alert('Notification', 'Split File successfully');
        })
        .catch(error => {
          Alert.alert('Notification', 'Split File error');
        });
      setEnableCreateFile(false);
    } catch (error) {}
  };

  const toggleRenameBtn = () => {
    setNewName('');
    setEnableRenameModal(true);
  };

  const toggleOkBtn = async () => {
    if (newName === null) {
      return;
    }
    if (newName === undefined) {
      return;
    }
    let filePath = fileCreate.path;
    const lastIndex = filePath.lastIndexOf('/');

    if (lastIndex !== -1) {
      const cleanedFilename = newName.endsWith('.pdf')
        ? newName.slice(0, -4)
        : newName;
      console.log(cleanedFilename);
      const folderPath = filePath.substring(0, lastIndex + 1);
      RNFS.moveFile(
        fileCreate.path,
        folderPath + '/' + cleanedFilename + '.pdf',
      )
        .then(() => {
          setStatus('File renamed successfully');
          const newFileCreate = {
            name: cleanedFilename + '.pdf',
            path: folderPath + '/' + cleanedFilename + '.pdf',
          };
          setFileCreate(newFileCreate);
          console.log('File renamed successfully');
        })
        .catch(error => {
          setStatus('Error renaming file');
          console.log('Error renaming file: ', error);
        });
    }
  };

  const toggleOkStatusBtn = () => {
    setStatus();
    setEnableRenameModal(false);
  };

  const onClickDeleteBtn = () => {
    setEnableDeleteModal(false);
    toggleReloadImage();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.appBar}>
        <BackBtn />
        {imagesPicker.length !== 0 ? (
          <TouchableOpacity
            onPress={toggleReloadImage}
            style={styles.btnReload}>
            <Image source={images.reloadIcon} style={styles.iconReloadStyle} />
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Split PDF</Text>
        <Text style={styles.description}>
          Split PDF files into pages and save them in individual PDF. Extract
          pages from a PDF to create a new PDF Document.
        </Text>
        <View style={styles.btnView}>
          {imagesPicker.length === 0 ? (
            <TouchableOpacity
              onPress={pickPDFFile}
              style={styles.browserBtn}
              activeOpacity={0.9}>
              <Image source={images.plusIcon} style={styles.iconStyle} />
              <Text style={styles.btnText}>Browse your PDF File</Text>
            </TouchableOpacity>
          ) : (
            <>
              <View style={styles.imageView}>
                <View style={styles.imagePDFView}>
                  <Image source={images.pdfRedIcon} style={styles.imageItem} />
                </View>
                <View style={styles.textItem}>
                  <Text style={styles.titleImage}>{imagesPicker[0].name}</Text>
                  <Text style={styles.sizeImage}>
                    {'Size: ' + formatBytes(imagesPicker[0].size)}
                  </Text>
                </View>
              </View>
              <View style={styles.inputView}>
                <Text style={styles.splitText}>Split From:</Text>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={onChangeFromPage}
                  value={fromPage}
                  keyboardType="numeric"
                />
                <Text style={styles.splitText}>To:</Text>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={onChangeToPage}
                  value={toPage}
                  keyboardType="numeric"
                />
              </View>
            </>
          )}
        </View>
        <View style={styles.bottomView}>
          <TouchableOpacity
            onPress={onClickConvertBtn}
            style={styles.convertBtn}
            activeOpacity={0.85}>
            <Text style={styles.textBtn}>Split</Text>
          </TouchableOpacity>
        </View>
        {enableCreateFile ? (
          <ActivityIndicator
            style={{marginBottom: 100}}
            size="large"
            color={COLORS.primary}
          />
        ) : fileCreate !== null ? (
          <View style={styles.resultView}>
            <View style={styles.resultImageView}>
              <Image source={images.pdf96Icon} style={styles.pdf96Image} />
            </View>
            <View style={{width: '70%', alignItems: 'center'}}>
              <Text style={styles.nameText}>{'Name: ' + fileCreate.name}</Text>
            </View>
            <FunctionBtn
              item={fileCreate}
              onClickRenameBtn={toggleRenameBtn}
              onClickDeteleBtn={() => setEnableDeleteModal(true)}
            />
            <View style={{height: 300}} />
          </View>
        ) : (
          <></>
        )}
      </ScrollView>
      {enableRenameModal ? (
        <>
          <View style={styles.modalView} />
          <View style={styles.modal}>
            {status !== undefined ? (
              <View style={styles.modalStatusContainer}>
                <View style={styles.topStatusView}>
                  <Text style={styles.statusText}>{status}</Text>
                </View>
                <TouchableOpacity
                  onPress={toggleOkStatusBtn}
                  activeOpacity={0.85}
                  style={styles.btnOK}>
                  <Text style={[styles.textBtnModal, {color: COLORS.black}]}>
                    OK
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.modalContainer}>
                <View style={styles.topView}>
                  <Text style={styles.titleText}>Do you rename PDF file?</Text>
                </View>
                <View style={styles.centerView}>
                  <Text style={styles.titleText}>New name:</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={setNewName}
                    value={newName}
                  />
                </View>
                <View style={styles.bottomViewModal}>
                  <TouchableOpacity
                    style={styles.cancelBtn}
                    onPress={() => setEnableRenameModal(false)}
                    activeOpacity={0.85}>
                    <Text
                      style={[styles.textBtnModal, {color: COLORS.primary}]}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.cancelBtn}
                    onPress={toggleOkBtn}
                    activeOpacity={0.85}>
                    <Text style={[styles.textBtnModal, {color: COLORS.black}]}>
                      OK
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </>
      ) : (
        <></>
      )}
      {enableDeleteModal ? (
        <DeleteModal
          item={fileCreate}
          toggleCancelBtn={() => setEnableDeleteModal(false)}
          toggleOkDeleteBtn={onClickDeleteBtn}
        />
      ) : (
        <></>
      )}
    </SafeAreaView>
  );
};

export default SplitPDF;
