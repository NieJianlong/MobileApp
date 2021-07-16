import React, { useEffect, useState } from "react";
import { View, StatusBar, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import styles from "./styles";

import { ProductSearchBox } from "../../../Components";
import { Colors, Images } from "../../../Themes";
import NavigationService from "../../../Navigation/NavigationService";
import * as storage from "../../../Apollo/local-storage";

function ProductSearch(props) {
  const { recentSearches } = props;
  console.log("recentSearches====================================");
  console.log(recentSearches);
  console.log("====================================");
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        <View style={styles.header}>
          <ProductSearchBox
            recentSearches={recentSearches}
            onSelect={(item) => {
              props.route.params.onSearch(i);
              NavigationService.goBack();
            }}
          />
        </View>

        <View style={styles.body}>
          <Text style={styles.heading5Bold}>Recent searches</Text>

          {recentSearches &&
            recentSearches.map((i, index) => (
              <View key={index.toString()} style={styles.recentSearchContainer}>
                <View style={styles.v1}>
                  <Image style={styles.icClock} source={Images.clock} />
                  <TouchableOpacity
                    onPress={() => {
                      props.route.params.onSearch(i);
                      NavigationService.goBack();
                    }}
                  >
                    <Text style={styles.txtSearch}>{i}</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity>
                  <Image style={styles.icDelete} source={Images.crossMedium} />
                </TouchableOpacity>
              </View>
            ))}
        </View>
      </SafeAreaView>
    </View>
  );
}

export default function Index() {
  const [recentSearches, setRecentSearches] = useState([]);
  useEffect(() => {
    let isUnmount = false;
    (async () => {
      try {
        const items = await storage.getLocalStorageValue(
          storage.LOCAL_SEARCH_ITEM
        );
        if (!isUnmount) {
          setRecentSearches(JSON.parse(items));
        }
      } catch (error) {
        if (!isUnmount) {
          setRecentSearches([]);
        }
      }
    })();
    return () => (isUnmount = true);
  }, []);
  return <ProductSearch recentSearches={recentSearches} />;
}

// const recentSearches = [
//   "Apple",
//   "Cherry",
//   "Washing machine with the ability to wash 100kg of clothes in just 1 minute",
//   "Bucket and mop",
// ];
