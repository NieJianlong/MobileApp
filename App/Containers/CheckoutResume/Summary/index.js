import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
} from "react-native";
import { vs, s, ScaledSheet } from "react-native-size-matters";
import colors from "../../../Themes/Colors";
import { AppBar, Button, Switch } from "../../../Components";

import fonts from "../../../Themes/Fonts";
import images from "../../../Themes/Images";
import { ApplicationStyles } from "../../../Themes";

function index(props) {
  const { orderStatus, subTotal, saving } = props;
  const [promoCode, setPromoCode] = useState("");
  const [promoStatus, setPromoStatus] = useState("");
  const [summaries, setSummaries] = useState([
    {
      title: "Subtotal product(s)",
      value: subTotal,
      type: "normal",
    },
    {
      title: "Service fee",
      value: "$0",
      type: "normal",
    },
    {
      title: "Delivery",
      value: "$9,98",
      type: "normal",
    },
    {
      title: "Total savings",
      value: `-${saving}`,
      type: "normal",
    },
    {
      title: "Total",
      value: subTotal,
      type: "bold",
    },
  ]);
  useEffect(() => {
    if (promoStatus == "success") {
      setPromoCode("10% Discount applied successfully!");
    }
  }, [promoStatus]);
  return (
    <View
      style={{
        paddingBottom: 50,
        paddingTop: 25,
      }}
    >
      <Text style={ApplicationStyles.screen.heading4Bold}>Order Summary</Text>
      {orderStatus != 1 && (
        <View
          style={
            promoStatus == "success"
              ? styles.promoSuccess
              : promoStatus == "failure"
              ? styles.promoCodeFailure
              : styles.promoCode
          }
        >
          <TextInput
            editable={promoStatus != "success"}
            onFocus={() => {
              setPromoStatus("");
            }}
            style={[
              ApplicationStyles.screen.txtRegular,
              promoStatus == "success"
                ? styles.promoInputSuccess
                : promoStatus == "failure"
                ? styles.promoInputFailure
                : styles.promoInput,
            ]}
            onChangeText={(text) => setPromoCode(text)}
            value={promoCode}
            placeholder="Add a Promo Code"
          />
          {promoCode.length > 0 && promoStatus != "success" && (
            <TouchableOpacity
              onPress={() => {
                if (promoCode == "1111") {
                  setPromoStatus("success");
                } else {
                  setPromoStatus("failure");
                }
              }}
              style={{
                width: s(112),
                backgroundColor: colors.grey80,
                height: vs(48),
                borderRadius: s(40),
              }}
            >
              <Text
                style={[
                  ApplicationStyles.screen.heading4Bold,
                  {
                    color: "white",

                    lineHeight: vs(48),
                    textAlign: "center",
                  },
                ]}
              >
                APPLY
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {promoStatus === "failure" && (
        <Text
          style={
            (ApplicationStyles.screen.heading6Bold,
            {
              margin: s(15),
              marginVertical: s(8),
              color: colors.error,
            })
          }
        >
          Error Message
        </Text>
      )}
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
              {item.value}
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
