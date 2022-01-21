import React from "react";
import { View } from "react-native";
import NavigationService from "../../../Navigation/NavigationService";
import TextTip from "../../../Components/EmptyReminder";
import RazorpayCheckout from "react-native-razorpay";
function index(props) {
  const subTip =
    "Check if there are any products on your wish list and snatch them up before they’re gone!\n \n You can also explore new products \n";
  return (
    <View>
      <View style={{ height: 380, marginTop: 150 }}>
        <TextTip
          textTip="Your shopping cart is empty"
          subTextTip={subTip}
          needButton
          btnMsg="EXPLORE"
          onPress={() => {
            // NavigationService.navigate("ExploreScreen");
            var options = {
              description: "Credits towords consultation",
              image: "https://i.imgur.com/3g7nmJC.png",
              currency: "INR",
              key: "rzp_test_owK1UREmxZCSL2",
              amount: "8000",
              name: "Acme Corp",
              //order_id: "ORDER-17012022-101727620", //Replace this with an order_id created using Orders API.
              prefill: {
                email: "bluestar929@outlook.com",
                contact: "8616525825013",
                name: "Gaurav Kumar",
              },
              theme: { color: "#53a20e" },
            };
            RazorpayCheckout.open(options)
              .then((data) => {
                alert(`Success: ${data.razorpay_payment_id}`);
                console.log(`Success: ${data.razorpay_payment_id}`);
              })
              .catch((error) => {
                alert(`Error: ${error.code} | ${error.description}`);
              });
          }}
        />
      </View>
    </View>
  );
}

export default index;
