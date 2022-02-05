import React, { useCallback, useContext } from "react";
import { View, Image, Text } from "react-native";

import { s } from "react-native-size-matters";
import { Button } from "../../../../Components";

import { Images } from "../../../../Themes";
import { AlertContext } from "../../../Root/GlobalContext";
import styles from "../styles";

export default function PickupFromSellerSheetContent({ address, onCallback }) {
  const { dispatch } = useContext(AlertContext);
  const togglePickupFromSellerSheet = useCallback(() => {
    dispatch({
      type: "changSheetState",
      payload: {
        showSheet: false,
        height: 0,
      },
    });
    onCallback && onCallback();
  }, [dispatch, onCallback]);
  return (
    <View style={{ flex: 1, justifyContent: "flex-end" }}>
      <Text style={[styles.txtRegular, { textAlign: "center" }]}>
        This is the address where you have to{"\n"}go to pick up your order
      </Text>
      <View style={styles.pickupLocationContainer}>
        <Image style={styles.pickupLocationIcon} source={Images.locationMed} />

        <View style={{ marginLeft: s(10) }}>
          <Text style={styles.heading5Bold}>{address.streetAddress1}</Text>
          <Text style={styles.txtRegular}>{`${address.houseNumber ?? ""}${
            address.flat ?? ""
          }${address.villageArea ?? ""}${address.townCity}${
            address.provinceState ?? ""
          }${address.country ?? ""} ${address.pinCode ?? ""}`}</Text>
        </View>
      </View>

      <Button onPress={togglePickupFromSellerSheet} text={"OK"} />
    </View>
  );
}
