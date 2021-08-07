import React from "react";
import { View, Image, Text } from "react-native";
import { theme } from "react-native-tailwindcss";

export default function ColorItem() {
  return (
    <View style={[{ width: 150 }, theme.h52, theme.flexCol, theme.itemsCenter]}>
      <Image
        source={{
          uri:
            "https://m.media-amazon.com/images/I/318kdsRsWqS._QL92_SH45_SX120_SY110_CR,0,0,120,110_.jpg",
        }}
        style={[theme.wFull, theme.h48]}
        resizeMode="contain"
      />
      <Text>iijjjj</Text>
      <Text>jjjjj</Text>
    </View>
  );
}
