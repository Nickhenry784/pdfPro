import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from '../locales/en.json';
import vi from '../locales/vi.json';
import {images} from '../assets';

export const languageResources = {
  en: {translation: en},
  vi: {translation: vi},
};

export const languageIcons = {
  en: images.en,
  vi: images.vi,
};

i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'en',
  fallbackLng: 'en',
  resources: languageResources,
});

export default i18next;
