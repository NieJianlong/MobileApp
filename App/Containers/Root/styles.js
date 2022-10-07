import { ScaledSheet, vs } from "react-native-size-matters";
import { ApplicationStyles, Colors, Fonts } from "../../Themes";
import { isIphoneX } from "react-native-iphone-x-helper";
import AppConfig from "../../Config/AppConfig";
import colors from "../../Themes/Colors";
import fonts from "../../Themes/Fonts";

export default ScaledSheet.create({
  ...ApplicationStyles.screen,
  backIcon: {
    width: "22@s",
    height: "22@s",
    tintColor: Colors.grey80,
  },
  btnRoundContainer: {
    width: "36@s",
    height: "36@s",
    borderRadius: "20@s",
    backgroundColor: Colors.grey10,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: '15@s',
  },
  backContainer: {
    paddingTop: '10@s',
    backgroundColor: "black",
    width: "100%"
  }
});
