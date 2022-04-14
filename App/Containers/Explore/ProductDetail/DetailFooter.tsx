import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { vs } from "react-native-size-matters";
import NumberFormat from "react-number-format";
import { QuantitySelector } from "../../../Components";

import { Images, Colors } from "../../../Themes";
import styles from "./styles";
import { AlertContext } from "../../Root/GlobalContext";
import "react-native-get-random-values";
import useRealm from "../../../hooks/useRealm";
import colors from "../../../Themes/Colors";
import PubSub from "pubsub-js";
import { useQuery, useReactiveVar } from "@apollo/client";
import {
  cartOrderVar,
  GET_LOCAL_CART,
  localBuyNowVar,
  razorOrderPaymentVar,
  userProfileVar,
} from "../../../Apollo/cache";
import { nanoid } from "nanoid";
import BigNumber from "bignumber.js";
import { WALLET_BALANCE } from "../../../hooks/gql";
import NavigationService from "../../../Navigation/NavigationService";
import { useCreateOrder } from "../../../hooks/order";
import RazorpayCheckout from "react-native-razorpay";
import { useRazorVerifyPayment } from "../../../hooks/verifyPayment";
import { useCreateRazorOrder } from "../../../hooks/razorOrder";
import { DeliveryOption } from "../../../../generated/graphql";
import { FIND_BUYER_ADDRESS_BY_ID } from "../../../Apollo/queries/queries_user";
import AddBillingDetail from "../../../hooks/addBillingDetails";
import alert from "../../../Components/Alert";
export default function DetailFooter({ product, currentVariant, pickUp }) {
  const { dispatch } = useContext(AlertContext);
  const { realm } = useRealm();
  const {
    data: { localCartVar },
  } = useQuery(GET_LOCAL_CART);
  const { razorpayVerifyPaymentSignature, razorVerifyPayment } =
    useRazorVerifyPayment();
  const { razorpayCreateOrder, razorOrder } = useCreateRazorOrder();
  const userProfile = useReactiveVar(userProfileVar);
  const { addbillingDetail, addBilling } = AddBillingDetail();
  const { data } = useQuery(WALLET_BALANCE, {
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
  const {
    loading,
    error,
    data: addressdata,
    refetch,
  } = useQuery(FIND_BUYER_ADDRESS_BY_ID, {
    variables: {
      buyerId: global.buyerId,
    },
    context: {
      headers: {
        isPrivate: true,
      },
    },
  });
  console.log("addressdata==========addressdata", addressdata);
  // console.log("product.numberOfItemsAvailable", product.numberOfItemsAvailable);
  // console.log("product", product);
  // console.log("currentVariant", currentVariant);
  // console.log("itemsSold", currentVariant.itemsSold);
  // console.log("itemsSold", currentVariant.itemsAvailable);
  // console.log(
  //   "comparison",
  //   currentVariant.itemsSold === currentVariant.itemsAvailable
  // );

  const info = realm
    .objects("ShoppingCart")
    .filtered("product.listingId == $0", product.listingId)
    .filtered("addressId == $0", localCartVar.deliverAddress)
    .filtered("variant.variantId == $0", currentVariant?.variantId)[0];
  const [cartInfo, setCartInfo] = useState(info);
  const [quantity, setQuantity] = useState(info?.quantity || 1);
  const { createOrderFromCart, order } = useCreateOrder();
  // const [createOrderFromCart, { loading, error, data: dataaa }] =
  //   useMutation(CreateOrderFromCart);

  let walletBalance = parseFloat(
    new BigNumber(
      data?.getBuyerSalamiWalletBalance?.walletBalance +
        data?.getBuyerSalamiWalletBalance?.giftBalance
    ).toFixed(2)
  );
  console.log("walletBalance", walletBalance);
  //const walletBalance = parseFloat(BigNumber(0.5).toFixed(2));

  const orderCreate = (type) => {
    console.log("type", type);
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
        console.log(`Explore useCreateOrder res ${JSON.stringify(res)}`);
        dispatch({
          type: "changLoading",
          payload: false,
        });
        if (type === "sufficient") {
          if (res?.createOrderFromCart?.orderId) {
            localBuyNowVar({
              items: [],
            });
            NavigationService.navigate("OrderPlacedScreen", {
              items: product,
              from: "Buynow",
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
                    razorOrderPaymentVar({
                      razorpay_payment_id: data.razorpay_payment_id,
                      razorpay_order_id: data.razorpay_order_id,
                      razorpay_signature: data.razorpay_signature,
                    });
                    razorpayVerifyPaymentSignature();
                    alert(`Success: ${data.razorpay_payment_id}`);

                    NavigationService.navigate("OrderPlacedScreen", {
                      items: product,
                      from: "Buynow",
                    });
                  })
                  .catch((error) => {
                    alert(`Error: ${error.code} | ${error.description}`);
                  });
              }
            });
          }
          return res?.createOrderFromCart;
        } else if (type === "InSufficient") {
          NavigationService.navigate("InSufficientSalamiCreditScreen", {
            walletBalance: walletBalance,
            productPrice: new BigNumber(
              quantity * product.wholeSalePrice
            ).toFixed(2),
            product: product,
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

  const addToCart = () => {
    const shoppingCartId = nanoid();
    if (!currentVariant.defaultVariant) {
      currentVariant.defaultVariant = false;
    }
    realm.write(() => {
      if (cartInfo) {
        cartInfo.quantity = quantity;
        cartInfo.isDraft = false;
      } else {
        realm.create("ShoppingCart", {
          id: shoppingCartId,
          quantity,
          variantId: currentVariant ? currentVariant.variantId : "",
          variant: currentVariant,
          isDraft: false,
          addressId: localCartVar.deliverAddress,
          productId: product.productId,
          listingId: product.listingId,
          product,
          created: new Date(),
          updated: new Date(),
        });
      }
      dispatch({
        type: "changAlertState",
        payload: {
          visible: true,
          message: "",
          color: colors.success,
          title: "Added to Shopping Cart Success",
          onDismiss: () => {},
        },
      });
      PubSub.publish("refresh-shoppingcart");
    });
  };

  const toggleConfirmOrderSheet = () => {
    if (!global.access_token) {
      NavigationService.navigate("Page_CheckoutAuth", {
        product: {
          listingId: product.listingId,
          quantity,
          variantId: currentVariant.variantId,
        },
        items: product,
        from: "Buynow",
      });
      return;
    } else {
      if (data !== undefined && !isNaN(walletBalance)) {
        addBilling()
          .then((res) => {
            localBuyNowVar({
              items: [],
            });
            if (
              walletBalance >=
              parseFloat(
                BigNumber(quantity * product.wholeSalePrice).toFixed(2)
              )
            ) {
              const productBuyNow = {
                listingId: product.listingId,
                quantity,
                variantId: currentVariant.variantId,
              };
              localBuyNowVar({
                items: [productBuyNow],
              });

              if (localBuyNowVar().items.length > 0) {
                orderCreate("sufficient");
                // await createOrderFromCart()
                //   .then((res) => {
                //     if (res?.data) {
                //       debugger;
                //       // console.log("Response in createOrderBuyNow", res);
                //       localBuyNowVar({
                //         items: [],
                //       });
                //       NavigationService.navigate("OrderPlacedScreen", {
                //         items: product,
                //         from: "Buynow",
                //       });
                //     }
                //   })
                //   .catch((err) => {
                //     console.log("Error in createOrderBuyNow", err);
                //     alert(`Error: ${err.code} | ${err.description}`);
                //   });
              }

              // NavigationService.navigate("OrderPlacedScreen");
            } else if (walletBalance === 0 || walletBalance < 0) {
              // dispatch({
              //   type: "changSheetState",
              //   payload: {
              //     showSheet: true,
              //     height: 310,
              //     children: () => <ConfirmOrderSheetContent />,
              //     sheetTitle: "Confirm your Order",
              //   },
              // });
              const productBuyNow = {
                listingId: product.listingId,
                quantity,
                variantId: currentVariant.variantId,
              };
              localBuyNowVar({
                items: [productBuyNow],
              });
              if (localBuyNowVar().items.length > 0) {
                orderCreate("zero");
              }
            } else {
              const productBuyNow = {
                listingId: product.listingId,
                quantity,
                variantId: currentVariant.variantId,
              };
              localBuyNowVar({
                items: [productBuyNow],
              });
              if (localBuyNowVar().items.length > 0) {
                orderCreate("InSufficient");
              }
            }
          })
          .catch((err) => {
            alert(err.message);
          });
      } else {
        console.log(data !== undefined, !isNaN(walletBalance));
      }
    }
  };
  // const toggleAddToCartSheet = useCallback(() => {
  //   const shoppingCartId = nanoid();
  //   const tasks = realm.objects("ShoppingCart");
  //   if (!currentVariant.defaultVariant) {
  //     currentVariant.defaultVariant = false;
  //   }
  //   realm.write(() => {
  //     if (cartInfo) {
  //       cartInfo.quantity =
  //         tasks.find((task) => task.product.productId === product.productId)
  //           .quantity + 1;
  //       cartInfo.isDraft = false;
  //     } else {
  //       realm.create("ShoppingCart", {
  //         id: shoppingCartId,
  //         quantity,
  //         variantId: currentVariant ? currentVariant.variantId : "",
  //         variant: currentVariant,
  //         isDraft: false,
  //         addressId: localCartVar.deliverAddress,
  //         productId: product.productId,
  //         product,
  //         created: new Date(),
  //         updated: new Date(),
  //       });
  //     }
  //     dispatch({
  //       type: "changAlertState",
  //       payload: {
  //         visible: true,
  //         message: "",
  //         color: colors.success,
  //         title: "Added to Shopping Cart Success",
  //       },
  //     });
  //     PubSub.publish("refresh-shoppingcart");
  //   });
  //
  //   // dispatch({
  //   //   type: "changSheetState",
  //   //   payload: {
  //   //     showSheet: true,
  //   //     height: 290,
  //   //     children: () => <AddToCartSheetContent />,
  //   //     sheetTitle: "Confirm your Order",
  //   //   },
  //   // });
  // }, [
  //   currentVariant,
  //   realm,
  //   cartInfo,
  //   dispatch,
  //   quantity,
  //   localCartVar.deliverAddress,
  //   product,
  // ]);

  const toggleAddToCartSheet = () => {
    if (
      pickUp ||
      product.deliveryOption === DeliveryOption.CourierDelivery ||
      product.deliveryOption === DeliveryOption.SellerDirectDelivery
    ) {
      addToCart();
    } else {
      PubSub.publish("show-pick-up-sheet", addToCart);
    }
  };

  return (
    <SafeAreaView style={styles.footerSafeArea} edges={["bottom"]}>
      <QuantitySelector
        minimumValue={1}
        maximumValue={100}
        value={quantity}
        onChange={(value) => {
          setQuantity(value);
        }}
      />

      <View style={{ height: vs(15) }} />

      <View style={styles.rowSpaceBetween}>
        <TouchableOpacity
          style={styles.row}
          onPress={toggleAddToCartSheet}
          disabled={currentVariant.itemsSold === currentVariant.itemsAvailable}
        >
          <Image source={Images.cartMed} style={styles.icCart} />
          <Text style={[styles.txtBold, { color: Colors.primary }]}>
            ADD TO CART
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={toggleConfirmOrderSheet}
          style={styles.btnBuyNow}
          disabled={currentVariant.itemsSold === currentVariant.itemsAvailable}
        >
          <Text style={[styles.txtBold, { color: Colors.white }]}>
            {currentVariant.itemsSold === currentVariant.itemsAvailable
              ? "you missed product 100/100 sold.."
              : "BUY NOW"}
          </Text>

          <View style={styles.priceContainer}>
            <NumberFormat
              thousandSeparator={true}
              prefix={"$"}
              value={`${new BigNumber(
                quantity * product.wholeSalePrice
              ).toFixed(2)}`}
              displayType={"text"}
              renderText={(text) => (
                <Text style={[styles.txtRegular, { color: Colors.white }]}>
                  {text}
                </Text>
              )}
            />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
