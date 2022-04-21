import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity as RNTouchableOpacity,
  Platform,
} from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { Fonts, Colors } from "../Themes";
import PropTypes from "prop-types";
import AppConfig from "../Config/AppConfig";
import { TouchableOpacity as GHTouchableOpacity } from "react-native-gesture-handler";
const TouchableOpacity =
  Platform.OS === "ios" ? RNTouchableOpacity : GHTouchableOpacity;
class Button extends Component {
  render() {
    const {
      text,
      onPress,
      disabled,
      backgroundColor,
      textColor,
      disabledColor,
      style,
      prefixIcon,
    } = this.props;
    console.log("disabled", disabled);

    return (
      <TouchableOpacity
        disabled={disabled}
        style={[
          styles.container,
          { backgroundColor: disabled ? "grey" : backgroundColor },
          disabled && { opacity: 0.25 },
          ,
          style,
        ]}
        onPress={onPress}
      >
        {prefixIcon && (
          <Image
            style={[styles.icon, { tintColor: textColor }]}
            source={prefixIcon}
          />
        )}
        <Text style={[styles.txt, { color: textColor ?? Colors.white }]}>
          {text}
        </Text>
      </TouchableOpacity>
    );
  }
}

Button.propTypes = {
  text: PropTypes.string,
  onPress: PropTypes.any,
  disabled: PropTypes.bool,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  disabledColor: PropTypes.string,
};

Button.defaultProps = {
  backgroundColor: Colors.primary,
  textColor: Colors.white,
};

const styles = ScaledSheet.create({
  container: {
    height: "44@vs",
    backgroundColor: "#7FFFD4",
    borderRadius: "22@vs",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  txt: {
    color: "rgb(24,24,101)",
    fontSize: AppConfig.fontSize,
    fontFamily: Fonts.semibold,
  },
  icon: {
    width: "20@s",
    height: "20@s",
    marginRight: "5@s",
  },
});
export default Button;
