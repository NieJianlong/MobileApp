import React, { useState, useMemo } from "react";
import { View, ScrollView, SafeAreaView, StatusBar } from "react-native";
import AppConfig from "../../Config/AppConfig";
import { vs } from "react-native-size-matters";
import colors from "../../Themes/Colors";
import { AppBar, Button } from "../../Components";
import CartItem from "./Cartitem";
import metrics from "../../Themes/Metrics";
import BottomSummary from "./Summary";
import DeliverInfo from "./DeliverInfo";
import NavigationService from "../../Navigation/NavigationService";
import { useRoute } from "@react-navigation/native";
import BigNumber from "bignumber.js";
import { useCreateOrder } from "../../hooks/order";
//orderStatus：1,completed
function CheckoutResume(props) {
  const { params } = useRoute();
  const { createOrderFromCart, order } = useCreateOrder();
  const { orderStatus, data } = params;
  const money = useMemo(() => {
    let currentBilling = 0;
    let originalBilling = 0;
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      if (element.variant) {
        originalBilling =
          originalBilling + element.variant.retailPrice * element.quantity;
        currentBilling =
          currentBilling + element.variant.wholeSalePrice * element.quantity;
      } else {
        originalBilling =
          originalBilling + element.product.retailPrice * element.quantity;
        currentBilling =
          currentBilling + element.product.wholeSalePrice * element.quantity;
      }
    }
    const total = new BigNumber(currentBilling).toFixed(2);
    const saving = new BigNumber(originalBilling - currentBilling).toFixed(2);
    return {
      total: total,
      saving: saving,
      percent: BigNumber(saving).dividedBy(total).multipliedBy(100).toFixed(2),
    };
  }, [data]);

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
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <SafeAreaView
        style={{ flex: 1 }}
        edges={["top", "right", "left", "bottom"]}
      >
        <AppBar
          title={orderStatus === 1 ? "Order 782788" : "Review your details"}
        />
        <View style={{ flex: 1 }}>
          <ScrollView
            style={{
              paddingHorizontal: AppConfig.paddingHorizontal,
            }}
            contentContainerStyle={{ paddingBottom: 60 }}
          >
            <DeliverInfo orderStatus={orderStatus} />
            <View>
              {data.map((item, index) => {
                console.log("Itemm", item);
                return (
                  <CartItem
                    key={index.toString()}
                    product={item}
                    availble={true}
                  />
                );
              })}
            </View>

            <BottomSummary
              orderStatus={orderStatus}
              subTotal={money.total}
              saving={money.saving}
            />
          </ScrollView>
        </View>
      </SafeAreaView>
      {orderStatus != 1 && (
        <SafeAreaView
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          <View
            style={{
              height: vs(80),
              width: "100%",
              backgroundColor: colors.white,
              paddingHorizontal: AppConfig.paddingHorizontal,
              paddingTop: vs(15),
            }}
          >
            <Button
              onPress={() => {
                createOrderFromCart();
               // NavigationService.navigate("CheckoutPaymentCompletedScreen");
              }}
              text={"PROCEED"}
            />
          </View>
        </SafeAreaView>
      )}
    </View>
  );
}

export default CheckoutResume;
