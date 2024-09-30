import {Dimensions, StyleSheet} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constants/theme';

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

export const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: windowWidth,
    marginBottom: 20,
  },
  imageView: {
    flex: 0.7,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 110,
    height: 110,
    resizeMode: 'contain',
  },
  imagePDF: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  imageArrow: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  title: {
    fontFamily: FONTS.SemiBold,
    fontSize: SIZES.xxLarge,
    marginBottom: 10,
    color: COLORS.black,
    textAlign: 'center',
  },
  description: {
    fontFamily: FONTS.Regular,
    fontSize: SIZES.medium,
    color: COLORS.gray,
    textAlign: 'center',
    paddingHorizontal: 64,
  },
});
