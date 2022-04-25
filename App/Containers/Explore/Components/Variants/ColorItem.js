import BigNumber from "bignumber.js";
import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { t } from "react-native-tailwindcss";

export default function ColorItem({ item, currentVariant, onChangeVariant }) {
  const selectedItem = currentVariant.options.find((jtem) => {
    return jtem.value === item.value;
  });
  const selected = selectedItem?.value === item.value;
  return (
    <TouchableOpacity
      onPress={() => {
        if (selected) {
          return;
        }
        onChangeVariant(item);
      }}
    >
      <View
        style={[
          t.w40,
          t.flexCol,
          t.itemsCenter,
          t.mR2,
          t.border,
          t.rounded,
          selected ? t.borderPrimary : t.borderGray300,
        ]}
      >
        <Image
          source={{ uri: item.fullPath }}
          style={[t.wFull, t.h32]}
          resizeMode="contain"
        />
        <View style={[t.w32]}>
          <Text style={[t.fontSemibold, t.textLg]}>{item.value}</Text>
          <Text style={selected ? [t.textLg] : [t.textSm]}>
            {selected
              ? `₹${BigNumber(item.wholeSalePrice).toFixed(2)}`
              : "See available"}
          </Text>
          <Text
            style={
              selected ? [t.textSuccess, t.textSm] : [t.fontPrimary, t.textSm]
            }
          >
            {selected ? "In sctock." : "options"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
