import React, { useState, useMemo } from "react";
import { View, ScrollView, SafeAreaView, StatusBar, Image, Text, TouchableOpacity } from "react-native";
import AppConfig from "../../Config/AppConfig";
import { s, ScaledSheet, vs } from "react-native-size-matters";
import colors from "../../Themes/Colors";
import { AppBar, Button, Switch } from "../../Components";
import CartItem from "./Cartitem";
import BottomSummary from "./Summary";
import DeliverInfo from "./DeliverInfo";
import NavigationService from "../../Navigation/NavigationService";
import { useRoute } from "@react-navigation/native";
import BigNumber from "bignumber.js";
import { useCreateOrder } from "../../hooks/order";
import PaymentOptions from "./PaymentOptions";
import RazorpayCheckout from "react-native-razorpay";
import { useCreateRazorOrder } from "../../hooks/razorOrder";
import { cartOrderVar, razorOrderPaymentVar } from "../../Apollo/cache";
import { useRazorVerifyPayment } from "../../hooks/verifyPayment";
import images from "../../Themes/Images";
import { ApplicationStyles } from "../../Themes";

//orderStatus：1,completed
function CheckoutResume(props) {
  const { params } = useRoute();
  const { createOrderFromCart, order } = useCreateOrder();
  const { razorpayCreateOrder, razorOrder } = useCreateRazorOrder();
  const { razorpayVerifyPaymentSignature, razorVerifyPayment } =
    useRazorVerifyPayment();
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

  const proceedFurther = async () => {
    await createOrderFromCart()
      .then((res) => {
        const order = res?.data?.createOrderFromCart;
        if (res?.data) {
          cartOrderVar({
            orderNumber: order?.orderNumber,
            orderId: order?.orderId,
            amount: order?.subTotal,
          });
          razorpayCreateOrder().then((res) => {
            if (res?.data) {
              const razorId = res?.data?.razorpayCreateOrder?.razorpayOrderId;
              var options = {
                description: "Credits towords consultation",
                image: "https://i.imgur.com/3g7nmJC.png",
                currency: "INR",
                key: "rzp_test_I8X2v4LgupMLv0",
                amount: "50000",
                name: "Acme Corp",
                order_id: razorId, //Replace this with an order_id created using Orders API.
                prefill: {
                  email: "bluestar929@outlook.com",
                  contact: "8616525825013",
                  name: "Gaurav Kumar",
                },
                theme: { color: "#53a20e" },
              };
              RazorpayCheckout.open(options)
                .then((data) => {
                  razorOrderPaymentVar({
                    razorpay_payment_id: data.razorpay_payment_id,
                    razorpay_order_id: data.razorpay_order_id,
                    razorpay_signature: data.razorpay_signature,
                  });
                  razorpayVerifyPaymentSignature();
                  alert(`Success: ${data.razorpay_payment_id}`);

                  NavigationService.navigate("CheckoutPaymentCompletedScreen");
                })
                .catch((error) => {
                  alert(`Error: ${error.code} | ${error.description}`);
                });
            }
          });
        }
        return res?.data;
      })
      .catch((e) => {
        console.log("createOrderFromCart error");
        return e;
      });
  };

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
            contentContainerStyle={{ paddingBottom: 110 }}
          >
            <DeliverInfo orderStatus={orderStatus} />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 20,
              }}
            >
              <Text style={ApplicationStyles.screen.heading4Bold}>
                {orderStatus === 1
                  ? "Order placed on Oct 24, 2020"
                  : "Your order"}
              </Text>
              <TouchableOpacity>
                <Image
                  style={styles.editImage}
                  source={images.userAddressEditImage}
                />
              </TouchableOpacity>
            </View>
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
            <PaymentOptions />
            {orderStatus != 1 && (
              <View>
                <View
                  style={{
                    marginTop: 30,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Image
                    style={{
                      width: s(28),
                      height: s(28),
                      resizeMode: "contain",
                      marginRight: s(10),
                    }}
                    source={images.shopcartInfoImage}
                  />
                  <View>
                    <Text
                      style={[
                        ApplicationStyles.screen.txtRegular,
                        { color: colors.grey80 },
                      ]}
                    >
                      Remember that you will get your product once the
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={[
                          ApplicationStyles.screen.txtRegular,
                          { color: colors.grey80 },
                        ]}
                      >
                        number of slices has been reached
                      </Text>
                      <TouchableOpacity>
                        <Text
                          style={[
                            ApplicationStyles.screen.txtRegular,
                            { color: colors.secondary00, paddingLeft: 6 },
                          ]}
                        >
                          Learn more
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <View style={{ marginTop: 20 }}>
                  <Switch
                    onSwitch={() => {}}
                    label="I accept Privacy Policy and Terms of use"
                  />
                </View>
              </View>
            )}
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
              onPress={async () => {
                await proceedFurther();
              }}
              text={"PROCEED"}
            />
          </View>
        </SafeAreaView>
      )}
    </View>
  );
}

const styles = ScaledSheet.create({
  editImage: {
    width: "24@s",
    height: "24@s",
    marginLeft: "12@s",
    resizeMode: "contain",
  },
});

export default CheckoutResume;
