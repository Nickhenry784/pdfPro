import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, FONTS, SIZES} from '../../constants';
import RNFS from 'react-native-fs';

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const DeleteModal = ({item, toggleCancelBtn, toggleOkDeleteBtn}) => {
  const [status, setStatus] = useState();

  const toggleDeleteBtn = async () => {
    try {
      const filePath = item.path;
      await RNFS.unlink(filePath);
      console.log('File deleted successfully');
      setStatus('File deleted successfully');
    } catch (error) {
      console.error('Error deleting file: ', error);
      setStatus('Error deleting file');
    }
  };

  const toggleOkStatusBtn = () => {
    setStatus();
    toggleOkDeleteBtn();
  };

  return (
    <>
      <View style={styles.modalView} />
      <View style={styles.modal}>
        {status === undefined ? (
          <View style={styles.modalContainer}>
            <View style={styles.topView}>
              <Text style={styles.titleText}>Do you delete PDF file?</Text>
            </View>
            <View style={styles.bottomView}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={toggleCancelBtn}
                activeOpacity={0.85}>
                <Text style={[styles.textBtn, {color: COLORS.primary}]}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={toggleDeleteBtn}
                activeOpacity={0.85}>
                <Text style={[styles.textBtn, {color: COLORS.black}]}>
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
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
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  modalView: {
    width: windowWidth,
    height: windowHeight,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: COLORS.black,
    opacity: 0.4,
  },
  modal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.15,
    backgroundColor: COLORS.white,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 8,
  },
  topView: {
    flex: 0.7,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontFamily: FONTS.Regular,
    fontSize: SIZES.large,
    color: COLORS.black,
  },
  bottomView: {
    flex: 0.4,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  cancelBtn: {
    width: '50%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: '#e1e1e1',
  },
  textBtn: {
    fontFamily: FONTS.Regular,
    fontSize: SIZES.large,
  },
  modalStatusContainer: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.15,
    backgroundColor: COLORS.white,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 8,
  },
  topStatusView: {
    flex: 0.8,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusText: {
    fontFamily: FONTS.Regular,
    fontSize: SIZES.large,
    color: COLORS.black,
  },
  btnOK: {
    flex: 0.5,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBtnModal: {
    fontFamily: FONTS.Regular,
    fontSize: SIZES.large,
  },
});
export default DeleteModal;
