import React from "react";
import { View } from "react-native";

import { Button } from "..";
import AddressItem from "../AddressItem";
import { Colors } from "../../Themes";

import styles from "./styles";
import { FlatList } from "react-native-gesture-handler";

function BillingAddressBottomSheet({
  addresses,
  onAddressClick,
  onAddNewAddress,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <Button
          backgroundColor={Colors.grey80}
          onPress={onAddNewAddress}
          text={"ADD ADDRESS"}
        />
      </View>
      <FlatList
        style={{ width: "100%" }}
        data={addresses || []}
        renderItem={({ item }) => (
          <AddressItem onPress={onAddressClick} {...item} />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

export default BillingAddressBottomSheet;
