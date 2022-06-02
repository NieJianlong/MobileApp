import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { s, vs } from "react-native-size-matters";
import InView from "react-native-component-inview";
import { StarRating, DescriptionText } from "../../../Components";
import { Colors } from "../../../Themes";
import styles from "./styles";
import NavigationService from "../../../Navigation/NavigationService";
import Review from "../Components/Review";
import { useIncrementHelpfulCountMutation } from "../../../../generated/graphql";
import useAlert from "../../../hooks/useAlert";
import useLoading from "../../../hooks/useLoading";
import colors from "../../../Themes/Colors";
import { useRoute } from "@react-navigation/native";
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

export default function ProductReview({
  product,
  isPurchased,
  tabIndex,
  refetch,
}) {
  const { setAlert } = useAlert();
  const { setLoading } = useLoading();
  const { params } = useRoute();
  const [incrementHelpfulCount] = useIncrementHelpfulCountMutation();
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
              {/* <View style={styles.sellerAvatarContainer}>
                <Image
                  source={{ uri: comment.user.avatar }}
                  style={styles.sellerAvatar}
                />
              </View> */}
              <Text style={styles.heading5Bold}>{comment.postedByName}</Text>
            </View>
            <View style={styles.row}>
              <StarRating rating={comment.ratingVote} />
              <Text style={styles.heading6Regular}>
                {/* {moment(comment.comment.createdDate).fromNow()} */}
              </Text>
            </View>
            <Text style={[styles.heading5Bold, { marginTop: vs(5) }]}>
              {comment.title}
            </Text>
            <DescriptionText previewLength={150} text={comment.description} />
            {/* {comment.comment.photos.length > 0 && (
              <View style={{ marginTop: vs(10) }}>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={comment.comment.photos}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item, index }) => (
                    <ImageBackground
                      key={index.toString()}
                      borderRadius={5}
                      source={{ uri: item }}
                      style={styles.commentPhoto}
                    />
                  )}
                />
              </View>
            )} */}
            <View style={[styles.row, { marginTop: vs(15) }]}>
              {/* <TouchableOpacity
                style={styles.btnGrey}
                onPress={() => {
                  setLoading({ show: true });
                  incrementHelpfulCount({
                    variables: { reviewId: comment.id },
                    context: {
                      headers: {
                        isPrivate: true,
                      },
                    },
                    onCompleted: () => {
                      refetch();
                      setLoading({ show: false });
                      setAlert({
                        title: "Successed",
                        message: "Thanks for your feedback!",
                        visible: true,
                        color: colors.success,
                        onDismiss: () => {
                          setAlert({ visible: false });
                        },
                      });
                    },
                    onError: () => {
                      setLoading({ show: false });
                      setAlert({
                        title: "Failed",
                        visible: true,
                        color: colors.error,
                        onDismiss: () => {
                          setAlert({ visible: false });
                        },
                      });
                    },
                  });
                }}
              >
                <Text style={[styles.heading5Bold, { color: Colors.white }]}>
                  HELPFUL ({comment.helpfulCount ? comment.helpfulCount : 0})
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  NavigationService.navigate("ReportScreen", {
                    onSubmit: () => {},
                    reviewId: comment.id,
                  })
                }
                style={{ marginLeft: s(20) }}
              >
                <Text style={[styles.heading5Bold, { color: Colors.grey60 }]}>
                  REPORT
                </Text>
              </TouchableOpacity> */}
            </View>
            {/* 
            {comment.comment.reply.length > 0 && (
              <View style={{ marginLeft: s(15), marginTop: vs(20) }}>
                {comment.comment.reply.map((item, index) => (
                  <View key={index.toString()}>
                    <View style={[styles.row, { marginBottom: vs(5) }]}>
                      <View style={styles.sellerAvatarContainer}>
                        <Image
                          source={{ uri: item.user.avatar }}
                          style={styles.sellerAvatar}
                        />
                      </View>
                      <Text style={styles.heading5Bold}>{item.user.name}</Text>
                    </View>

                    <DescriptionText
                      previewLength={150}
                      text={
                        "At vero eoset accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium" +
                        "voluptatum deleniti atque corrupti quos dolores et quas mol" +
                        "At vero eoset accusamus et iusto" +
                        "odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas mol"
                      }
                    />
                    <View style={[styles.row, { marginTop: vs(15) }]}>
                      <TouchableOpacity style={styles.btnGrey}>
                        <Text
                          style={[styles.heading5Bold, { color: Colors.white }]}
                        >
                          HELPFUL ({comment.comment.like})
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={{ marginLeft: s(20) }}>
                        <Text
                          style={[
                            styles.heading5Bold,
                            { color: Colors.grey60 },
                          ]}
                        >
                          REPORT
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            )} */}
          </View>
        ))}
    </View>
  );
}
