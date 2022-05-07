import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { s } from "react-native-size-matters";
import { AppBar, RightButton } from "../../Components";
import { Colors } from "../../Themes";
import styles from "./styles";
import colors from "../../Themes/Colors";
import AppConfig from "../../Config/AppConfig";
import { useNavigation } from "@react-navigation/native";
import { t } from "react-native-tailwindcss";

const invitedUsers = [
  {
    email: "Notification Title",
    msg: "Notification description",
    avatar: "https://measure.3vyd.com/uPic/Grey 32.png",
    readed: false,
  },
  {
    email: "Notification Title",
    msg: "Notification description",
    avatar: "https://measure.3vyd.com/uPic/Grey 32.png",
    readed: false,
  },
  {
    email: "Notification Title",
    msg: "Notification description",
    avatar: "https://measure.3vyd.com/uPic/Grey 32.png",
    readed: false,
  },
  {
    email: "Notification Title",
    msg: "Notification description",
    avatar: "https://measure.3vyd.com/uPic/Grey 32.png",
    readed: true,
  },
  {
    email: "Notification Title",
    msg: "Notification description",
    avatar: "https://measure.3vyd.com/uPic/Grey 32.png",
    readed: true,
  },
  {
    email: "Notification Title",
    msg: "Notification description",
    avatar: "https://measure.3vyd.com/uPic/Grey 32.png",
    readed: true,
  },
];

function Notifications(props) {
  fall = new Animated.Value(0);
  const [showSheet, setShowSheet] = useState(false);
  const sheetEl = useRef(null);
  const [clearAll, setClearAll] = useState(false);
  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={[t.mR6]}>
          <RightButton
            title="CLEAR ALL"
            onPress={() => {
              setClearAll(true);
              // NavigationService.goBack();
            }}
          />
        </View>
      ),
    });
  }, [navigation]);
  return (
    <View style={styles.container}>
      <FlatList
        data={clearAll ? [] : invitedUsers}
        ListHeaderComponent={() => listHeader(setShowSheet)}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                backgroundColor: "white",
                paddingHorizontal: AppConfig.paddingHorizontal,
                marginTop: s(8),
                opacity: item.readed ? 0.7 : 1,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={[
                      styles.dot,
                      {
                        backgroundColor: item.readed
                          ? "transparent"
                          : colors.primary,
                      },
                    ]}
                  ></View>
                  <Image
                    style={styles.shareIcon}
                    source={{
                      uri: "https://measure.3vyd.com/uPic/iphone.png",
                    }}
                  ></Image>
                  <View style={{ marginLeft: 15 }}>
                    <Text style={[styles.balanceTxt, { fontSize: s(15) }]}>
                      {item.email}
                    </Text>
                    <Text
                      style={[
                        styles.balanceTxt,
                        { color: colors.grey60, fontSize: s(14) },
                      ]}
                    >
                      {item.msg}
                    </Text>
                  </View>
                </View>
                <Text
                  style={[
                    styles.balanceTxt,
                    {
                      color: colors.grey60,
                      fontSize: s(14),
                    },
                  ]}
                >
                  2h ago
                </Text>
              </View>
            </View>
          );
        }}
        keyExtractor={(item, index) => `list${index}`}
      />
    </View>
  );
}
function listHeader(setShowSheet) {
  return (
    <View style={styles.bodyContainer}>
      <Text style={styles.heading2Bold}>Notifications</Text>
      <Text style={[styles.heading4Regular, { color: Colors.grey80 }]}>
        {`You have 3 unread notifications`}
      </Text>
    </View>
  );
}

export default Notifications;
