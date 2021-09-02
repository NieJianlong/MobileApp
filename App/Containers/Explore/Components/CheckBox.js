import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { ScaledSheet, s } from "react-native-size-matters";
import { Fonts, Colors, ApplicationStyles, Images } from "../../../Themes";
import AppConfig from "../../../Config/AppConfig";

function CheckBox(props) {
  const [active, setActive] = useState(props.defaultValue ?? false);

  useEffect(() => {
    setActive(props.defaultValue);
  });

  const { disabled, label, onSwitch, hasIcon, iconColor } = props;

  if (!disabled) {
    return (
      <TouchableOpacity
        onPress={() => {
          onSwitch(!active);
        }}
        style={[
          styles.container,
          active && { borderColor: Colors.secondary00 },
        ]}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {hasIcon && (
            <View
              style={{
                width: s(32),
                height: s(32),
                marginRight: 15,
                backgroundColor: iconColor,
                borderRadius: s(16),
              }}
            />
          )}
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
    return <View style={styles.row}></View>;
  }
}

CheckBox.propTypes = {};

CheckBox.defaultProps = {};

const styles = ScaledSheet.create({
  container: {
    height: "46@vs",
    backgroundColor: Colors.white,
    borderRadius: "20@s",
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
});

export default CheckBox;
