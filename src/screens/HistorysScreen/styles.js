import {Dimensions, StyleSheet} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constants';

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    width: windowWidth,
  },
  appBar: {
    height: windowHeight * 0.06,
    width: windowWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleText: {
    fontFamily: FONTS.Bold,
    fontSize: SIZES.xLarge,
    color: COLORS.black,
    marginBottom: 8,
    paddingHorizontal: 20,
  },
  descriptionText: {
    fontFamily: FONTS.Regular,
    fontSize: SIZES.medium,
    color: COLORS.gray,
    marginBottom: 8,
    paddingHorizontal: 20,
  },
  historyItem: {
    marginHorizontal: 20,
    paddingHorizontal: 10,
    height: windowHeight * 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 20,
    borderBottomColor: COLORS.gray,
    borderBottomWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  leftView: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  pdfImage: {
    width: 48,
    height: 48,
    resizeMode: 'contain',
    marginRight: 10,
  },
  textView: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleTextItem: {
    width: '80%',
    fontFamily: FONTS.Bold,
    fontSize: SIZES.medium,
    color: COLORS.black,
    marginBottom: 10,
  },
  desText: {
    fontFamily: FONTS.Regular,
    fontSize: SIZES.small,
    color: COLORS.black,
  },
  deleteImage: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  notification: {
    position: 'relative',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: windowWidth * 0.1,
    bottom: windowWidth >= 600 ? 200 : 150,
  },
  notificationView: {
    width: '100%',
    height: windowWidth >= 600 ? windowHeight * 0.07 : windowHeight * 0.05,
    backgroundColor: 'black',
    borderRadius: 30,
    opacity: 0.5,
  },
  notificationText: {
    position: 'absolute',
    fontFamily: 'semiBold',
    fontSize: windowWidth >= 600 ? SIZES.large : SIZES.medium,
    color: 'white',
  },
});
