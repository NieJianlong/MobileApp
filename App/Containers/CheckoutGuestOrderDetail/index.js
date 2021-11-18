import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
} from "react-native";

import BaseScreen from "../BaseScreen";
import { AppBar } from "../../Components";
import styles from './styles';

function CheckoutGuestOrderDetail(props) {
  return (
    <BaseScreen {...props}>
      <AppBar />
      <View
        style={styles.container}
      >
        
      </View>
    </BaseScreen>
  );
}

export default CheckoutGuestOrderDetail;