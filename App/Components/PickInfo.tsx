import React from "react";
import { Image, Text, View } from "react-native";
import { t } from "react-native-tailwindcss";
// {`${
//     data?.pickupAddress?.houseNumber ?? ""
//   }${data?.pickupAddress?.flat ?? ""}${
//     data?.pickupAddress?.villageArea ?? ""
//   }${data?.pickupAddress?.townCity}${
//     data?.pickupAddress?.provinceState
//   }${data?.pickupAddress?.country} ${
//     data?.pickupAddress?.pinCode ?? ""
//   }`}
function PickInfo() {
  return (
    <View style={[t.p4]}>
      <View style={[t.bgWhite, t.roundedLg, t.p3]}>
        <View style={[t.flexRow, t.itemsCenter]}>
          <Image style={[t.w4, t.h4]} source={require("../Images/user.png")} />
          <Text style={[t.fontBold, t.mL2]}>Contact Person</Text>
        </View>
        <Text style={[t.textGray500, t.mT2]}>John Smith</Text>
      </View>
      <View style={[t.bgWhite, t.roundedLg, t.p3, t.mT4]}>
        <View style={[t.flexRow, t.itemsCenter]}>
          <Image
            style={[t.w6, t.h6]}
            source={require("../Images/usercenter/ubiling.png")}
          />
          <Text style={[t.fontBold, t.mL1]}>Seller Location</Text>
        </View>
        <Text style={[t.textGray500, t.mT2]}>kjkjkjk</Text>
      </View>
      <View style={[t.bgWhite, t.roundedLg, t.p3, t.mT4]}>
        <View style={[t.flexRow, t.itemsCenter]}>
          <Image style={[t.w4, t.h4]} source={require("../Images/time2.png")} />
          <Text style={[t.fontBold, t.mL2]}>Opening Times</Text>
        </View>
        <Text style={[t.textGray500, t.mT2]}>Mon-Fri 9:00-17:00</Text>
      </View>
    </View>
  );
}

export default PickInfo;
