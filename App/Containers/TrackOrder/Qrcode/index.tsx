import React from "react";
import { View, Image } from "react-native";
interface QrcodeProps {
  uri: string;
}

function index({ uri }: QrcodeProps) {
  return (
    <View>
      <Image source={{ uri }} />
    </View>
  );
}

export default index;
