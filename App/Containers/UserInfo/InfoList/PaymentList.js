import React, { useCallback, useEffect } from "react";
import { vs } from "react-native-size-matters";
import { Button } from "../../../Components";
import AppConfig from "../../../Config/AppConfig";
import { View, SafeAreaView } from "react-native";
import NavigationService from "../../../Navigation/NavigationService";

import { useQuery } from "@apollo/client";
import { PAYMENT_METHODS_BY_ID } from "../../../Apollo/queries/queries_user";
import { useFocusEffect } from "@react-navigation/native";
import Payments from "./Payments";
/**
 * @description:Display my address, list of my payment methods, display bill detail
 * @param {*} item Menu Item with a special configuration
 * @param {*} data FlatList data
 * @param {*} isPayment Distinguish between payment method list and address list
 * @param {*} showSheet Display the Acction Sheet for the home page
 * @return {*}
 */
export default function PaymentList({ dispatch, xIndex }) {
  const { refetch, data } = useQuery(PAYMENT_METHODS_BY_ID, {
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
      <Payments data={data?.paymentDetailsByBuyerId} refetch={refetch} />
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
