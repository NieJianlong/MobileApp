import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
} from "react-native";

import BaseScreen from "../BaseScreen";

import AppConfig from "../../Config/AppConfig";
import { s, ScaledSheet } from "react-native-size-matters";
import fonts from "../../Themes/Fonts";
import colors from "../../Themes/Colors";
import { AppBar } from "../../Components";
import NavigationService from "../../Navigation/NavigationService";
import { ApplicationStyles } from "../../Themes";
import { Page_CheckoutGuestOrderDetail } from "../../Navigation/const";

function CheckoutAuth(props) {
  return (
    <BaseScreen {...props}>
      <AppBar />
      <View
        style={styles.item_wrapper}
      >
        <TouchableOpacity
          onPress={() => {
            NavigationService.navigate("LoginScreen", {
              callback: () => {
                NavigationService.navigate("CheckOutPersonalDetailsScreen");
              },
            });
          }}
        >
          <View style={{...styles.item_container, borderWidth: s(4)}}>
            <Text style={ApplicationStyles.screen.heading2Bold}>Sign In</Text>
            <Text style={styles.text}>Use your saved addresses and information for a faster checkout experience!</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            NavigationService.navigate("CheckOutPersonalDetailsScreen");
          }}
        >
          <View style={{...styles.item_container, borderWidth: s(2)}}>
            <Text style={ApplicationStyles.screen.heading2Bold}>
              Register
            </Text>
            <Text
              style={styles.text}
            >
              Don’t have an account? Make one today to save addresses and checkout faster in the future!
            </Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={() => {
            NavigationService.navigate(Page_CheckoutGuestOrderDetail);
          }}
        >
          <View style={{...styles.item_container, borderWidth: s(2), borderColor: colors.grey60}}>
            <Text style={ApplicationStyles.screen.heading2Bold}>
              Continue as guest
            </Text>
            <Text
              style={styles.text}
            >
              Requires only the mandatory information for your order. Great for trying out SalamiSlicing!
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
    marginTop: "18@s"
  },
  item_wrapper: {
    flex: 1,
    paddingHorizontal: AppConfig.paddingHorizontal,
    justifyContent: 'space-evenly'
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
