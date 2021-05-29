import React, { useEffect, useState } from "react";
import { vs } from "react-native-size-matters";
import { Button, Switch } from "../../../Components";
import AppConfig from "../../../Config/AppConfig";
import { View, FlatList, Text, Image, SafeAreaView } from "react-native";
import TextTip from "../../../Components/EmptyReminder";
import NavigationService from "../../../Navigation/NavigationService";
import PaymentItem from "./PaymentItem";
/**
 * @description:Display my address, list of my payment methods, display bill detail
 * @param {*} item Menu Item with a special configuration
 * @param {*} data FlatList data
 * @param {*} isPayment Distinguish between payment method list and address list
 * @param {*} showSheet Display the Acction Sheet for the home page
 * @return {*}
 */
export default function OnePurchaseList({ dispatch }) {
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
          );
        }}
        ListEmptyComponent={
          <TextTip
            textTip="You haven't added a default \n purchase preference yet"
            subTextTip="Select a default address and payment method to \n activate 1 click purchasing"
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
    </View>
  );
}
