import { ScaledSheet } from "react-native-size-matters";
import { ApplicationStyles, Colors, Fonts } from "../../Themes";
import { isIphoneX } from "react-native-iphone-x-helper";
import AppConfig from "../../Config/AppConfig";
import { colors } from "react-native-tailwindcss";

export default ScaledSheet.create({
  ...ApplicationStyles.screen,
  deleteBtn: {
    alignItems: 'flex-end',
  },
  btnContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  btnClose: {
    backgroundColor: '#CC0000',
    width: '100%',
    alignItems: 'flex-end',
    borderTopLeftRadius: '20@s',
    borderTopRightRadius: '20@s',
    paddingRight: '10@s',
    marginBottom: '10@s',
  },
  icClose: {
    marginTop: '5@s',
    width: "22@s",
    height: "22@s",
    tintColor: Colors.white,
    marginLeft: "5@s",
  },
  icDelete: {
    width: "18@s",
    height: "18@s",
    tintColor: Colors.black,
    marginLeft: "5@s",
  },
  flatListstyle: {
    borderRadius: '20@s',
  },  
  emailListBtn: {
    width: '85%',
    height: '40@s',
    paddingLeft: '20@s',
  },  
  emailListContainer: {
    backgroundColor: colors.white,
    maxHeight: '250@vs',
    minHeight: '50@vs',
    width: '250@s',
    alignSelf: 'center',
    // bottom: '270@s',
    // left: '20@s',
    borderColor: Colors.grey20 ,
    borderWidth: 1,
    borderRadius: '20@s',
    marginBottom: '10@s',
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
    paddingHorizontal: "15@s",
    justifyContent: "flex-end",
    paddingBottom: isIphoneX() ? "5@vs" : "20@vs",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "24@vs",
  },
  txtAction: {
    fontFamily: Fonts.semibold,
    color: Colors.primary,
    fontSize: AppConfig.fontSize,
  },
  passwordInput: {
    marginBottom: "24@vs",
  },
  emailInput: {
    marginBottom: "24@vs",
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
});
