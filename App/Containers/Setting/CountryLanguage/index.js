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

const datas = [
  {
    title: "Country",
    value: "India",
    key: "country",
  },
  {
    title: "Language",
    value: "English",
    key: "language",
  },
];

function index(props) {
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
            <Text style={styles.title}>{item.title}</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={[styles.title, { color: colors.grey60 }]}>
                {item.value}
              </Text>
              <Image
                style={{ width: s(32), height: s(24), resizeMode: "contain" }}
                source={images.userMoreRightImage}
              />
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
