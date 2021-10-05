import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { View, Text, SafeAreaView, StatusBar, SectionList } from "react-native";
import AppConfig from "../../Config/AppConfig";
import { vs, s, ScaledSheet } from "react-native-size-matters";
import fonts from "../../Themes/Fonts";
import colors from "../../Themes/Colors";
import { AppBar, RightButton } from "../../Components";
import NavigationService from "../../Navigation/NavigationService";
import CheckBox from "../Explore/Components/CheckBox";
import metrics from "../../Themes/Metrics";
import { ApplicationStyles } from "../../Themes";

import * as ecM from "./editCartMappers.js";

/**
 * we are coming here from a navigation event
 */
function EditShoppingCart(props) {
  const { params } = useRoute();
  const [product, setProductFromProps] = useState(params.product);
  const sections = [];
  // const colors = { title: "Color", data: [] };
  // const sizes = { title: "Size", data: [] };
  // const styles = { title: "Style", data: [] };
  // sections.push(colors);
  // sections.push(sizes);
  // sections.push(styles);
  for (
    let index = 0;
    index < product.product?.listingVariants?.length;
    index++
  ) {
    const variant = product.product?.listingVariants[index];
    const options = variant.options;
    for (let jndex = 0; jndex < options.length; jndex++) {
      const option = options[jndex];
      const currentValue = {
        ...JSON.parse(JSON.stringify(variant)),
        value: option.value,
      };
      const item = sections.find((item) => item.title === option.key);
      if (item && item.data.indexOf(currentValue) === -1) {
        item.data.push(currentValue);
      } else {
        sections.push({ title: option.key, data: [currentValue] });
      }
      // if (option.key === "Color" && colors.data.indexOf(currentValue) === -1) {
      //   colors.data.push(currentValue);
      // }
      // if (option.key === "Size" && sizes.data.indexOf(currentValue) === -1) {
      //   sizes.data.push(currentValue);
      // }
      // if (option.key === "Style" && colors.data.indexOf(currentValue) === -1) {
      //   styles.data.push(currentValue);
      // }
    }
  }

  const [state, setState] = useState(ecM.hardCodedState);
  if (!product.product?.listingVariants || sections.length === 0) {
    return null;
  }
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
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <SafeAreaView
        style={styles.safeArea}
        edges={["top", "right", "left", "bottom"]}
      >
        <AppBar
          title={"Edit details"}
          rightButton={() => {
            return (
              <RightButton
                title="SAVE"
                onPress={() => {
                  NavigationService.goBack();
                }}
              />
            );
          }}
        />
        <View style={{ height: metrics.screenHeight - vs(64) }}>
          <SectionList
            extraData={state}
            contentContainerStyle={{ paddingBottom: vs(44) }}
            sections={sections}
            renderSectionHeader={({ section: { title } }) => (
              <View
                style={{
                  paddingHorizontal: s(18),
                  height: 50,
                  justifyContent: "center",
                  backgroundColor: "#F8F9FA",
                }}
              >
                <Text
                  style={[
                    ApplicationStyles.screen.heading4Bold,
                    { marginTop: 20 },
                  ]}
                >
                  {title}
                </Text>
              </View>
            )}
            renderItem={({ item, section, separators }, index) => {
              console.log(item);
              console.log(section);
              const sectionTitle = section.title;
              const selectedValue = state.selected[sectionTitle];
              return (
                <View
                  style={{
                    paddingHorizontal: AppConfig.paddingHorizontal,
                  }}
                >
                  <View style={{ height: vs(12) }} />
                  <CheckBox
                    defaultValue={selectedValue === item.title}
                    onSwitch={(t) => {
                      const selectedDic = state.selected;
                      selectedDic[sectionTitle] = item.title;
                      setState({ ...state, selected: { ...selectedDic } });
                    }}
                    hasIcon={section.title === "Color"}
                    iconColor={item.color}
                    label={item.title}
                  />
                  {selectedValue !== item.title && (
                    <Text
                      style={[
                        { position: "absolute", top: vs(25), right: 40 },
                        {
                          color: colors.grey40,
                          fontSize: vs(14),
                          fontFamily: fonts.primary,
                        },
                      ]}
                    >
                      {item.price}
                    </Text>
                  )}
                </View>
              );
            }}
            keyExtractor={(item, index) => `ass${index}`}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

export default EditShoppingCart;
const styles = ScaledSheet.create({
  title: {
    fontFamily: fonts.primary,
    fontSize: "16@s",
    color: colors.black,
    fontWeight: "600",
  },
});
