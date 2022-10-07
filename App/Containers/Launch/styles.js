import { ScaledSheet } from "react-native-size-matters";
import { ApplicationStyles, Colors } from "../../Themes";

export default ScaledSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.primary01,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: "140@s",
    height: "140@s",
    tintColor: Colors.white,
    marginBottom: "100@vs",
  },
});
