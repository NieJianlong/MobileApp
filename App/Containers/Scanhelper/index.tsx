import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import NavigationService from "../../Navigation/NavigationService";
import { BarCodeScanner } from "expo-barcode-scanner";
import { StyleSheet, Text } from "react-native";
import {
  useMarkOrderItemAsDeliveredMutation,
  useMarkOrderReturnAsReceivedMutation,
} from "../../../generated/graphql";

function Scanhelper() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
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
    onError: () => {
      NavigationService.goBack();
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
    onError: () => {
      NavigationService.goBack();
      alert("Fail to mark order as deliver");
    },
  });
  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <BarCodeScanner
      onBarCodeScanned={(res) => {
        console.log("====================================");
        console.log(res);
        console.log("====================================");
      }}
      style={StyleSheet.absoluteFillObject}
    />
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
  );
}

export default Scanhelper;
