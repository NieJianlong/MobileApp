import BigNumber from "bignumber.js";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { t } from "react-native-tailwindcss";

export default function SizeItem({
  item,
  currentVariant,
  onChangeVariant,
  product,
}) {
  const selectedItem = currentVariant?.options?.find((jtem) => {
    return jtem.value === item.value;
  });

  const selected = selectedItem?.value === item.value;
  //
  const disabled =
    item?.itemsSold === item?.itemsAvailable ||
    item?.itemsAvailable - item?.itemsSold < product.minSoldQuantity;
  return (
    <TouchableOpacity
      disabled={disabled}
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
          selected ? t.borderPrimary : t.borderGray300,
          t.rounded,
        ]}
      >
        <View
          style={[t.wFull, t.h10, t.bgRed100, t.justifyCenter, t.pX4]}
          resizeMode="contain"
        >
          <Text style={[t.fontSemibold, t.textLg]}>{item.value}</Text>
        </View>
        <View style={[t.w32, t.pY2]}>
          <Text style={selected ? [t.textLg] : [t.textSm]}>
            {selected
              ? `₹${BigNumber(currentVariant.wholeSalePrice).toFixed(2)}`
              : disabled
              ? `${item?.itemsSold}/${item?.itemsAvailable} sold`
              : "See available"}
          </Text>
          <Text
            style={
              selected ? [t.textSuccess, t.textSm] : [t.fontPrimary, t.textSm]
            }
          >
            {selected ? "In Stock." : disabled ? "" : "options"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
