import React, { useEffect, useState } from "react";
import { ScaledSheet, vs } from "react-native-size-matters";
import { Button, Switch } from "../../../Components";
import AppConfig from "../../../Config/AppConfig";
import { View, FlatList, Text, Image, SafeAreaView } from "react-native";
import TextTip from "../../../Components/EmptyReminder";
import NavigationService from "../../../Navigation/NavigationService";
import PaymentItem from "./PaymentItem";
import { Fonts } from "../../../Themes";
import colors from "../../../Themes/Colors";
import metrics from "../../../Themes/Metrics";
import images from "../../../Themes/Images";
import ListItem from "../ListItem";

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
export default function OnePurchaseList({ dispatch }) {
  const tip = "You haven't added a default \n purchase preference yet";
  const subTip =
    "Select a default address and payment method to \n activate 1 click purchasing";
  const [payments, setPayments] = useState([]);
  useEffect(() => {
    dispatch({
      type: "rightButtonShow",
      payload: false,
    });
  }, [dispatch]);
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={payments}
        ListFooterComponent={() => {
          return (
            payments.length > 0 && (
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
            )
          );
        }}
        ListEmptyComponent={
          <TextTip
            textTip={tip}
            subTextTip={subTip}
            needButton={true}
            btnMsg="ADD 1 CLICK PURCHASING PREFERENCES"
            onPress={() => {
              NavigationService.navigate("OneClickPurchaseScreen");
            }}
          />
        }
        renderItem={({ item }) => {
          return <PaymentItem item={item} />;
        }}
        keyExtractor={(item, index) => `listItem${index}`}
      />
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
