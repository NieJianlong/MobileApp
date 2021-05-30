import React, { useEffect, useState } from "react";
import { vs } from "react-native-size-matters";
import { Button, Switch } from "../../../Components";
import AppConfig from "../../../Config/AppConfig";
import { View, FlatList, Text, Image, SafeAreaView } from "react-native";
import TextTip from "../../../Components/EmptyReminder";
import NavigationService from "../../../Navigation/NavigationService";
import PaymentItem from "./PaymentItem";
import { useQuery } from "@apollo/client";
import {
  FIND_BUYER_ADDRESS_BY_ID,
  FIND_BUYER_PROFILE,
  FIND_PAYMENT_DETAIL_BY_ID,
  FIND_USER_PROFILE,
  PAYMENT_DETAILS,
} from "../../../Apollo/queries/queries_user";
/**
 * @description:Display my address, list of my payment methods, display bill detail
 * @param {*} item Menu Item with a special configuration
 * @param {*} data FlatList data
 * @param {*} isPayment Distinguish between payment method list and address list
 * @param {*} showSheet Display the Acction Sheet for the home page
 * @return {*}
 */
export default function PaymentList({ dispatch }) {
  // const { loading, error, data } = useQuery(FIND_BUYER_PROFILE, {
  //   variables: { buyerId: global.buyerId },
  //   context: {
  //     headers: {
  //       isPrivate: true,
  //     },
  //   },
  //   onCompleted: (res) => {
  //     debugger;
  //   },
  //   onError: (res) => {
  //     debugger;
  //   },
  // });

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
        ListEmptyComponent={
          <TextTip
            textTip="You haven't added any payment  method yet"
            subTextTip="Add a payment method to be able to use it in your next  purchases"
            needButton={true}
            btnMsg="ADD  NEW PAYMENT METHOD"
            onPress={() => {
              NavigationService.navigate("AddPaymentMethodScreen");
            }}
          />
        }
        renderItem={({ item }) => {
          return <PaymentItem item={item} />;
        }}
        keyExtractor={(item, index) => `listItem${index}`}
      />

      {payments.length > 0 && (
        <SafeAreaView
          style={{
            paddingHorizontal: AppConfig.paddingHorizontal,
            marginBottom: vs(20),
            marginTop: vs(20),
          }}
        >
          <View style={{ paddingHorizontal: AppConfig.paddingHorizontal }}>
            <Button
              text="ADD NEW PAYMENT METHOD"
              onPress={() => {
                NavigationService.navigate("AddPaymentMethodScreen");
              }}
            />
          </View>
        </SafeAreaView>
      )}
    </View>
  );
}
