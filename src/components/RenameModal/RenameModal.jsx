import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, FONTS, SIZES} from '../../constants';
import RNFS from 'react-native-fs';

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const RenameModal = ({item, toggleCancelBtn}) => {
  const [newName, setNewName] = useState();
  const [status, setStatus] = useState();

  const toggleOkBtn = async () => {
    if (newName === null) {
      return;
    }
    if (newName === undefined) {
      return;
    }
    let filePath = item.path;
    const lastIndex = filePath.lastIndexOf('/');

    if (lastIndex !== -1) {
      const cleanedFilename = newName.endsWith('.pdf')
        ? newName.slice(0, -4)
        : newName;
      console.log(cleanedFilename);
      const folderPath = filePath.substring(0, lastIndex + 1);
      RNFS.moveFile(item.path, folderPath + '/' + cleanedFilename + '.pdf')
        .then(() => {
          setStatus('File renamed successfully');
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
    toggleCancelBtn();
  };

  return (
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
              <Text style={[styles.textBtn, {color: COLORS.black}]}>OK</Text>
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
                onPress={toggleOkBtn}
                activeOpacity={0.85}>
                <Text style={[styles.textBtn, {color: COLORS.black}]}>OK</Text>
              </TouchableOpacity>
            </View>
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
    height: windowHeight * 0.25,
    backgroundColor: COLORS.white,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 8,
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
  topView: {
    flex: 0.3,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnOK: {
    flex: 0.5,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontFamily: FONTS.Regular,
    fontSize: SIZES.large,
    color: COLORS.black,
  },
  textBtn: {
    fontFamily: FONTS.Regular,
    fontSize: SIZES.large,
  },
  centerView: {
    paddingHorizontal: 20,
    flex: 0.5,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  bottomView: {
    flex: 0.2,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  input: {
    marginTop: 10,
    paddingLeft: 20,
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderRadius: 2,
    padding: 10,
  },
  cancelBtn: {
    width: '50%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: '#e1e1e1',
  },
});

export default RenameModal;
