import React from "react";
import { View, Text } from "react-native";
import { s, vs } from "react-native-size-matters";
import { ApplicationStyles } from "../../../Themes";
import colors from "../../../Themes/Colors";

const contents = [
  "As explained on the delivery details screen, direct deliveries allow the opportunity to inspect the item.",
  "By inspecting and accepting the purchase, the option to return the item is renounced.",
  "Full terms can conditions can be found here.",
];

function index(props) {
  return (
    <View>
      <Text
        style={[
          ApplicationStyles.screen.heading4Bold,
          { color: colors.grey80, marginTop: vs(15) },
        ]}
      >
        Orders that are shipped with direct delivery from seller are not
        eligible for returns.:
      </Text>
      {contents.map((item) => {
        return (
          <View
            style={{
              flexDirection: "row",
              marginTop: vs(10),
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: colors.grey80,
                borderRadius: s(3),
                width: s(6),
                height: s(6),
                marginRight: s(6),
              }}
            />
            <Text
              style={[
                ApplicationStyles.screen.txtRegular,
                { color: colors.grey80 },
              ]}
            >
              {item}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

export default index;
