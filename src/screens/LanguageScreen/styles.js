import {Dimensions, StyleSheet} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constants/theme';

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: windowWidth,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  appBar: {
    flex: 0.08,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: windowWidth,
    paddingHorizontal: 10,
  },
  contentView: {
    flex: 0.9,
    width: windowWidth,
    paddingHorizontal: 20,
  },
  titleText: {
    fontFamily: FONTS.Bold,
    fontSize: SIZES.xxLarge,
    color: COLORS.black,
    marginBottom: 10,
  },
  itemView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 60,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  languageText: {
    fontFamily: 'regular',
    fontSize: SIZES.medium,
    color: COLORS.black,
  },
  titleView: {
    flexDirection: 'row',
    height: windowHeight * 0.1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnConfig: {
    width: 80,
    height: 30,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});
