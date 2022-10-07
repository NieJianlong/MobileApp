import React from "react";
import { View, SafeAreaView } from "react-native";
import colors from "../../Themes/Colors";
import styles from "./styles";

function BaseScreen(props) {
  const { barStyle = "dark-content", barColor = colors.background } = props;
  return <View style={styles.root}>{props.children}</View>;
}

export default BaseScreen;
