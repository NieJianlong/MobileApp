import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { ScaledSheet, s, vs } from "react-native-size-matters";
import { Fonts, Colors } from "../Themes";

//progress component
function Progress(props) {
  const [active, setActive] = useState(false);

  const {
    maximumValue,
    currentValue,
    //container style
    style,
    barWidth,
    barHeight,
  } = props;

  const percentage = Math.round((currentValue * 100) / maximumValue) + "%";

  return (
    <View
      style={[
        styles.container,
        style,
        { width: barWidth ?? MAX_WIDTH, height: barHeight ?? BAR_HEIGHT },
      ]}
    >
      <View
        style={[
          styles.bar,
          { width: percentage, height: barHeight ?? BAR_HEIGHT },
        ]}
      />
    </View>
  );
}

const MAX_WIDTH = s(90);
const BAR_HEIGHT = vs(8);

const styles = ScaledSheet.create({
  container: {
    width: MAX_WIDTH,
    height: BAR_HEIGHT,
    borderRadius: "3@vs",
    backgroundColor: Colors.grey20,
    flexDirection: "row",
  },
  bar: {
    position: "absolute",
    left: 0,
    top: 0,
    height: BAR_HEIGHT,
    borderRadius: "3@vs",
    backgroundColor: Colors.secondary00,
  },
});

export default Progress;
