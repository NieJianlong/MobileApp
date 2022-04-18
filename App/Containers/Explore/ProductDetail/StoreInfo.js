import React from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import { vs } from "react-native-size-matters";
import InView from "react-native-component-inview";
import { StarRating, DescriptionText } from "../../../Components";

import { Colors } from "../../../Themes";
import styles from "./styles";
import NavigationService from "../../../Navigation/NavigationService";
import { useSellerProfileBasicDetailsQuery } from "../../../../generated/graphql";

export default function StoreInfo({ tabIndex, product }) {
  if (!product.seller) {
    return null;
  }
  const { data } = useSellerProfileBasicDetailsQuery({
    context: {
      headers: {
        isPrivate: true,
      },
    },
    variables: { sellerId: product.seller.id },
  });
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
            <Text style={styles.heading5Bold}>
              {data?.sellerProfileBasicDetails?.storeName ?? ""}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() =>
              NavigationService.navigate("SellerStoreScreen", {
                seller: product.seller,
                storeId: product.storeId,
                storeName: data?.sellerProfileBasicDetails?.storeName ?? "",
              })
            }
          >
            <Text style={[styles.heading5Bold, { color: Colors.secondary00 }]}>
              VISIT STORE
            </Text>
          </TouchableOpacity>
        </View>

        <StarRating
          fullMode
          style={{ marginTop: vs(10) }}
          rating={product.seller.usersRating}
          ratingCount={product.seller.ratingCount}
        />

        <DescriptionText
          style={{ marginTop: vs(10) }}
          text={product.seller.description}
        />
      </View>
    </InView>
  );
}
