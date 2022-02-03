import { ScaledSheet } from "react-native-size-matters";;
import AppConfig from "../../../Config/AppConfig";;
import { ApplicationStyles, Colors } from "../../../Themes";;

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
  header: {
    marginVertical: "0@vs",
  },
  body: {
    paddingHorizontal: AppConfig.paddingHorizontal,
    paddingVertical: "10@vs",
    flex: 1,
  },
  txtSave: {
    ...ApplicationStyles.screen.heading5Bold,
    color: Colors.primary,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  icSearch: {
    width: "30@s",
    height: "30@s",
    tintColor: Colors.grey60,
  },
  sortBarContainer: {
    flexDirection: "row",
    paddingHorizontal: "15@s",
    paddingVertical: "13@vs",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.background,
  },
  icSort: {
    width: "20@s",
    height: "20@s",
    tintColor: Colors.grey80,
  },
  icArrowDown2: {
    width: "20@s",
    height: "20@s",
    transform: [{ rotate: "270deg" }],
    tintColor: Colors.grey60,
    marginRight: "7@s",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  prodListContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
