import React from "react";
import { View, Image, useWindowDimensions, Text } from "react-native";
import { t } from "react-native-tailwindcss";
interface QrcodeProps {
  uri: string;
}

function Qrcode({ uri }: QrcodeProps) {
  const { width } = useWindowDimensions();
  //   alert(uri);
  return (
    <View
      style={[
        t.itemsCenter,
        {
          borderBottomColor: "#E6E6E6",
          borderBottomWidth: 0.5,
        },
      ]}
    >
      <Image
        source={{ uri: `data:image/png;base64,${uri}` }}
        style={[{ width: 0.5 * width, height: 0.5 * width }]}
      />
      <Text style={[t.textCenter]}>
        Show this unique code when collecting your order to verify your purchase
      </Text>
    </View>
  );
}

export default Qrcode;
