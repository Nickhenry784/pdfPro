/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  View,
  Animated,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
} from 'react-native';
import {styles} from './styles';
import BackBtn from '../BackBtn/BackBtn';
import {images} from '../../assets';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {addItem} from '../../redux/historySlice';

const BottomBar = ({
  toggleZoomMinusBtn,
  toggleZoomPlusBtn,
  toggleBackPageBtn,
  toggleBackBtn,
  toggleNextPageBtn,
  numberOfPages,
}) => {
  const [bottomBarVisible, setBottomBarVisible] = useState(true);
  const translateY = new Animated.Value(0);

  useEffect(() => {
    if (bottomBarVisible) {
      showBottomBar();
    } else {
      hideBottomBar();
    }
  }, [bottomBarVisible]);

  const showBottomBar = () => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };

  const hideBottomBar = () => {
    Animated.timing(translateY, {
      toValue: 100,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };

  // Auto hide after 5 seconds
  useEffect(() => {
    let timer;
    if (bottomBarVisible) {
      timer = setTimeout(() => {
        setBottomBarVisible(false);
      }, 5000);
    }

    return () => clearTimeout(timer);
  }, [bottomBarVisible]);

  const toggleBottomBar = () => {
    setBottomBarVisible(!bottomBarVisible);
  };

  return !bottomBarVisible ? (
    <TouchableOpacity style={styles.bottomBtn} onPress={toggleBottomBar} />
  ) : (
    <Animated.View
      style={[
        styles.bottomBar,
        {
          transform: [{translateY: translateY}],
        },
      ]}>
      <TouchableOpacity style={styles.container} onPress={toggleBackBtn}>
        <Image source={images.backIcon} style={styles.iconStyle} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.container} onPress={toggleZoomMinusBtn}>
        <Image source={images.zoomMinusIcon} style={styles.iconStyle} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.container} onPress={toggleZoomPlusBtn}>
        <Image source={images.zoomPlusIcon} style={styles.iconStyle} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.container} onPress={toggleBackPageBtn}>
        <Image source={images.backPageIcon} style={styles.iconStyle} />
      </TouchableOpacity>
      <View style={styles.input}>
        <Text style={styles.pageText}>{numberOfPages}</Text>
      </View>
      <TouchableOpacity style={styles.container} onPress={toggleNextPageBtn}>
        <Image source={images.nextPageIcon} style={styles.iconStyle} />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default BottomBar;
