import React from "react";
import { View } from "react-native";
import NavigationService from "../../../Navigation/NavigationService";
import TextTip from "../../../Components/EmptyReminder";

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
            NavigationService.navigate("ExploreScreen");
          }}
        />
      </View>
    </View>
  );
}

export default index;
