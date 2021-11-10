import React from "react";
import { FlatList } from "react-native-gesture-handler";
import AddressItem from "./AddressItem";
import TextTip from "../../../Components/EmptyReminder";
import NavigationService from "../../../Navigation/NavigationService";

/**
 * @description:Display my address, list of my payment methods, display bill detail
 * @param {*} item Menu Item with a special configuration
 * @param {*} data FlatList data
 * @param {*} isPayment Distinguish between payment method list and address list
 * @param {*} showSheet Display the Acction Sheet for the home page
 * @return {*}
 */
export default function Addresses({ data, refetch, isCheckout = false }) {
  return (
    <FlatList
      data={data}
      ListEmptyComponent={
        <TextTip
          textTip="Your address list is empty"
          subTextTip="You haven´t add any personal address yet"
          needButton={true}
          btnMsg="ADD ADDRESS"
          onPress={() => {
            NavigationService.navigate("AddNewAddressScreen", {
              title: "Add new address",
            });
          }}
        />
      }
      renderItem={({ item }) => {
        return (
          <AddressItem item={item} refetch={refetch} isCheckout={isCheckout} />
        );
      }}
      keyExtractor={(item, index) => `listItem${index}`}
    />
  );
}
