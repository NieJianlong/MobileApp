import React from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import { vs } from "react-native-size-matters";
import InView from "react-native-component-inview";
import { StarRating, DescriptionText } from "../../../Components";

import { Colors } from "../../../Themes";
import styles from "./styles";
import NavigationService from "../../../Navigation/NavigationService";

export default function StoreInfo({ tabIndex, product }) {
  if (!product.seller) {
    return null;
  }
  return (
    <InView
      onChange={(isVisible) => {
        if (isVisible && tabIndex === 1) {
          //setTabIndex(2)
        }
      }}
    >
      <View style={styles.storeInfoContainer}>
        <View style={styles.rowSpaceBetween}>
          <View style={styles.row}>
            <View style={styles.sellerAvatarContainer}>
              <Image
                source={{ uri: product.seller.avatar }}
                style={styles.sellerAvatar}
              />
            </View>
            <Text style={styles.heading5Bold}>{product.seller.name}</Text>
          </View>

          <TouchableOpacity
            onPress={() => NavigationService.navigate("SellerStoreScreen")}
          >
            <Text style={[styles.heading5Bold, { color: Colors.secondary00 }]}>
              VISIT STORE
            </Text>
          </TouchableOpacity>
        </View>

        <StarRating
          fullMode
          style={{ marginTop: vs(10) }}
          rating={product.seller.rating}
          ratingCount={product.seller.ratingCount}
        />

        <DescriptionText
          style={{ marginTop: vs(10) }}
          text={
            product.seller
              ? product.seller.description
              : "this description is null in data from server,  this should not happen fix required on backend"
          }
        />
      </View>
    </InView>
  );
}
