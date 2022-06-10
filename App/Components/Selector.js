import React, { Component, useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity as RNTouchableOpacity,
  Platform,
} from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { Fonts, Colors, Images, ApplicationStyles } from "../Themes";

import { TouchableOpacity as GHTouchableOpacity } from "react-native-gesture-handler";
import { t } from "react-native-tailwindcss";
import { SimpleLineIcons } from "@expo/vector-icons";

const TouchableOpacity =
  Platform.OS === "ios" ? RNTouchableOpacity : GHTouchableOpacity;
//selector component, or picker to select from a list
function Selector(props) {
  const [active, setActive] = useState(false);
  console.log({ active });
  const [value, setValue] = useState(props.value || "");

  const { style, showError, title, data, placeholder } = props;
  return (
    <View>
      <View
        style={[styles.container, style, showError && styles.errorContainer]}
      >
        <TouchableOpacity onPress={() => setActive(!active)}>
          <Text
            style={[
              styles.txtPlaceholder,
              value !== "" && { color: Colors.black },
            ]}
          >
            {value !== "" ? value : placeholder}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActive(!active)}
          style={[t.bgBlue200]}
        >
          {/* ../Images/arrow_medium_left.png */}
          <SimpleLineIcons name="arrow-down" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {active &&
        data.map((item, index) => (
          <TouchableOpacity
            key={index.toString()}
            onPress={() => {
              setValue(item);
              setActive(false);
              if (typeof props.onValueChange === "function") {
                props.onValueChange(item);
              }
            }}
            style={styles.itemContainer}
          >
            <Text style={styles.itemText}>{item}</Text>
          </TouchableOpacity>
        ))}
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    height: "50@vs",
    backgroundColor: Colors.white,
    borderRadius: "30@s",
    borderWidth: 1,
    borderColor: Colors.grey20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "20@s",
  },
  errorContainer: {
    borderColor: Colors.error,
  },
  errorText: {
    fontFamily: Fonts.primary,
    color: Colors.error,
    fontSize: "14@s",
    marginTop: "3@vs",
    marginLeft: "15@s",
  },
  txtTitle: {
    ...ApplicationStyles.screen.heading6Bold,
    color: Colors.grey40,
  },
  txtValue: {
    ...ApplicationStyles.screen.heading5Bold,
  },
  txtPlaceholder: {
    ...ApplicationStyles.screen.txtRegular,
    color: Colors.grey40,
  },
  icArrow: {
    width: "22@s",
    height: "22@s",
    tintColor: Colors.grey60,
    transform: [{ rotate: "270deg" }],
  },
  itemContainer: {
    paddingVertical: "7@vs",
    paddingLeft: "20@s",
  },
  itemText: {
    ...ApplicationStyles.screen.heading5Regular,
  },
});
export default Selector;
