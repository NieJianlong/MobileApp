import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { t } from "react-native-tailwindcss";
import Share from "react-native-share";
import { shareOptions } from "../../Explore/Components/ShareOptionList";

function index() {
  return (
    <TouchableOpacity
      onPress={() => {
        Share.open(shareOptions);
      }}
    >
      <View style={[t.p3, t.pY4, t.justifyBetween, t.flexRow, t.itemsCenter]}>
        <Text>Share code on WhatsApp</Text>
        <Image
          style={[t.w10, t.h10]}
          source={require("../../../Images/whatsappgreen.png")}
        />
      </View>
    </TouchableOpacity>
  );
}

export default index;
