import React from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import { vs } from "react-native-size-matters";
import { Button } from "../../../Components";

import { Images, Colors } from "../../../Themes";
import styles from "./styles";

export default function ChatOptions() {
  return (
    <View style={styles.chatContainer}>
      <View style={styles.chatIconsContainer}>
        <TouchableOpacity
          style={[styles.chatButton, { backgroundColor: Colors.facebook }]}
        >
          <Image source={Images.facebook} style={styles.chatIcon} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.chatButton, { backgroundColor: Colors.whatsapp }]}
        >
          <Image source={Images.whatsapp} style={styles.chatIcon} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.chatButton, { backgroundColor: Colors.google }]}
        >
          <Image source={Images.google} style={styles.chatIcon} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.chatButton, { backgroundColor: Colors.twitter }]}
        >
          <Image source={Images.twitter} style={styles.chatIcon} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.chatButton, { backgroundColor: Colors.grey10 }]}
        >
          <Image source={Images.add1} style={styles.icAdd} />
        </TouchableOpacity>
      </View>

      <Text
        style={[styles.txtBold, { marginTop: vs(20), marginBottom: vs(15) }]}
      >
        You can chat here with seller and co-buyers:
      </Text>

      <View style={{ width: "100%" }}>
        <Button backgroundColor={Colors.grey80} text={"CHAT"} />
      </View>
    </View>
  );
}
