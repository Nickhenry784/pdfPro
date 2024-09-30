import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {COLORS} from '../../constants/theme';
import {useNavigation} from '@react-navigation/native';
import {images} from '../../assets';

const BackBtn = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      activeOpacity={0.9}
      style={styles.container}>
      <Image source={images.backIcon} style={styles.iconStyle} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
});
export default BackBtn;
