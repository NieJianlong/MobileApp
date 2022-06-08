import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";
import { Colors } from "../../Themes";
import Explanatory from "./explanatory";
import QuickGuide from "./quickguide";
import { t } from "react-native-tailwindcss";
import { useRoute } from "@react-navigation/native";

export default function LearnMore(props) {
  const { params } = useRoute();
  const [index, setIndex] = useState(params?.tab ?? 0);
  console.log("index===1", index === 1);
  return (
    <View style={styles.container}>
      <View style={styles.mainView}>
        <TouchableOpacity
          onPress={() => {
            setIndex(0);
            console.log("index", index);
          }}
        >
          <View
            style={[
              styles.guideView,
              index === 0
                ? { backgroundColor: Colors.secondary00 }
                : { backgroundColor: Colors.white },
            ]}
          >
            <Text
              style={[t.fontPrimary, index === 0 ? t.textWhite : t.textGray600]}
            >
              {"QUICK GUIDE"}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setIndex(1);
          }}
        >
          <View
            style={[
              styles.videoView,
              index === 1
                ? { backgroundColor: Colors.secondary00 }
                : { backgroundColor: Colors.white },
            ]}
          >
            <Text
              style={[t.fontPrimary, index === 1 ? t.textWhite : t.textGray600]}
            >
              {"EXPLANATORY VIDEO"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      {index === 0 ? <QuickGuide /> : <Explanatory />}
    </View>
  );
}
