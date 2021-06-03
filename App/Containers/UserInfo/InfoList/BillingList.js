import React, { useEffect, useState } from "react";

import { Switch } from "../../../Components";
import AppConfig from "../../../Config/AppConfig";
import { View, FlatList } from "react-native";
import TextTip from "../../../Components/EmptyReminder";
import NavigationService from "../../../Navigation/NavigationService";
import BillingItem from "./BillingItem";
import { useQuery } from "@apollo/client";
import { BILLING_DETAIL_BY_BUYERID } from "../../../Apollo/queries/queries_user";

export default function BillingList({ dispatch }) {
  const tip = "You have not added \n billing details yet";
  const [billings, setBillings] = useState([]);
  const { loading, error, data } = useQuery(BILLING_DETAIL_BY_BUYERID, {
    variables: { buyerId: global.buyerId },
    context: {
      headers: {
        isPrivate: true,
      },
    },
    onCompleted: (res) => {},
    onError: (res) => {},
  });
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
            textTip={tip}
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
              <Switch
                label="Use the same info as my personal details"
                onSwitch={() => {}}
              />
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
