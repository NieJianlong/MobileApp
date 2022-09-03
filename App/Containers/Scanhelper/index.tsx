import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import NavigationService from "../../Navigation/NavigationService";
import { BarCodeScanner } from "expo-barcode-scanner";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import {
  useMarkOrderItemAsDeliveredMutation,
  useMarkOrderReturnAsReceivedMutation,
} from "../../../generated/graphql";
import { ActivityIndicator } from "react-native-paper";
import { observer } from "mobx-react";

function Scanhelper() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);
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
  return loading ? (
    <SafeAreaView>
      <ActivityIndicator
        color={"red"}
        style={{ top: "50%" }}
        animating={true}
      />
    </SafeAreaView>
  ) : (
    <BarCodeScanner
      onBarCodeScanned={(res) => {
        if (!isEmpty(res.data)) {
          console.log("BarCodeReadEvent====================================");
          console.log(res.data);
          console.log("====================================");
          try {
            const order = JSON.parse(res.data);
            //markOrderReturnAsReceived
            if (!isEmpty(order.orderReturnId) && !isEmpty(order.buyerId)) {
              setLoading(true);
              markOrderReturnAsReceived({
                variables: {
                  request: {
                    buyerId: order.buyerId,
                    orderReturnId: order.orderReturnId,
                  },
                },
              });
              return;
            }
            if (!isEmpty(order.orderItemId) && !isEmpty(order.buyerId)) {
              setLoading(true);
              markOrderItemDelivery({
                variables: {
                  request: {
                    buyerId: order.buyerId,
                    orderItemId: order.orderItemId,
                  },
                },
              });
              return;
            }
          } catch (error) {}
        }
      }}
      style={StyleSheet.absoluteFillObject}
    />
  );
  // <QRCodeScanner
  //   reactivate={true}
  //   reactivateTimeout={3000}
  //   onRead={(res: BarCodeReadEvent) => {
  //     if (!isEmpty(res.data)) {
  //       console.log("BarCodeReadEvent====================================");
  //       console.log(res.data);
  //       console.log("====================================");
  //       try {
  //         const order = JSON.parse(res.data);
  //         //markOrderReturnAsReceived
  //         if (!isEmpty(order.orderReturnId) && !isEmpty(order.buyerId)) {
  //           markOrderReturnAsReceived({
  //             variables: {
  //               request: {
  //                 buyerId: order.buyerId,
  //                 orderReturnId: order.orderReturnId,
  //               },
  //             },
  //           });
  //         }
  //         if (!isEmpty(order.orderItemId) && !isEmpty(order.buyerId)) {
  //           markOrderItemDelivery({
  //             variables: {
  //               request: {
  //                 buyerId: order.buyerId,
  //                 orderItemId: order.orderItemId,
  //               },
  //             },
  //           });
  //         }
  //       } catch (error) {}
  //     }
  //   }}
  //   showMarker={true}
  //   flashMode={RNCamera.Constants.FlashMode.auto}
  // />
}

export default observer(Scanhelper);
