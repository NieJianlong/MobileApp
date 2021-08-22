import React from "react";
import { View, Text } from "react-native";
import { s, vs } from "react-native-size-matters";
s;
import AppConfig from "../../../Config/AppConfig";
import colors from "../../../Themes/Colors";
import styles from "../styles";

function index(props) {
  return (
    <View style={{ padding: AppConfig.paddingHorizontal }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.heading4Bold}>Subtotal (2 items)</Text>
        <Text style={[styles.heading4Bold, { color: colors.primary }]}>
          $1,639.97
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginTop: vs(10),
          justifyContent: "space-between",
        }}
      >
        <Text style={[styles.heading4Regular, { fontSize: s(14) }]}>
          You save
        </Text>
        <Text style={[styles.heading4Regular, { fontSize: s(14) }]}>
          $490 (30%)
        </Text>
      </View>
    </View>
  );
}

export default index;
