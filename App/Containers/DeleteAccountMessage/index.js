/*
 * @Author: JianLong Nie
 * @Date: 2021-01-09 16:19:16
 * @LastEditTime: 2021-01-09 16:29:12
 * @LastEditors: Please set LastEditors
 * @Description: you want to remove your account?
 * @FilePath: /MobileApp/App/Containers/DeleteAccountMessage/index.js
 */
import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { AppBar, Button } from "../../Components";
import AppConfig from "../../Config/AppConfig";
import Colors from "../../Themes/Colors";
import colors from "../../Themes/Colors";
import fonts from "../../Themes/Fonts";

import NavigationService from "../../Navigation/NavigationService";
import TextTip from "../../Components/EmptyReminder";
import images from "../../Themes/Images";
import metrics from "../../Themes/Metrics";
import * as storage from "../../Apollo/local-storage";

function DeleteAccountMessage(props) {
  const textTip = "Are you sure you want to remove  your account?";
  const subTextTip =
    "This action cannot be undone, if you delete the  account all the data and information will be  deleted.";
  const param = {
    textTip,
    subTextTip,
    needButton: false,
    btnMsg: "",
  };
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <AppBar />
      </SafeAreaView>
      <Image style={styles.trash} source={images.userTrashImage} />
      <TextTip {...param} />
      <SafeAreaView style={styles.bottom}>
        <View style={{ paddingHorizontal: AppConfig.paddingHorizontal }}>
          <Button
            onPress={() => {
              storage.setLocalStorageEmpty();
              NavigationService.navigate("OnboardingScreen");
            }}
            text="CONFIRM"
          />
          <TouchableOpacity
            style={{ margin: 20 }}
            onPress={() => {
              NavigationService.goBack();
            }}
          >
            <Text style={styles.removeText}>CANCEL</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

export default DeleteAccountMessage;

const styles = ScaledSheet.create({
  trash: {
    width: metrics.screenWidth,
    resizeMode: "contain",
    height: "160@vs",
    marginTop: "15@vs",
    marginBottom: "15@vs",
  },
  nosign: {
    fontSize: "22@s",
    textAlign: "center",
    fontFamily: fonts.primary,
    fontWeight: "bold",
    marginTop: "25@vs",
  },
  subTextTip: {
    fontSize: "14@vs",
    textAlign: "center",
    fontFamily: fonts.primary,
    marginTop: "5@vs",
    color: colors.grey80,
    marginBottom: "10@vs",
  },
  signbtn: { marginTop: "20@vs" },
  headerContainer: {
    backgroundColor: colors.background,
    justifyContent: "space-around",
    paddingHorizontal: AppConfig.paddingHorizontal,
    paddingBottom: "15@vs",
  },

  save: {
    color: Colors.primary,
    fontSize: "12@vs",
    fontFamily: fonts.primary,
  },
  removeText: {
    fontFamily: fonts.primary,
    fontSize: AppConfig.fontSize,
    textAlign: "center",
    color: colors.grey80,
  },
  bottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: AppConfig.paddingHorizontal,
  },
  contentContainer: {
    paddingHorizontal: AppConfig.paddingHorizontal,
  },
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: colors.background,
  },
  itemText: {
    textAlign: "center",
    fontFamily: fonts.primary,
  },
});
