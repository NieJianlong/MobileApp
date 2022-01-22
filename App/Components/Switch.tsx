import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity as RNTouchableOpacity,
  Platform,
} from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { Fonts, Colors } from "../Themes";
import { TouchableOpacity as GHTouchableOpacity } from "react-native-gesture-handler";
const TouchableOpacity =
  Platform.OS === "ios" ? RNTouchableOpacity : GHTouchableOpacity;

function Switch(props) {
  const [active, setActive] = useState(props.active || false);
  const { disabled, label, onSwitch } = props;
  if (!disabled) {
    return (
      <View style={styles.row}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setActive(!active);
            onSwitch(!active);
          }}
        >
          {active ? (
            <View style={styles.activeContainer}>
              <View style={styles.activeCircle} />
            </View>
          ) : (
            <View style={styles.inactiveContainer}>
              <View style={styles.inactiveCircle} />
            </View>
          )}
        </TouchableOpacity>

        <Text style={styles.label}>{label}</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.row}>
        <View style={styles.disabledContainer}>
          <View style={styles.disabledCircle} />
        </View>
        <Text style={styles.label}>{label}</Text>
      </View>
    );
  }
}

Switch.propTypes = {};

Switch.defaultProps = {};

const WIDTH = "44@s";
const HEIGHT = "22@s";

const styles = ScaledSheet.create({
  activeContainer: {
    width: WIDTH,
    height: HEIGHT,
    borderRadius: "15@s",
    borderWidth: "2@s",
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "2@s",
  },
  activeCircle: {
    width: "14@s",
    height: "14@s",
    borderRadius: "16@s",
    backgroundColor: Colors.white,
  },
  inactiveContainer: {
    width: WIDTH,
    height: HEIGHT,
    borderRadius: "15@s",
    borderWidth: "2@s",
    borderColor: Colors.grey40,
    flexDirection: "row",
    alignItems: "center",
    padding: "2@s",
  },
  inactiveCircle: {
    width: "14@s",
    height: "14@s",
    borderRadius: "16@s",
    backgroundColor: Colors.grey40,
  },
  disabledContainer: {
    width: "48@s",
    height: "24@s",
    borderRadius: "15@s",
    borderWidth: "2@s",
    borderColor: Colors.grey10,
    backgroundColor: Colors.grey10,
    flexDirection: "row",
    alignItems: "center",
    padding: "2@s",
  },
  disabledCircle: {
    width: "16@s",
    height: "16@s",
    borderRadius: "16@s",
    backgroundColor: Colors.white,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontFamily: Fonts.primary,
    fontSize: "14@s",
    color: Colors.black,
    marginLeft: "8@s",
  },
});

export default Switch;
