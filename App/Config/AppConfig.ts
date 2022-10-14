import { s } from "react-native-size-matters";
import * as Updates from "expo-updates";
import DeviceInfo from "react-native-device-info";
import { Platform } from "react-native";
let url = Updates.releaseChannel.startsWith("prod")
  ? "https://api.salamislicing.in/"
  : "https://stage-api.salamislicing.in/";
if (Platform.OS === "ios") {
  if (__DEV__) {
    url = "https://stage-api.salamislicing.in/";
  } else {
    url = "https://api.salamislicing.in/";
  }
}

const AppConfig = {
  fontSize: s(15),
  paddingHorizontal: s(15),
  baseUrl: "https://api.salamislicing.in/",
  // baseUrl: "http://ec2-18-117-210-203.us-east-2.compute.amazonaws.com",
  // baseUrl: "https://dev-api.salamislicing.in/",
  guestId: "9fcbb7cb-5354-489d-b358-d4e2bf386ff3",
};

export default AppConfig;
