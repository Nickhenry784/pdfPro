import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import historySlice from './historySlice';
import settingSlice from './settingSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['setting', 'history'],
  version: 1,
};

const rootReducer = combineReducers({
  history: historySlice,
  setting: settingSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
