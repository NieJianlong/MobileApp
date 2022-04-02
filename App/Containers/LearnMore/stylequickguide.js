import { ScaledSheet, vs, s } from "react-native-size-matters";
import { ApplicationStyles, Colors, Fonts } from "../../Themes";
import { isIphoneX } from "react-native-iphone-x-helper";
import AppConfig from "../../Config/AppConfig";
import colors from "../../Themes/Colors";
import fonts from "../../Themes/Fonts";
import { Platform } from "react-native";

export default ScaledSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  tipContainer: {
    // alignItems: "center",
    flex: 1,
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
    marginTop: "2@vs",
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
    color: colors.black,
    fontFamily: fonts.semibold,
    fontSize: "12@s",
    marginTop: "10@vs",
  },
  balanceTxt: {
    color: colors.black,
    fontFamily: fonts.semibold,
    fontSize: "18@s",
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
  header: {
    paddingHorizontal: 10,
    justifyContent: "flex-start",
    // alignItems: "center",
    paddingVertical: 20,
    marginVertical: 7,
    backgroundColor: colors.grey10,
    paddingLeft: 30,
  },
  subContent: {
    marginVertical: 10,
    backgroundColor: colors.subbackground,
  },
  headerText: {
    color: colors.black,
    fontFamily: fonts.semibold,
    fontSize: "14@s",
  },
  contentText: {
    color: colors.black,
    fontFamily: fonts.primary,
    fontSize: "14@s",
  },
  v2: {
    justifyContent: "space-between",
    height: "88@s",
    marginLeft: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 25,
    paddingTop: 10,
  },
  heading4Bold: {
    fontSize: 15,
    fontFamily: Fonts.primary,
    color: Colors.black,
    fontWeight: Platform.OS == "ios" ? "600" : "bold",
  },
  v3: {
    marginRight: "20@s",
  },
  txtNoteBold: {
    fontSize: s(7),
    fontFamily: Fonts.primary,
    color: Colors.grey60,
  },
  txtRetailPrice: {
    ...ApplicationStyles.screen.heading4Bold,
    color: Colors.grey60,
    textDecorationLine: "line-through",
    marginTop: "2@vs",
  },
  txtWholesalePrice: {
    ...ApplicationStyles.screen.heading4Bold,
    color: Colors.primary,
    marginTop: "2@vs",
  },
  percentOffContainer: {
    backgroundColor: Colors.secondary01,
    paddingHorizontal: "10@s",
    paddingVertical: "5@s",
    borderRadius: "30@s",
  },
  percentOffContainerSmall: {
    backgroundColor: Colors.secondary01,
    paddingHorizontal: "5@s",
    paddingVertical: "2@s",
    borderRadius: "30@s",
  },
  productImage: {
    width: "75@s",
    height: "75@s",
  },
  v4: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: AppConfig.paddingHorizontal,
    borderTopWidth: 2,
    borderTopColor: Colors.grey10,
    marginBottom: "2@s",
    // marginTop: "2@vs",
    // paddingTop: "10@vs",
  },
  icInfo: {
    width: "22@s",
    height: "22@s",
    tintColor: Colors.secondary00,
    marginLeft: "5@s",
  },
  icShare: {
    width: "22@s",
    height: "22@s",
    tintColor: Colors.black,
    marginLeft: "5@s",
  },
  icStock: {
    width: "22@s",
    height: "22@s",
    tintColor: Colors.grey60,
    marginRight: "5@s",
  },
  buyslice: {
    width: "40@s",
    height: "40@s",
    tintColor: Colors.black,
    marginRight: "5@s",
  },
  icCalender: {
    width: "27@s",
    height: "27@s",
    tintColor: Colors.black,
    marginRight: "10@s",
  },
  subText: {
    fontSize: s(14),
    fontFamily: Fonts.primary,
    color: Colors.black,
  },
});
