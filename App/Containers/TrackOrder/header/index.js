import React from "react";
import { View, Text } from "react-native";
import { vs, s, ScaledSheet } from "react-native-size-matters";
import colors from "../../../Themes/Colors";
import AppConfig from "../../../Config/AppConfig";
import { ApplicationStyles } from "../../../Themes";

function index(props) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: AppConfig.paddingHorizontal,
        height: vs(50),
        alignItems: "center",
        borderBottomColor: "#E6E6E6",
        borderBottomWidth: 0.5,
        width: "100%"
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <Text
          style={[ApplicationStyles.screen.txtRegular, { fontSize: s(16) }]}
        >
          Order
        </Text>
        <Text
          style={[ApplicationStyles.screen.heading3Bold, { fontSize: s(18) }]}
        >
          #4849988
        </Text>
      </View>
      <Text
        style={[
          ApplicationStyles.screen.heading3Bold,
          { fontSize: s(14), color: colors.primary },
        ]}
      >
        GET HELP
      </Text>
    </View>
  );
}

export default index;
