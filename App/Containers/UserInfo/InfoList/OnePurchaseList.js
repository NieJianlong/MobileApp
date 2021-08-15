import React, { useCallback, useEffect, useState } from "react";
import { ScaledSheet, vs } from "react-native-size-matters";
import { Button, Switch } from "../../../Components";
import AppConfig from "../../../Config/AppConfig";
import {
  View,
  FlatList,
  Text,
  Image,
  SafeAreaView,
  Dimensions,
} from "react-native";
import TextTip from "../../../Components/EmptyReminder";
import NavigationService from "../../../Navigation/NavigationService";
import PaymentItem from "./PaymentItem";
import AddressItem from "./AddressItem";
import { Fonts } from "../../../Themes";
import colors from "../../../Themes/Colors";
import metrics from "../../../Themes/Metrics";
import images from "../../../Themes/Images";
import ListItem from "../ListItem";
import { useQuery } from "@apollo/client";
import {
  FIND_BUYER_ADDRESS_BY_ID,
  FIND_ONE_CLICK_BUY,
  PAYMENT_METHODS_BY_ID,
} from "../../../Apollo/queries/queries_user";
import { useFocusEffect } from "@react-navigation/core";

const items = [
  {
    lefticon: images.userChangePwdImage,
    text: "Change Password",
    righticon: images.userRightBtnImage,
    onPress: () => {
      NavigationService.navigate("ChangePasswordScreen");
    },
    hasline: true,
  },
  {
    lefticon: images.userLogoutImage,
    text: "Logout",
    righticon: images.userRightBtnImage,
    onPress: () => {},
    hasline: false,
  },
];
/**
 * @description:Display my address, list of my payment methods, display bill detail
 * @param {*} item Menu Item with a special configuration
 * @param {*} data FlatList data
 * @param {*} isPayment Distinguish between payment method list and address list
 * @param {*} showSheet Display the Acction Sheet for the home page
 * @return {*}
 */
export default function OnePurchaseList({ dispatch, xIndex }) {
  const tip = "You haven't added a default \n purchase preference yet";
  const subTip =
    "Select a default address and payment method to \n activate 1 click purchasing";
  const { data: addresses } = useQuery(FIND_BUYER_ADDRESS_BY_ID, {
    variables: {
      buyerId: global.buyerId,
    },
    context: {
      headers: {
        isPrivate: true,
      },
    },
    // onCompleted: (res) => {
    //   dispatch({ type: "hideloading" });
    // },
    // onError: (res) => {
    //   dispatch({ type: "hideloading" });
    // },
  });

  const { data: payments } = useQuery(PAYMENT_METHODS_BY_ID, {
    variables: { buyerId: global.buyerId },
    context: {
      headers: {
        isPrivate: true,
      },
    },
    // onCompleted: (res) => {
    //   dispatch({ type: "hideloading" });
    // },
    // onError: (res) => {
    //   dispatch({ type: "hideloading" });
    // },
  });

  const { loading, error, refetch, data } = useQuery(FIND_ONE_CLICK_BUY, {
    variables: { buyerId: global.buyerId },
    context: {
      headers: {
        isPrivate: true,
      },
    },
    onCompleted: (res) => {
      console.log(res);
    },
    onError: (res) => {
      console.log(res);
    },
  });
  const refreshData = useCallback(() => {
    // dispatch({ type: "loading" });
    refetch();
  }, [refetch]);
  useFocusEffect(refreshData);
  useEffect(() => {
    dispatch({
      type: "rightButtonShow",
      payload: false,
    });
  }, [dispatch]);
  useEffect(() => {
    if (xIndex === 0) {
      refreshData();
    }
  }, [refreshData, xIndex]);
  return (
    <View style={{ flex: 1 }} onLayout={() => {}}>
      {data?.oneClickBuy?.defaultAddress?.addressId &&
        data?.oneClickBuy?.defaultPaymentMethod?.paymentDetailId && (
          <View>
            <PaymentItem
              item={data?.oneClickBuy?.defaultPaymentMethod}
              refetch={refetch}
            />
            <AddressItem
              item={data?.oneClickBuy?.defaultAddress}
              refetch={refetch}
            />
            <View
              style={{
                paddingHorizontal: AppConfig.paddingHorizontal,
                marginBottom: vs(20),
                marginTop: vs(20),
              }}
            >
              <Button
                text="EDIT 1 CLICK PURCHASING PREFERENCES"
                onPress={() => {
                  NavigationService.navigate("OneClickPurchaseScreen");
                }}
              />
            </View>
          </View>
        )}
      {!data?.oneClickBuy?.defaultAddress?.addressId &&
        !data?.oneClickBuy?.defaultPaymentMethod?.paymentDetailId && (
          <TextTip
            textTip={tip}
            subTextTip={subTip}
            needButton={true}
            btnMsg="ADD 1 CLICK PURCHASING PREFERENCES"
            onPress={() => {
              NavigationService.navigate("OneClickPurchaseScreen");
            }}
          />
        )}
      {data?.oneClickBuy?.defaultAddress?.addressId &&
        !data?.oneClickBuy?.defaultPaymentMethod?.paymentDetailId && (
          <View>
            <AddressItem
              item={data?.oneClickBuy?.defaultAddress}
              refetch={refetch}
            />
            <View
              style={{
                paddingHorizontal: AppConfig.paddingHorizontal,
                marginTop: 20,
              }}
            >
              <Button onPress={() => {}} text="ADD DEFAULT PAYMENT METHOD" />
            </View>
          </View>
        )}
      {!data?.oneClickBuy?.defaultAddress?.addressId &&
        data?.oneClickBuy?.defaultPaymentMethod?.paymentDetailId && (
          <View>
            <PaymentItem
              item={data?.oneClickBuy?.defaultPaymentMethod}
              refetch={refetch}
            />
            <View
              style={{
                paddingHorizontal: AppConfig.paddingHorizontal,
                marginTop: 20,
              }}
            >
              <Button
                onPress={() => {
                  addresses?.getBuyerAddressesById.length > 0
                    ? NavigationService.navigate("SelectDeliveryAddressScreen")
                    : NavigationService.navigate("AddNewAddressScreen", {
                        title: "Add new address",
                      });
                }}
                text="ADD DEFAULT ADDRESS"
              />
            </View>
          </View>
        )}

      <SafeAreaView style={styles.bottomlist}>
        {items.map((item, index) => {
          return <ListItem key={`listitem` + index} {...item} />;
        })}
      </SafeAreaView>
    </View>
  );
}
const styles = ScaledSheet.create({
  bottomlist: {
    position: "absolute",
    bottom: 0,
    width: metrics.screenWidth,
  },
  nosign: {
    fontSize: "22@s",
    textAlign: "center",
    fontFamily: Fonts.primary,
    fontWeight: "bold",
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
    paddingHorizontal: AppConfig.paddingHorizontal,
    paddingBottom: "15@vs",
  },
});
