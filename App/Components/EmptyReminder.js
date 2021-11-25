/*
 * @Author: Jianlong Nie
 * @Date: 2021-01-09 13:03:18
 * @LastEditTime: 2021-01-09 14:34:12
 * @LastEditors: Please set LastEditors
 * @Description: User haven't added a default purchase preference yet
 * @FilePath: /MobileApp/App/Containers/UserInfo/NoPurchase.js
 */
import React from "react";
import { View, Text } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import Fonts from "../Themes/Fonts";
import AppConfig from "../Config/AppConfig";

import colors from "../Themes/Colors";
import metrics from "../Themes/Metrics";
import { ApplicationStyles } from "../Themes";
import PropTypes from "prop-types";
import Button from "./Button";
/**
 * @description:Prompt component, user user does not add address information, do not add payment information when the display
 * @param {*} props
 * @return {*}
 */
function EmptyReminder(props) {
  const {
    textTip,
    subTextTip,
    needButton,
    btnMsg,
    onPress,
    callback,
    style,
    width,
  } = props;
  return (
    <View
      style={[{ flex: 1, width: width ? width : metrics.screenWidth }, style]}
    >
      <View style={styles.headerContainer}>
        <Text style={[ApplicationStyles.screen.heading4Bold, styles.nosign]}>
          {textTip}
        </Text>
        <Text style={[styles.subTextTip]}>{subTextTip}</Text>
        <View style={[styles.signbtn, { width: "100%" }]}>
          {needButton && (
            <Button onPress={() => onPress(callback)} text={btnMsg}></Button>
          )}
        </View>
      </View>
    </View>
  );
}

EmptyReminder.propTypes = {
  textTip: PropTypes.string,
  onPress: PropTypes.any,
  needButton: PropTypes.bool,
  callback: PropTypes.func,
  subTextTip: PropTypes.string,
  btnMsg: PropTypes.string,
};
export default EmptyReminder;
const styles = ScaledSheet.create({
  nosign: {
    fontSize: "22@s",
    textAlign: "center",
    marginTop: "25@vs",
  },
  subTextTip: {
    fontSize: "14@vs",
    textAlign: "center",
    fontFamily: Fonts.primary,
    marginTop: "5@vs",
    color: colors.grey80,
    marginBottom: "10@vs",
  },
  signbtn: { marginTop: "20@vs" },
  headerContainer: {
    backgroundColor: colors.background,
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: AppConfig.paddingHorizontal,
    paddingBottom: "15@vs",
  },
});
