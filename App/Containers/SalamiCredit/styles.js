import { ScaledSheet, vs } from "react-native-size-matters";
import { ApplicationStyles, Colors, Fonts } from "../../Themes";
import { isIphoneX } from "react-native-iphone-x-helper";
import AppConfig from "../../Config/AppConfig";
import colors from "../../Themes/Colors";
import fonts from "../../Themes/Fonts";

export default ScaledSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  tipContainer: {
    alignItems: "center",
    justifyContent: "center",
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
  balanceContainer: {
    width: "248@s",
    height: "112@s",
    borderRadius: "24@s",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: vs(15),
    paddingVertical: AppConfig.paddingHorizontal,
  },
  content: {
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: AppConfig.paddingHorizontal,
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  shareIcon: {
    width: "45@s",
    height: "45@s",
    resizeMode: "contain",
    margin: 5,
  },
  balanceTipTxt: {
    color: colors.grey80,
    fontFamily: fonts.bold,
    fontSize: "12@s",
  },
  balanceTxt: {
    color: colors.black,
    fontFamily: fonts.semibold,
    fontSize: "24@s",
  },
  useBalanceTxt: {
    color: "#CC0000",
    fontFamily: fonts.primary,
    fontSize: "14@s",
  },

  btnResendCode: {
    paddingTop: "20@vs",
    alignSelf: "center",
    marginBottom: "10@vs",
  },
});
