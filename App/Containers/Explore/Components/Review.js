import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { ScaledSheet, s, vs } from "react-native-size-matters";
import { Fonts, Colors, ApplicationStyles, Images } from "../../../Themes";
import AppConfig from "../../../Config/AppConfig";
import { StarRating } from "../../../Components";

const getMax = (ratingDetail) => {
  return Math.max(
    ratingDetail.oneStar,
    ratingDetail.twoStar,
    ratingDetail.threeStar,
    ratingDetail.fourStar,
    ratingDetail.fiveStar
  );
};

const MAX_WIDTH = 150;

function Review(props) {
  const [active, setActive] = useState(props.defaultValue ?? false);

  const { ratingDetail, rating, ratingCount } = props;
  const maxRating = getMax(ratingDetail);

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.row}>
          <Text style={styles.txt}>5</Text>
          <View
            style={[
              styles.bar,
              { width: s((ratingDetail.fiveStar / maxRating) * MAX_WIDTH) },
            ]}
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.txt}>4</Text>
          <View
            style={[
              styles.bar,
              { width: s((ratingDetail.fourStar / maxRating) * MAX_WIDTH) },
            ]}
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.txt}>3</Text>
          <View
            style={[
              styles.bar,
              { width: s((ratingDetail.threeStar / maxRating) * MAX_WIDTH) },
            ]}
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.txt}>2</Text>
          <View
            style={[
              styles.bar,
              { width: s((ratingDetail.twoStar / maxRating) * MAX_WIDTH) },
            ]}
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.txt}>1</Text>
          <View
            style={[
              styles.bar,
              { width: s((ratingDetail.oneStar / maxRating) * MAX_WIDTH) },
            ]}
          />
        </View>
      </View>

      <View style={styles.ratingContainer}>
        <Text style={ApplicationStyles.screen.txtHeroBold}>{rating}</Text>
        <StarRating style={{ marginBottom: vs(5) }} rating={rating} />
        <Text style={ApplicationStyles.screen.txtRegular}>
          {ratingCount} Reviews
        </Text>
      </View>
    </View>
  );
}

Review.propTypes = {};

Review.defaultProps = {};

const styles = ScaledSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  txt: {
    ...ApplicationStyles.screen.txtRegular,
  },
  icCheck: {
    width: "15@s",
    height: "15@s",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "4@vs",
  },
  bar: {
    height: "8@vs",
    backgroundColor: Colors.secondary00,
    borderRadius: "5@vs",
    marginLeft: "8@s",
  },
  ratingContainer: {
    alignItems: "center",
    marginRight: "20@s",
  },
});

export default Review;
