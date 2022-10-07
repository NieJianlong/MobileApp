import { ScaledSheet } from "react-native-size-matters";
import { ApplicationStyles, Colors, Fonts } from "../../../Themes";
import { isIphoneX } from "react-native-iphone-x-helper";
import AppConfig from "../../../Config/AppConfig";
import { colors } from "react-native-tailwindcss";

export default ScaledSheet.create({
  ...ApplicationStyles.screen,
  closeImage: {
    height: '15@s',
    width: '15@s',
    tintColor: colors.black,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: 'center',
  },
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
    flex: 1,

    paddingBottom: isIphoneX() ? "5@vs" : "20@vs",
  },
  otpContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "20@vs",
  },
  txtInput: {
    width: "40@s",
    height: "48@vs",
    backgroundColor: Colors.white,
    borderRadius: "40@s",
    borderWidth: 1,
    borderColor: Colors.grey20,
    marginHorizontal: "16@s",
    textAlign: "center",
    fontFamily: Fonts.semibold,
    fontSize: "20@s",
    color: Colors.black,
  },
  txtInputFocused: {
    width: "40@s",
    height: "48@vs",
    backgroundColor: Colors.white,
    borderRadius: "40@s",
    borderWidth: 1,
    borderColor: Colors.black,
    marginHorizontal: "16@s",
    textAlign: "center",
    fontFamily: Fonts.semibold,
    fontSize: "20@s",
    color: Colors.black,
  },
  btnResendCode: {
    paddingTop: "20@vs",
    alignSelf: "center",
    marginBottom: "10@vs",
  },
  popupHeader: {
    flexDirection: "row",
    paddingVertical: "20@vs",
    alignItems: "center",
  },
  popupTitle: {
    color: Colors.black,
    fontSize: AppConfig.fontSize,
    fontFamily: Fonts.semibold,
    textAlign: "center",
  },
  txtSave: {
    color: Colors.grey80,
    fontSize: "13@s",
    fontFamily: Fonts.semibold,
  },
});
