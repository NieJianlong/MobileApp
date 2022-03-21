import { ScaledSheet, s } from "react-native-size-matters";
import { ApplicationStyles, Colors } from "../../Themes";

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
    backgroundColor: Colors.background,
  },
  mainView: {
    marginHorizontal: s(25),
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.white,
    borderRadius: 20,
  },
  videoView: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    paddingHorizontal: s(20),
    paddingVertical: s(10),
  },
  guideView: {
    borderRadius: 20,
    paddingHorizontal: s(30),
    paddingVertical: s(10),
  },
  textStyle: {
    color: Colors.grey40,
  },
});
