import {Dimensions, StyleSheet} from 'react-native';
import {COLORS, SIZES, SHADOWS, FONTS} from '../../constants/theme';

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    width: windowWidth,
    paddingHorizontal: 20,
  },
  appBar: {
    flex: 0.1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  titleText: {
    fontFamily: FONTS.Bold,
    fontSize: SIZES.xLarge,
    color: COLORS.black,
    marginBottom: 8,
  },
  descriptionText: {
    fontFamily: FONTS.Regular,
    fontSize: SIZES.medium,
    color: COLORS.gray,
    marginBottom: 8,
  },
  listView: {
    flex: 0.9,
    marginTop: 8,
  },
  featureView: {
    width: '100%',
    height: windowHeight * 0.08,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 20,
    borderRadius: 8,
    paddingHorizontal: 10,
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
  iconsView: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
  textView: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  titleTextItem: {
    fontFamily: FONTS.SemiBold,
    fontSize: SIZES.medium,
    color: COLORS.white,
  },
  descriptionTextItem: {
    paddingTop: 4,
    fontFamily: FONTS.Regular,
    fontSize: SIZES.small + 1,
    color: COLORS.white,
  },
  iconStyle: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
});
