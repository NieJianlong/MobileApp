import React, { useMemo } from "react";
import { View, TouchableOpacity, Text, SafeAreaView } from "react-native";
import AppConfig from "../../Config/AppConfig";
import { vs, s, ScaledSheet } from "react-native-size-matters";
import fonts from "../../Themes/Fonts";
import colors from "../../Themes/Colors";
import { Button } from "../../Components";
import { ApplicationStyles } from "../../Themes";
import { useCreateOrder } from "../../hooks/useCreateOrder";
import { useGetBuyerSalamiWalletBalanceQuery } from "../../../generated/graphql";
import BigNumber from "bignumber.js";
import useOrderInfo from "../../hooks/useOrderInfo";

function InSufficientSalamiCredit(props) {
  const { createOrder } = useCreateOrder();
  const { orderInfo } = useOrderInfo();
  const { data } = useGetBuyerSalamiWalletBalanceQuery({
    context: {
      headers: {
        isPrivate: true,
      },
    },
  });
  const balance = useMemo(() => {
    if (data) {
      const remoteBalance =
        data?.getBuyerSalamiWalletBalance?.walletBalance ?? 0;
      const remoteGiftBalance =
        data?.getBuyerSalamiWalletBalance?.giftBalance ?? 0;
      const walletBalance = parseFloat(
        new BigNumber(remoteBalance + remoteGiftBalance).toFixed(2)
      );
      return walletBalance;
    }
    return 0.0;
  }, [data]);
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
      <SafeAreaView
        style={styles.safeArea}
        edges={["top", "right", "left", "bottom"]}
      >
        <View style={{ paddingHorizontal: AppConfig.paddingHorizontal }}>
          <Text
            style={{
              fontSize: s(24),
              fontFamily: fonts.primary,
              color: colors.black,
              fontWeight: "600",
            }}
          >
            Pay rest of the amount
          </Text>
          <View>
            <View style={[styles.item, { height: vs(64) }]}>
              <View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.itemTitle}>Salami Credit</Text>
                </View>
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.itemSubTitle}>{"₹ " + balance}</Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity>
                <Text
                  style={[
                    ApplicationStyles.screen.subtitle,
                    { color: colors.grey60 },
                  ]}
                ></Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <Text style={styles.title}>Add a payment</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={ApplicationStyles.screen.heading2Bold}>
                  {"₹ " +
                    `${
                      orderInfo.currentBilling +
                      orderInfo.deliveryFess -
                      balance
                    }`}
                </Text>
                <Text
                  style={[
                    ApplicationStyles.screen.subtitle,
                    { marginTop: 10, color: colors.grey60 },
                  ]}
                >
                  left
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              height: vs(80),
              width: "100%",
              paddingHorizontal: AppConfig.paddingHorizontal,
              paddingTop: vs(15),
            }}
          >
            <Button
              onPress={() => {
                createOrder({
                  data: undefined,
                  isFromInSufficientSalamiCreditScreen: true,
                });
              }}
              text={"Pay"}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

export default InSufficientSalamiCredit;
const styles = ScaledSheet.create({
  title: {
    fontFamily: fonts.primary,
    fontSize: "16@s",
    color: colors.black,
    fontWeight: "600",
  },
  item: {
    marginTop: "15@vs",
    backgroundColor: colors.white,
    borderRadius: "16@s",
    height: "122@vs",
    paddingHorizontal: AppConfig.paddingHorizontal,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 2,
    borderColor: "#409AEF",
  },
  itemTitle: {
    fontSize: "14@s",
    fontFamily: fonts.primary,
    color: colors.black,
    fontWeight: "600",
  },
  itemSubTitle: {
    fontSize: "14@s",
    fontFamily: fonts.primary,
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
});
