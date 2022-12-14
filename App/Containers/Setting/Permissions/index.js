import React, { useState } from "react";
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
import { MaterialTextInput, Switch, TextInput } from "../../../Components";

const datas = [
  {
    title: "Activate all",
    value: false,
    key: "Activate",
  },
  {
    title: "Show my picture",
    value: false,
    key: "ANotification",
  },
  {
    title: "Display name for chat",
    value: true,
    key: "Notification",
  },
];
function index(props) {
  const [value, setValue] = useState("J.M");
  return (
    <ScrollView>
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
              <Switch onSwitch={() => {}} />
            </View>
          </View>
        </TouchableOpacity>
      ))}
      <View style={{ padding: AppConfig.paddingHorizontal }}>
        <MaterialTextInput
          onChangeText={(text) => {
            setValue(text);
          }}
          value={value}
          placeholder="Name displayed on chat"
        />
      </View>
    </ScrollView>
  );
}

export default index;
const styles = ScaledSheet.create({
  title: {
    fontFamily: fonts.primary,
    fontSize: "16@s",
    color: colors.black,
    fontWeight: "400",
  },
});
