import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { vs, s, ScaledSheet } from "react-native-size-matters";
import colors from "../../../Themes/Colors";

import fonts from "../../../Themes/Fonts";

import { ApplicationStyles } from "../../../Themes";
import useOrderInfo from "../../../hooks/useOrderInfo";

function index(props) {
  const { orderInfo } = useOrderInfo();

  const [summaries, setSummaries] = useState([
    {
      title: "Subtotal product(s)",
      value: orderInfo.currentBilling,
      type: "normal",
    },
    {
      title: "Delivery",
      value: orderInfo.deliveryFess,
      type: "normal",
    },
    {
      title: "Total savings",
      value: `${orderInfo.originalBilling - orderInfo.currentBilling}`,
      type: "normal",
    },
    {
      title: "Total",
      value: orderInfo.currentBilling + orderInfo.deliveryFess,
      type: "bold",
    },
  ]);
  debugger;
  // useEffect(() => {
  //   if (promoStatus == "success") {
  //     setPromoCode("10% Discount applied successfully!");
  //   }
  // }, [promoStatus]);
  return (
    <View
      style={{
        paddingBottom: 50,
        paddingTop: 25,
      }}
    >
      <Text style={ApplicationStyles.screen.heading4Bold}>Order Summary</Text>

      {summaries.map((item, index) => {
        return (
          <View
            key={`footer${index}`}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <Text
              style={[
                styles.title,
                {
                  color: item.type == "normal" ? colors.grey80 : colors.black,
                  fontWeight: item.type == "normal" ? "normal" : "bold",
                },
              ]}
            >
              {item.title}
            </Text>
            <Text
              style={[
                styles.title,
                {
                  color: item.type == "normal" ? colors.grey80 : colors.black,
                  fontWeight: item.type == "normal" ? "normal" : "bold",
                },
              ]}
            >
              ₹{item.value}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

export default index;
const styles = ScaledSheet.create({
  title: {
    fontFamily: fonts.primary,
    fontSize: "16@s",
    color: colors.black,
    fontWeight: "600",
  },
  promoCode: {
    marginTop: vs(15),
    height: vs(48),
    borderRadius: s(40),
    borderWidth: 1,
    borderColor: "#DDDFE3",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  promoCodeFailure: {
    marginTop: vs(15),
    height: vs(48),
    borderRadius: s(40),
    borderWidth: 1,
    borderColor: "#E42526",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  promoInput: {
    height: vs(48),
    paddingLeft: s(15),
    fontSize: s(14),
    color: colors.black,
    minWidth: s(200),
  },
  promoInputSuccess: {
    height: vs(48),
    paddingLeft: s(15),
    fontSize: s(14),
    color: colors.white,
    minWidth: s(200),
  },
  promoInputFailure: {
    height: vs(48),
    paddingLeft: s(15),
    fontSize: s(14),
    color: "#E42526",
    minWidth: s(200),
  },
  promoSuccess: {
    marginTop: vs(15),
    height: vs(48),
    borderRadius: s(40),
    // borderWidth: 1,
    // borderColor: '#DDDFE3',
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.success,
  },
});
