import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { vs, s } from "react-native-size-matters";
import colors from "../../../../Themes/Colors";
import AppConfig from "../../../../Config/AppConfig";
import { ApplicationStyles } from "../../../../Themes";
import NavigationService from "../../../../Navigation/NavigationService";
interface HeaderProps {
  orderNumber: string;
}

function Header({ orderNumber }: HeaderProps) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: AppConfig.paddingHorizontal,
        height: vs(50),
        alignItems: "center",
        borderBottomColor: "#E6E6E6",
        borderBottomWidth: 0.5,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        {/* <Text
          style={[ApplicationStyles.screen.txtRegular, { fontSize: s(16) }]}
        >
          Order
        </Text> */}
        <Text
          style={[ApplicationStyles.screen.heading4Bold, { fontSize: s(16) }]}
        >
          {orderNumber}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          NavigationService.navigate("LearnMoreScreen");
        }}
      >
        <Text
          style={[
            ApplicationStyles.screen.heading3Bold,
            { fontSize: s(14), color: colors.primary },
          ]}
        >
          GET HELP
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default Header;
