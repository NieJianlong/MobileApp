import React, { useState, useMemo, useContext } from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
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
import { useCreateRazorOrder } from "../../hooks/razorOrder";
import {
  cartOrderVar,
  userProfileVar,
  localCartVar as localCartCache,
  localCartVar,
} from "../../Apollo/cache";
import images from "../../Themes/Images";
import { ApplicationStyles } from "../../Themes";
import { useQuery, useReactiveVar } from "@apollo/client";
import { AlertContext } from "../Root/GlobalContext";
import PubSub from "pubsub-js";
import useRealm from "../../hooks/useRealm";
import AddBillingDetail from "../../hooks/useBillingDetail";
import { ComeFromType, usePaymentConfigration } from "../../Utils/utils";
import {
  DeliveryOption,
  useGetBuyerSalamiWalletBalanceQuery,
} from "../../../generated/graphql";
import { pick } from "lodash";
//orderStatus：1,completed
function CheckoutResume(props) {
  const { params } = useRoute();
  const [on, setOnSwitch] = useState(false);
  const { createOrderFromCart } = useCreateOrder();
  const { razorpayCreateOrder } = useCreateRazorOrder();
  const { addBilling } = AddBillingDetail();
  const getPaymentConfigration = usePaymentConfigration();
  const { realm } = useRealm();
  const userProfile = useReactiveVar(userProfileVar);
  const isAuth = useMemo(() => userProfile.isAuth, [userProfile.isAuth]);

  const { orderStatus, data, availbleList } = params;
  const money = useMemo(() => {
    let currentBilling = 0;
    let originalBilling = 0;
    let deliveryFess = 0;

    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      let itemAvailble = true;
      if (availbleList) {
        const i = availbleList.isListingAvailable[index];
        itemAvailble = i?.isAvailable;
      }
      if (itemAvailble) {
        if (
          element?.product?.deliveryOption === DeliveryOption.CourierDelivery
        ) {
          deliveryFess = element.product.courierShippingFee + deliveryFess;
        }
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
    const total = new BigNumber(currentBilling + deliveryFess).toFixed(2);
    const saving = new BigNumber(originalBilling - currentBilling).toFixed(2);
    return {
      total: total,
      saving: saving,
      percent: BigNumber(saving).dividedBy(total).multipliedBy(100).toFixed(2),
      deliveryFess: deliveryFess,
    };
  }, [data, availbleList]);
  const { data: dataWallet } = useGetBuyerSalamiWalletBalanceQuery({
    context: {
      headers: {
        isPrivate: true,
      },
    },
  });
  const { dispatch } = useContext(AlertContext);
  const localCart = useReactiveVar(localCartVar);
  const [mydatas, setMydatas] = useState(
    realm
      .objects("ShoppingCart")
      .filtered("addressId == $0", localCart.deliverAddress)
      .filtered("quantity > 0")
      .filtered("isDraft == false")
  );
  console.log("mydatas=======", mydatas[0]);
  const walletBalance = BigNumber(
    dataWallet?.getBuyerSalamiWalletBalance?.walletBalance +
      dataWallet?.getBuyerSalamiWalletBalance?.giftBalance
  ).toFixed(2);
  const clearData = () => {
    let index = mydatas.length - 1;
    while (index >= 0) {
      if (mydatas[index]) {
        if (
          mydatas[index].variant.itemsAvailable !==
          mydatas[index].variant.itemsSold
        ) {
          realm.write(() => {
            realm.delete(mydatas[index]);
            PubSub.publish("refresh-shoppingcart");
          });
          console.log("IN if condition");
        } else {
          console.log("IN else condition");
        }
      }
      index--;
    }

    localCartCache({
      items: [],
    });
  };

  const proceedFurther = async (type) => {
    if (!on) {
      alert("Please accept privacy and policy");
      return;
    }

    const finalItems = data?.map((item) => {
      const productItem = mydatas.find(
        (dataItem) => item.variantId === dataItem.variantId
      );
      return {
        photo: productItem.product.photo,
        longName: productItem.product.longName,
      };
    });
    if (type === "InSufficient") {
      NavigationService.navigate("InSufficientSalamiCreditScreen", {
        walletBalance: walletBalance,
        productPrice: parseFloat(money.total).toFixed(2),
        product: finalItems,
      });
      return;
    }
    dispatch({
      type: "changLoading",
      payload: true,
    });
    const billingDetailsId = await addBilling();
    dispatch({
      type: "changLoading",
      payload: false,
    });
    console.log("billingDetailsId pass", billingDetailsId);
    createOrderFromCart({
      variables: {
        cart: {
          buyerId: global.buyerId,
          shippingAddressId: localCart.deliverAddress,
          billingDetailsId: billingDetailsId,
          useSalamiWallet: true,
          cartItems: data?.map((item) =>
            pick(item, ["listingId", "quantity", "variantId"])
          ),
        },
      },
      context: {
        headers: {
          isPrivate: isAuth,
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
              from: ComeFromType.checkout,
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
                getPaymentConfigration(
                  razorId,
                  finalItems,
                  ComeFromType.checkout,
                  order.paymentDetails.balanceToPay
                );
              }
            });
          }
          return res?.createOrderFromCart;
        } else if (type === "InSufficient") {
          NavigationService.navigate("InSufficientSalamiCreditScreen", {
            walletBalance: walletBalance,
            productPrice: parseFloat(money.total).toFixed(2),
            product: finalItems,
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
    return;
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
      <SafeAreaView
        style={{ flex: 1 }}
        edges={["top", "right", "left", "bottom"]}
      >
        <View style={{ flex: 1 }}>
          <ScrollView
            style={{
              paddingHorizontal: AppConfig.paddingHorizontal,
            }}
            contentContainerStyle={{ paddingBottom: 110 }}
          >
            <DeliverInfo
              userProfile={userProfile}
              orderStatus={orderStatus}
              isAuth={isAuth}
              billingAddressDetail={
                isAuth
                  ? localCartVar?.callBackAddress
                  : localCartVar?.billingAddressDetail
              }
            />
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
              <TouchableOpacity
                onPress={() => {
                  NavigationService.goBack();
                }}
              >
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
                if (itemAvailble) {
                  return (
                    <CartItem
                      key={index.toString()}
                      product={item}
                      availble={itemAvailble}
                    />
                  );
                }
              })}
            </View>

            <BottomSummary
              orderStatus={orderStatus}
              subTotal={money.total}
              saving={money.saving}
              deliveryFess={money.deliveryFess}
            />
            {global.access_token && global.access_token !== "" && (
              <PaymentOptions />
            )}
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
                      <TouchableOpacity
                        onPress={() => {
                          props.navigation.navigate("LearnMoreScreen");
                        }}
                      >
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
                    onSwitch={(b) => setOnSwitch(b)}
                    active={on}
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
                if (!global.access_token || global.access_token === "") {
                  proceedFurther("zero");
                } else {
                  console.log("money.total", money.total);
                  console.log(
                    "walletBalance >= parseFloat(money.total).toFixed(2)",
                    walletBalance >= parseFloat(money.total).toFixed(2)
                  );
                  if (!isNaN(walletBalance)) {
                    if (walletBalance >= parseFloat(money.total).toFixed(2)) {
                      proceedFurther("sufficient");
                    } else if (
                      walletBalance === "0.00" ||
                      walletBalance < "0"
                    ) {
                      proceedFurther("zero");
                    } else {
                      proceedFurther("InSufficient");
                    }
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