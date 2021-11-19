import React from "react";
import {
  View,
} from "react-native";

import { Button } from "..";
import AddressItem from "../AddressItem";
import { Colors } from "../../Themes";

import styles from './styles';

function BillingAddressBottomSheet({addresses, onPress}) {

    return (
        <View style={styles.container}>
            <View style={styles.button}>
                <Button
                    backgroundColor={Colors.grey80}
                    onPress={() => {}}
                    text={"ADD ADDRESS"}
                />
            </View>
            {(addresses || []).map((address, i) => <AddressItem key={i} onPress={onPress} {...address}/>) }
        </View>
    );
}

export default BillingAddressBottomSheet;