import React from "react";
import { View, Image, SafeAreaView } from "react-native";
import { vs } from "react-native-size-matters";
import images from "../../Themes/Images";
import metrics from "../../Themes/Metrics";
import TextTip from "../../Components/EmptyReminder";

import RegisterGuestBuyerToBuyerForm from "../../Components/RegisterGuestBuyerToBuyerForm";

function CheckoutPaymentCompletedGuest() {
  const data = {
    textTip: "Your order has been processed successfully",
    subTextTip:
      "Remember that you will receive your order once the required number of orders is reached",
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
        <View style={{ height: 25 }} />
        <Image
          style={{
            width: metrics.screenWidth,
            height: vs(150),
            resizeMode: "contain",
          }}
          source={images.shopBagimage}
        />
      </SafeAreaView>

      <View style={{ height: vs(200) }}>
        <TextTip {...data} />
      </View>

      <RegisterGuestBuyerToBuyerForm />
    </View>
  );
}

export default CheckoutPaymentCompletedGuest;
