import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { ApplicationStyles } from "../../../Themes";
import { useQuery } from "@apollo/client";
import { WALLET_BALANCE } from "../../../hooks/gql";
import images from "../../../Themes/Images";
import { ScaledSheet, vs } from "react-native-size-matters";
import colors from "../../../Themes/Colors";
import AppConfig from "../../../Config/AppConfig";
import fonts from "../../../Themes/Fonts";

const PaymentOptions = () => {
  const [displayData, setDisplayData] = useState({
    icon: images.userUPayImage,
    title: "Payment",
    subtitle: "Salami Wallet",
    subtitle1: images.userLogoImage,
    type: "Payment",
  });
  const { data } = useQuery(WALLET_BALANCE, {
    context: {
      headers: {
        isPrivate: true,
      },
      onCompleted: (res) => {
        console.log(res);
      },
      onError: (res) => {
        console.log(res);
      },
    },
  });
  console.log(
    "Data In Wallet Balance",
    data?.getBuyerSalamiWalletBalance,
    displayData
  );
  return (
    <View>
      <Text style={ApplicationStyles.screen.heading4Bold}>Payment Options</Text>
      <View style={[styles.item, { height: vs(80) }]}>
        {/*<View style={{ flexDirection: "row", alignItems: "center" }}>*/}
        {/*  <Image style={styles.paytypeIcon} source={displayData.icon} />*/}
        {/*  <Text style={ApplicationStyles.screen.heading5Bold}>*/}
        {/*    {displayData.title}*/}
        {/*  </Text>*/}
        {/*</View>*/}
        <View style={{ flexDirection: "row" }}>
          <Image style={styles.walletIcon} source={displayData.subtitle1} />
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={styles.infoTextView}>
              <Text style={styles.title}>{displayData.subtitle}</Text>
              <Text style={styles.itemSubTitle}>
                {data?.getBuyerSalamiWalletBalance?.walletBalance.toFixed(2)}
              </Text>
            </View>
            <View style={{ justifyContent: "center" }}>
              <Text style={styles.selectText}>SELECT</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  item: {
    marginTop: "15@vs",
    backgroundColor: colors.white,
    borderRadius: "16@s",
    height: "122@vs",
    paddingHorizontal: AppConfig.paddingHorizontal,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: fonts.primary,
    fontSize: "16@s",
    color: colors.black,
    fontWeight: "600",
  },
  infoTextView: {
    marginLeft: "2@s",
  },
  itemSubTitle: {
    fontSize: "14@s",
    fontFamily: fonts.primary,
    color: colors.grey80,
  },
  walletIcon: {
    width: "30@s",
    height: "30@s",
    resizeMode: "contain",
  },
  icon: {
    width: "20@s",
    height: "20@s",
    // marginLeft: "12@s",
    resizeMode: "contain",
  },
  selectText: {},
});

export default PaymentOptions;
