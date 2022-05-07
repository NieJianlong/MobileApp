import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { View, Text, SafeAreaView, SectionList } from "react-native";
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
import { lowerFirst } from "lodash";
import useRealm from "../../hooks/useRealm";
import { t } from "react-native-tailwindcss";

/**
 * we are coming here from a navigation event
 */
function EditShoppingCart(props) {
  const { params } = useRoute();
  const { realm } = useRealm();
  const [product, setProductFromProps] = useState(params.product);
  const [selected, setSelected] = useState(product.variant);
  const sections = [];
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
      const item = sections.find((i) => i.title === option.key);
      if (!item) {
        sections.push({ title: option.key, data: [currentValue] });
      } else {
        if (!item.data.find((j) => j.value === currentValue.value)) {
          item.data.push(currentValue);
        }
      }
    }
  }
  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Edit details",
      headerRight: () => (
        <View style={[t.mR6]}>
          <RightButton
            title="SAVE"
            onPress={() => {
              NavigationService.goBack();
            }}
          />
        </View>
      ),
    });
  }, [navigation]);
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
      <View style={{ height: metrics.screenHeight - vs(64) }}>
        <SectionList
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
            const optionValue = item.options.find(
              (i) => i.key === section.title
            );
            const selectedOption =
              selected.options?.find((i) => i.key === section.title) ?? null;
            return (
              <View
                style={{
                  paddingHorizontal: AppConfig.paddingHorizontal,
                }}
              >
                <View style={{ height: vs(12) }} />
                <CheckBox
                  defaultValue={selectedOption?.value === optionValue.value}
                  onSwitch={(t) => {
                    setSelected(item);
                  }}
                  hasIcon={false}
                  iconColor={item.color}
                  label={optionValue.value}
                />
                {selectedOption?.value !== optionValue.value && (
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
