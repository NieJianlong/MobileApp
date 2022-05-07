import React from "react";
import { Image, TouchableOpacity, ViewStyle } from "react-native";
import { t } from "react-native-tailwindcss";

import NavigationService from "../Navigation/NavigationService";
import { Colors, Images } from "../Themes";

interface NavigationLeftButtonProps {
  onPress?: () => void;
  style?: ViewStyle;
  leftColor?: string;
}

export default function NavigationLeftButton({
  onPress,
  style,
  leftColor,
}: NavigationLeftButtonProps): React.ReactElement {
  return (
    <TouchableOpacity
      style={style}
      onPress={() => (onPress ? onPress() : NavigationService.goBack())}
    >
      <Image
        style={[{ width: 36, height: 36, tintColor: Colors.grey60 }, t.mL4]}
        source={Images.arrow_left}
      />
    </TouchableOpacity>
  );
}
