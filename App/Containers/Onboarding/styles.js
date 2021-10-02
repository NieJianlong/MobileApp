import { ScaledSheet } from "react-native-size-matters";
import { ApplicationStyles, Colors } from "../../Themes";
import { isIphoneX } from "react-native-iphone-x-helper";

export default ScaledSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.primary01,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  safeArea: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.65)",
  },
  bodyContainer: {
    flex: 1,
    paddingHorizontal: "15@s",
    justifyContent: "flex-end",
    paddingBottom: isIphoneX() ? "5@vs" : "20@vs",
  },
  playButton: {
    alignSelf: "center",
    width: "90@s",
    height: "90@s",
    marginBottom: "220@vs",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50@s",
    borderColor: "white",
    borderWidth: "4@s",
  },
  icon: {
    width: "50@s",
    height: "50@s",
    tintColor: Colors.white,
  },
});
