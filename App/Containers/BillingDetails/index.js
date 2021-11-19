import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";

import BaseScreen from "../BaseScreen";
import { AppBar, Switch } from "../../Components";

import AddressIcon from './AddressIcon.png'

import styles from './styles';

function BillingDetails(props) {
  const [isSameAsDelivery, setIsSameAsDelivery] = useState(true);

  return (
    <BaseScreen {...props}>
      <AppBar 
        rightButton={() => {
          return (
            <TouchableOpacity
              onPress={() => {}}
            >
              <Text style={styles.rightButton}>Next</Text>
            </TouchableOpacity>
          );
        }}
      />
      <View style={styles.container}>
        <View style={styles.horizontalCenter}>
          <Text style={styles.title}>Please enter your billing details</Text>
        </View>

        <View style={styles.actionWrapper}>
            <View style={styles.switch}>
                <Switch
                    onSwitch={(b) => setIsSameAsDelivery(b)}
                    active={isSameAsDelivery}
                    label="Billing address is the same as delivery"
                />
            </View>

            <TouchableOpacity
              onPress={() => {}}
            >
                <View style={styles.saveAddress}>
                    <View style={styles.addressIcon}>
                        <Image source={AddressIcon} />
                    </View>
                    <Text style={styles.saveAddressText}>Use a saved address or add new address</Text>
                </View>
            </TouchableOpacity>
        </View>

        <View style={styles.deliveryAddressSection}>
          <Text style={styles.deliveryAddressSectionTitle}>Current Delivery Address</Text>
          <View style={styles.deliveryDescriptionBox}>
            <Text style={styles.deliveryDescriptionText}>47, 15, Ram Krishna Ghosh Rd, Sinthee</Text>
            <Text style={styles.deliveryDescriptionText}>Kolkata, West Bengal</Text>
            <Text style={styles.deliveryDescriptionText}>700050, India</Text>
          </View>
        </View>
      </View>
    </BaseScreen>
  );
}

export default BillingDetails;