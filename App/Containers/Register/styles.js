import { ScaledSheet } from "react-native-size-matters";
import { ApplicationStyles, Colors, Fonts } from "../../Themes";
import { isIphoneX } from "react-native-iphone-x-helper";
import { colors } from "react-native-tailwindcss";

export default ScaledSheet.create({
  ...ApplicationStyles.screen,
  noneText: {
    fontSize: '15@s',
    marginLeft: '20@s',
    marginBottom: '10@s',
    color: colors.blue600,
  },
  continueText: {
    marginLeft: '20@s',
    fontSize: '20@s',
    color: Colors.grey80,
    marginBottom: '20@s',
    marginTop: '10@s',
  },
  emailListText: {
    fontSize: '16@s',
  },
  emailListMainContainer:{
    flex: 1,
    backgroundColor: 'rgba(52, 52, 52, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icDelete: {
    width: "18@s",
    height: "18@s",
    tintColor: Colors.black,
    marginLeft: "5@s",
  },
  deleteBtn: {
    alignItems: 'flex-end',
  },
  emailListBtn: {
    width: '85%',
    height: '40@s',
    paddingLeft: '20@s',
  },  
  btnContainer: {
    marginBottom: '10@s',
    flexDirection: 'row',
    width: '100%',
  },
  flatListstyle: {
    borderRadius: '20@s',
  },  
  icClose: {
    marginTop: '5@s',
    width: "22@s",
    height: "22@s",
    tintColor: Colors.black,
    marginLeft: "5@s",
  },
  btnClose: {
    width: '40@s',
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    paddingRight: '10@s',
    marginBottom: '20@s',
    marginTop: '10@s',
  },
  emailListContainer: {
    backgroundColor: colors.white,
    height: '250@vs',
    minHeight: '50@vs',
    width: '90%',
    alignSelf: 'center',
    // bottom: '270@s',
    // left: '20@s',
    borderColor: Colors.grey20 ,
    borderWidth: 1,
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
