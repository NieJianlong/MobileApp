import { ScaledSheet } from "react-native-size-matters";
import { ApplicationStyles, Colors, Fonts } from "../../Themes";
import { isIphoneX } from "react-native-iphone-x-helper";

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
    flex: 1,
    paddingHorizontal: "15@s",
    paddingBottom: isIphoneX() ? "5@vs" : "20@vs",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "24@vs",
  },
  textInput: {
    marginTop: "24@vs",
  },
  txt1: {
    fontFamily: Fonts.semibold,
    color: Colors.black,
    fontSize: "34@s",
    textAlign: "center",
    marginBottom: "6@vs",
  },
  txt2: {
    fontFamily: Fonts.primary,
    color: Colors.grey80,
    fontSize: "15@s",
    textAlign: "center",
    marginBottom: "24@vs",
  },
  btnSignin: {
    paddingTop: "20@vs",
    alignSelf: "center",
    marginBottom: isIphoneX() ? 0 : "10@vs",
  },
  switch: {
    marginTop: "24@vs",
    flexDirection: "row",
    alignItems: "center",
  },
  txtAccept: {
    fontFamily: Fonts.primary,
    color: Colors.black,
    fontSize: "14@s",
  },
  txtPrivacy: {
    fontFamily: Fonts.primary,
    color: Colors.black,
    fontSize: "14@s",
    fontWeight: "600",
  },
  txtValidate: {
    fontFamily: Fonts.primary,
    color: Colors.error,
    fontSize: "14@s",
    fontWeight: "700",
    margin: "12@vs",
  },
});
