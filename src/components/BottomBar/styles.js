import {Dimensions, StyleSheet} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constants/theme';

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

export const styles = StyleSheet.create({
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: windowHeight * 0.07,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  bottomBtn: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    height: windowHeight * 0.015,
    width: windowWidth * 0.3,
    backgroundColor: '#ccc',
  },
  container: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  iconStyle: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  input: {
    height: 40,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  pageText: {
    fontFamily: FONTS.Regular,
    fontSize: SIZES.medium,
    color: COLORS.black,
  },
});
