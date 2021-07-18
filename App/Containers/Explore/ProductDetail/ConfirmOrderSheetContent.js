import React, { useState, useRef, useEffect } from "react";
import { View, Image, Text } from "react-native";
import { s, vs } from "react-native-size-matters";
import { Button } from "../../../Components";
import { Images } from "../../../Themes";
import styles from "./styles";
import NavigationService from "../../../Navigation/NavigationService";

export default function ConfirmOrderSheetContent() {
  return (
    <View style={{ flex: 1, justifyContent: "flex-end" }}>
      <View
        style={[
          styles.pickupLocationContainer,
          { marginTop: 0, marginBottom: 10 },
        ]}
      >
        <Image style={styles.pickupLocationIcon} source={Images.locationMed} />

        <View style={{ marginLeft: s(10) }}>
          <Text style={styles.heading5Bold}>Seller Address 00</Text>
          <Text style={styles.txtRegular}>Tamil Nadu 12345, Area 4</Text>
        </View>
      </View>

      <View
        style={[
          styles.pickupLocationContainer,
          { marginTop: 0, marginBottom: 20 },
        ]}
      >
        <Image style={styles.mastercardIcon} source={Images.mastercard} />

        <View style={{ marginLeft: s(10) }}>
          <Text style={styles.heading5Bold}>***********6473</Text>
          <Text style={styles.txtRegular}>User name</Text>
        </View>
      </View>

      <Button
        onPress={() => NavigationService.navigate("OrderPlacedScreen")}
        text={"CONFIRM ORDER"}
      />
    </View>
  );
}
