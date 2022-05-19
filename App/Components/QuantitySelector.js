import React, { useState } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import useAlert from "../hooks/useAlert";
import { Fonts, Colors, Images, ApplicationStyles } from "../Themes";
import colors from "../Themes/Colors";
import Slider from "./CustomSlider";

function QuantitySelector(props) {
  const [currentValue, setCurrentValue] = useState(props.value);
  const { setAlert, visible } = useAlert();

  const {
    disabled,
    label,
    minimumValue,
    maximumValue,
    onChange,
    minSoldQuantity,
  } = props;

  return (
    <View style={styles.row}>
      <TouchableOpacity
        onPress={() => {
          if (currentValue > minSoldQuantity) {
            setCurrentValue(currentValue - 1);
            onChange(currentValue - 1);
          } else {
            !visible &&
              setAlert({
                color: colors.warning,
                title: `Purchase a minimum of ${minSoldQuantity} units of this product`,
                visible: true,
                onDismiss: () => {
                  setAlert({ visible: false });
                },
              });
          }
        }}
        style={styles.btnRoundContainer}
      >
        <Image source={Images.less} style={styles.btnIcon} />
      </TouchableOpacity>

      <Text style={styles.txtMinimumValue}>{minimumValue}</Text>

      <Slider
        minimumValue={minSoldQuantity}
        maximumValue={maximumValue}
        value={currentValue}
        step={1}
        style={styles.sliderContainer}
        onValueChange={(t) => {
          if (t >= minSoldQuantity) {
            setCurrentValue(t);
            onChange(t);
          }
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
