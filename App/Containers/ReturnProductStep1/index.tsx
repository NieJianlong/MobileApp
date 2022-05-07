import React, { useMemo, useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  SafeAreaView,
  TextInput as RNTextInput,
} from "react-native";
import AppConfig from "../../Config/AppConfig";
import { vs, s, ScaledSheet } from "react-native-size-matters";
import fonts from "../../Themes/Fonts";
import colors from "../../Themes/Colors";
import { AppBar, Selector } from "../../Components";
import NavigationService from "../../Navigation/NavigationService";

import { ApplicationStyles } from "../../Themes";
import {
  DeliveryOption,
  ReturnOption,
  useSubmitOrderReturnRequestMutation,
} from "../../../generated/graphql";
import CheckBox from "../Explore/Components/CheckBox";
import { t } from "react-native-tailwindcss";
import { useNavigation, useRoute } from "@react-navigation/native";
import { isEmpty } from "lodash";

function ReturnProductStep1() {
  const { params } = useRoute();
  const [prefer, setPrefer] = useState<ReturnOption>(ReturnOption.GetRefund);
  const [message, setMessage] = useState<string>("");
  console.log("params====================================");
  console.log();

  const returnPolicies = useMemo(
    () =>
      params.product.returnPolicies?.filter(
        (item) => item.name === "allowed_return_reason"
      ) ?? [],
    [params.product]
  );
  const [returnReasonPolicyId, setReturnReasonPolicyId] = useState<string>("");
  const [submitOrderReturnRequest] = useSubmitOrderReturnRequestMutation({
    onCompleted: (res) => {
      if (params?.data?.deliveryOption === DeliveryOption.CourierDelivery) {
        NavigationService.navigate("ReturnInformation");
      }
      if (
        params?.data?.deliveryOption === DeliveryOption.CollectionPointPickup ||
        params?.data?.deliveryOption === DeliveryOption.SellerLocationPickup
      ) {
        NavigationService.navigate("ReturnStatus", {
          type: "return",
          data: { ...params?.data, ...res.submitOrderReturnRequest },
        });
        // NavigationService.navigate("ReturnInformation");
      }
    },
    context: {
      headers: {
        isPrivate: true,
      },
    },
  });
  const submit = () => {
    submitOrderReturnRequest({
      variables: {
        request: {
          buyerId: global.buyerId,
          orderItemId: params?.data?.orderItemId,
          quantity: params?.data?.quantity,
          returnOption: prefer,
          message: message,
          returnReasonPolicyId: returnReasonPolicyId,
        },
      },
    });
  };
  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={[t.mR6]}>
          <TouchableOpacity
            disabled={isEmpty(returnReasonPolicyId)}
            onPress={() => {
              if (prefer == ReturnOption.GetRefund) {
                submit();
              } else {
                NavigationService.navigate("AskForReplacementScreen");
              }
            }}
          >
            <Text
              style={[
                isEmpty(returnReasonPolicyId) ? t.textGray600 : t.textPrimary,
              ]}
            >
              NEXT
            </Text>
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);
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
      <View style={{ paddingHorizontal: AppConfig.paddingHorizontal }}>
        <Text
          style={{
            fontSize: s(22),
            fontFamily: fonts.primary,
            color: colors.black,
            fontWeight: "600",
          }}
        >
          Why do you want to return the product?
        </Text>
      </View>
      <ScrollView
        style={[{ paddingHorizontal: AppConfig.paddingHorizontal }, t.hFull]}
      >
        <Selector
          style={{ marginTop: vs(15), marginBottom: vs(10) }}
          placeholder={"Problem reason goes here"}
          data={returnPolicies.map((item) => item.value)}
          onValueChange={(item) => {
            const currentItem = returnPolicies.find((i) => i.value === item);
            setReturnReasonPolicyId(currentItem.id);
            console.log("currentItem====================================");
            console.log(currentItem);
            console.log("====================================");
            // setShowPrefer(true);
          }}
        />
        <RNTextInput
          multiline={true}
          placeholder="Message"
          onChangeText={(value) => {
            setMessage(value);
          }}
          style={{
            marginTop: vs(16),
            height: vs(160),
            backgroundColor: colors.white,
            borderRadius: s(20),
            borderWidth: 1,
            borderColor: colors.grey20,
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            padding: s(14),
            paddingVertical: s(20),
          }}
        />
        {/* {showPrefer && ( */}
        <View style={{ height: 70, justifyContent: "center" }}>
          <Text
            style={[ApplicationStyles.screen.heading4Bold, { fontSize: s(18) }]}
          >
            Select which option you prefer
          </Text>
        </View>
        <View>
          <View style={{ height: vs(12) }} />
          <CheckBox
            defaultValue={prefer === ReturnOption.GetRefund}
            onSwitch={(t) => {
              setPrefer(ReturnOption.GetRefund);
            }}
            label={"Return the product and get a refund"}
          />
        </View>
        <View>
          <View style={{ height: vs(12) }} />
          <CheckBox
            defaultValue={prefer === ReturnOption.GetReplacement}
            onSwitch={(t) => {
              setPrefer(ReturnOption.GetReplacement);
            }}
            label={"Ask for a replacement"}
          />
        </View>
        {/* <SelectPrefer
            onChangeValue={(item) => {
              setPrefer(item);
            }}
          /> */}
        {/* )} */}
      </ScrollView>
    </View>
  );
}

export default ReturnProductStep1;
const styles = ScaledSheet.create({
  title: {
    fontFamily: fonts.primary,
    fontSize: "16@s",
    color: colors.black,
    fontWeight: "600",
  },
});
