import React, { useContext, useCallback } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { vs, s } from "react-native-size-matters";
import { Button } from "../../../Components";
import { Colors, Images } from "../../../Themes";
import styles from "../styles";
import { AlertContext } from "../../Root/GlobalContext";
import AddLocationSheetContent from "./AddLocationSheetContent";

function AddressItem(address) {
  return (
    <View style={styles.pickupLocationContainer}>
      <Image style={styles.pickupLocationIcon} source={Images.locationMed} />
      <View style={{ marginLeft: s(10) }}>
        <Text style={styles.heading5Bold}>Seller Address 00</Text>
        <Text style={styles.txtRegular}>Tamil Nadu 12345, Area 4</Text>
      </View>
      <View style={{ flex: 1 }} />
      <TouchableOpacity style={styles.btnEditAddress}>
        <Image
          style={styles.editAddressIcon}
          source={Images.userAddressEditImage}
        />
      </TouchableOpacity>
    </View>
  );
}

export default function AddressSheetContent(props) {
  const { dispatch } = useContext(AlertContext);

  const toggleAddressSheet = useCallback(() => {
    dispatch({
      type: "changSheetState",
      payload: {
        showSheet: true,
        height: 600,
        children: () => <AddLocationSheetContent />,
        sheetTitle: "",
      },
    });
  }, [dispatch]);
  return (
    <View style={{ flex: 1, justifyContent: "flex-start" }}>
      <View style={{ height: vs(12) }} />
      <Button
        backgroundColor={Colors.grey80}
        prefixIcon={Images.add1}
        onPress={toggleAddressSheet}
        text={"ADD ADDRESS"}
      />
      <View style={{ height: vs(20) }} />
      <AddressItem
        address={{
          name: "Address Name 00",
          address: "Tamil Nadu 33243",
        }}
      />
      <AddressItem
        address={{
          name: "Address Name 01",
          address: "Tamil Nadu 33243",
        }}
      />
    </View>
  );
}
