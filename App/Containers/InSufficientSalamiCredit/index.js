import React, { useContext } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
  SafeAreaView,
  StatusBar,
  FlatList,
} from "react-native";
import AppConfig from "../../Config/AppConfig";
import { vs, s, ScaledSheet } from "react-native-size-matters";
import fonts from "../../Themes/Fonts";
import colors from "../../Themes/Colors";
import { AppBar, Button } from "../../Components";
import NavigationService from "../../Navigation/NavigationService";
import images from "../../Themes/Images";
import { ApplicationStyles } from "../../Themes";
import metrics from "../../Themes/Metrics";
import {
  cartOrderVar,
  GET_LOCAL_CART,
  localBuyNowVar,
  razorOrderPaymentVar,
  userProfileVar,
} from "../../Apollo/cache";
import RazorpayCheckout from "react-native-razorpay";
import { useCreateOrder } from "../../hooks/order";
import { useCreateRazorOrder } from "../../hooks/razorOrder";
import { useRazorVerifyPayment } from "../../hooks/verifyPayment";
import { useQuery, useReactiveVar } from "@apollo/client";
import BigNumber from "bignumber.js";
import { AlertContext } from "../Root/GlobalContext";
import { ComeFromType, usePaymentConfigration } from "../../Utils/utils";

function InSufficientSalamiCredit(props) {
  const params = props?.route?.params;
  const { createOrderFromCart, order } = useCreateOrder();
  const { razorpayCreateOrder, razorOrder } = useCreateRazorOrder();
  const userProfile = useReactiveVar(userProfileVar);
  console.log("userProfile", userProfile);
  const {
    data: { localCartVar },
  } = useQuery(GET_LOCAL_CART);
  const { dispatch } = useContext(AlertContext);
  const { razorpayVerifyPaymentSignature, razorVerifyPayment } =
    useRazorVerifyPayment();
  const getPaymentConfigration = usePaymentConfigration();
  const payments = [
    {
      image: images.userPayMethod2Image,
      onPress: () => {
        NavigationService.navigate("AddCreditScreen", {
          callback: () => {
            NavigationService.navigate("CheckoutResumeScreen", {
              orderStatus: 0,
            });
            // Nav.goBack();
          },
        });
      },
    },
    {
      image: images.userPayMethod1Image,
      onPress: () => {},
    },
    {
      image: images.userPayMethod3Image,
      onPress: () => {},
    },
    {
      image: images.userPayMethod4Image,
      onPress: () => {},
    },
    {
      image: images.userPayMethod5Image,
      onPress: () => {},
    },
  ];

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
            Pay rest of the amount
          </Text>
          <View>
            <View style={[styles.item, { height: vs(64) }]}>
              <View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.itemTitle}>Salami Credit</Text>
                </View>
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.itemSubTitle}>
                      {"₹ " + `${params.walletBalance}`}
                    </Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity>
                <Text
                  style={[
                    ApplicationStyles.screen.subtitle,
                    { color: colors.grey60 },
                  ]}
                >
                  DESELECT
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <Text style={styles.title}>Add a payment</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={ApplicationStyles.screen.heading2Bold}>
                  {"₹ " + `${params.productPrice - params.walletBalance}`}
                </Text>
                <Text
                  style={[
                    ApplicationStyles.screen.subtitle,
                    { marginTop: 10, color: colors.grey60 },
                  ]}
                >
                  left
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              height: vs(80),
              width: "100%",
              paddingHorizontal: AppConfig.paddingHorizontal,
              paddingTop: vs(15),
            }}
          >
            <Button
              onPress={() => {
                dispatch({
                  type: "changLoading",
                  payload: true,
                });
                createOrderFromCart({
                  variables: {
                    cart: {
                      buyerId: userProfile.buyerId,
                      shippingAddressId: localCartVar.deliverAddress,
                      billingDetailsId: userProfile.billingDetailsId,
                      useSalamiWallet: true,
                      cartItems:
                        localBuyNowVar().items.length > 0
                          ? localBuyNowVar().items
                          : localCartVar.items,
                    },
                  },
                  context: {
                    headers: {
                      isPrivate: true,
                    },
                  },
                  onCompleted: (res) => {
                    dispatch({
                      type: "changLoading",
                      payload: false,
                    });

                    const order = res?.createOrderFromCart;
                    if (res?.createOrderFromCart?.orderId) {
                      cartOrderVar({
                        orderNumber: order?.orderNumber,
                        orderId: order?.orderId,
                        amount: order?.subTotal,
                      });
                      razorpayCreateOrder().then((res) => {
                        if (res?.data) {
                          const razorId =
                            res?.data?.razorpayCreateOrder?.razorpayOrderId;
                          getPaymentConfigration(
                            razorId,
                            params.product,
                            ComeFromType.Buynow
                          );
                        }
                      });
                    }
                    return res?.createOrderFromCart;
                  },
                  onError: (res) => {
                    dispatch({
                      type: "changLoading",
                      payload: false,
                    });
                    alert(JSON.stringify(res.message));
                  },
                });
              }}
              text={"Pay"}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

export default InSufficientSalamiCredit;
const styles = ScaledSheet.create({
  title: {
    fontFamily: fonts.primary,
    fontSize: "16@s",
    color: colors.black,
    fontWeight: "600",
  },
  item: {
    marginTop: "15@vs",
    backgroundColor: colors.white,
    borderRadius: "16@s",
    height: "122@vs",
    paddingHorizontal: AppConfig.paddingHorizontal,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 2,
    borderColor: "#409AEF",
  },
  itemTitle: {
    fontSize: "14@s",
    fontFamily: fonts.primary,
    color: colors.black,
    fontWeight: "600",
  },
  itemSubTitle: {
    fontSize: "14@s",
    fontFamily: fonts.primary,
    color: colors.grey80,
  },
  paytypeIcon: {
    width: "26@s",
    height: "26@s",
    resizeMode: "contain",
  },
  icon: {
    width: "20@s",
    height: "20@s",
    marginLeft: "12@s",
    resizeMode: "contain",
  },
  editImage: {
    width: "24@s",
    height: "24@s",
    marginLeft: "12@s",
    resizeMode: "contain",
  },
});
