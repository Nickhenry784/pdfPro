/* eslint-disable react-hooks/exhaustive-deps */
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import RNFS from 'react-native-fs';
import {
  checkManagePermission,
  requestManagePermission,
} from 'manage-external-storage';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './styles';
import {images} from '../../assets';
import {DeleteModal, PDFItem, RenameModal} from '../../components';
import {COLORS} from '../../constants';
import {Portal} from '@gorhom/portal';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const AllFileScreen = () => {
  const [pdfFiles, setPdfFiles] = useState([]);
  const [isManageEnable, setManageEnable] = useState(false);
  const [enableModal, setEnableModal] = useState(false);
  const [enableRenameModal, setEnableRenameModal] = useState(false);
  const [enableDeleteModal, setEnableDeleteModal] = useState(false);
  const [itemPdf, setItemPdf] = useState();
  const animation = useSharedValue(200);

  const animationStyle = useAnimatedStyle(() => ({
    transform: [{translateY: animation.value}],
  }));

  const checkManagePermissionFunction = () => {
    checkManagePermission().then(isManagePermitted => {
      setManageEnable(isManagePermitted);
    });
  };

  const onClickGotoSetBtn = () => {
    requestManagePermission().then(isManagePermitted => {
      setManageEnable(isManagePermitted);
    });
  };

  const formatDate = date => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const findPDFFiles = async directory => {
    try {
      const files = await RNFS.readDir(directory);
      let pdfFiles = [];

      for (const file of files) {
        if (file.isDirectory()) {
          // Recursive call for subdirectories
          const subdirectoryFiles = await findPDFFiles(file.path);
          pdfFiles = pdfFiles.concat(subdirectoryFiles);
        } else {
          // Check if file is PDF
          if (file.name.toLowerCase().endsWith('.pdf')) {
            pdfFiles.push({
              name: file.name,
              path: file.path,
              size: file.size,
              time: formatDate(file.mtime),
            });
          }
        }
      }

      return pdfFiles;
    } catch (error) {
      return [];
    }
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

  const scanPDFFiles = async () => {
    try {
      const pdfFiles1 = await findPDFFiles('/storage/emulated/0');
      console.log(pdfFiles1);
      const pdfFiles2 = await findPDFFiles(RNFS.DocumentDirectoryPath);
      const pdfFiles3 = await findPDFFiles(
        '/storage/emulated/0/Android/data/com.pdfproject/files/Document',
      );
      const concatenatedList = [...pdfFiles1, ...pdfFiles2, ...pdfFiles3];
      setPdfFiles(concatenatedList);
    } catch (error) {}
  };

  const onClickMenuVertical = item => {
    setItemPdf(item);
    setEnableModal(true);
    animation.value = withTiming(0, 1000);
  };

  const toggleCancelBtn = () => {
    setEnableModal(false);
    animation.value = withTiming(200, 1000);
  };

  const toggleRenameBtn = () => {
    toggleCancelBtn();
    setEnableRenameModal(true);
  };

  const toggleCancelRenameBtn = () => {
    setEnableRenameModal(false);
  };

  const toggleDeleteBtn = () => {
    toggleCancelBtn();
    setEnableDeleteModal(true);
  };

  const toggleCancelDeleteBtn = () => {
    setEnableDeleteModal(false);
  };

  useEffect(() => {
    checkManagePermissionFunction();
  }, []);

  useEffect(() => {
    scanPDFFiles();
  }, [isManageEnable]);

  useEffect(() => {
    scanPDFFiles();
  }, []);

  useEffect(() => {
    scanPDFFiles();
  }, [enableRenameModal, enableDeleteModal]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.appBar} />
      <Text style={styles.titleText}>PDF File Management</Text>
      <Text style={styles.descriptionText}>Choose PDF File to view</Text>
      {pdfFiles.length === 0 ? (
        <View style={styles.centerView}>
          <Image source={images.emptyFolder} style={styles.emptyFolderImage} />
          <Text style={styles.titleText}>No PDF files yet</Text>
          <Text style={styles.descriptionText}>
            {isManageEnable
              ? 'PDF File not found in storage.'
              : 'Authorization required to read all files.'}
          </Text>
          {isManageEnable ? (
            <></>
          ) : (
            <TouchableOpacity
              onPress={onClickGotoSetBtn}
              style={styles.allowBtn}
              activeOpacity={0.9}>
              <Text style={styles.textBtn}>Go to set</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{marginHorizontal: 20, marginTop: 10}}>
          <FlatList
            data={pdfFiles}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <PDFItem
                item={item}
                togleMenuVertical={() => onClickMenuVertical(item)}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
          <View style={{height: 200}} />
        </ScrollView>
      )}
      {enableModal ? (
        <Portal>
          <View style={styles.modalView} />
          <Animated.View style={[styles.modalContainer, animationStyle]}>
            <View style={styles.topView}>
              <View style={styles.descriptionView}>
                <View style={styles.pdfBorder}>
                  <Image source={images.pdfRedIcon} style={styles.pdfImages} />
                </View>
                <View style={styles.textView}>
                  <Text style={styles.titleItem}>{itemPdf.name}</Text>
                  <Text style={styles.timeItem}>
                    {'Time: ' +
                      itemPdf.time +
                      ' - Size: ' +
                      formatBytes(itemPdf.size)}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.topBtn}
                activeOpacity={0.85}
                onPress={toggleRenameBtn}>
                <Text style={styles.btnText}>Rename</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.topBtn} activeOpacity={0.85}>
                <Text style={styles.btnText}>Split</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.topBtn}
                activeOpacity={0.85}
                onPress={toggleDeleteBtn}>
                <Text style={styles.btnDeleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={toggleCancelBtn}
              activeOpacity={0.85}>
              <Text style={styles.btnText}>Cancel</Text>
            </TouchableOpacity>
          </Animated.View>
        </Portal>
      ) : (
        <></>
      )}
      {enableRenameModal ? (
        <RenameModal item={itemPdf} toggleCancelBtn={toggleCancelRenameBtn} />
      ) : (
        <></>
      )}
      {enableDeleteModal ? (
        <DeleteModal
          item={itemPdf}
          toggleCancelBtn={toggleCancelDeleteBtn}
          toggleOkDeleteBtn={toggleCancelDeleteBtn}
        />
      ) : (
        <></>
      )}
    </SafeAreaView>
  );
};

export default AllFileScreen;
