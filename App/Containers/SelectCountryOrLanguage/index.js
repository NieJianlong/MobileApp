import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  FlatList,
} from "react-native";
import AppConfig from "../../Config/AppConfig";
import { vs, s, ScaledSheet } from "react-native-size-matters";
import fonts from "../../Themes/Fonts";
import colors from "../../Themes/Colors";
import { AppBar, RightButton, SearchBox } from "../../Components";
import NavigationService from "../../Navigation/NavigationService";
import CheckBox from "../Explore/Components/CheckBox";
import metrics from "../../Themes/Metrics";
import { useNavigation, useRoute } from "@react-navigation/native";
import { t } from "react-native-tailwindcss";

const countries = () => ["India"];

const languages = () => ["English"];

function SelectCountryOrLanguage(props) {
  const { params } = useRoute();
  const { key } = params;
  const [selectValue, setSelectValue] = useState(
    key == "country" ? countries()[0] : languages()[0]
  );
  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: `Select a ${key}`,
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
        <View style={{ paddingHorizontal: AppConfig.paddingHorizontal }}>
          <SearchBox placeholder={`Search for a ${key}`} />
        </View>

        <FlatList
          contentContainerStyle={{ paddingBottom: vs(44) }}
          data={key == "country" ? countries() : languages()}
          renderItem={({ item }, index) => {
            return (
              <View style={{ paddingHorizontal: AppConfig.paddingHorizontal }}>
                <View style={{ height: vs(12) }} />
                <CheckBox
                  defaultValue={selectValue == item}
                  onSwitch={(t) => setSelectValue(item)}
                  label={item}
                />
              </View>
            );
          }}
          keyExtractor={(item, index) => `ass${index}`}
        />
      </View>
    </View>
  );
}

export default SelectCountryOrLanguage;
const styles = ScaledSheet.create({
  title: {
    fontFamily: fonts.primary,
    fontSize: "16@s",
    color: colors.black,
    fontWeight: "600",
  },
});
