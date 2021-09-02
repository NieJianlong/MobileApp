import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { Fonts, Colors, ApplicationStyles, Images } from "../../../Themes";
import AppConfig from "../../../Config/AppConfig";

function ColorOptionItem(props) {
  const [active, setActive] = useState(props.defaultValue ?? false);

  useEffect(() => {
    setActive(props.defaultValue);
  });

  const { disabled, label, onSwitch, style, available } = props;

  if (available) {
    return (
      <TouchableOpacity
        onPress={() => {
          onSwitch(!active);
        }}
        style={[
          styles.container,
          active && { borderColor: Colors.secondary00 },
          style,
        ]}
      >
        <View style={styles.row}>
          <ImageBackground
            borderRadius={50}
            style={styles.image}
            source={{
              uri:
                "https://www.color-blindness.com/color-name-hue-tool/js/images/map-red-min.png",
            }}
          />

          <Text style={ApplicationStyles.screen.heading5Bold}>{label}</Text>
        </View>

        {active && (
          <Image
            source={Images.check}
            style={styles.icCheck}
            resizeMode={"contain"}
          />
        )}
      </TouchableOpacity>
    );
  } else {
    return (
      <View
        onPress={() => {
          onSwitch(!active);
        }}
        style={[styles.container, style]}
      >
        <View style={[styles.row, { opacity: 0.4 }]}>
          <ImageBackground
            borderRadius={50}
            style={styles.image}
            source={{
              uri:
                "https://www.color-blindness.com/color-name-hue-tool/js/images/map-red-min.png",
            }}
          />

          <Text style={ApplicationStyles.screen.heading5Bold}>{label}</Text>
        </View>

        <TouchableOpacity style={[styles.row]}>
          <Image
            resizeMode={"contain"}
            source={Images.mail}
            style={styles.icMail}
          />
          <Text
            style={[
              ApplicationStyles.screen.heading5Bold,
              { color: Colors.secondary00 },
            ]}
          >
            Notify me
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

ColorOptionItem.propTypes = {};

ColorOptionItem.defaultProps = {};

const styles = ScaledSheet.create({
  container: {
    height: "55@vs",
    backgroundColor: Colors.white,
    borderRadius: "16@s",
    paddingHorizontal: "20@vs",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderColor: Colors.grey10,
    borderWidth: 2,
  },
  txt: {
    color: "rgb(24,24,101)",
    fontSize: AppConfig.fontSize,
    fontFamily: Fonts.semibold,
  },
  icCheck: {
    width: "15@s",
    height: "15@s",
  },
  image: {
    width: "30@s",
    height: "30@s",
    marginRight: "15@s",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  icMail: {
    width: "14@s",
    height: "14@s",
    tintColor: Colors.secondary00,
    marginRight: "5@s",
  },
});

export default ColorOptionItem;
