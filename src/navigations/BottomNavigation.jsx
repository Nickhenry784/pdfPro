/* eslint-disable react-hooks/exhaustive-deps */
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  AllFileScreen,
  HistorysScreen,
  HomeScreen,
  SettingsScreen,
} from '../screens';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {COLORS, FONTS, SIZES} from '../constants';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import i18next from 'i18next';
import {images} from '../assets';

const Stack = createBottomTabNavigator();

const windowWidth = Dimensions.get('screen').width;

const BottomNavigation = () => {
  const {t} = useTranslation();

  const setting = useSelector(state => state.setting);

  useEffect(() => {
    i18next.changeLanguage(setting.language);
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          right: 0,
          left: 0,
          elevation: 0,
          height: windowWidth >= 600 ? 84 : 64,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          backgroundColor: COLORS.white,
        },
      }}>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View
                style={{
                  alignItems: 'center',
                  paddingTop: 4,
                  width: windowWidth >= 600 ? 150 : 80,
                }}>
                <Image
                  source={focused ? images.homeRedIcon : images.homeIcon}
                  style={styles.iconStyle}
                />
                <Text
                  style={{
                    paddingTop: 4,
                    color: focused ? COLORS.primary : 'black',
                    fontFamily: FONTS.Regular,
                    fontSize: windowWidth >= 600 ? SIZES.medium : SIZES.small,
                  }}>
                  {t('home')}
                </Text>
              </View>
            );
          },
        }}
      />
      <Stack.Screen
        name="FileScreen"
        component={AllFileScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View
                style={{
                  alignItems: 'center',
                  paddingTop: 4,
                  width: windowWidth >= 600 ? 150 : 80,
                }}>
                <Image
                  source={focused ? images.pdfRedIcon : images.pdfIcon}
                  style={styles.iconStyle}
                />
                <Text
                  style={{
                    paddingTop: 4,
                    color: focused ? COLORS.primary : 'black',
                    fontFamily: FONTS.Regular,
                    fontSize: windowWidth >= 600 ? SIZES.medium : SIZES.small,
                  }}>
                  {t('files')}
                </Text>
              </View>
            );
          },
        }}
      />
      <Stack.Screen
        name="History"
        component={HistorysScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View
                style={{
                  alignItems: 'center',
                  paddingTop: 4,
                  width: windowWidth >= 600 ? 150 : 80,
                }}>
                <Image
                  source={focused ? images.historyRedIcon : images.historyIcon}
                  style={styles.iconStyle}
                />
                <Text
                  style={{
                    paddingTop: 4,
                    color: focused ? COLORS.primary : 'black',
                    fontFamily: FONTS.Regular,
                    fontSize: windowWidth >= 600 ? SIZES.medium : SIZES.small,
                  }}>
                  {t('history')}
                </Text>
              </View>
            );
          },
        }}
      />
      <Stack.Screen
        name="Setting"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View
                style={{
                  alignItems: 'center',
                  paddingTop: 4,
                  width: windowWidth >= 600 ? 150 : 80,
                }}>
                <Image
                  source={focused ? images.settingRedIcon : images.settingIcon}
                  style={styles.iconStyle}
                />
                <Text
                  style={{
                    paddingTop: 4,
                    color: focused ? COLORS.primary : 'black',
                    fontFamily: FONTS.Regular,
                    fontSize: windowWidth >= 600 ? SIZES.medium : SIZES.small,
                  }}>
                  {t('setting')}
                </Text>
              </View>
            );
          },
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  iconStyle: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});

export default BottomNavigation;
