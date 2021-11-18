import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import AppConfig from "../../Config/AppConfig";
import { s, ScaledSheet } from "react-native-size-matters";
import fonts from "../../Themes/Fonts";
import colors from "../../Themes/Colors";
import { AppBar } from "../../Components";
import NavigationService from "../../Navigation/NavigationService";
import { ApplicationStyles } from "../../Themes";
import images from "../../Themes/Images";

function CheckoutAuth(props) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <SafeAreaView
        style={styles.safeArea}
        edges={["top", "right", "left", "bottom"]}
      >
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
              NavigationService.navigate("CheckOutPersonalDetailsScreen");
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
      </SafeAreaView>
    </View>
  );
}

export default CheckoutAuth;
const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderColor: '#f00'
  },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
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
