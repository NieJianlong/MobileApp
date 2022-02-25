import React, { useState } from "react";
import { View } from "react-native";
import { vs } from "react-native-size-matters";

import ColorOptionItem from "../../Components/ColorOptionItem";

export default function ColorSheetContent({ product }) {
  //hold the index of selected color
  const [colorIndex, setColorIndex] = useState(0);
  return (
    <View style={{ flex: 1, justifyContent: "flex-end" }}>
      {product.colors.map((item, index) => (
        <ColorOptionItem
          key={index.toString()}
          defaultValue={colorIndex === index}
          onSwitch={() => setColorIndex(index)}
          label={item.name}
          style={{ marginBottom: vs(16) }}
          available={item.available}
        />
      ))}
    </View>
  );
}
