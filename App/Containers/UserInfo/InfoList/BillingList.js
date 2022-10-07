import React, { useEffect } from "react";
import { Switch } from "../../../Components";
import AppConfig from "../../../Config/AppConfig";
import { View, ScrollView, SafeAreaView } from "react-native";
import TextTip from "../../../Components/EmptyReminder";
import NavigationService from "../../../Navigation/NavigationService";
import BillingItem from "./BillingItem";
import { useQuery } from "@apollo/client";
import { BILLING_DETAIL_BY_BUYERID } from "../../../Apollo/queries/queries_user";
import PubSub from "pubsub-js";
import { t } from "react-native-tailwindcss";

export default function BillingList({ dispatch }) {
  const tip = "You have not added \n billing details yet";
  const { loading, error, refetch, data } = useQuery(
    BILLING_DETAIL_BY_BUYERID,
    {
      variables: { buyerId: global.buyerId },
      context: {
        headers: {
          isPrivate: true,
        },
      },
    }
  );
  // if (data) {
  //   if (data?.billingDetailsByBuyerId.length > 0) {
  //     console.log("====================================");
  //     console.log(data?.billingDetailsByBuyerId);
  //     console.log("====================================");
  //     const billingDetails = {
  //       ...data?.billingDetailsByBuyerId[0],
  //       ...data?.billingDetailsByBuyerId[0].billingAddress,
  //     };
  //     // setBillings(billingDetails);
  //   }
  // }
  useEffect(() => {
    let refresh = PubSub.subscribe("refresh-billing-detail", () => {
      refetch();
    });
    return () => {
      PubSub.unsubscribe(refresh);
    };
  });

  useEffect(() => {
    let refresh = PubSub.subscribe("go-edit-billing-detail", () => {
      NavigationService.navigate("AddBillingDetailsScreen", {
        title: "Edit billing details",
        billingDetails: {
          ...data?.billingDetailsByBuyerId[0],
          ...data?.billingDetailsByBuyerId[0].billingAddress,
        },
      });
    });
    return () => {
      PubSub.unsubscribe(refresh);
    };
  });

  useEffect(() => {
    if (data?.billingDetailsByBuyerId.length > 0) {
      dispatch({
        type: "rightButtonShow",
        payload: true,
      });
    }
  }, [dispatch, data?.billingDetailsByBuyerId.length]);
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          marginTop: 20,
          paddingHorizontal: AppConfig.paddingHorizontal,
        }}
      >
        <Switch
          label="Use the same info as default delivery address"
          onSwitch={() => {}}
        />
      </View>
      {data?.billingDetailsByBuyerId.length > 0 ? (
        <SafeAreaView>
          <ScrollView contentContainerStyle={[t.pB8]}>
            {Object.entries({
              ...data?.billingDetailsByBuyerId[0],
              ...data?.billingDetailsByBuyerId[0].billingAddress,
            }).map((item) => {
              if (
                item[0] === "firstName" ||
                item[0] === "lastName" ||
                item[0] === "email" ||
                item[0] === "phoneNumber" ||
                item[0] === "villageArea" ||
                item[0] === "flat" ||
                item[0] === "townCity" ||
                item[0] === "provinceState" ||
                item[0] === "pinCode" ||
                item[0] === "country" ||
                item[0] === "taxCode" ||
                item[0] === "houseNumber" ||
                item[0] === "company"
              ) {
                let item1 = item;
                if (item[0] === "villageArea") {
                  item1[0] = "streetName";
                }
                if (item[0] === "houseNumber") {
                  item1[0] = "streetNum";
                }
                return <BillingItem item={item} />;
              }
              return null;
            })}
          </ScrollView>
        </SafeAreaView>
      ) : (
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
      )}
    </View>
  );
}
