import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
} from "react-native";

import BaseScreen from "../BaseScreen";
import { AppBar, Switch } from "../../Components";
import { MaterialTextInput } from "../../Components";

import styles from './styles';

function CheckoutGuestOrderDetail(props) {
  const [email, setEmail] = useState(null);
  const [fName, setFName] = useState(null);
  const [lName, setLName] = useState(null);
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
          <Text style={styles.title}>Please enter details for the order</Text>
          <Text style={styles.description}>All guests receive confirmation through email only.</Text>
          <Text style={styles.boldDescription}>Please make sure your email is correct!</Text>
        </View>

        <View style={styles.inputsWrapper}>
          <MaterialTextInput
            placeholder="Email*"
            onChangeText = {(text) => setEmail(text)}
            showError={false}
            keyboardType="email-address"
          />
          <View style={styles.inputsWrapper2}>
            <View style={styles.inputName}>
              <MaterialTextInput
                placeholder="FirstName*"
                onChangeText = {(text) => setFName(text)}
                showError={false}
                keyboardType='default'
              />
            </View>

            <View style={styles.inputName}>
              <MaterialTextInput
                placeholder="LastName*"
                onChangeText = {(text) => setLName(text)}
                showError={false}
                keyboardType='default'
              />
            </View>
          </View>
        </View>

        <View style={styles.deliveryAddressSection}>
          <Text style={styles.deliveryAddressSectionTitle}>Current Delivery Address</Text>
          <View style={styles.deliveryDescriptionBox}>
            <Text style={styles.deliveryDescriptionText}>47, 15, Ram Krishna Ghosh Rd, Sinthee</Text>
            <Text style={styles.deliveryDescriptionText}>Kolkata, West Bengal</Text>
            <Text style={styles.deliveryDescriptionText}>700050, India</Text>
          </View>

          <View style={styles.switch}>
            <Switch
              onSwitch={(b) => setIsSameAsDelivery(b)}
              active={isSameAsDelivery}
              label="Billing address is the same as delivery"
            />
          </View>
        </View>
      </View>
    </BaseScreen>
  );
}

export default CheckoutGuestOrderDetail;