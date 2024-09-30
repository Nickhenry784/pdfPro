import {Dimensions, StyleSheet} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constants/theme';

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  getStartedBtn: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.07,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  allowBtn: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.07,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBtn: {
    fontFamily: FONTS.SemiBold,
    fontSize: SIZES.medium + 4,
    color: 'white',
  },
  modalView: {
    width: windowWidth,
    height: windowHeight,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: COLORS.black,
    opacity: 0.5,
  },
  modalContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    width: windowWidth,
    height: windowHeight * 0.6,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  phonelinkImage: {
    width: 128,
    height: 128,
    resizeMode: 'contain',
  },
  titleText: {
    fontFamily: FONTS.Bold,
    fontSize: SIZES.large,
    color: COLORS.black,
    marginBottom: 10,
  },
  descriptionText: {
    fontFamily: FONTS.Regular,
    fontSize: SIZES.medium,
    color: COLORS.black,
    marginBottom: 30,
  },
  guideView: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.07,
    borderRadius: 8,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 50,
  },
  guideText: {
    fontFamily: FONTS.Regular,
    fontSize: SIZES.medium,
    color: COLORS.black,
  },
  iconStyle: {
    width: 48,
    height: 48,
    resizeMode: 'contain',
  },
  iconCloseStyle: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
});
