import React, { useEffect, useState } from "react";
import { vs } from "react-native-size-matters";
import { Button, Switch } from "../../../Components";
import AppConfig from "../../../Config/AppConfig";
import { View, FlatList, Text, Image, SafeAreaView } from "react-native";
import colors from "../../../Themes/Colors";
import AddressItem from "./AddressItem";
import TextTip from "../../../Components/EmptyReminder";
import NavigationService from "../../../Navigation/NavigationService";
import BillingItem from "./BillingItem";

export default function BillingList({ dispatch }) {
  const [billings, setBillings] = useState([]);
  useEffect(() => {
    if (billings.length > 0) {
      dispatch({
        type: "rightButtonShow",
        payload: true,
      });
    }
  }, [dispatch, billings]);
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={billings}
        ListEmptyComponent={
          <TextTip
            textTip="You have not added \n billing details yet"
            subTextTip="Add your billing details to use in your next purchase"
            needButton={true}
            btnMsg="ADD BILLING DETAILS"
            onPress={() => {
              NavigationService.navigate("AddBillingDetailsScreen", {
                title: "Please enter your billing details",
              });
            }}
          />
        }
        ListHeaderComponent={() => {
          return (
            <View
              style={{
                marginTop: 20,
                paddingHorizontal: AppConfig.paddingHorizontal,
              }}
            >
              <Switch label="Use the same info as my personal details"></Switch>
            </View>
          );
        }}
        renderItem={({ item }) => {
          return <BillingItem item={item} />;
        }}
        keyExtractor={(item, index) => `listItem${index}`}
      />
    </View>
  );
}
