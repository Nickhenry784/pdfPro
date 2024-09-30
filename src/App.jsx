import {View, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {NavigationContainer} from '@react-navigation/native';
import {persistor, store} from './redux/store';
import {COLORS} from './constants';
import AppNavigation from './navigations/AppNavigation';
import {UserAgreementScreen} from './screens';
import {PortalProvider} from '@gorhom/portal';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();

const App = () => {
  const [loading, setLoading] = useState(null);

  const load = async () => {
    console.log(1);
    await AsyncStorage.getItem('isAgreementAccepted').then(result => {
      console.log('RES: ', result);
      if (result == null) {
        setLoading(true);
      } else {
        setLoading(result);
      }
    });
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <GestureHandlerRootView>
          <PortalProvider>
            <NavigationContainer>
              {loading === null ? (
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <ActivityIndicator size="large" color={COLORS.primary} />
                </View>
              ) : (
                <Stack.Navigator
                  initialRouteName={
                    loading !== 'isAgree'
                      ? 'UserAgreementScreen'
                      : 'AppNavigation'
                  }
                  screenOptions={{headerShown: false}}>
                  <Stack.Screen
                    name="UserAgreementScreen"
                    component={UserAgreementScreen}
                  />
                  <Stack.Screen
                    name="AppNavigation"
                    component={AppNavigation}
                  />
                </Stack.Navigator>
              )}
            </NavigationContainer>
          </PortalProvider>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
};

export default App;
