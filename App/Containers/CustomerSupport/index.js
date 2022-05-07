import React, { useContext, useState, useCallback } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TextInput as RNTextInput,
  Linking,
  TouchableOpacity,
} from "react-native";
import AppConfig from "../../Config/AppConfig";
import { vs, s, ScaledSheet } from "react-native-size-matters";
import fonts from "../../Themes/Fonts";
import colors from "../../Themes/Colors";
import { AppBar, RightButton, Selector, TextInput } from "../../Components";
import NavigationService from "../../Navigation/NavigationService";
import { AlertContext } from "../Root/GlobalContext";

function CustomerSupport(props) {
  const { dispatch } = useContext(AlertContext);
  const [mstate, setMstate] = useState("AAA");

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
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                "mailto:somethingemail@gmail.com?subject=abcdefg&body=body"
              )
                .then((res) => {
                  console.log("RESSSSSSSSSSSS OPEN ", res);
                })
                .catch((err) => {
                  console.log("ERRRRRRRRRRR LINKING", err);
                })
            }
          >
            <Text>{"support mail: vk@gmail.com"}</Text>
          </TouchableOpacity>
        </View>

        {/* <View style={{ paddingHorizontal: AppConfig.paddingHorizontal }}>
          <Text
            style={{
              fontSize: s(24),
              fontFamily: fonts.primary,
              color: colors.black, vablio
              fontWeight: "bold",
            }}
          >
            How may we help you?
          </Text>
        </View>
        <View style={{ paddingHorizontal: AppConfig.paddingHorizontal }}>
          <Selector
            style={{ marginVertical: vs(10) }}
            placeholder={"Problem reason goes here"}
            value={mstate}
            data={["AAA", "BBB", "CCC"]}
            onValueChange={(text) => setMstate(text)}
          />

          <RNTextInput
            multiline={true}
            placeholder="Message"
            style={{
              marginTop: vs(16),
              textAlignVertical: "top",
              height: vs(160),
              backgroundColor: colors.white,
              borderRadius: s(20),
              borderWidth: 1,
              borderColor: colors.grey20,
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "flex-start",
              padding: s(14),
              paddingVertical: s(20),
            }}
          />
        </View> */}
      </SafeAreaView>
    </View>
  );
}

export default CustomerSupport;
const styles = ScaledSheet.create({
  title: {
    fontFamily: fonts.primary,
    fontSize: "16@s",
    color: colors.black,
    fontWeight: "600",
  },
});
