import {Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');

const COLORS = {
  primary: '#FF1200',
  secondary: '#66AAFA',
  tertiary: '#FF9467',
  blue: '#1A63A7',
  greenlight: '#4EAEB5',
  black: '#000000',
  gray: '#62656b',
  yellow: '#f7b501',
  white: '#fff',
  pink: '#FBA2D0',
  violet: '#C688EB',
  dardRed: '#AA131F',
};

const FONTS = {
  Regular: 'Montserrat-Regular',
  Bold: 'Montserrat-Bold',
  Light: 'Montserrat-Light',
  Medium: 'Montserrat-Medium',
  SemiBold: 'Montserrat-SemiBold',
  ExtraBold: 'Montserrat-ExtraBold',
};

const SIZES = {
  xSmall: 10,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 36,
  xxxLarge: 54,
  height,
  width,
};

export {COLORS, SIZES, FONTS};
