import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { ScaledSheet, s, vs } from "react-native-size-matters";
import { Fonts, Colors, ApplicationStyles, Images } from "../../../Themes";
import { Progress, StarRating } from "../../../Components";
import BigNumber from "bignumber.js";
import { isEmpty } from "lodash";
import { t } from "react-native-tailwindcss";

const getMax = (ratingDetail) => {
  return Math.max(
    ratingDetail?.oneStar,
    ratingDetail?.twoStar,
    ratingDetail?.threeStar,
    ratingDetail?.fourStar,
    ratingDetail?.fiveStar,
    ratingDetail?.zeroStar
  );
};

const getTotal = (ratingDetail) => {
  return (
    ratingDetail?.oneStar +
    ratingDetail?.twoStar +
    ratingDetail?.threeStar +
    ratingDetail?.fourStar +
    ratingDetail?.fiveStar +
    ratingDetail?.zeroStar
  );
};

const MAX_WIDTH = 120;

function Review(props) {
  const [active, setActive] = useState(props.defaultValue ?? false);
  const { ratingDetail, rating, ratingCount } = props;
  const maxRating = getMax(ratingDetail);
  const totalRating = getTotal(ratingDetail);
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.row}>
          <Text style={[styles.txt, t.mR4, { color: Colors.secondary00 }]}>
            5 star
          </Text>
          <Progress
            maximumValue={totalRating}
            currentValue={ratingDetail.fiveStar}
            barWidth={MAX_WIDTH}
            barHeight={vs(6)}
          />
          <Text style={[styles.txt, t.mL4, { color: Colors.secondary00 }]}>
            {totalRating === 0
              ? "0"
              : (ratingDetail.fiveStar / totalRating).toFixed(4) * 100}
            %
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={[styles.txt, t.mR4, { color: Colors.secondary00 }]}>
            4 star
          </Text>
          <Progress
            maximumValue={totalRating}
            currentValue={ratingDetail?.fourStar}
            barWidth={MAX_WIDTH}
            barHeight={vs(6)}
          />
          <Text style={[styles.txt, t.mL4, { color: Colors.secondary00 }]}>
            {totalRating === 0
              ? "0"
              : (ratingDetail.fourStar / totalRating).toFixed(4) * 100}
            %
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={[styles.txt, t.mR4, { color: Colors.secondary00 }]}>
            3 star
          </Text>
          <Progress
            maximumValue={totalRating}
            currentValue={ratingDetail?.threeStar}
            barWidth={MAX_WIDTH}
            barHeight={vs(6)}
          />
          <Text style={[styles.txt, t.mL4, { color: Colors.secondary00 }]}>
            {totalRating === 0
              ? "0"
              : (ratingDetail.threeStar / totalRating).toFixed(4) * 100}
            %
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={[styles.txt, t.mR4, { color: Colors.secondary00 }]}>
            2 star
          </Text>
          <Progress
            maximumValue={totalRating}
            currentValue={ratingDetail?.twoStar}
            barWidth={MAX_WIDTH}
            barHeight={vs(6)}
          />
          <Text style={[styles.txt, t.mL4, { color: Colors.secondary00 }]}>
            {totalRating === 0
              ? "0"
              : (ratingDetail.twoStar / totalRating).toFixed(4) * 100}
            %
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={[styles.txt, t.mR4, { color: Colors.secondary00 }]}>
            1 star
          </Text>
          <Progress
            maximumValue={totalRating}
            currentValue={ratingDetail?.oneStar}
            barWidth={MAX_WIDTH}
            barHeight={vs(6)}
          />
          <Text style={[styles.txt, t.mL4, { color: Colors.secondary00 }]}>
            {totalRating === 0
              ? "0"
              : (ratingDetail.oneStar / totalRating).toFixed(4) * 100}
            %
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={[styles.txt, t.mR4, { color: Colors.secondary00 }]}>
            0 star
          </Text>
          <Progress
            maximumValue={totalRating}
            currentValue={ratingDetail?.zeroStar}
            barWidth={MAX_WIDTH}
            barHeight={vs(6)}
          />
          <Text style={[styles.txt, t.mL4, { color: Colors.secondary00 }]}>
            {totalRating === 0
              ? "0"
              : (ratingDetail.zeroStar / totalRating).toFixed(4) * 100}
            %
          </Text>
        </View>
      </View>

      <View style={styles.ratingContainer}>
        <Text style={ApplicationStyles.screen.txtHeroBold}>
          {!rating ? 0 : new BigNumber(rating).toFixed(2)}
        </Text>
        <StarRating
          style={{ marginBottom: vs(5) }}
          rating={!rating ? 0 : new BigNumber(rating).toFixed(2)}
        />
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
