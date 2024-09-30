import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {COLORS, FONTS, SIZES} from '../../constants';
import {images} from '../../assets';
import {useNavigation} from '@react-navigation/native';

const PDFItem = ({item, togleMenuVertical}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.9}
      onPress={() =>
        navigation.navigate('PDFView', {
          item: item,
          numberPage: 1,
          scale: 1,
        })
      }>
      <View style={styles.leftView}>
        <Image source={images.pdfRedIcon} style={styles.pdfImages} />
        <View style={styles.textView}>
          <Text style={styles.titleItem}>{item.name}</Text>
          <Text style={styles.timeItem}>{item.time}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={togleMenuVertical} activeOpacity={0.95}>
        <Image source={images.menuVerticalIcon} style={styles.menuImages} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: COLORS.white,
    height: 80,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  containerMenu: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuOptions: {
    width: 200,
    padding: 10,
    marginTop: 50,
  },
  leftView: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  pdfImages: {
    width: 48,
    height: 48,
    resizeMode: 'contain',
  },
  textView: {
    marginLeft: 10,
    width: '80%',
  },
  titleItem: {
    fontFamily: FONTS.SemiBold,
    fontSize: SIZES.medium,
    color: COLORS.black,
  },
  timeItem: {
    fontFamily: FONTS.Regular,
    fontSize: SIZES.small + 2,
    color: COLORS.black,
  },
  menuImages: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
});

export default PDFItem;
