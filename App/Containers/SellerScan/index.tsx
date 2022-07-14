import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { t } from "react-native-tailwindcss";
import { useMarkOrderItemAsDeliveredMutation } from "../../../generated/graphql";
import NavigationService from "../../Navigation/NavigationService";

function SellerScan() {
  useEffect(() => {
    // alert(global.access_token);
  }, []);
  return (
    <View style={[t.pX4, t.mT48]}>
      <Button
        mode="contained"
        onPress={() => {
          NavigationService.navigate("Scanhelper");
        }}
      >
        scan a qrcode
      </Button>
    </View>
  );
}

export default SellerScan;
