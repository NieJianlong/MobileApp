import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { Fonts, Colors, ApplicationStyles } from "../Themes";

//segmented control component
function SegmentedControl(props) {
  //current active tab
  const [activeTab, setActiveTab] = useState(0);

  const { label1, label2, onSwitch } = props;

  return (
    <View style={styles.segmentedContainer}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          setActiveTab(0);
          onSwitch(0);
        }}
        style={activeTab === 0 ? styles.activeItem : styles.inactiveItem}
      >
        <Text style={activeTab === 0 ? styles.activeText : styles.inactiveText}>
          {label1}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          setActiveTab(1);
          onSwitch(1);
        }}
        style={activeTab === 1 ? styles.activeItem : styles.inactiveItem}
      >
        <Text style={activeTab === 1 ? styles.activeText : styles.inactiveText}>
          {label2}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = ScaledSheet.create({
  segmentedContainer: {
    backgroundColor: Colors.white,
    height: "40@vs",
    borderRadius: "40@vs",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: "2@s",
    borderColor: Colors.white,
    padding: "2@s",
    marginBottom: "24@vs",
  },
  activeItem: {
    width: "50%",
    backgroundColor: Colors.secondary00,
    height: "100%",
    borderRadius: "20@vs",
    justifyContent: "center",
    alignItems: "center",
  },
  inactiveItem: {
    width: "50%",
    backgroundColor: Colors.white,
    height: "100%",
    borderRadius: "20@vs",
    justifyContent: "center",
    alignItems: "center",
  },
  activeText: {
    ...ApplicationStyles.screen.heading5Bold,
    color: Colors.white,
    fontSize: 12,
  },
  inactiveText: {
    ...ApplicationStyles.screen.heading5Bold,
    color: Colors.grey40,
    fontSize: 12,
  },
});

export default SegmentedControl;
