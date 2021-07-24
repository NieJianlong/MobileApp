import React, { useState } from "react";
import { Text, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ScaledSheet, s } from "react-native-size-matters";
import { Colors, Images, ApplicationStyles } from "../Themes";

//component to display and rate a product
function StarRating(props) {
  const [userRating, setUserRating] = useState(0);

  const {
    //rating value
    rating,
    //number of ratings
    ratingCount,
    style,
    //whether to show all rating information
    fullMode,
    //whether to allow rating
    ratingMode,
  } = props;

  if (ratingMode) {
    return (
      <View style={[styles.container, style]}>
        <TouchableOpacity onPress={() => setUserRating(1)}>
          <Image
            source={Images.starFilled}
            style={userRating >= 1 ? styles.filledBigStar : styles.emptyBigStar}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setUserRating(2)}>
          <Image
            source={Images.starFilled}
            style={userRating >= 2 ? styles.filledBigStar : styles.emptyBigStar}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setUserRating(3)}>
          <Image
            source={Images.starFilled}
            style={userRating >= 3 ? styles.filledBigStar : styles.emptyBigStar}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setUserRating(4)}>
          <Image
            source={Images.starFilled}
            style={userRating >= 4 ? styles.filledBigStar : styles.emptyBigStar}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setUserRating(5)}>
          <Image
            source={Images.starFilled}
            style={userRating >= 5 ? styles.filledBigStar : styles.emptyBigStar}
          />
        </TouchableOpacity>
      </View>
    );
  } else
    return (
      <View style={[styles.container, style]}>
        <Image
          source={Images.starFilled}
          style={rating >= 1 ? styles.filledStar : styles.emptyStar}
        />
        <Image
          source={Images.starFilled}
          style={rating >= 2 ? styles.filledStar : styles.emptyStar}
        />
        <Image
          source={Images.starFilled}
          style={rating >= 3 ? styles.filledStar : styles.emptyStar}
        />
        <Image
          source={Images.starFilled}
          style={rating >= 4 ? styles.filledStar : styles.emptyStar}
        />
        <Image
          source={Images.starFilled}
          style={rating == 5 ? styles.filledStar : styles.emptyStar}
        />

        {fullMode ? (
          <Text style={styles.txtRatingCount}>
            {rating} ({ratingCount} Reviews)
          </Text>
        ) : (
          <Text style={styles.txtRatingCount}>{ratingCount}</Text>
        )}
      </View>
    );
}

StarRating.propTypes = {};

StarRating.defaultProps = {};

const BIG_STAR_SIZE = s(38);
const SMALL_STAR_SIZE = s(14);

const styles = ScaledSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  filledStar: {
    width: SMALL_STAR_SIZE,
    height: SMALL_STAR_SIZE,
    marginRight: "0@s",
    tintColor: Colors.star,
  },
  emptyStar: {
    width: SMALL_STAR_SIZE,
    height: SMALL_STAR_SIZE,
    marginRight: "0@s",
    tintColor: Colors.grey20,
  },
  filledBigStar: {
    width: BIG_STAR_SIZE,
    height: BIG_STAR_SIZE,
    marginHorizontal: "3@s",
    tintColor: Colors.star,
  },
  emptyBigStar: {
    width: BIG_STAR_SIZE,
    height: BIG_STAR_SIZE,
    marginHorizontal: "3@s",
    tintColor: Colors.grey20,
  },
  txtRatingCount: {
    ...ApplicationStyles.screen.heading6Regular,
    color: Colors.black,
    marginLeft: "3@s",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});
export default StarRating;
