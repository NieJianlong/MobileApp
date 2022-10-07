import React, { useRef, useState, useContext } from "react";
import { View, Text, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { vs, s } from "react-native-size-matters";
import { AppBar, BottomSheet, Button } from "../../Components";
import styles from "./explanatorystyle";
import colors from "../../Themes/Colors";
import Video from "react-native-video";
import { t } from "react-native-tailwindcss";
import { ActivityIndicator } from "react-native-paper";
const Explanatory = () => {
  return (
    <View style={styles.container}>
      <SafeAreaView
        style={styles.safeArea}
        edges={["top", "right", "left", "bottom"]}
      >
        {ListHeader()}
      </SafeAreaView>
    </View>
  );
};
function ListHeader() {
  const { width, height } = useWindowDimensions();
  const [loading, setLoading] = useState(true);

  return (
    <View style={styles.bodyContainer}>
      <View style={styles.tipContainer}>
        <View
          style={[
            {
              width: width - 32,
              height: 0.58 * (width - 32),
            },
            t.justifyCenter,
            t.itemsCenter,
          ]}
        >
          <Video
            // ref={(ref) => (player = ref)}
            source={{
              uri: "https://staticfiles.salamislicing.in/salamislicing.mp4",
            }}
            onLoad={() => {
              setLoading(false);
            }}
            onLoadStart={() => {
              setLoading(true);
            }}
            style={[t.wFull, t.hFull]}
            resizeMode={"stretch"}
            controls={true}
            repeat
          />
          {loading && (
            <ActivityIndicator
              animating={true}
              color={"red"}
              style={[t.absolute]}
            />
          )}
        </View>
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
