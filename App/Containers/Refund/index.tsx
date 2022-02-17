import React, { useState } from "react";
import { View, Text, SafeAreaView, StatusBar, FlatList } from "react-native";
import AppConfig from "../../Config/AppConfig";
import { vs, s, ScaledSheet } from "react-native-size-matters";
import fonts from "../../Themes/Fonts";
import colors from "../../Themes/Colors";
import { AppBar, Button } from "../../Components";
import NavigationService from "../../Navigation/NavigationService";
import CheckBox from "../AskForReplacement/CheckBox";
import { useRoute } from "@react-navigation/native";
import {
  RefundMethod,
  useCancelOrderItemMutation,
} from "../../../generated/graphql";
import lodash from "lodash";

const countries = [
  {
    label: "Salami Credit",
    sublabel: "",
    extra: "FASTER",
  },
  {
    label: "Mastercard **********6756",
    sublabel: "",
    extra: "",
  },
];

function Refund(props) {
  const [selectValue, setSelectValue] = useState(countries[0]);
  const { params } = useRoute();
  const { cancel } = params;
  const [refundMethod, setRefundMethod] = useState<RefundMethod>(
    RefundMethod.SalamiCredit
  );
  const [cancelOrder] = useCancelOrderItemMutation({
    variables: {
      request: {
        ...lodash.omit(params, "cancel"),
        refundMethod: refundMethod,
      },
    },
    context: {
      headers: {
        isPrivate: true,
      },
    },
    onCompleted: () => {
      NavigationService.navigate("CancelOrderCompletedScreen");
    },
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <StatusBar barStyle="dark-content" />
      <SafeAreaView
        style={styles.safeArea}
        edges={["top", "right", "left", "bottom"]}
      >
        <AppBar />
        <View style={{ paddingHorizontal: AppConfig.paddingHorizontal }}>
          <Text
            style={{
              fontSize: s(24),
              fontFamily: fonts.primary,
              color: colors.black,
              fontWeight: "600",
            }}
          >
            Where do you want to receive your refund?
          </Text>
        </View>
        <View style={{ paddingHorizontal: AppConfig.paddingHorizontal }}>
          <View style={{ height: vs(12) }} />
          <CheckBox
            defaultValue={refundMethod === RefundMethod.SalamiCredit}
            onSwitch={(t) => {
              setRefundMethod(RefundMethod.SalamiCredit);
            }}
            label="Salami Credit"
            sublabel=""
            extra="FASTER"
          />
        </View>
        <View style={{ paddingHorizontal: AppConfig.paddingHorizontal }}>
          <View style={{ height: vs(12) }} />
          <CheckBox
            defaultValue={refundMethod === RefundMethod.PaymentGateway}
            onSwitch={(t) => {
              setRefundMethod(RefundMethod.PaymentGateway);
            }}
            label="Mastercard **********6756"
            sublabel=""
            extra="FASTER"
          />
        </View>
      </SafeAreaView>
      <SafeAreaView
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <View style={{ paddingHorizontal: AppConfig.paddingHorizontal }}>
          <Button
            onPress={() => {
              cancel
                ? cancelOrder()
                : NavigationService.navigate("ReturnProductStep2Screen", {
                    ...params,
                    refundMethod,
                  });
            }}
            color={colors.primary}
            text={cancel ? "CANCEL ORDER" : "CONTINUE"}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

export default Refund;
const styles = ScaledSheet.create({
  title: {
    fontFamily: fonts.primary,
    fontSize: "16@s",
    color: colors.black,
    fontWeight: "600",
  },
});
