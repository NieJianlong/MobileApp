/*
 * @Author: Jianlong Nie
 * @Date: 2021-01-07 16:12:07
 * @LastEditTime: 2021-01-24 21:00:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MobileApp/App/Containers/UserCenter/index.js
 */
import React, { useCallback, useState, useEffect } from "react";
import { View, StatusBar, TouchableOpacity, DevSettings } from "react-native";
import { s, ScaledSheet, vs } from "react-native-size-matters";
import Colors from "../../Themes/Colors";
import Fonts from "../../Themes/Fonts";
import AppConfig from "../../Config/AppConfig";
import ItemBox from "./ItemBox";
import colors from "../../Themes/Colors";
import UserHeader from "./UserHeader";
import images from "../../Themes/Images";
import NavigationService from "../../Navigation/NavigationService";
import { userProfileVar } from "../../Apollo/cache";
import { useCreateRazorOrder } from "../../hooks/razorOrder";
import Share from "react-native-share";
import { shareOptions } from "../Explore/Components/ShareOptionList";
import { setLocalStorageEmpty } from "../../Apollo/local-storage";
import { Button } from "react-native-paper";
import { t } from "react-native-tailwindcss";

const salamiItem = [
  {
    title: "Salami Credit",
    icon: images.userLogoImage,
    onPress: () => {
      NavigationService.navigate("SalamiCreditScreen");
    },
  },
];
const items = [
  {
    title: "Notifications",
    icon: images.userIconImage,
    onPress: () => {
      NavigationService.navigate("NotificationsScreen");
    },
  },
  {
    title: "Settings",
    icon: images.userSettingImage,
    onPress: () => {
      NavigationService.navigate("SettingScreen");
    },
  },
  {
    title: "Support",
    icon: images.userMediumImage,
    onPress: () => {
      NavigationService.navigate("CustomerSupportScreen");
    },
  },
  {
    title: "Feedback",
    icon: images.userStarImage,
    onPress: () => {
      NavigationService.navigate("FeedbackScreen");
    },
  },
  {
    title: "Legal",
    icon: images.userDocImage,
    onPress: () => {
      NavigationService.navigate("CustomerSupportScreen");
    },
  },
];
const buttons = [
  {
    text: "SHARE APP",
    backgroundColor: colors.grey80,
    onPress: () => {
      Share.open(shareOptions);
    },
  },
  // {
  //   text: "CREATE A SELLER PROFILE",
  //   backgroundColor: colors.grey80,
  //   onPress: () => {},
  // },
];
/**
 * @description: User Center Screen
 * @param {*} props
 * @return {*}
 */
function UserCenter(props) {
  const [serviceItems, setServiceItems] = useState([]);
  const { razorpayCreateOrder, razorOrder } = useCreateRazorOrder();
  // const { loading, error, data } = useQuery(BUYER_PROFILES, {
  //   context: { headers: { isPrivate: true } },
  //   onCompleted: (res) => {
  //
  //   },
  //   onError: (res) => {
  //
  //   },
  // });
  //43aeaddd-de66-45bb-81aa-192f4f5e2b33

  // useEffect(() => {
  //   if (userProfileVar().isAuth) {
  //     setServiceItems([...salamiItem, ...items]);
  //   } else {
  //     setServiceItems(items);
  //   }
  // }, []);
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent={false}
        backgroundColor={colors.background}
      />
      <View style={{ marginTop: vs(10) }}>
        {/* <UserHeader needSafeArea /> */}
      </View>

      {/* All the items usercenter */}
      {/* <View style={styles.itemContainer}>
       
        {serviceItems.map((item, i) => (
          <View key={i}>
            <ItemBox {...item} />
          </View>
        ))}
        {!userProfileVar().isAuth && (
          <View style={{ height: s(94), width: s(94) }} />
        )}
      </View> 
    
     <View style={styles.buttonContainer}>
        {buttons.map((item, i) => (
          <View key={"button" + i} style={{ marginTop: 15 }}>
            <Button
              {...item}
              // onPress={() => {
              //   razorpayCreateOrder();
              // }}
            />
          </View>
        ))}
      </View> */}
      <View style={[t.pX6, t.mT32]}>
        <Button
          mode="outlined"
          onPress={async () => {
            await setLocalStorageEmpty();
            NavigationService.navigate("OnboardingScreen");
            DevSettings.reload();
          }}
        >
          Logout
        </Button>
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  nosign: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: Fonts.primary,
    fontWeight: "bold",
    marginTop: "20@vs",
  },
  buttonContainer: {
    paddingHorizontal: AppConfig.paddingHorizontal,
    height: "130@vs",
    justifyContent: "space-around",
    marginTop: "30@vs",
  },
  itemContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: AppConfig.paddingHorizontal,
    justifyContent: "space-around",
  },
  signbtn: { marginTop: "20@vs" },
  header: {
    backgroundColor: "white",
    justifyContent: "space-around",
    paddingHorizontal: AppConfig.paddingHorizontal,
    paddingBottom: "15@vs",
  },
  container: {
    height: "100%",
    backgroundColor: Colors.background,
  },
});
export default UserCenter;
