import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { s, vs } from "react-native-size-matters";
import InView from "react-native-component-inview";
import { StarRating, DescriptionText } from "../../../Components";
import { Colors } from "../../../Themes";
import styles from "./styles";
import NavigationService from "../../../Navigation/NavigationService";
import Review from "../Components/Review";
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
        <Text style={styles.heading3Bold}>Product Reviews</Text>
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
              <View style={styles.sellerAvatarContainer}>
                {/* <Image
                  source={{ uri: comment.user.avatar }}
                  style={styles.sellerAvatar}
                /> */}
              </View>
              <Text style={styles.heading5Bold}>{comment.postedBy}</Text>
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
              <TouchableOpacity style={styles.btnGrey}>
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
              </TouchableOpacity>
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
const comments = [
  {
    user: {
      name: "Asley",
      avatar:
        "https://pbs.twimg.com/profile_images/631366930960551936/MswTZv39_400x400.png",
    },
    comment: {
      title: "Absolutely love it!",
      content:
        "At vero eoset accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas mol.",
      createdDate: "2019-09-12",
      rating: 4.5,
      photos: [],
      like: 123,
      reply: [],
    },
  },
  {
    user: {
      name: "Brian",
      avatar:
        "https://pbs.twimg.com/profile_images/631366930960551936/MswTZv39_400x400.png",
    },
    comment: {
      title: "Absolutely love it!",
      content:
        "At vero eoset accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas mol.",
      createdDate: "2020-12-12",
      rating: 4.5,
      like: 13,
      photos: [
        "https://www.europeanceo.com/wp-content/uploads/2019/09/Private-islands.jpg",
        "https://cdn.britannica.com/15/162615-131-0CBB2CBE/island-Caribbean.jpg",
        "https://thumbor.thedailymeal.com/ZZtexrWGOq6hJ7jOzleSrg9P_1Q=/870x565/https://www.theactivetimes.com/sites/default/files/2019/07/15/shutterstock_526092568.jpg",
        "https://a0.muscache.com/im/pictures/3d554f6c-6efa-422a-a5d6-6c442abe81a4.jpg?aki_policy=x_large",
      ],
      reply: [
        {
          user: {
            name: "Apple",
            avatar:
              "https://pbs.twimg.com/profile_images/631366930960551936/MswTZv39_400x400.png",
          },
          comment: {
            title: "",
            content:
              "At vero eoset accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas mol.",
            createdDate: "2020-18-1",
            like: 3,
          },
        },
      ],
    },
  },
];
