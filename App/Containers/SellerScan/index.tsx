import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { t } from "react-native-tailwindcss";
import { TextInput } from "../../Components";
import NavigationService from "../../Navigation/NavigationService";
import { observer } from "mobx-react";
import { useAppStore } from "../../mobx";

function SellerScan() {
  useEffect(() => {
    // alert(global.access_token);
  }, []);
  const { control } = useForm();
  const { mode, switchMode } = useAppStore();
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
      <View style={[t.flexRow, t.mT16]}>
        <Text style={[t.textBlack, t.mT2]}>{`Current Mode is:`}</Text>
        <Text style={[t.textBlack, t.text2xl, t.mL2]}>{`${mode.title}`}</Text>
      </View>
      {/* <Button
        mode="contained"
        style={[t.mT6]}
        color="blue"
        onPress={() => {
          //switchMode();
        }}
      >
        Switch to {mode.title === "Stage" ? "Production" : "Stage"} Mode
      </Button> */}
    </View>
  );
}

export default observer(SellerScan);
