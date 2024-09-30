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
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import Sound from 'react-native-sound';
const {PDFMergeModule} = NativeModules;

const MergePDF = () => {
  const [imagesPicker, setImagesPicker] = useState([]);
  const [fileCreate, setFileCreate] = useState(null);
  const [enableCreateFile, setEnableCreateFile] = useState(false);
  const [enableRenameModal, setEnableRenameModal] = useState(false);
  const [enableDeleteModal, setEnableDeleteModal] = useState(false);
  const [newName, setNewName] = useState();
  const [status, setStatus] = useState();

  const setting = useSelector(state => state.setting);

  const sound = new Sound('done.mp3', Sound.MAIN_BUNDLE);

  const pickPDFFile = () => {
    setImagesPicker([]);
    pick({
      allowMultiSelection: true,
      type: [types.pdf],
      copyTo: 'cachesDirectory',
    }).then(res => {
      console.log(res);
      setImagesPicker(res);
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
  };

  const mergePDF = async (fileUris, outputFilePath) => {
    try {
      const result = await PDFMergeModule.mergePDF(fileUris, outputFilePath);
      console.log('Merged PDF saved at:', result);
      return result;
    } catch (error) {
      console.error('Error merging PDFs:', error);
      throw error;
    }
  };

  const onClickConvertBtn = async () => {
    if (imagesPicker.length < 2) {
      Alert.alert('Notification', 'No PDF file to create');
      return;
    }
    if (fileCreate !== null) {
      return;
    }
    try {
      setEnableCreateFile(true);
      const files = [];
      imagesPicker.forEach(item => {
        if (item.fileCopyUri.startsWith('file://')) {
          let filePath = item.fileCopyUri.slice(7);
          files.push(filePath);
        }
      });

      const currentDate = new Date();
      const dateString = `${currentDate.getFullYear()}${(
        '0' +
        (currentDate.getMonth() + 1)
      ).slice(-2)}${('0' + currentDate.getDate()).slice(-2)}${(
        '0' + currentDate.getHours()
      ).slice(-2)}${('0' + currentDate.getMinutes()).slice(-2)}${(
        '0' + currentDate.getSeconds()
      ).slice(-2)}`;

      const mergedPdfPath = `${RNFS.DocumentDirectoryPath}/mergedpdf-${dateString}.pdf`;

      const item = {
        name: `mergedpdf-${dateString}.pdf`,
        path: mergedPdfPath,
      };
      mergePDF(files, mergedPdfPath)
        .then(() => {
          if (setting.sound) {
            sound.play();
          }
          if (setting.vibration) {
            Vibration.vibrate(2000);
          }
          setFileCreate(item);
          Alert.alert('Notification', 'Merge File successfully');
        })
        .catch(error => {
          Alert.alert('Notification', 'Merge File error');
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
        <Text style={styles.title}>Merge PDF</Text>
        <Text style={styles.description}>
          Merge multiple PDF files into single document.
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
            imagesPicker.map((item, index) => (
              <View key={index} style={styles.imageView}>
                <View style={styles.imagePDFView}>
                  <Image source={images.pdfRedIcon} style={styles.imageItem} />
                </View>

                <View style={styles.textItem}>
                  <Text style={styles.titleImage}>{item.name}</Text>
                  <Text style={styles.sizeImage}>
                    {'Size: ' + formatBytes(item.size)}
                  </Text>
                </View>
              </View>
            ))
          )}
        </View>
        <View style={styles.bottomView}>
          <TouchableOpacity
            onPress={onClickConvertBtn}
            style={styles.convertBtn}
            activeOpacity={0.85}>
            <Text style={styles.textBtn}>Merge</Text>
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

export default MergePDF;
