import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import NavigationService from "../../Navigation/NavigationService";
import { BarCodeScanner } from "expo-barcode-scanner";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import {
  useMarkOrderItemAsDeliveredMutation,
  useMarkOrderReturnAsReceivedMutation,
} from "../../../generated/graphql";
import { Controller, useForm } from "react-hook-form";
import { t } from "react-native-tailwindcss";
import { ActivityIndicator, Button, TextInput } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import { observer } from "mobx-react";

function ManualOperation() {
  const [hasPermission, setHasPermission] = useState(null);
  const { params } = useRoute();
  // alert(params?.type);
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit } =
    useForm<{ buyerId: string; orderId: string }>();
  const isDeliveried = params?.type === "deliveried";
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  const [markOrderItemDelivery] = useMarkOrderItemAsDeliveredMutation({
    context: {
      headers: {
        isPrivate: true,
      },
    },
    onCompleted: () => {
      NavigationService.goBack();
      alert("Success");
    },
    onError: (error) => {
      NavigationService.goBack();
      alert(error.message);
      alert("Fail to mark order as deliver");
    },
  });
  const [markOrderReturnAsReceived] = useMarkOrderReturnAsReceivedMutation({
    context: {
      headers: {
        isPrivate: true,
      },
    },
    onCompleted: () => {
      NavigationService.goBack();
      alert("Success");
    },
    onError: (error) => {
      NavigationService.goBack();
      console.log("====================================");
      console.log(error);
      console.log("====================================");
      alert(error.message);
      alert("Fail to mark order as deliver");
    },
  });
  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  const onSubmit = async (data: { buyerId: string; orderId: string }) => {
    try {
      //markOrderReturnAsReceived
      if (!isDeliveried) {
        setLoading(true);
        markOrderReturnAsReceived({
          variables: {
            request: {
              buyerId: data.buyerId,
              orderReturnId: data.orderId,
            },
          },
        });
      } else {
        markOrderItemDelivery({
          variables: {
            request: {
              buyerId: data.buyerId,
              orderItemId: data.buyerId,
            },
          },
        });
      }
    } catch (error) {}
  };
  return loading ? (
    <SafeAreaView>
      <ActivityIndicator
        color={"red"}
        style={{ top: "50%" }}
        animating={true}
      />
    </SafeAreaView>
  ) : (
    <View style={[t.pX4]}>
      <Controller
        control={control}
        rules={{
          required: "Field is required.",
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[t.mT4]}
            mode="outlined"
            placeholder={"Type buyer Id"}
            autoCapitalize="words"
            returnKeyType={"next"}
            onChangeText={onChange}
            value={value}
            textAlignVertical={"center"}
          />
        )}
        name="buyerId"
      />
      <Controller
        control={control}
        rules={{
          required: "Field is required.",
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[t.mT4]}
            mode="outlined"
            placeholder={`Type ${
              isDeliveried ? "Order Item Id" : "Order Return Id"
            }`}
            autoCapitalize="words"
            returnKeyType={"next"}
            onChangeText={onChange}
            value={value}
            textAlignVertical={"center"}
          />
        )}
        name="orderId"
      />
      <Button
        mode="contained"
        style={[t.mT6]}
        color="blue"
        onPress={handleSubmit(onSubmit)}
      >
        {isDeliveried
          ? "Mark Order Return A sReceived"
          : "Mark Order Return As Received"}
      </Button>
    </View>
  );
}

export default observer(ManualOperation);
