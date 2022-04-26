/**
 * @format
 */
// import "expo-asset";
import { AppRegistry, LogBox } from "react-native";
import App from "./App/Containers/App";
import "react-native-gesture-handler";
// import * as SplashScreen from "expo-splash-screen";
// SplashScreen.hideAsync();
LogBox.ignoreAllLogs();
AppRegistry.registerComponent("apollo", () => App);
