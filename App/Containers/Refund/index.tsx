import React, { useState } from "react";
import { View, Text, SafeAreaView, StatusBar } from "react-native";
import AppConfig from "../../Config/AppConfig";
import { s, ScaledSheet } from "react-native-size-matters";
import fonts from "../../Themes/Fonts";
import colors from "../../Themes/Colors";
import { AppBar, Button } from "../../Components";
import NavigationService from "../../Navigation/NavigationService";
import { useRoute } from "@react-navigation/native";
import {
  DeliveryOption,
  useSubmitOrderReturnRequestMutation,
} from "../../../generated/graphql";

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
  const { params } = useRoute();
  // const [refundMethod, setRefundMethod] = useState<RefundMethod>(
  //   RefundMethod.SalamiCredit
  // );

  // const [cancelOrder] = useCancelOrderItemMutation({
  //   variables: {
  //     request: {
  //       ...lodash.omit(params, "cancel"),
  //       refundMethod: refundMethod,
  //     },
  //   },
  //   context: {
  //     headers: {
  //       isPrivate: true,
  //     },
  //   },
  //   onCompleted: () => {
  //     NavigationService.navigate("CancelOrderCompletedScreen");
  //   },
  // });
  const [submitOrderReturnRequest] = useSubmitOrderReturnRequestMutation({
    onCompleted: (res) => {
      if (params?.data?.deliveryOption === DeliveryOption.CourierDelivery) {
        NavigationService.navigate("ReturnInformation");
      }
      if (
        params?.data?.deliveryOption === DeliveryOption.CollectionPointPickup ||
        params?.data?.deliveryOption === DeliveryOption.SellerLocationPickup
      ) {
        NavigationService.navigate("ReturnInformation");
      }
    },
    context: {
      headers: {
        isPrivate: true,
      },
    },
  });
  const submit = () => {
    submitOrderReturnRequest({
      variables: {
        request: {
          buyerId: global.buyerId,
          orderItemId: params?.data?.orderItemId,
          quantity: params?.data?.quantity,
          returnOption: params?.returnOption,
          message: params?.message,
          returnReasonPolicyId: params?.returnReasonPolicyId,
        },
      },
    });
  };
  // NavigationService.navigate("ReturnProductStep2Screen", {
  //   ...params,
  //   refundMethod,
  // })
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
        {/* <View style={{ paddingHorizontal: AppConfig.paddingHorizontal }}>
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
        </View> */}
        {/* <View style={{ paddingHorizontal: AppConfig.paddingHorizontal }}>
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
        </View> */}
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
              submit();
            }}
            color={colors.primary}
            text={"CONTINUE"}
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
