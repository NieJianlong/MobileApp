import React, { useState } from "react";
import { Text, View, TouchableWithoutFeedback } from "react-native";
import { ScaledSheet, s, vs } from "react-native-size-matters";
import { Fonts, Colors } from "../Themes";

//component show gray background when bottom sheet apear
function BottomSheetBackground(props) {
  const {
    //whether to be visible
    visible,
    //animation controller
    controller,
    //onPRess callback
    onPress,
  } = props;

  if (visible) {
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            alignItems: "center",
            backgroundColor: "rgb(0,0,0,0.5)",
          }}
        />
      </TouchableWithoutFeedback>
    );
  } else return null;
}

const MAX_WIDTH = s(90);
const BAR_HEIGHT = vs(8);

const styles = ScaledSheet.create({
  container: {
    width: MAX_WIDTH,
    height: BAR_HEIGHT,
    borderRadius: "3@vs",
    backgroundColor: Colors.secondary01,
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

export default BottomSheetBackground;
