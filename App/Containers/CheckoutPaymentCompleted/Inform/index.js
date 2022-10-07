import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { s } from "react-native-size-matters";
import { Button } from "../../../Components";
import AppConfig from "../../../Config/AppConfig";
import { ApplicationStyles } from "../../../Themes";
import colors from "../../../Themes/Colors";
import images from "../../../Themes/Images";
import CartItem from "../Cartitem";
import ProductItem from "../ProductItem";

const shareIcons = [
  { src: images.userShareIcon1Image, onPress: () => {} },
  { src: images.userShareIcon2Image, onPress: () => {} },
  { src: images.userShareIcon3Image, onPress: () => {} },
  { src: images.userShareIcon4Image, onPress: () => {} },
  { src: images.userShareIcon5Image, onPress: () => {} },
  { src: images.userShareIcon6Image, onPress: () => {} },
];
function index(props) {
  const [orders, setOrders] = useState(
    [0, 1].map((item, index) => ({
      id: index,
      name: "Product Name",
      picture:
        "https://bizweb.dktcdn.net/100/116/615/products/12promax.png?v=1602751668000",
      rating: 3.0,
      ratingCount: 124,
      retailPrice: 2345,
      wholesalePrice: 1542,
      orderClose: "22/12/2020",
      inStock: 100,
      orderCount: 24,
      count: 1,
    }))
  );
  return (
    <View
      style={{ paddingHorizontal: AppConfig.paddingHorizontal, marginTop: -50 }}
    >
      <Text
        style={[ApplicationStyles.screen.heading4Bold, { fontSize: s(18) }]}
      >
        Inform your group
      </Text>
      <View>
        {orders.map((item, index) => (
          <View style={{ marginBottom: 30 }}>
            <CartItem key={index.toString()} product={item} />
            <View
              style={{
                flexDirection: "row",
                marginVertical: 20,
                justifyContent: "space-between",
              }}
            >
              {shareIcons.map((item, index) => {
                return (
                  <TouchableOpacity key={index} onPress={() => item.onPress()}>
                    <Image
                      source={item.src}
                      style={{
                        width: s(45),
                        height: s(45),
                        resizeMode: "contain",
                        margin: 5,
                      }}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
            <Text
              style={[
                ApplicationStyles.screen.heading4Bold,
                { color: colors.grey80, margin: 15, textAlign: "center" },
              ]}
            >
              You can chat here with seller and co-buyers:
            </Text>
            <Button
              backgroundColor={colors.grey80}
              prefixIcon={images.chatIconImage}
              text="CHAT"
            ></Button>
          </View>
        ))}
      </View>
      <Text
        style={[
          ApplicationStyles.screen.heading4Bold,
          { fontSize: s(18), marginVertical: 10 },
        ]}
      >
        Who bought this item also bought...
      </Text>
      <View>
        {orders.map((item, index) => (
          <ProductItem key={index.toString()} product={item} />
        ))}
      </View>
    </View>
  );
}

export default index;
