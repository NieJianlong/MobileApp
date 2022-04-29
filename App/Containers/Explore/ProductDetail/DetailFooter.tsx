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
  userProfileVar,
} from "../../../Apollo/cache";
import { nanoid } from "nanoid";
import BigNumber from "bignumber.js";
import NavigationService from "../../../Navigation/NavigationService";
import { useCreateOrder } from "../../../hooks/order";

import { useRazorVerifyPayment } from "../../../hooks/verifyPayment";
import { useCreateRazorOrder } from "../../../hooks/razorOrder";
import {
  DeliveryOption,
  useGetBuyerSalamiWalletBalanceQuery,
} from "../../../../generated/graphql";

import { ComeFromType, usePaymentConfigration } from "../../../Utils/utils";
import { isEmpty } from "lodash";
import UseBillingDetail from "../../../hooks/useBillingDetail";
export default function DetailFooter({ product, currentVariant, pickUp }) {
  const { dispatch } = useContext(AlertContext);
  const getPaymentConfigration = usePaymentConfigration();
  const { realm } = useRealm();
  const {
    data: { localCartVar },
  } = useQuery(GET_LOCAL_CART);

  const { razorpayCreateOrder } = useCreateRazorOrder();
  const userProfile = useReactiveVar(userProfileVar);
  const { addBilling } = UseBillingDetail();
  const { data } = useGetBuyerSalamiWalletBalanceQuery({
    context: {
      headers: {
        isPrivate: true,
      },
    },
  });

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

  const orderCreate = (type: string, billingDetailsId: string) => {
    const productBuyNow = {
      listingId: product.listingId,
      quantity,
      variantId: currentVariant?.variantId,
    };
    if (type === "InSufficient") {
      NavigationService.navigate("InSufficientSalamiCreditScreen", {
        walletBalance: walletBalance,
        productPrice: new BigNumber(quantity * product.wholeSalePrice).toFixed(
          2
        ),
        product: [productBuyNow],
      });
      return;
    }
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
          billingDetailsId: isEmpty(billingDetailsId)
            ? userProfile.billingDetailsId
            : billingDetailsId,
          useSalamiWallet: true,
          cartItems: [productBuyNow],
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
              from: ComeFromType.Buynow,
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
                  product,
                  ComeFromType.Buynow,
                  order.paymentDetails.balanceToPay
                );
              }
            });
          }
          return res?.createOrderFromCart;
        }
      },
      onError: (res) => {
        dispatch({
          type: "changLoading",
          payload: false,
        });
        // alert(JSON.stringify(res.message));
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

  const toggleConfirmOrderSheet = async () => {
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
        const billingDetailsId = await addBilling();
        if (
          walletBalance >=
          parseFloat(
            new BigNumber(quantity * product.wholeSalePrice).toFixed(2)
          )
        ) {
          orderCreate("sufficient", billingDetailsId ?? "");
        } else if (walletBalance === 0 || walletBalance < 0) {
          orderCreate("zero", billingDetailsId ?? "");
        } else {
          orderCreate("InSufficient", billingDetailsId ?? "");
        }
      }
    }
  };

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
          disabled={
            currentVariant?.itemsSold === currentVariant?.itemsAvailable
          }
        >
          <Image source={Images.cartMed} style={styles.icCart} />
          <Text style={[styles.txtBold, { color: Colors.primary }]}>
            ADD TO CART
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={toggleConfirmOrderSheet}
          style={styles.btnBuyNow}
          disabled={
            currentVariant?.itemsSold === currentVariant?.itemsAvailable
          }
        >
          <Text style={[styles.txtBold, { color: Colors.white }]}>
            {currentVariant?.itemsSold === currentVariant?.itemsAvailable
              ? "you missed product 100/100 sold.."
              : "BUY NOW"}
          </Text>

          <View style={styles.priceContainer}>
            <NumberFormat
              thousandSeparator={true}
              prefix={"₹"}
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
