import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import BottomNavigation from './BottomNavigation';
import {useTranslation} from 'react-i18next';
import {AllFileScreen, HistorysScreen, SettingsScreen} from '../screens';

const Drawer = createDrawerNavigator();

const DrawlNavigation = () => {
  const {t} = useTranslation();
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false, drawerPosition: 'right'}}>
      <Drawer.Screen
        name="Home"
        component={BottomNavigation}
        options={{title: t('home')}}
      />
      <Drawer.Screen
        name="Files"
        component={AllFileScreen}
        options={{title: t('files')}}
      />
      <Drawer.Screen
        name="History"
        component={HistorysScreen}
        options={{title: t('history')}}
      />
      <Drawer.Screen
        name="Setting"
        component={SettingsScreen}
        options={{title: t('setting')}}
      />
    </Drawer.Navigator>
  );
};

export default DrawlNavigation;
