import React, { useEffect, useMemo, useState } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { SafeAreaView } from "react-native-safe-area-context";
import { isIphoneX } from "react-native-iphone-x-helper";

import { Colors, Images } from "../Themes";
import PubSub from "pubsub-js";
import { t } from "react-native-tailwindcss";
import { Badge } from "react-native-paper";
import { useQuery } from "@apollo/client";
import { GET_LOCAL_CART } from "../Apollo/cache";
import { useAppStore } from "../mobx";
export enum TabbarItem {
  "ExploreScreen" = "ExploreScreen",
  "PackageScreen" = "PackageScreen",
  "CartScreen" = "CartScreen",
  "FollowScreen" = "FollowScreen",
  "MenuScreen" = "MenuScreen",
}

function TabBar(props) {
  const {
    data: { localCartVar },
  } = useQuery(GET_LOCAL_CART);
  const { updateRoute } = useAppStore();
  const getIconSource = (routeName, isFocused) => {
    switch (routeName) {
      case "ExploreScreen":
        return Images.logo1;
      case "PackageScreen":
        return Images.packageFilled;
      case "CartScreen":
        return Images.cartFilled;
      case "FollowScreen":
        return Images.likeFilled;
      case "MenuScreen":
        return Images.dots;
    }
  };

  const { routes, index } = props.state;

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
            updateRoute(route.name as TabbarItem);
            props.navigation.navigate(route.name);
          };

          return (
            <View key={idx} style={styles.iconContainer}>
              <TouchableOpacity onPress={onPress}>
                <Image
                  resizeMode={"contain"}
                  source={getIconSource(route.name, isFocused)}
                  style={[
                    route.name === "FollowScreen" && {
                      transform: [{ rotateY: "180deg" }],
                    },
                    styles.icon,
                    isFocused && { tintColor: Colors.primary },
                  ]}
                />
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
