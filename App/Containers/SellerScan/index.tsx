import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { t } from "react-native-tailwindcss";
import { TextInput } from "../../Components";
import NavigationService from "../../Navigation/NavigationService";

function SellerScan() {
  useEffect(() => {
    // alert(global.access_token);
  }, []);
  const { control } = useForm();
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

      <Button
        mode="contained"
        style={[t.mT6]}
        color={"red"}
        onPress={() => {
          NavigationService.navigate("ManualOperation", { type: "deliveried" });
        }}
      >
        Mark Order Item Deliveried
      </Button>
      <Button
        mode="contained"
        style={[t.mT6]}
        color="blue"
        onPress={() => {
          NavigationService.navigate("ManualOperation", { type: "deliveried" });
        }}
      >
        Mark Order Return As Received
      </Button>
    </View>
  );
}

export default SellerScan;
