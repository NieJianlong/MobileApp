/*
 * @Author: Jianlong Nie
 * @Date: 2021-01-08 17:53:05
 * @LastEditTime: 2021-01-24 14:08:19
 * @LastEditors: Please set LastEditors
 * @Description: UserInfo Horizontal Menu
 * @FilePath: /MobileApp/App/Containers/UserInfo/HorizontalMenu.js
 */
import React, { useState, useContext } from "react";
import { ScaledSheet, vs } from "react-native-size-matters";
import colors from "../../Themes/Colors";
import DynamicTabView from "./DynamicTabView";
import AppConfig from "../../Config/AppConfig";
import { Fonts } from "../../Themes";
import fonts from "../../Themes/Fonts";
import AddressList from "./InfoList/AddressList";
import BillingList from "./InfoList/BillingList";
import PaymentList from "./InfoList/PaymentList";
import OnePurchaseList from "./InfoList/OnePurchaseList";
import images from "../../Themes/Images";
import { View } from "react-native";

/**
 * @description: Tab menu, with animation effect
 * @param {*} props
 * @return {*}
 */
function HorizontalMenu(props) {
  const MenuConfig = [
    // {
    //   title: "1 Click Purchasing",
    //   icon: images.userPurchaseImage,
    //   textTip: "You haven't added a default \n purchase preference yet",
    //   selectedIcon: images.userPurchaseImage,
    //   key: "Purchasing",
    // },
    {
      title: "My Addresses",
      icon: images.userUAddressImage,
      selectedIcon: images.userAddressImage,
      key: "Addresses",
    },
    {
      title: "My Payment Methods",
      icon: images.userUPayImage,
      selectedIcon: images.userPayImage,
      key: "Payment",
    },
    {
      title: "My Billing Details",
      icon: images.userUBillingImage,
      selectedIcon: images.userBillingImage,
      key: "Billing",
    },
  ];

  // selected menu index
  const [defaultIndex, setDefaultIndex] = useState(0);
  const { dispatch } = props;
  return (
    <DynamicTabView
      data={MenuConfig}
      renderTab={(item, index) => {
        switch (item.key) {
          case "Purchasing":
            return (
              <OnePurchaseList dispatch={dispatch} xIndex={defaultIndex} />
            );
          case "Addresses":
            return <AddressList dispatch={dispatch} xIndex={defaultIndex} />;
          case "Payment":
            return <PaymentList dispatch={dispatch} xIndex={defaultIndex} />;
          case "Billing":
            return <BillingList dispatch={dispatch} xIndex={defaultIndex} />;
          default:
            return <View />;
        }
      }}
      defaultIndex={defaultIndex}
      containerStyle={styles.container}
      headerBackgroundColor={"transparent"}
      highlightStyle={{ color: "white" }}
      noHighlightStyle={{ color: "gray" }}
      headerTextStyle={styles.headerText}
      onChangeTab={(index) => {
        setDefaultIndex(index);
      }}
      headerUnderlayColor={"transparent"}
    />
  );
}

export default HorizontalMenu;

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
  container: {
    flex: 1,
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
