import React, { useContext, useMemo, useState } from "react";
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
import { useQuery } from "@apollo/client";
import { GET_LOCAL_CART } from "../../../Apollo/cache";
import { nanoid } from "nanoid";
import BigNumber from "bignumber.js";
import NavigationService from "../../../Navigation/NavigationService";
import { useCreateOrder } from "../../../hooks/useCreateOrder";
import { DeliveryOption } from "../../../../generated/graphql";
import { ComeFromType } from "../../../Utils/utils";
import { t } from "react-native-tailwindcss";
import useOrderInfo from "../../../hooks/useOrderInfo";
import { Page_CheckoutGuestOrderDetail } from "../../../Navigation/const";
import { isEmpty } from "lodash";
import useAlert from "../../../hooks/useAlert";
export default function DetailFooter({ product, currentVariant, pickUp }) {
  const { dispatch } = useContext(AlertContext);
  const { realm } = useRealm();
  const {
    data: { localCartVar },
  } = useQuery(GET_LOCAL_CART);
  const { orderInfo, updateMoneyInfo } = useOrderInfo();
  useAlert();

  const info = realm
    .objects("ShoppingCart")
    .filtered("product.listingId == $0", product.listingId)
    .filtered("addressId == $0", localCartVar.deliverAddress)
    .filtered("variant.variantId == $0", currentVariant?.variantId)[0];
  // const [cartInfo, setCartInfo] = useState(info);
  const initQuanlity =
    product.minQtyPerCart !== null ? product.minQtyPerCart : 1;
  //
  const [quantity, setQuantity] = useState(info?.quantity || initQuanlity);
  const { createOrder } = useCreateOrder();

  const buyNow = () => {
    if (
      pickUp ||
      product.deliveryOption === DeliveryOption.CourierDelivery ||
      product.deliveryOption === DeliveryOption.SellerDirectDelivery
    ) {
      toggleConfirmOrderSheet();
    } else {
      PubSub.publish("show-pick-up-sheet", toggleConfirmOrderSheet);
    }
  };

  const toggleConfirmOrderSheet = async () => {
    const item = {
      listingId: product.listingId,
      quantity,
      variantId: currentVariant.variantId,
    };
    const newInfo = {
      ...orderInfo,
      itemsForRequest: [item],
      allItems: [{ ...item, productDetails: product, variant: currentVariant }],
      comeFromType: ComeFromType.Buynow,
      availbleList: [],
    };
    updateMoneyInfo(newInfo);
    if (!global.access_token) {
      NavigationService.navigate(Page_CheckoutGuestOrderDetail);
      return;
    } else {
      createOrder({
        data: undefined,
        itemsForRequest: [item],
        allItems: [
          { ...item, productDetails: product, variant: currentVariant },
        ],
        comeFromType: ComeFromType.Buynow,
        availbleList: [],
      });
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

  const maximumValue = useMemo(() => {
    return currentVariant?.itemsAvailable - currentVariant?.itemsSold > 1
      ? currentVariant?.itemsAvailable - currentVariant?.itemsSold
      : 100;
  }, [currentVariant]);
  const disabled = useMemo(() => {
    return (
      currentVariant?.itemsAvailable - currentVariant?.itemsSold <
        initQuanlity || maximumValue < initQuanlity
    );
  }, [currentVariant, initQuanlity, maximumValue]);
  const addToCart = () => {
    const shoppingCartId = nanoid();

    // if (isEmpty(currentVariant.defaultVariant)) {
    //   currentVariant.defaultVariant = false;
    // }

    realm.write(() => {
      const queryItems = realm
        .objects("ShoppingCart")
        .filtered("addressId == $0", localCartVar.deliverAddress)
        .filtered("listingId == $0", product.listingId)
        .filtered(
          "variantId == $0",
          currentVariant ? currentVariant.variantId : ""
        )
        .filtered("quantity > 0")
        .filtered("isDraft == false");

      // Update some properties on the instance.
      // These changes are saved to the realm.
      // queryItem.quantity = quantity;

      if (!isEmpty(queryItems)) {
        const queryItem = queryItems[0];
        let newQuantity = queryItem.quantity + quantity;
        if (
          newQuantity >
          currentVariant?.itemsAvailable - currentVariant?.itemsSold
        ) {
          newQuantity =
            currentVariant?.itemsAvailable - currentVariant?.itemsSold;
        }
        queryItem.quantity = newQuantity;
        queryItem.isDraft = false;
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
  return (
    <SafeAreaView style={styles.footerSafeArea} edges={["bottom"]}>
      <QuantitySelector
        minQtyPerCart={initQuanlity}
        minimumValue={1}
        maximumValue={maximumValue < initQuanlity ? initQuanlity : maximumValue}
        value={quantity}
        onChange={(value) => {
          setQuantity(value);
        }}
      />

      <View style={{ height: vs(15) }} />

      <View style={styles.rowSpaceBetween}>
        <TouchableOpacity
          style={[styles.row, t.mR6]}
          onPress={toggleAddToCartSheet}
          disabled={disabled}
        >
          <Image source={Images.cartMed} style={styles.icCart} />
          <Text
            style={[
              styles.txtBold,
              { color: Colors.primary },
              disabled ? t.opacity50 : t.opacity100,
            ]}
          >
            ADD TO CART
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={buyNow}
          style={[
            styles.btnBuyNow,
            t.flexGrow,
            t.justifyAround,
            disabled ? t.opacity50 : t.opacity100,
          ]}
          disabled={disabled}
        >
          <Text style={[styles.txtBold, { color: Colors.white }]}>
            {disabled
              ? `${product?.noOfOrderedItems}/${product?.noOfItemsInStock} sold`
              : "BUY NOW"}
          </Text>

          <View style={styles.priceContainer}>
            <NumberFormat
              thousandSeparator={true}
              prefix={"₹"}
              value={`${new BigNumber(
                quantity * currentVariant.wholeSalePrice
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
