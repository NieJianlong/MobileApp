import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { ApplicationStyles } from "../Themes";
import colors from "../Themes/Colors";

function RightButton(props) {
  const { title, onPress, disable } = props;
  return (
    <TouchableOpacity
      onPress={() => {
        onPress();
      }}
    >
      <Text
        style={[
          ApplicationStyles.screen.heading5Bold,
          { color: colors.primary, opacity: disable ? 0.5 : 1 },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export default RightButton;
