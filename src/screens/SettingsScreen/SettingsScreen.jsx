import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BackBtn} from '../../components';
import {styles} from './styles';
import {COLORS} from '../../constants/theme';
import {useNavigation} from '@react-navigation/native';
import {images} from '../../assets';
import {useDispatch, useSelector} from 'react-redux';
import {toggleSound, toggleVibration} from '../../redux/settingSlice';

const SettingsScreen = () => {
  const [isEnabledVibrate, setIsEnabledVibrate] = useState(false);
  const [isEnabledBeep, setIsEnabledBeep] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const toggleSwitchVibrate = () => {
    dispatch(toggleVibration());
    setIsEnabledVibrate(previousState => !previousState);
  };

  const toggleSwitchBeep = () => {
    dispatch(toggleSound());
    setIsEnabledBeep(previousState => !previousState);
  };

  const setting = useSelector(state => state.setting);

  useEffect(() => {
    setIsEnabledVibrate(setting.vibration);
    setIsEnabledBeep(setting.sound);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.appBar}>
        <BackBtn />
      </View>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.titleSetting}>Settings</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Language')}
          style={styles.btnView}
          activeOpacity={0.9}>
          <View style={styles.leftView}>
            <Image source={images.languageIcon} style={styles.iconStyle} />
            <View style={styles.textView}>
              <Text style={styles.titleBtn}>Language</Text>
              <Text style={styles.descriptionsBtn}>
                Select language to display
              </Text>
            </View>
          </View>
          <Image source={images.arrowRightIcon} style={styles.iconStyle} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnView}
          activeOpacity={0.9}
          onPress={toggleSwitchVibrate}>
          <View style={styles.leftView}>
            <Image source={images.vibrateIcon} style={styles.iconStyle} />
            <View style={styles.textView}>
              <Text style={styles.titleBtn}>Vibrate</Text>
              <Text style={styles.descriptionsBtn}>
                Vibration when convert is done.
              </Text>
            </View>
          </View>
          <Switch
            trackColor={{false: '#d4d4d4', true: '#d4d4d4'}}
            thumbColor={isEnabledVibrate ? COLORS.primary : COLORS.white}
            onValueChange={toggleSwitchVibrate}
            value={isEnabledVibrate}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnView}
          activeOpacity={0.9}
          onPress={toggleSwitchBeep}>
          <View style={styles.leftView}>
            <Image source={images.notificationIcon} style={styles.iconStyle} />
            <View style={styles.textView}>
              <Text style={styles.titleBtn}>Beep</Text>
              <Text style={styles.descriptionsBtn}>
                Beep when convert is done.
              </Text>
            </View>
          </View>
          <Switch
            trackColor={{false: '#d4d4d4', true: '#d4d4d4'}}
            thumbColor={isEnabledBeep ? COLORS.primary : COLORS.white}
            onValueChange={toggleSwitchBeep}
            value={isEnabledBeep}
          />
        </TouchableOpacity>
        <Text style={styles.titleSetting}>Support</Text>
        <TouchableOpacity style={styles.btnView} activeOpacity={0.9}>
          <View style={styles.leftView}>
            <Image source={images.starIcon} style={styles.iconStyle} />
            <View style={styles.textView}>
              <Text style={styles.titleBtn}>Rate Us</Text>
              <Text style={styles.descriptionsBtn}>Your best reward to us</Text>
            </View>
          </View>
          <Image source={images.arrowRightIcon} style={styles.iconStyle} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnView} activeOpacity={0.9}>
          <View style={styles.leftView}>
            <Image source={images.shieldIcon} style={styles.iconStyle} />
            <View style={styles.textView}>
              <Text style={styles.titleBtn}>Privacy Policy</Text>
              <Text style={styles.descriptionsBtn}>
                Follow our policies that benefits you
              </Text>
            </View>
          </View>
          <Image source={images.arrowRightIcon} style={styles.iconStyle} />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;
