import React from "react";
import { View, ScrollView, Image, SafeAreaView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { s } from "react-native-size-matters";
import NavigationService from "../../Navigation/NavigationService";
import colors from "../../Themes/Colors";
import images from "../../Themes/Images";
import TextTip from "../../Components/EmptyReminder";
import Inform from "./Inform";

function CheckoutPaymentCompleted(props) {
  const data = {
    textTip: "Your order has been \n processed successfully",
    subTextTip:
      "Remember that you will not receive your order until the number of people required to make the purchase has been reached.",
    needButton: false,
    btnMsg: "",
    onPress: "",
  };
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: "white",
      }}
    >
      <SafeAreaView>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <View style={{ width: 30, height: 30 }} />
          <Image
            style={{ width: s(136), height: s(32), resizeMode: "contain" }}
            source={images.shopcartLogoImage}
          />
          <TouchableOpacity
            onPress={() => {
              NavigationService.navigate("ExploreScreen");
            }}
          >
            <Image
              style={{ width: s(30), height: s(30), resizeMode: "contain" }}
              source={images.crossMedium}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <ScrollView>
        <View style={{ height: s(230), backgroundColor: "transparent" }}>
          <TextTip {...data} />
        </View>
        <Inform />
      </ScrollView>
    </View>
  );
}

export default CheckoutPaymentCompleted;
