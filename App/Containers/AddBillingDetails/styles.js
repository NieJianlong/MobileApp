import { s, ScaledSheet } from "react-native-size-matters";
import { ApplicationStyles, Colors, Fonts } from "../../Themes";

export default ScaledSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  safeArea: {
    flex: 1,
    width: "100%",
  },
  bodyContainer: {
    paddingHorizontal: "15@s",
    paddingBottom: 170,
  },
  otpContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "20@vs",
  },
  btnResendCode: {
    paddingTop: "20@vs",
    alignSelf: "center",
    marginBottom: "10@vs",
  },
  saveAddress: {
    marginTop: s(24),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressIcon: {
    paddingLeft: s(11),
    paddingRight: s(19),
  },
  saveAddressText: {
    fontFamily: Fonts.primary,
    fontSize: s(14),
    lineHeight: s(20),
    color: Colors.black,
  },
});
