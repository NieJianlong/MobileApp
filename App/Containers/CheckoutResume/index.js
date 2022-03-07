import React, { useState, useMemo, useContext } from "react";
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
import { cartOrderVar, GET_LOCAL_CART, localBuyNowVar, razorOrderPaymentVar, userProfileVar, localCartVar as localCartCache} from "../../Apollo/cache";
import { useRazorVerifyPayment } from "../../hooks/verifyPayment";
import images from "../../Themes/Images";
import { ApplicationStyles } from "../../Themes";
import { useQuery, useReactiveVar } from "@apollo/client";
import { CreateOrderFromCart, WALLET_BALANCE } from "../../hooks/gql";
import { AlertContext } from "../Root/GlobalContext";
import PubSub from "pubsub-js";
import useRealm from "../../hooks/useRealm";
//orderStatus：1,completed
function CheckoutResume(props) {
  const { params } = useRoute();
  const { createOrderFromCart, order } = useCreateOrder();
  const { razorpayCreateOrder, razorOrder } = useCreateRazorOrder();
  const {
    data: { localCartVar },
  } = useQuery(GET_LOCAL_CART);

  const { realm } = useRealm();
  const userProfile = useReactiveVar(userProfileVar);
  const { razorpayVerifyPaymentSignature, razorVerifyPayment } =
    useRazorVerifyPayment();
  const { orderStatus, data, availbleList } = params;
  const money = useMemo(() => {
    let currentBilling = 0;
    let originalBilling = 0;
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      let itemAvailble = true;
      if (availbleList) {
        const i = availbleList.isListingAvailable[index];
        itemAvailble = i?.isAvailable;
      }
      if(itemAvailble) {
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
    }
    const total = new BigNumber(currentBilling).toFixed(2);
    const saving = new BigNumber(originalBilling - currentBilling).toFixed(2);
    return {
      total: total,
      saving: saving,
      percent: BigNumber(saving).dividedBy(total).multipliedBy(100).toFixed(2),
    };
  }, [data]);
  const { data: dataWallet} = useQuery(WALLET_BALANCE, {
    context: {
      headers: {
        isPrivate: true,
      },
      onCompleted: (res) => {
        console.log("Completed", res);
      },
      onError: (err) => {},
    },
  });
  console.log("dataWalletdataWalletdataWalletdataWallet", dataWallet)
  const { dispatch } = useContext(AlertContext);
  const [mydatas, setMydatas] = useState(
    realm
      .objects("ShoppingCart")
      .filtered("addressId == $0", localCartVar.deliverAddress)
      .filtered("quantity > 0")
      .filtered("isDraft == false")
  );
  const walletBalance =
   BigNumber(
      dataWallet?.getBuyerSalamiWalletBalance?.walletBalance +
      dataWallet?.getBuyerSalamiWalletBalance?.giftBalance
    ).toFixed(2);
  console.log("walletBalance ===========", walletBalance);
  const clearData = () => {
    let index = mydatas.length - 1;
    while(index >= 0) {
      if(mydatas[index]) {
        if(mydatas[index].variant.itemsAvailable !== mydatas[index].variant.itemsSold){
          realm.write(() => {
            realm.delete(mydatas[index]);
            PubSub.publish("refresh-shoppingcart");
          })
          console.log("IN if condition")
        }else {
          console.log("IN else condition")
        }
      }
      index--;
    }

    localCartCache({
      items: [],
    });
  };

  const proceedFurther = (type) => {
    dispatch({
      type: "changLoading",
      payload: true,
    });
    console.log("localCartVar.items", localCartVar.items);
    console.log("localCartVar======mydatas", mydatas);
     const finalItems =  localCartVar.items.map((item) => {
     const productItem = mydatas.find((dataItem) => item.variantId === dataItem.variantId);
     console.log("product======", productItem);
     return {
       photo: productItem.product.photo,
       longName: productItem.product.longName
     }
   });
   console.log("proceedFurther=====FinalItems", finalItems);

    console.log("type", type);
    console.log("localCartVar", localCartVar);

    createOrderFromCart({
      variables: {
        cart: {
          buyerId: userProfile.buyerId,
          shippingAddressId: localCartVar.deliverAddress,
          billingDetailsId: userProfile.billingDetailsId,
          useSalamiWallet: true,
          cartItems: localCartVar.items
        },
      },
      context: {
        headers: {
          isPrivate: true,
        },
      },
      onCompleted: (res) => {
        console.log(`Explore useCreateOrder res ${JSON.stringify(res)}`);
        dispatch({
          type: "changLoading",
          payload: false,
        });
        if (type === "sufficient") {
          if (res?.createOrderFromCart?.orderId) {
            clearData();
            NavigationService.navigate("OrderPlacedScreen", {
              items: finalItems,
              from: "checkout",
            });
          }
        } else if (type === "zero") {
          const order = res?.createOrderFromCart;
          if (res?.createOrderFromCart?.orderId) {
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
                  name: "Acme Corp",
                  order_id: razorId, //Replace this with an order_id created using Orders API.
                  prefill: {
                    email: userProfile?.email,
                    contact: userProfile?.phoneNumber,
                    name: userProfile?.firstName + userProfile.lastName,
                  },
                  theme: { color: "#53a20e" },
                };
                RazorpayCheckout.open(options)
                  .then((data) => {
                    debugger
                    razorOrderPaymentVar({
                      razorpay_payment_id: data.razorpay_payment_id,
                      razorpay_order_id: data.razorpay_order_id,
                      razorpay_signature: data.razorpay_signature,
                    });
                    razorpayVerifyPaymentSignature();
                   //alert(`Success: ${data.razorpay_payment_id}`);
                    alert("Order Created Successfully")
                    clearData();
                    NavigationService.navigate("OrderPlacedScreen", {
                      items: finalItems,
                      from: "checkout",
                    });
                  })
                  .catch((error) => {
                    debugger
                    alert(`Error: ${error.code} | ${error.description}`);
                  });
              }
            });
          }
          return res?.createOrderFromCart;
        } else if (type === "InSufficient") {
          NavigationService.navigate("InSufficientSalamiCreditScreen", {
            walletBalance: walletBalance,
            productPrice:  parseFloat(money.total).toFixed(2),
            product: finalItems
          });
        }
      },
      onError: (res) => {
        dispatch({
          type: "changLoading",
          payload: false,
        });
        alert(JSON.stringify(res.message));
        console.log(`Explore useCreateOrder onError ${JSON.stringify(res)}`);
      },
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
                let itemAvailble = true;
                if (availbleList) {
                  const i = availbleList.isListingAvailable[index];
                  itemAvailble = i?.isAvailable;
                }
                console.log("Itemm", item);
                if(itemAvailble)
                return (
                  <CartItem
                    key={index.toString()}
                    product={item}
                    availble={itemAvailble}
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
              onPress={() => {
                if (!isNaN(walletBalance)) {
                  if (
                    walletBalance >=
                    parseFloat(money.total).toFixed(2)
                  ) {
                    proceedFurther("sufficient")
                  } else if (walletBalance === 0 || walletBalance < 0) {
                    proceedFurther("zero")
                  } else {
                    proceedFurther("InSufficient")
                  }
                }
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
