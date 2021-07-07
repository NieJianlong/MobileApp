import React from "react";
import { FlatList } from "react-native";
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
export default function Payments({ data, refetch }) {
  return (
    <FlatList
      data={data}
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
  );
}
