import React, { useCallback, useEffect, useState } from "react";
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
  PAYMENT_METHODS_BY_ID,
} from "../../../Apollo/queries/queries_user";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
/**
 * @description:Display my address, list of my payment methods, display bill detail
 * @param {*} item Menu Item with a special configuration
 * @param {*} data FlatList data
 * @param {*} isPayment Distinguish between payment method list and address list
 * @param {*} showSheet Display the Acction Sheet for the home page
 * @return {*}
 */
export default function PaymentList({ dispatch, xIndex }) {
  const { loading, error, refetch, data } = useQuery(PAYMENT_METHODS_BY_ID, {
    variables: { buyerId: global.buyerId },
    context: {
      headers: {
        isPrivate: true,
      },
    },
    onCompleted: (res) => {},
    onError: (res) => {},
  });

  const refreshData = useCallback(() => {
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
    <View style={{ flex: 1 }}>
      <FlatList
        data={data?.paymentDetailsByBuyerId}
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
          return <PaymentItem item={item} refetch={refetch} />;
        }}
        keyExtractor={(item, index) => `listItem${index}`}
      />

      {data?.paymentDetailsByBuyerId.length > 0 && (
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
