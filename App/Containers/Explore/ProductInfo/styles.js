import { ScaledSheet } from "react-native-size-matters";
import AppConfig from "../../../Config/AppConfig";
import { ApplicationStyles, Colors } from "../../../Themes";

export default ScaledSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  image: {
    width: "100%",
    height: "300@vs",
    marginTop: "15@vs",
  },
  body: {
    paddingHorizontal: AppConfig.paddingHorizontal,
    paddingVertical: "10@vs",
  },
  txtTitle: {
    ...ApplicationStyles.screen.heading2Bold,
    textAlign: "center",
    lineHeight: "32@s",
  },
  txtContent: {
    ...ApplicationStyles.screen.txtRegular,
    textAlign: "center",
    marginTop: "10@vs",
  },
});
