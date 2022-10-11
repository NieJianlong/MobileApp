import React from "react";
import { Image, Text, View } from "react-native";
import { DeliveryOption } from "../../../../generated/graphql";
import { Images } from "../../../Themes";
import styles from "../styles";

function CloseDate({ product }) {
  return (
    <View>
      <Text style={styles.heading6Regular}>
        {product.deliveryOption === DeliveryOption.SellerDirectDelivery
          ? "Delivery Date:"
          : "Order closes on:"}
      </Text>
      {product.showcase && (
        <Text style={[styles.heading6Regular, t.bgGray500]}></Text>
      )}
      {!product.showcase && !product.missed && (
        <Text style={styles.heading6Regular}>
          {product.deliveryOption === DeliveryOption.SellerDirectDelivery
            ? product.announcementDeliveryDate
            : product.openUntil}
        </Text>
      )}
      {!product.showcase && product.missed && (
        <Text style={styles.heading6Regular}>You have missed</Text>
      )}
    </View>
  );
}

export default CloseDate;
