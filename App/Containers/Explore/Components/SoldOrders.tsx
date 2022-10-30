import React from "react";
import { Image, Text, View } from "react-native";
import { Images } from "../../../Themes";
import styles from "../styles";

function SoldOrders({ product, isPD }) {
  const tx = !isPD ? " sold out of " : "/";
  return (
    <View style={styles.row}>
      <Image source={Images.stock} style={styles.icStock} />
      {!product.missed ? (
        <Text style={styles.txtOrderNumber}>
          {product.noOfOrderedItems < 0 ? 0 : product.noOfOrderedItems}
          {tx}
          {product.noOfItemsInStock}
        </Text>
      ) : (
        <Text style={styles.txtOrderNumber}>
          {product.noOfItemsInStock}
          {tx}
          {product.noOfItemsInStock}
        </Text>
      )}
    </View>
  );
}

export default SoldOrders;
