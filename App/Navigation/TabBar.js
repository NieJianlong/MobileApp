import React, { useEffect, useMemo, useState } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { SafeAreaView } from "react-native-safe-area-context";
import { isIphoneX } from "react-native-iphone-x-helper";

import { Colors, Images } from "../Themes";
import useRealm from "../hooks/useRealm";
import PubSub from "pubsub-js";
import { t } from "react-native-tailwindcss";
import { Badge } from "react-native-paper";

function TabBar(props) {
  const getIconSource = (routeName, isFocused) => {
    switch (routeName) {
      case "ExploreScreen":
        return Images.logo1;
      case "PackageScreen":
        return isFocused ? Images.packageFilled : Images.packageMed;
      case "CartScreen":
        return isFocused ? Images.cartFilled : Images.cartMed;
      case "FollowScreen":
        return isFocused ? Images.likeFilled : Images.likeMed;
      case "MenuScreen":
        return Images.dots;
    }
  };

  const { routes, index } = props.state;
  const { realm } = useRealm();
  const [mydatas, setMydatas] = useState(realm.objects("ShoppingCart"));
  useEffect(() => {
    let refresh = PubSub.subscribe("refresh-shoppingcart", () => {
      setMydatas(realm.objects("ShoppingCart"));
    });
    return () => {
      PubSub.unsubscribe(refresh);
    };
  }, [realm]);
  const quantity = useMemo(() => {
    let currentQuantity = 0;
    for (let index = 0; index < mydatas.length; index++) {
      const element = mydatas[index];
      currentQuantity = currentQuantity + element.quantity;
    }
    return currentQuantity;
  }, [mydatas]);
  // const quantity = useMemo(() => {
  //   let currentQuantity=0;
  //   for (let index = 0; index < mydatas.length; index++) {
  //     const element = array[index];

  //   }
  //   return currentQuantity;
  // }), [mydatas]);
  return (
    <SafeAreaView edges={["bottom"]} style={styles.safeAreaView}>
      <View style={styles.container}>
        {routes.map((route, idx) => {
          const isFocused = idx === index;
          const onPress = () => {
            props.navigation.navigate(route.name);
          };

          return (
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={onPress}>
                <Image
                  resizeMode={"contain"}
                  source={getIconSource(route.name, isFocused)}
                  style={[
                    styles.icon,
                    isFocused && { tintColor: Colors.primary },
                  ]}
                />
                {route.name === "CartScreen" && quantity > 0 && (
                  <View style={[t.absolute, t.top0, t.right0, t.mL5]}>
                    <Badge>{quantity}</Badge>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

export default TabBar;

const styles = ScaledSheet.create({
  safeAreaView: {
    backgroundColor: Colors.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: isIphoneX() ? "0@vs" : "8@vs",
    paddingTop: "8@vs",
  },
  iconContainer: {
    flex: 1,
    alignItems: "center",
  },
  icon: {
    width: "30@s",
    height: "30@s",
    tintColor: Colors.grey60,
  },
});
