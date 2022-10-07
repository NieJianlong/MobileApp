import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { vs } from "react-native-size-matters";
import InView from "react-native-component-inview";
import { StarRating, DescriptionText } from "../../../Components";
import styles from "./styles";
import NavigationService from "../../../Navigation/NavigationService";
import Review from "../Components/Review";

import { t } from "react-native-tailwindcss";
//render users' reviews for the product
const renderUserReview = () => {
  return (
    <TouchableOpacity
      onPress={() =>
        //add new review: navigate to the rate order screen
        NavigationService.navigate("RateOrderScreen", {
          onPost: () => {},
        })
      }
      style={styles.userReviewContainer}
    >
      <Text style={styles.heading4Bold}>Rate and review this product</Text>
      <Text style={styles.txtRegular}>Share your experience</Text>
      <View style={{ height: vs(20) }} />
      <StarRating ratingMode />
    </TouchableOpacity>
  );
};

export default function ProductReview({ product, isPurchased, tabIndex }) {
  return (
    <View style={styles.productReviewContainer}>
      <InView
        onChange={(isVisible) => {
          if (isVisible && tabIndex === 2) {
            //setTabIndex(3)
          }
        }}
      >
        <Text style={[styles.heading3Bold, t.textLeft, t.mB4]}>
          Product Reviews
        </Text>
        <Review
          rating={product.numberOfStars}
          ratingCount={product.numberOfReviews}
          ratingDetail={product.ratingDetail}
        />
      </InView>
      <View style={{ height: vs(15) }} />
      {isPurchased && renderUserReview()}
      <View style={{ height: vs(15) }} />
      {product.reviews &&
        product.reviews.map((comment, index) => (
          <View key={index.toString()} style={styles.commentContainer}>
            <View style={[styles.row, { marginBottom: vs(5) }]}>
              <Text style={styles.heading5Bold}>{comment.postedByName}</Text>
            </View>
            <View style={styles.row}>
              <StarRating rating={comment.ratingVote} />
            </View>
            <Text style={[styles.heading5Bold, { marginTop: vs(5) }]}>
              {comment.title}
            </Text>
            <DescriptionText previewLength={150} text={comment.description} />

            <View style={[styles.row, { marginTop: vs(15) }]}></View>
          </View>
        ))}
    </View>
  );
}
