import React, { useState } from "react";
import { View, Text, SafeAreaView, FlatList } from "react-native";
import AppConfig from "../../Config/AppConfig";
import { vs, s, ScaledSheet } from "react-native-size-matters";
import fonts from "../../Themes/Fonts";
import colors from "../../Themes/Colors";
import { AppBar, Button } from "../../Components";
import NavigationService from "../../Navigation/NavigationService";
import CheckBox from "./CheckBox";

const countries = [
  {
    label: "Shipping method",
    sublabel: "Need to print label",
    extra: "FREE",
  },
  {
    label: "Shipping method",
    sublabel: "Need to print label",
    extra: "₹3.00",
  },
];

function AskForReplacement(props) {
  const [selectValue, setSelectValue] = useState(countries[0]);
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
      <FlatList
        contentContainerStyle={{ paddingBottom: vs(44) }}
        data={countries}
        ListHeaderComponent={
          <View style={{ paddingHorizontal: AppConfig.paddingHorizontal }}>
            <Text
              style={{
                fontSize: s(24),
                fontFamily: fonts.primary,
                color: colors.black,
                fontWeight: "600",
              }}
            >
              Select a shipping method
            </Text>
          </View>
        }
        renderItem={({ item }, index) => {
          return (
            <View style={{ paddingHorizontal: AppConfig.paddingHorizontal }}>
              <View style={{ height: vs(12) }} />
              <CheckBox
                defaultValue={selectValue == item}
                onSwitch={(t) => setSelectValue(item)}
                {...item}
              />
            </View>
          );
        }}
        keyExtractor={(item, index) => `ass${index}`}
      />

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
              NavigationService.navigate("ReturnProductStep3Screen");
            }}
            color={colors.primary}
            text="CONFIRM THE RETURN"
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

export default AskForReplacement;
const styles = ScaledSheet.create({
  title: {
    fontFamily: fonts.primary,
    fontSize: "16@s",
    color: colors.black,
    fontWeight: "600",
  },
});
