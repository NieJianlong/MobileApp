import { ScaledSheet, vs } from 'react-native-size-matters';
import { ApplicationStyles, Colors, Fonts } from '../../Themes';
import { isIphoneX } from 'react-native-iphone-x-helper';
import AppConfig from '../../Config/AppConfig';
import colors from '../../Themes/Colors';
import fonts from '../../Themes/Fonts';

export default ScaledSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tipContainer: {
    height: '150@vs',
    alignItems: 'center',
    justifyContent: 'center',
  },
  safeArea: {
    flex: 1,
    width: '100%',
  },
  bodyContainer: {
    flex: 1,
    height: '80@vs',
    paddingHorizontal: '15@s',
    paddingBottom: isIphoneX() ? '5@vs' : '20@vs',
  },
  balanceContainer: {
    width: '248@s',
    height: '112@s',
    borderRadius: '24@s',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: AppConfig.paddingHorizontal,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: AppConfig.paddingHorizontal,
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  shareIcon: {
    width: '45@s',
    height: '54@s',
    resizeMode: 'contain',
    margin: 5,
  },
  dot: {
    width: '8@s',
    height: '8@s',
    borderRadius: '4@s',
    backgroundColor: colors.primary,
  },
});
