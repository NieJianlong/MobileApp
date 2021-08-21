import React, { useCallback, useContext, useState } from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { vs } from "react-native-size-matters";
import NumberFormat from "react-number-format";
import { QuantitySelector } from "../../../Components";

import { Images, Colors } from "../../../Themes";
import styles from "./styles";
import { AlertContext } from "../../Root/GlobalContext";
import ConfirmOrderSheetContent from "./SheetContent/ConfirmOrderSheetContent";
import AddToCartSheetContent from "./SheetContent/AddToCartSheetContent";
import Realm from "realm";
import { RealmConnector } from "../../../db/connector";
import "react-native-get-random-values";
import { nanoid } from "nanoid";

export default function DetailFooter({ product }) {
  const { dispatch } = useContext(AlertContext);

  //hold the quantity of product
  const [quantity, setQuantity] = useState(1);
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
    Realm.open(RealmConnector).then((realm) => {
      realm.write(() => {
        realm.create("ShoppingCart", {
          id: nanoid(),
          product: product,
          quantity: quantity,
          created: new Date(),
          updated: new Date(),
        });
      });
      const tasks = realm.objects("ShoppingCart");
      console.log(
        `The lists of tasks are: ${JSON.stringify(tasks.map((task) => task))}`
      );
    });
    dispatch({
      type: "changSheetState",
      payload: {
        showSheet: true,
        height: 290,
        children: () => <AddToCartSheetContent />,
        sheetTitle: "Confirm your Order",
      },
    });
  }, [dispatch]);
  return (
    <SafeAreaView style={styles.footerSafeArea} edges={["bottom"]}>
      <QuantitySelector
        minimumValue={1}
        maximumValue={100}
        value={quantity}
        onChange={(value) => setQuantity(value)}
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
