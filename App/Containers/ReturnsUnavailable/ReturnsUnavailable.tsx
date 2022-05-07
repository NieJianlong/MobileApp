import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  SafeAreaView,
} from "react-native";
import AppConfig from "../../Config/AppConfig";
import { vs, s, ScaledSheet } from "react-native-size-matters";
import fonts from "../../Themes/Fonts";
import colors from "../../Themes/Colors";
import { AppBar, Button } from "../../Components";
import NavigationService from "../../Navigation/NavigationService";
import images from "../../Themes/Images";
import Content from "./Content";
import { useNavigation } from "@react-navigation/native";
import { t } from "react-native-tailwindcss";

function ReturnsUnavailable() {
  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
      headerRight: () => (
        <View style={[t.mR6]}>
          <TouchableOpacity
            onPress={() => {
              NavigationService.navigate("GroupInfoScreen", {
                type: "returnstatus",
              });
              // NavigationService.goBack();
            }}
          >
            <Image
              style={{
                width: s(25),
                height: s(25),
                tintColor: colors.grey60,
              }}
              source={images.crossMedium}
            />
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
            fontSize: s(24),
            fontFamily: fonts.primary,
            color: colors.black,
            fontWeight: "600",
          }}
        >
          Returns Unavailable
        </Text>
        <Content />
        <View
          style={{
            marginTop: vs(50),
            paddingHorizontal: AppConfig.paddingHorizontal,
          }}
        ></View>
      </View>

      <SafeAreaView
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <View style={{ paddingHorizontal: AppConfig.paddingHorizontal }}>
          <Button
            onPress={() => {
              NavigationService.goBack();
            }}
            color={colors.primary}
            text="RETURN TO ORDER MENU"
          />
        </View>
      </SafeAreaView>
    </View>
  );
}
const styles = ScaledSheet.create({
  title: {
    fontFamily: fonts.primary,
    fontSize: "16@s",
    color: colors.black,
    fontWeight: "600",
  },
});

export default ReturnsUnavailable;
