import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './styles';
import slides from './slides';
import {OnboardingItem, Paginator} from '../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {
  checkManagePermission,
  requestManagePermission,
} from 'manage-external-storage';
import {images} from '../../assets';

const UserAgreementScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isManageEnable, setIsManageEnable] = useState(false);
  const [modalEnable, setModalEnable] = useState(true);
  const navigation = useNavigation();
  const scrollX = useRef(new Animated.Value(0)).current;

  const checkManagePermitted = () => {
    checkManagePermission().then(isManagePermitted => {
      console.log(isManagePermitted);
      setIsManageEnable(isManagePermitted);
      if (!isManagePermitted) {
        setModalEnable(true);
      } else {
        setModalEnable(false);
      }
    });
  };

  const onClickAllowBtn = () => {
    requestManagePermission().then(isManagePermitted => {
      console.log(isManagePermitted);
      setIsManageEnable(isManagePermitted);
      if (isManagePermitted) {
        setModalEnable(false);
      } else {
        setModalEnable(true);
      }
    });
  };

  const viewableItemsChanged = useRef(({viewableItems}) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const onClickGetStartedBtn = async () => {
    try {
      await AsyncStorage.setItem('isAgreementAccepted', 'isAgree');
      navigation.navigate('AppNavigation');
    } catch (error) {
      console.log(error);
    }
  };

  const slideRef = useRef(null);

  useEffect(() => {
    checkManagePermitted();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 0.7}}>
        <FlatList
          data={slides}
          renderItem={({item}) => <OnboardingItem key={item.id} item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          onViewableItemsChanged={viewableItemsChanged}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {
              useNativeDriver: false,
            },
          )}
          scrollEventThrottle={32}
          ref={slideRef}
        />
      </View>
      <View
        style={{flex: 0.05, justifyContent: 'center', alignItems: 'center'}}>
        <Paginator data={slides} scrollX={scrollX} />
      </View>
      <View
        style={{flex: 0.25, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={onClickGetStartedBtn}
          style={styles.getStartedBtn}
          activeOpacity={0.85}>
          <Text style={styles.textBtn}>Get Started</Text>
        </TouchableOpacity>
      </View>
      {modalEnable ? (
        <>
          <View style={styles.modalView} />
          <View style={styles.modalContainer}>
            <View
              style={{
                position: 'absolute',
                top: 20,
                right: 20,
              }}>
              <TouchableOpacity
                onPress={() => setModalEnable(false)}
                activeOpacity={0.85}>
                <Image
                  source={images.closeIcon}
                  style={styles.iconCloseStyle}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
              }}>
              <Image
                source={images.phonelinkSetupIcon}
                style={styles.phonelinkImage}
              />
            </View>
            <Text style={styles.titleText}>Permission Required</Text>
            <Text style={styles.descriptionText}>
              To read and edit documents on your device, please allow PDF Reader
              to access all your files.
            </Text>
            <View style={styles.guideView}>
              <Text style={styles.guideText}>
                Allow access to manage all files
              </Text>
              <Image source={images.toggleOnIcon} style={styles.iconStyle} />
            </View>
            <TouchableOpacity
              onPress={onClickAllowBtn}
              style={styles.allowBtn}
              activeOpacity={0.85}>
              <Text style={styles.textBtn}>ALLOW</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <></>
      )}
    </SafeAreaView>
  );
};

export default UserAgreementScreen;
