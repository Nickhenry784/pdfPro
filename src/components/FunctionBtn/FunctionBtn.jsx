import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import {images} from '../../assets';
import {COLORS, FONTS, SIZES} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import Share from 'react-native-share';

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const FunctionBtn = ({item, onClickRenameBtn, onClickDeteleBtn}) => {
  const navigation = useNavigation();

  const toggleViewBtn = () => {
    navigation.navigate('PDFView', {path: item.path});
  };

  const toggleShareBtn = async () => {
    try {
      const shareOptions = {
        title: 'Share PDF',
        url: `file://${item.path}`,
        type: 'application/pdf',
        failOnCancel: false,
      };

      // Share the PDF
      await Share.open(shareOptions)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          err && console.log(err);
        });
    } catch (error) {
      console.error('Error sharing PDF:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.viewBtn}
        onPress={toggleViewBtn}
        activeOpacity={0.85}>
        <View style={styles.imageView}>
          <Image source={images.viewIcon} style={styles.image} />
        </View>
        <Text style={styles.btnText}>View</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.viewBtn}
        onPress={onClickRenameBtn}
        activeOpacity={0.85}>
        <View style={styles.imageView}>
          <Image source={images.renameIcon} style={styles.image} />
        </View>
        <Text style={styles.btnText}>Rename</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.viewBtn}
        onPress={toggleShareBtn}
        activeOpacity={0.85}>
        <View style={styles.imageView}>
          <Image source={images.shareIcon} style={styles.image} />
        </View>
        <Text style={styles.btnText}>Share</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.viewBtn}
        onPress={onClickDeteleBtn}
        activeOpacity={0.85}>
        <View style={styles.imageView}>
          <Image source={images.deleteIcon} style={styles.image} />
        </View>
        <Text style={styles.btnText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: windowWidth * 0.9,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  viewBtn: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageView: {
    width: 60,
    height: 60,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  btnText: {
    fontFamily: FONTS.Medium,
    fontSize: SIZES.medium,
    color: COLORS.black,
  },
});

export default FunctionBtn;
