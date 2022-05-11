import React, { useEffect } from "react";
import { View, TouchableOpacity, Text } from "react-native";

import BaseScreen from "../BaseScreen";

import { s, ScaledSheet } from "react-native-size-matters";
import fonts from "../../Themes/Fonts";
import colors from "../../Themes/Colors";
import { AppBar } from "../../Components";
import NavigationService from "../../Navigation/NavigationService";
import { ApplicationStyles } from "../../Themes";
import {
  Page_BillingDetails,
  Page_CheckoutGuestOrderDetail,
} from "../../Navigation/const";
import useRegister from "../../hooks/useRegister";

function CheckoutAuth(props) {
  const { setRegister } = useRegister();
  console.log("props?.route?.params?.product", props?.route?.params?.product);
  useEffect(() => {
    NavigationService.navigate(Page_CheckoutGuestOrderDetail, {
      product: props?.route?.params?.product,
      items: props?.route?.params?.items,
      from: props?.route?.params?.from,
      availbleList: props?.route?.params?.availbleList,
    });
  }, []);
  return <View />;
  return (
    <BaseScreen {...props}>
      <View style={styles.item_wrapper}>
        <TouchableOpacity
          onPress={() => {
            NavigationService.navigate("LoginScreen", {
              callback: () => {
                NavigationService.navigate("CheckOutPersonalDetailsScreen");
              },
            });
          }}
        >
          <View style={{ ...styles.item_container, borderWidth: s(4) }}>
            <Text style={ApplicationStyles.screen.heading2Bold}>Sign In</Text>
            <Text style={styles.text}>
              Use your saved addresses and information for a faster checkout
              experience!
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            NavigationService.navigate("RegisterGuestBuyerToBuyer");
            // setRegister({ visibleRegister: true });
          }}
        >
          <View style={{ ...styles.item_container, borderWidth: s(2) }}>
            <Text style={ApplicationStyles.screen.heading2Bold}>Register</Text>
            <Text style={styles.text}>
              Don’t have an account? Make one today to save addresses and
              checkout faster in the future!
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            NavigationService.navigate(Page_CheckoutGuestOrderDetail, {
              product: props?.route?.params?.product,
              items: props?.route?.params?.items,
              from: props?.route?.params?.from,
              availbleList: props?.route?.params?.availbleList,
            });
          }}
        >
          <View
            style={{
              ...styles.item_container,
              borderWidth: s(2),
              borderColor: colors.grey60,
            }}
          >
            <Text style={ApplicationStyles.screen.heading2Bold}>
              Continue as guest
            </Text>
            <Text style={styles.text}>
              Requires only the mandatory information for your order. Great for
              trying out SalamiSlicing!
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </BaseScreen>
  );
}

export default CheckoutAuth;
const styles = ScaledSheet.create({
  text: {
    fontFamily: fonts.primary,
    fontSize: "14@s",
    color: colors.grey60,
    fontWeight: "400",
    marginTop: "18@s",
  },
  item_wrapper: {
    flex: 1,
    marginRight: s(-26),
    marginLeft: s(56),
    justifyContent: "space-evenly",
  },
  item_container: {
    backgroundColor: "white",
    padding: s(24),
    borderRadius: s(16),
    height: 160,
    justifyContent: "center",
    borderColor: colors.primary,
  },
});
