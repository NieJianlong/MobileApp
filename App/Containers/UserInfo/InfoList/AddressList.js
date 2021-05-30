import React, { useCallback, useEffect, useState } from "react";
import { vs } from "react-native-size-matters";
import { Button, Switch } from "../../../Components";
import AppConfig from "../../../Config/AppConfig";
import { View, FlatList, Text, Image, SafeAreaView } from "react-native";
import colors from "../../../Themes/Colors";
import AddressItem from "./AddressItem";
import TextTip from "../../../Components/EmptyReminder";
import NavigationService from "../../../Navigation/NavigationService";
import { useQuery } from "@apollo/client";
import { FIND_BUYER_ADDRESS_BY_ID } from "../../../Apollo/queries/queries_user";
import { useFocusEffect } from "@react-navigation/core";
/**
 * @description:Display my address, list of my payment methods, display bill detail
 * @param {*} item Menu Item with a special configuration
 * @param {*} data FlatList data
 * @param {*} isPayment Distinguish between payment method list and address list
 * @param {*} showSheet Display the Acction Sheet for the home page
 * @return {*}
 */
export default function AddressList({ dispatch }) {
  const { loading, error, data, refetch } = useQuery(FIND_BUYER_ADDRESS_BY_ID, {
    variables: {
      buyerId: global.buyerId,
    },
    context: {
      headers: {
        isPrivate: true,
      },
    },
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
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data?.getBuyerAddressesById}
        ListEmptyComponent={
          <TextTip
            textTip="Your address list is empty"
            subTextTip="You haven´t add any personal address yet"
            needButton={true}
            btnMsg="ADD ADDRESS"
            callback={() => {
              dispatch({
                type: "changAlertState",
                payload: {
                  visible: true,
                  message: "New address added.",
                  color: colors.success,
                  title: "Address Added",
                },
              });
            }}
          />
        }
        renderItem={({ item }) => {
          return <AddressItem item={item} refetch={refetch} />;
        }}
        keyExtractor={(item, index) => `listItem${index}`}
      />

      <SafeAreaView
        style={{
          marginBottom: vs(20),
          marginTop: vs(20),
        }}
      >
        <View style={{ paddingHorizontal: AppConfig.paddingHorizontal }}>
          <Button
            text="ADD NEW ADDRESS"
            onPress={() => {
              NavigationService.navigate("AddNewAddressScreen", {
                title: "Add new address",
              });
            }}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}
