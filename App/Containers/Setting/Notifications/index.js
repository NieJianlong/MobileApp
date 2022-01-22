import React from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  Touchable,
} from "react-native";
import AppConfig from "../../../Config/AppConfig";
import { vs, s, ScaledSheet } from "react-native-size-matters";
import fonts from "../../../Themes/Fonts";
import colors from "../../../Themes/Colors";
import images from "../../../Themes/Images";
import NavigationService from "../../../Navigation/NavigationService";
import { Switch } from "../../../Components";

const datas = [
  {
    title: "Activate all",
    value: false,
    key: "Activate",
  },
  {
    title: "Notification",
    value: false,
    key: "ANotification",
  },
  {
    title: "Notification",
    value: true,
    key: "Notification",
  },
];
function index(props) {
  return (
    <ScrollView>
      <View style={{ padding: AppConfig.paddingHorizontal }}>
        <Text
          style={{
            fontFamily: fonts.primary,
            color: colors.grey80,
            fontWeight: "600",
            fontSize: s(16),
          }}
        >
          Control how you get notifications
        </Text>
      </View>
      {datas.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            NavigationService.navigate("SelectCountryOrLanguageScreen", {
              ...item,
            });
          }}
        >
          <View
            style={{
              paddingHorizontal: AppConfig.paddingHorizontal,
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: "white",
              height: vs(46),
              alignItems: "center",
            }}
          >
            <Text
              style={[styles.title, { fontSize: s(14), fontWeight: "normal" }]}
            >
              {item.title}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Switch onSwitch={() => {}}></Switch>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

export default index;
const styles = ScaledSheet.create({
  title: {
    fontFamily: fonts.primary,
    fontSize: "16@s",
    color: colors.black,
    fontWeight: "600",
  },
});
