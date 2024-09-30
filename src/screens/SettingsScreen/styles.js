import {Dimensions, StyleSheet} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constants/theme';

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  appBar: {
    flex: 0.1,
    width: windowWidth,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  scrollView: {
    flex: 0.9,
    width: windowWidth,
    paddingHorizontal: 20,
  },
  titleSetting: {
    fontFamily: FONTS.Bold,
    fontSize: SIZES.xLarge,
    color: COLORS.black,
    marginBottom: 10,
  },
  btnView: {
    paddingHorizontal: 10,
    height: windowHeight * 0.08,
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
  textView: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  titleBtn: {
    fontFamily: FONTS.SemiBold,
    fontSize: SIZES.large,
    color: COLORS.black,
  },
  descriptionsBtn: {
    fontFamily: FONTS.Regular,
    fontSize: SIZES.small + 1,
    color: COLORS.black,
  },
  iconStyle: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
    marginHorizontal: 10,
  },
});
