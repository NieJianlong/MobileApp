/*
 * @Author: Jianlong Nie
 * @Date: 2021-01-09 14:12:56
 * @LastEditTime: 2021-01-24 14:10:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MobileApp/App/Containers/UserInfo/ListItem.js
 */
import React from "react";
import { View, Text, Image, TouchableOpacity, DevSettings } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import fonts from "../../Themes/Fonts";
import * as storage from "../../Apollo/local-storage";
import NavigationService from "../../Navigation/NavigationService";
import { useMutation, useReactiveVar } from "@apollo/client";
import { localCartVar, userProfileVar } from "../../Apollo/cache";
import { useNavigation } from "@react-navigation/core";
import { CREATE_GUEST_BUYER } from "../Onboarding/gql/onboard_mutations";

/**
 * @description:tab menu item
 * @param {*} props
 * @return {*}
 */
function ListItem(props) {
  const navigation = useNavigation();
  const localCartVarReactive = useReactiveVar(localCartVar);
  const userProfileVarReactive = useReactiveVar(userProfileVar);
  const { lefticon, text, righticon, onPress, hasline, leftStyle } = props;
  const [guestBuyerId, { data, error }] = useMutation(CREATE_GUEST_BUYER, {
    onCompleted: async (data) => {
      let buyerId = data.createGuestBuyer.buyerId;
      await storage.setLocalStorageValue(storage.GUEST_BUYER_ID_KEY, buyerId);
      global.buyerId = buyerId;
    },
    onError: (error) => console.error("Error creating a guest Id", error),
  });
  return (
    <TouchableOpacity
      onPress={async () => {
        if (text === "Logout") {
          // global.buyerId = "";
          // localCartVarReactive.buyerId = "";
          // localCartVarReactive.callBackAddress = null;
          // localCartVarReactive.deliverAddress = null;
          // localCartVarReactive.items = [];
          // userProfileVarReactive.addressId = null;
          // userProfileVarReactive.addressLine1 = null;
          // userProfileVarReactive.addressLine2 = null;
          // userProfileVarReactive.email = "";
          // userProfileVarReactive.isAuth = false;
          // userProfileVarReactive.phone = "";
          // global.access_token = "";
          await storage.setLocalStorageEmpty();
          await storage.setLocalStorageValue(
            storage.REGISTERED_USER_LOGOUT,
            "true"
          );
          // guestBuyerId();
          // userProfileVar({
          //   ...userProfileVarReactive,
          //   isAuth: false,
          // });
          NavigationService.navigate("LogOutScreen");
          // navigation.popToTop();
          // navigation.reset({
          //   index: 0,
          //   routes: [{ name: "OnboardingScreen" }],
          // });
          // NavigationService.popToTop();
          // navigation.dispatch(StackActions.popToTop());

          // // navigation.reset("OnboardingScreen");
          // NavigationService.navigate("OnboardingScreen");
          // DevSettings.reload();
        } else {
          onPress();
        }
      }}
    >
      <View
        style={[
          styles.item,
          { justifyContent: "space-between" },
          hasline ? { borderBottomColor: "gray", borderBottomWidth: 0.5 } : {},
        ]}
      >
        <View style={styles.item}>
          <Image style={[styles.itemicon, leftStyle]} source={lefticon} />
          <Text>{text}</Text>
        </View>
        <Image style={[styles.rightbtn, {}]} source={righticon} />
      </View>
    </TouchableOpacity>
  );
}

export default ListItem;
const styles = ScaledSheet.create({
  item: {
    height: "46@vs",
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
  },
  rightbtn: {
    width: "40@s",
    height: "14@s",
    resizeMode: "contain",
  },
  itemtext: {
    fontFamily: fonts.primary,
    fontSize: "12@s",
    color: "#292929",
  },
  itemicon: {
    width: "60@s",
    height: "36@s",
    resizeMode: "contain",
  },
});
