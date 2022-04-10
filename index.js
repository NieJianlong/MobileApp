/**
 * @format
 */
// import "expo-asset";
import { AppRegistry, LogBox } from "react-native";
import App from "./App/Containers/App";
import "react-native-gesture-handler";

LogBox.ignoreAllLogs();
AppRegistry.registerComponent("apollo", () => App);
