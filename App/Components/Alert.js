import React, { Component, useEffect, useRef } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Animated,
  Alert,
} from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { SafeAreaView } from "react-native-safe-area-context";

import AppConfig from "../Config/AppConfig";
import { Images, Fonts, Colors, ApplicationStyles } from "../Themes";

export default function AlertComponent({
  color,
  message,
  title,
  visible,
  onDismiss,
  action,
}) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
    }).start();
  }, [fadeAnim]);
  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
    }).start();
  };
  // alert(visible);
  return (
    <Animated.View
      useNativeDriver={true}
      style={[styles.container, { opacity: fadeAnim }]}
    >
      <SafeAreaView
        edges={["top", "left", "right"]}
        style={styles.safeAreaView}
      >
        <View style={[styles.line, { backgroundColor: color }]} />
        {title ? (
          <View style={styles.contentContainer}>
            <View style={styles.row}>
              <Text style={[styles.txtTitle, { color: color }]}>{title}</Text>
              <TouchableOpacity
                onPress={() => {
                  onDismiss && onDismiss();
                  fadeOut();
                }}
              >
                <Image style={styles.icClose} source={Images.crossMedium} />
              </TouchableOpacity>
            </View>
            <Text style={styles.txtMsg}>{message}</Text>

            {action && <View style={styles.actionContainer}>{action()}</View>}
          </View>
        ) : (
          <View style={styles.contentContainer}>
            <View style={styles.row}>
              <Text style={styles.txtTitle}>{message}</Text>

              <TouchableOpacity
                onPress={() => {
                  onDismiss && onDismiss();
                  fadeOut();
                }}
              >
                <Image style={styles.icClose} source={Images.crossMedium} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </SafeAreaView>
    </Animated.View>
  );
}

const styles = ScaledSheet.create({
  container: {
    minHeight: "70@vs",
    backgroundColor: Colors.white,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    borderBottomLeftRadius: "24@s",
    borderBottomRightRadius: "24@s",
    flex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  safeAreaView: {
    flex: 1,
  },
  line: {
    backgroundColor: Colors.success,
    height: "4@vs",
    width: "100%",
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: AppConfig.paddingHorizontal,
    paddingVertical: "10@vs",
  },
  txtTitle: {
    ...ApplicationStyles.screen.heading4Bold,
  },
  txtMsg: {
    ...ApplicationStyles.screen.heading4Regular,
  },
  icClose: {
    width: "20@s",
    height: "20@s",
    tintColor: Colors.grey60,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actionContainer: {
    marginTop: "10@vs",
    marginBottom: "5@vs",
  },
});
