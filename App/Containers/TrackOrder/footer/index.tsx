import React from "react";
import { View, Text, Image } from "react-native";
import { t } from "react-native-tailwindcss";

function index() {
  return (
    <View style={[t.p3, t.pY4, t.justifyBetween, t.flexRow, t.itemsCenter]}>
      <Text>Share code on WhatsApp</Text>
      <Image
        style={[t.w10, t.h10]}
        source={require("../../../Images/whatsappgreen.png")}
      />
    </View>
  );
}

export default index;
