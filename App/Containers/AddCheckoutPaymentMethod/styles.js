import { ScaledSheet } from 'react-native-size-matters';
import { ApplicationStyles, Colors, Fonts } from '../../Themes';
import { isIphoneX } from 'react-native-iphone-x-helper';
import AppConfig from '../../Config/AppConfig';

export default ScaledSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },

  safeArea: {
    flex: 1,
    width: '100%',
  },
  bodyContainer: {
    flex: 1,
    paddingHorizontal: '15@s',
    paddingBottom: isIphoneX() ? '5@vs' : '20@vs',
  },
  otpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20@vs',
  },

  btnResendCode: {
    paddingTop: '20@vs',
    alignSelf: 'center',
    marginBottom: '10@vs',
  },
  item: {
    width: '100%',
    //   marginTop:'10@vs',
    resizeMode: 'contain',
  },
});
