import React, { useState } from "react";
import { View, StatusBar, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { s } from "react-native-size-matters";
import { AppBar } from "../../Components";
import styles from "./styles";
import colors from "../../Themes/Colors";
import images from "../../Themes/Images";
import AppConfig from "../../Config/AppConfig";
import DynamicTabView from "../UserInfo/DynamicTabView";
import CountryLanguage from "./CountryLanguage";
import Notifications from "./Notifications";
import Permissions from "./Permissions";

export const MenuConfig = [
  {
    title: "Country & Languageg",
    icon: images.userFlagImage,
    selectedIcon: images.userFlagImage,
    // screen: NoPurchase,
    key: "Country",
  },
  {
    title: "Notifications",
    icon: images.userNotiImage,
    selectedIcon: images.userNotiSImage,
    key: "Notifications",
  },
  {
    title: "Permissions",
    icon: images.userFilledImage,
    selectedIcon: images.userFilledSImage,
    key: "Permissions",
  },
];

function Setting(props) {
  const [defaultIndex, setDefaultIndex] = useState(0);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <SafeAreaView
        style={styles.safeArea}
        edges={["top", "right", "left", "bottom"]}
      >
        <AppBar />
        <View style={{ padding: AppConfig.paddingHorizontal }}>
          <Text style={styles.heading2Bold}>Setting</Text>
        </View>
        <DynamicTabView
          data={MenuConfig}
          renderTab={(item, index) => {
            let cmp = <View />;
            switch (item.key) {
              case "Country":
                cmp = <CountryLanguage />;
                break;
              case "Notifications":
                cmp = <Notifications />;
                break;
              case "Permissions":
                cmp = <Permissions />;
                break;

              default:
                break;
            }
            return cmp;
          }}
          defaultIndex={defaultIndex}
          containerStyle={{
            height: s(100),
            backgroundColor: colors.background,
          }}
          headerBackgroundColor={"transparent"}
          highlightStyle={{ color: "white" }}
          noHighlightStyle={{ color: "gray" }}
          headerTextStyle={{ color: "white" }}
          onChangeTab={(index) => {}}
          headerUnderlayColor={"transparent"}
        />
      </SafeAreaView>
    </View>
  );
}
function listHeader(setShowSheet) {
  return (
    <View style={styles.bodyContainer}>
      <Text style={styles.heading2Bold}>Setting</Text>
      {/* <Text style={[styles.heading4Regular, { color: Colors.grey80 }]}>
        {`You have 3 unread notifications`}
      </Text> */}
    </View>
  );
}

export default Setting;
