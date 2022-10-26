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
  txtProductName: {
    ...ApplicationStyles.screen.heading4Bold,
    marginTop: "10@vs",
    marginBottom: "15@vs",
  },
  reviewInput: {
    marginTop: "15@vs",
  },
  txt1: {
    ...ApplicationStyles.screen.heading4Regular,
    marginVertical: "25@vs",
  },
  btnAddPhotoContainer: {
    width: "100@s",
    height: "100@s",
    borderRadius: "10@s",
    borderColor: Colors.secondary00,
    borderWidth: 1,
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
  },
  icAdd: {
    width: "40@s",
    height: "40@s",
    tintColor: Colors.secondary00,
  },
  photoContainer: {
    width: "100@s",
    height: "100@s",
    borderRadius: "10@s",
    marginLeft: "10@s",
    padding: "5@s",
  },
  btnDeleteContainer: {
    width: "30@s",
    height: "30@s",
    borderRadius: "20@s",
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
  },
  icDelete: {
    width: "20@s",
    height: "20@s",
    tintColor: "white",
  },
});
