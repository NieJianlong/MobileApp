import React from "react";
import { View, TouchableOpacity, Text, FlatList } from "react-native";
import { s, vs } from "react-native-size-matters";
import InView from "react-native-component-inview";
import { Colors } from "../../../Themes";
import styles from "./styles";

import ProductItem from "../Components/ProductItem";

export default function RelatedProducts() {
  return (
    <InView
      onChange={(isVisible) => {
        if (isVisible) {
          //setTabIndex(1)
        }
      }}
    >
      <View style={styles.relatedProductsContainer}>
        <View style={styles.relatedProductsHeader}>
          <Text style={styles.heading3Bold}>Related products</Text>
          <TouchableOpacity>
            <Text style={[styles.heading5Bold, { color: Colors.secondary00 }]}>
              See all
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          contentContainerStyle={styles.relatedProductsList}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={relatedProducs}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <ProductItem product={item} size={"S"} />
          )}
          ItemSeparatorComponent={() => <View style={{ width: s(15) }} />}
        />
      </View>
    </InView>
  );
}
const relatedProducs = [
  {
    name: "iPhone 11",
    picture:
      "https://www.transparentpng.com/thumb/apple-iphone/fORwQR-smartphone-apple-iphone-x-transparent-background.png",
    rating: 3.5,
    ratingCount: 124,
    retailPrice: 2345,
    wholesalePrice: 1542,
    orderClose: "22/12/2020",
    inStock: 100,
    orderCount: 24,
  },
  {
    name: "iPhone 11",
    picture:
      "https://www.transparentpng.com/thumb/apple-iphone/fORwQR-smartphone-apple-iphone-x-transparent-background.png",
    rating: 3.0,
    ratingCount: 124,
    retailPrice: 2345,
    wholesalePrice: 1542,
    orderClose: "22/12/2020",
    inStock: 100,
    orderCount: 24,
  },
  {
    name: "iPhone 11",
    picture:
      "https://www.transparentpng.com/thumb/apple-iphone/fORwQR-smartphone-apple-iphone-x-transparent-background.png",
    rating: 3.0,
    ratingCount: 124,
    retailPrice: 2345,
    wholesalePrice: 1542,
    orderClose: "22/12/2020",
    inStock: 100,
    orderCount: 24,
  },
];
