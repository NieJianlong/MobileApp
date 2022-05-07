import React, { useState } from "react";
import { View, Text, SafeAreaView, StatusBar, FlatList } from "react-native";
import AppConfig from "../../Config/AppConfig";
import { vs, s, ScaledSheet } from "react-native-size-matters";
import fonts from "../../Themes/Fonts";
import colors from "../../Themes/Colors";
import { AppBar, Button } from "../../Components";
import NavigationService from "../../Navigation/NavigationService";
import CheckBox from "../AskForReplacement/CheckBox";
import Summary from "./Summary";
import {
  RefundMethod,
  ReturnOption,
  useSubmitOrderReturnRequestMutation,
} from "../../../generated/graphql";
import { useRoute } from "@react-navigation/native";

const countries = [
  {
    label: "Shipping method",
    sublabel: "Need to print label",
    extra: "FREE",
  },
  {
    label: "Shipping method",
    sublabel: "Need to print label",
    extra: "₹3.00",
  },
];

function ReturnProductStep2(props) {
  const [selectValue, setSelectValue] = useState(countries[0]);
  const { params } = useRoute();
  console.log("params====================================");
  console.log(params);
  console.log("====================================");
  const [submitOrderReturnRequest] = useSubmitOrderReturnRequestMutation();
  const submit = () => {
    submitOrderReturnRequest({
      variables: {
        request: {
          buyerId: global.buyerId,
          orderItemId: params.data.orderItemId,
          quantity: params.data.quantity,
          returnOption: params.returnOption,
          refundMethod: params.refundMethod,
          message: params.message,
        },
      },
    });
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <SafeAreaView
        style={styles.safeArea}
        edges={["top", "right", "left", "bottom"]}
      >
        <FlatList
          contentContainerStyle={{ paddingBottom: vs(44) }}
          data={countries}
          ListHeaderComponent={
            <View style={{ paddingHorizontal: AppConfig.paddingHorizontal }}>
              <Text
                style={{
                  fontSize: s(24),
                  fontFamily: fonts.primary,
                  color: colors.black,
                  fontWeight: "600",
                }}
              >
                Select a shipping method
              </Text>
            </View>
          }
          renderItem={({ item }, index) => {
            return (
              <View style={{ paddingHorizontal: AppConfig.paddingHorizontal }}>
                <View style={{ height: vs(12) }} />
                <CheckBox
                  defaultValue={selectValue == item}
                  onSwitch={(t) => setSelectValue(item)}
                  {...item}
                />
              </View>
            );
          }}
          keyExtractor={(item, index) => `ass${index}`}
        />
      </SafeAreaView>
      <SafeAreaView
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <Summary />
        <View style={{ paddingHorizontal: AppConfig.paddingHorizontal }}>
          <Button
            onPress={() => {
              submit();
              // NavigationService.navigate("ReturnProductStep3Screen");
            }}
            color={colors.primary}
            text="CONFIRM THE RETURN"
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

export default ReturnProductStep2;
const styles = ScaledSheet.create({
  title: {
    fontFamily: fonts.primary,
    fontSize: "16@s",
    color: colors.black,
    fontWeight: "600",
  },
});
