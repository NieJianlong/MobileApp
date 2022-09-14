import { s } from "react-native-size-matters";
import * as Updates from "expo-updates";

const AppConfig = {
  fontSize: s(15),
  paddingHorizontal: s(15),
  baseUrl: Updates.releaseChannel.startsWith("prod")
    ? "https://api.salamislicing.in/"
    : "https://stage-api.salamislicing.in/",
  // baseUrl: "http://ec2-18-117-210-203.us-east-2.compute.amazonaws.com",
  // baseUrl: "https://dev-api.salamislicing.in/",
  guestId: "9fcbb7cb-5354-489d-b358-d4e2bf386ff3",
};

export default AppConfig;
