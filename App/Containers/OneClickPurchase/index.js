import React, { useCallback } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { s } from "react-native-size-matters";
import { AppBar, Button, RightButton } from "../../Components";
import styles from "./styles";
import NavigationService from "../../Navigation/NavigationService";
import colors from "../../Themes/Colors";
import AppConfig from "../../Config/AppConfig";
import fonts from "../../Themes/Fonts";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useQuery } from "@apollo/client";
import { PAYMENT_METHODS_BY_ID } from "../../Apollo/queries/queries_user";
import Payments from "../UserInfo/InfoList/Payments";
import { t } from "react-native-tailwindcss";
/**
 * @description: 1 Click purchase Screen
 * @param {*} props
 * @return {*}
 */
function OneClickPurchase(props) {
  const { params } = useRoute();
  const { refetch, data } = useQuery(PAYMENT_METHODS_BY_ID, {
    variables: { buyerId: global.buyerId },
    context: {
      headers: {
        isPrivate: true,
      },
    },
    onCompleted: (res) => {},
    onError: (res) => {},
  });

  const refreshData = useCallback(() => {
    refetch();
  }, [refetch]);
  useFocusEffect(refreshData);
  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={[t.mR6]}>
          <RightButton
            title="NEXT"
            onPress={() => {
              NavigationService.navigate("SelectDeliveryAddressScreen", params);
            }}
          />
        </View>
      ),
    });
  }, [navigation]);
  return (
    <View style={styles.container}>
      <View>
        <View style={[styles.bodyContainer, { paddingBottom: 0 }]}>
          <Text style={[styles.heading2Bold, { fontSize: s(22) }]}>
            1 Click Purchasing preference
          </Text>
          <View style={{ marginTop: 20 }}>
            <Text
              style={{
                color: colors.grey80,
                fontSize: s(14),
                fontFamily: fonts.primary,
              }}
            >{`This is an explanatory text on how this functionality works`}</Text>
          </View>
          <Text
            style={[
              styles.heading2Bold,
              {
                fontSize: s(18),
                marginVertical: AppConfig.paddingHorizontal,
              },
            ]}
          >
            Select a default payment method
          </Text>
        </View>
        <Payments data={data?.paymentDetailsByBuyerId} refetch={refetch} />
      </View>

      <SafeAreaView
        style={{
          position: "absolute",
          bottom: 10,
          right: 0,
          left: 0,
          paddingHorizontal: AppConfig.paddingHorizontal,
        }}
      >
        <Button
          onPress={(callback) => {
            NavigationService.navigate("AddPaymentMethodScreen", {
              callback,
            });
          }}
          textColor="white"
          text="ADD NEW PAYMENT METHOD"
          backgroundColor={colors.grey80}
        />
      </SafeAreaView>
    </View>
  );
}

export default OneClickPurchase;
