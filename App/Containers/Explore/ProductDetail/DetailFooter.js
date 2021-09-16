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
import ConfirmOrderSheetContent from "./SheetContent/ConfirmOrderSheetContent";
import "react-native-get-random-values";
import useRealm from "../../../hooks/useRealm";
import colors from "../../../Themes/Colors";
import PubSub from "pubsub-js";
import { useQuery } from "@apollo/client";
import { GET_LOCAL_CART } from "../../../Apollo/cache";
import { nanoid } from "nanoid";

export default function DetailFooter({ product }) {
  const { dispatch } = useContext(AlertContext);
  console.log("product====================================");
  console.log(product);
  console.log("====================================");
  const { realm } = useRealm();

  const {
    data: { localCartVar },
  } = useQuery(GET_LOCAL_CART);
  const currentVariant = useMemo(() => {
    if (product.listingVariants) {
      const variant = product.listingVariants.find(
        (item) => item.defaultVariant === true
      );
      return variant;
    } else {
      return null;
    }
  }, [product]);
  const info = realm
    .objects("ShoppingCart")
    .filtered("product.productId == $0", product.productId)
    .filtered("addressId == $0", localCartVar.deliverAddress)
    .filtered("variant.variantId == $0", currentVariant?.variantId)[0];
  const [cartInfo, setCartInfo] = useState(info);
  const [quantity, setQuantity] = useState(info?.quantity || 1);
  const toggleConfirmOrderSheet = useCallback(() => {
    dispatch({
      type: "changSheetState",
      payload: {
        showSheet: true,
        height: 310,
        children: () => <ConfirmOrderSheetContent />,
        sheetTitle: "Confirm your Order",
      },
    });
  }, [dispatch]);
  const toggleAddToCartSheet = useCallback(() => {
    const shoppingCartId = nanoid();
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
        },
      });
      PubSub.publish("refresh-shoppingcart");
    });
    // const tasks = realm.objects("ShoppingCart");
    // console.log(
    //   `The lists of tasks are: ${JSON.stringify(tasks.map((task) => task))}`
    // );

    // dispatch({
    //   type: "changSheetState",
    //   payload: {
    //     showSheet: true,
    //     height: 290,
    //     children: () => <AddToCartSheetContent />,
    //     sheetTitle: "Confirm your Order",
    //   },
    // });
  }, [cartInfo, product, quantity, realm]);
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
        <TouchableOpacity style={styles.row} onPress={toggleAddToCartSheet}>
          <Image source={Images.cartMed} style={styles.icCart} />
          <Text style={[styles.txtBold, { color: Colors.primary }]}>
            ADD TO CART
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={toggleConfirmOrderSheet}
          style={styles.btnBuyNow}
        >
          <Text style={[styles.txtBold, { color: Colors.white }]}>BUY NOW</Text>

          <View style={styles.priceContainer}>
            <NumberFormat
              thousandSeparator={true}
              prefix={"$"}
              value={quantity * product.wholeSalePrice}
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
