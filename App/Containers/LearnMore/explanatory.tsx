import React, { useRef, useState, useContext } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { vs, s } from "react-native-size-matters";
import { AppBar, BottomSheet, Button } from "../../Components";
import styles from "./explanatorystyle";
import colors from "../../Themes/Colors";
import Video from "react-native-video";
const Explanatory = () => {
  return (
    <View style={styles.container}>
      <SafeAreaView
        style={styles.safeArea}
        edges={["top", "right", "left", "bottom"]}
      >
        {listHeader()}
      </SafeAreaView>
    </View>
  );
};
function listHeader() {
  return (
    <View style={styles.bodyContainer}>
      <View style={styles.tipContainer}>
        <Video
          // ref={(ref) => (player = ref)}
          source={require("../../../assets/video/video.mp4")}
          style={{
            width: "100%",
            height: "40%",
          }}
          resizeMode={"cover"}
          repeat
          muted
        />
        <View style={styles.content}>
          <Text style={[styles.balanceTipTxt, { fontSize: s(24) }]}>
            How our social purchasing
          </Text>
          <Text style={[styles.balanceTipTxt, { fontSize: s(24) }]}>
            system works
          </Text>
          <Text
            style={[
              styles.balanceTipTxt,
              {
                fontSize: s(14),
                color: colors.grey60,
                marginTop: vs(15),
                textAlign: "center",
              },
            ]}
          >
            {
              "Normally shops buy in bulk and sell the product on at a higher price. Social purchasing interrupts this chain!"
            }
          </Text>
          <Text
            style={[
              styles.balanceTipTxt,
              {
                fontSize: s(14),
                color: colors.grey60,
                marginTop: vs(15),
              },
            ]}
          >
            {
              "On SalamiSlicing, wholesaler retailers offer to sell their bulk supply off in single orders: in slices. "
            }
          </Text>
          <Text
            style={[
              styles.balanceTipTxt,
              {
                fontSize: s(14),
                color: colors.grey60,
                marginTop: vs(15),
              },
            ]}
          >
            {
              "By buying these slices with other local people, SalamiSlicing offers wholesale prices on individual units."
            }
          </Text>
        </View>
      </View>
    </View>
  );
}
export default Explanatory;
