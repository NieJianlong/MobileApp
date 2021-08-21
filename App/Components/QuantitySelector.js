import { max } from "lodash";
import React, { useState } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { Fonts, Colors, Images, ApplicationStyles } from "../Themes";
import Slider from "./CustomSlider";

function QuantitySelector(props) {
  const [currentValue, setCurrentValue] = useState(props.value);

  const { disabled, label, minimumValue, maximumValue, onChange } = props;

  return (
    <View style={styles.row}>
      <TouchableOpacity
        onPress={() => {
          if (currentValue > minimumValue) {
            setCurrentValue(currentValue - 1);
            onChange(currentValue - 1);
          }
        }}
        style={styles.btnRoundContainer}
      >
        <Image source={Images.less} style={styles.btnIcon} />
      </TouchableOpacity>

      <Text style={styles.txtMinimumValue}>{minimumValue}</Text>

      <Slider
        minimumValue={minimumValue}
        maximumValue={maximumValue}
        value={currentValue}
        step={1}
        style={styles.sliderContainer}
        onValueChange={(t) => {
          setCurrentValue(t);
          onChange(t);
        }}
        minimumTrackTintColor={Colors.grey10}
        maximumTrackTintColor={Colors.grey10}
      />

      <Text style={styles.txtMaximumValue}>{maximumValue}</Text>

      <TouchableOpacity
        onPress={() => {
          if (currentValue < maximumValue) {
            setCurrentValue(currentValue + 1);
            onChange(currentValue + 1);
          }
        }}
        style={styles.btnRoundContainer}
      >
        <Image source={Images.add1} style={styles.btnIcon} />
      </TouchableOpacity>
    </View>
  );
}

QuantitySelector.propTypes = {};

QuantitySelector.defaultProps = {};

const styles = ScaledSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: {
    fontFamily: Fonts.primary,
    fontSize: "14@s",
    color: Colors.black,
    marginLeft: "8@s",
  },
  btnRoundContainer: {
    width: "30@s",
    height: "30@s",
    borderRadius: "15@s",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.grey10,
  },
  btnIcon: {
    width: "20@s",
    height: "20@s",
  },
  sliderContainer: {
    flex: 1,
    marginHorizontal: "10@s",
  },
  txtMinimumValue: {
    ...ApplicationStyles.screen.heading6Bold,
    marginLeft: "10@s",
    color: Colors.grey60,
  },
  txtMaximumValue: {
    ...ApplicationStyles.screen.heading6Bold,
    marginRight: "10@s",
    color: Colors.grey60,
  },
});

export default QuantitySelector;
