/*
 * @Author: Jianlong Nie
 * @Date: 2021-01-07 17:09:47
 * @LastEditTime: 2021-01-24 14:41:21
 * @LastEditors: Please set LastEditors
 * @Description: UserCenter item
 * @FilePath: /MobileApp/App/Containers/UserCenter/ItemBox.js
 */
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { ScaledSheet, s, vs } from "react-native-size-matters";
import fonts from "../../Themes/Fonts";
/**
 * @description:user center item，like "Salami Credit"、"Notifications"……
 * @param {*} props
 * @return {*}
 */
function ItemBox(props) {
  const { title, icon } = props;
  return (
    <TouchableOpacity onPress={() => props.onPress()}>
      <View style={styles.container}>
        <Image style={styles.icon} source={icon}></Image>
        <Text style={styles.itemText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default ItemBox;

const styles = ScaledSheet.create({
  icon: {
    width: "100%",
    height: "30@s",
    marginBottom: 10,
    resizeMode: "contain",
  },
  container: {
    height: "94@s",
    width: "94@s",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: "18@s",
    marginTop: "15@s",
    shadowColor: "rgba(232, 240, 243, 0.13)",
    shadowOffset: {
      width: 0,
      height: "12@s",
    },
    shadowOpacity: 0.25,
  },
  itemText: {
    textAlign: "center",
    fontFamily: fonts.primary,
  },
});
