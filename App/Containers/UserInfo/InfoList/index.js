import React from "react";
import { ScaledSheet, vs } from "react-native-size-matters";
import { Button, Switch } from "../../../Components";
import AppConfig from "../../../Config/AppConfig";
import { View, FlatList, Text, Image, SafeAreaView } from "react-native";
import colors from "../../../Themes/Colors";
import BillingItem from "./BillingItem";
import PaymentItem from "./PaymentItem";
import AddressItem from "./AddressItem";

/**
 * @description:Display my address, list of my payment methods, display bill detail
 * @param {*} item Menu Item with a special configuration
 * @param {*} data FlatList data
 * @param {*} isPayment Distinguish between payment method list and address list
 * @param {*} showSheet Display the Acction Sheet for the home page
 * @return {*}
 */
function flatListView(item, data, isPayment = false, showSheet = () => {}) {
  const {
    itemActions: { setDefault, doEdit, doDelete },
    key,
  } = item;

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        ListFooterComponent={() => {
          if (key === "Purchasing") {
            return (
              <View
                style={{
                  paddingHorizontal: AppConfig.paddingHorizontal,
                  marginBottom: vs(20),
                  marginTop: vs(20),
                }}
              >
                <Button text={item.extra} onPress={item.onPress}></Button>
              </View>
            );
          } else {
            return null;
          }
        }}
        ListHeaderComponent={() => {
          if (key !== "Billing") {
            return null;
          } else {
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
          }
        }}
        renderItem={({ item }) => {
          if (key === "Billing") {
            return <BillingItem item={item} />;
          } else {
            if (item.itemType === "payment") {
              return (
                <PaymentItem
                  item={item}
                  showSheet={showSheet}
                  setDefault={setDefault}
                  doEdit={doEdit}
                  doDelete={doDelete}
                />
              );
            } else {
              return (
                <AddressItem
                  item={item}
                  showSheet={showSheet}
                  setDefault={setDefault}
                  doEdit={doEdit}
                  doDelete={doDelete}
                />
              );
            }
          }
        }}
        keyExtractor={(item, index) => `listItem${index}`}
      />
      {key !== "Billing" && key !== "Purchasing" && (
        <SafeAreaView
          style={{
            paddingHorizontal: AppConfig.paddingHorizontal,
            marginBottom: vs(20),
            marginTop: vs(20),
          }}
        >
          <Button text={item.extra} onPress={item.onPress}></Button>
        </SafeAreaView>
      )}
    </View>
  );
}
 export default function InfoList(params) {
   
    return  if (addresses.length > 0) {
        component = flatListView(item, addresses, false, deleteItem);
      } else {
        //component = flatListView(addresses);
        component = (
          <TextTip
            {...item}
            callback={() => {
              setAddresses(AddressTestData);
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
          ></TextTip>
        );
      }
}
const styles = ScaledSheet.create({
  container: {
    height: "100@s",
    backgroundColor: colors.background,
  },
  itemBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemTipsContainer: {
    marginTop: "5@vs",
    backgroundColor: colors.secondary01,
    borderRadius: "12@s",
    paddingHorizontal: "10@s",
  },
  setDefaultText: {
    fontFamily: fonts.primary,
    fontSize: "16@s",
    fontWeight: "600",
    color: colors.secondary00,
  },
  itemSetDefault: {
    marginTop: "12@vs",

    height: "24@vs",
    borderRadius: "12@s",
  },
  itemTips: {
    fontSize: "12@s",
    fontFamily: Fonts.primary,
    color: colors.secondary00,
    fontWeight: "400",

    backgroundColor: "transparent",
    textAlign: "center",
  },
  itemTitle: {
    fontSize: "14@s",
    fontFamily: Fonts.primary,
    color: colors.black,
    fontWeight: "600",
  },
  itemSubTitle: {
    fontSize: "14@s",
    fontFamily: Fonts.primary,
    color: colors.grey80,
  },
  paytypeIcon: {
    width: "26@s",
    height: "26@s",
    resizeMode: "contain",
  },
  icon: {
    width: "20@s",
    height: "20@s",
    marginLeft: "12@s",
    resizeMode: "contain",
  },
  editImage: {
    width: "24@s",
    height: "24@s",
    marginLeft: "12@s",
    resizeMode: "contain",
  },
  headerText: {
    color: "white",
  },
  item: {
    marginTop: "15@vs",
    backgroundColor: colors.white,
    borderRadius: "16@s",
    height: "122@vs",
    paddingHorizontal: AppConfig.paddingHorizontal,
    justifyContent: "center",
  },
});
