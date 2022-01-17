import React from "react";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import RazorpayCheckout from 'react-native-razorpay';
import styles from "./styles";


function RazarPay() {
  return  (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          var options = {
            description: "Credits towords consultation",
            image: "https://i.imgur.com/3g7nmJC.png",
            currency: "INR",
            key: "rzp_test_owK1UREmxZCSL2",
            amount: "50000",
            name: "Acme Corp",
            order_id: "order_IKjwMWQ66vcQb1", //Replace this with an order_id created using Orders API.
            prefill: {
              email: "bluestar929@outlook.com",
              contact: "8616525825013",
              name: "Gaurav Kumar",
            },
            theme: { color: "#53a20e" },
          };;
          // RazorpayCheckout.open(options).then((data) => {
          //     alert(`Success: ${data.razorpay_payment_id}`);
          //     console.log(`Success: ${data.razorpay_payment_id}`);
          // }).catch((error) => {
          //     alert(`Error: ${error.code} | ${error.description}`);
          // });
        }}
      >
        <Text>PAYMENT</Text>
      </TouchableOpacity>
    </View>
  );
}

export default RazarPay;
