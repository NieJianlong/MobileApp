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
            }}
          >
            <View
              style={[
                styles.videoView,
                index === 0
                  ? { backgroundColor: Colors.secondary00 }
                  : { backgroundColor: Colors.white },
              ]}
            >
              <Text>{"EXPLANATORY VIDEO"}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setIndex(1);
              console.log("index", index);
            }}
          >
            <View
              style={[
                styles.guideView,
                index === 1
                  ? { backgroundColor: Colors.secondary00 }
                  : { backgroundColor: Colors.white },
              ]}
            >
              <Text>{"QUICK GUIDE"}</Text>
            </View>
          </TouchableOpacity>
        </View>
        {index === 0 ? <Explanatory /> : <QuickGuide />}
      </SafeAreaView>
    </View>
  );
}
