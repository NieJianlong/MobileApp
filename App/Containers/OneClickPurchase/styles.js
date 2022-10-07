import { ScaledSheet } from "react-native-size-matters";
import { ApplicationStyles, Colors, Fonts } from "../../Themes";
import AppConfig from "../../Config/AppConfig";

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
  item: {
    marginTop: "15@vs",
    backgroundColor: "white",
    borderRadius: "16@s",
    height: "122@vs",
    paddingHorizontal: AppConfig.paddingHorizontal,
    justifyContent: "center",
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
});
