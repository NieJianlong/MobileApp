import React, { Component, useCallback, useEffect, useState } from "react";
import {
  View,
  StatusBar,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from "react-native";
import { AppBar, Button } from "../../Components";
import styles from "./styles";
import { s, ScaledSheet } from "react-native-size-matters";
import { ApplicationStyles, Colors } from "../../Themes";
import Explanatory from "./explanatory";
import QuickGuide from "./quickguide";
import { t } from "react-native-tailwindcss";

export default function LearnMore(props) {
  const [index, setIndex] = useState(1);
  console.log("index===1", index === 1);
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView
        style={styles.safeArea}
        edges={["top", "right", "left", "bottom"]}
      >
        <AppBar
          showLogo={false}
          onPressBack={() => props.navigation.goBack()}
        />
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
                style={[
                  t.fontPrimary,
                  index === 0 ? t.textWhite : t.textGray600,
                ]}
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
                style={[
                  t.fontPrimary,
                  index === 1 ? t.textWhite : t.textGray600,
                ]}
              >
                {"EXPLANATORY VIDEO"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        {index === 0 ? <QuickGuide /> : <Explanatory />}
      </SafeAreaView>
    </View>
  );
}
