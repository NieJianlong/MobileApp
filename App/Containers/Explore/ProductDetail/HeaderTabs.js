import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../../Themes";
import styles from "./styles";

const tabs = ["Details", "Related", "Seller", "Review"];
export default function HeaderTabs({
  tabIndex,
  setTabIndex,
  scrollSectionIntoView,
}) {
  return (
    <SafeAreaView style={styles.headerTabsSafeArea} edges={["top"]}>
      <View style={styles.headerTabsContainer}>
        {tabs.map((i, index) => (
          <TouchableOpacity
            key={index.toString()}
            onPress={() => {
              setTabIndex(index);
              scrollSectionIntoView(index);
            }}
            style={[
              styles.headerTabItem,
              tabIndex === index && { borderBottomColor: Colors.primary },
            ]}
          >
            <Text
              style={[
                styles.heading5Bold,
                {
                  color: tabIndex === index ? Colors.primary : Colors.grey60,
                },
              ]}
            >
              {i}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}
