import React from "react";
import { FlatList, useWindowDimensions, View } from "react-native";
import { FlatList as GHFlatList } from "react-native-gesture-handler";
import AddressItem from "./AddressItem";
import TextTip from "../../../Components/EmptyReminder";
import NavigationService from "../../../Navigation/NavigationService";
import { t } from "react-native-tailwindcss";

/**
 * @description:Display my address, list of my payment methods, display bill detail
 * @param {*} item Menu Item with a special configuration
 * @param {*} data FlatList data
 * @param {*} isPayment Distinguish between payment method list and address list
 * @param {*} showSheet Display the Acction Sheet for the home page
 * @return {*}
 */
export default function Addresses({
  data,
  refetch,
  isCheckout = false,
  needempty = true,
  onPress,
  isInBottomSheet = false,
  style,
  extraData,
}) {
  const { width } = useWindowDimensions();
  const CustomeFlatList = isInBottomSheet ? GHFlatList : FlatList;
  return (
    <CustomeFlatList
      data={data}
      extraData={extraData}
      contentContainerStyle={[t.pB16, style]}
      showsVerticalScrollIndicator={false}
      style={[{ height: data ? 80 * data?.length : 200 }]}
      ListEmptyComponent={
        needempty ? (
          <View
            style={{
              width: "100%",
              alignItems: "center",
            }}
          >
            <TextTip
              width={width}
              style={{ width: width - 40 }}
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
          </View>
        ) : (
          <View />
        )
      }
      renderItem={({ item }) => {
        return (
          <AddressItem
            item={item}
            refetch={refetch}
            isCheckout={isCheckout}
            onPress={onPress}
          />
        );
      }}
      keyExtractor={(item, index) => `listItem${index}`}
    />
  );
}
