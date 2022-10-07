import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Animated,
  useWindowDimensions,
} from "react-native";
import { s } from "react-native-size-matters";
import { Colors } from "../../Themes";
import styles from "./styles";
import colors from "../../Themes/Colors";
import AppConfig from "../../Config/AppConfig";
import { useNavigation } from "@react-navigation/native";
import { t } from "react-native-tailwindcss";
import {
  NotificationResponse,
  NotificationStatus,
  useNotificationsByBuyerIdQuery,
  useUpdateNotificationMutation,
} from "../../../generated/graphql";
import moment from "moment";
import useActionAlert from "../../hooks/useActionAlert";
import { isEmpty } from "lodash";

function Notifications(props) {
  fall = new Animated.Value(0);

  const sheetEl = useRef(null);
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();
  const { setAlert } = useActionAlert();

  const { data, error, refetch } = useNotificationsByBuyerIdQuery({
    variables: {
      buyerId: global.buyerId,
    },
    context: {
      headers: {
        isPrivate: global.access_token,
      },
    },
  });
  const [updateNotification] = useUpdateNotificationMutation({
    onCompleted: (res) => {},
    onError: (error) => {},
  });
  const updateNotifications = async (item: NotificationResponse) => {
    try {
      updateNotification({
        variables: {
          request: {
            notificationId: item.notificationId,
            notificationStatus: NotificationStatus.Read,
            buyerId: global.buyerId,
            text: item.text,
            dateTime: item.dateTime,
          },
        },
        context: {
          headers: {
            isPrivate: global.access_token,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  React.useLayoutEffect(() => {
    // navigation.setOptions({
    //   headerRight: () => (
    //     <View style={[t.mR6]}>
    //       <RightButton
    //         title="CLEAR ALL"
    //         onPress={() => {
    //           setClearAll(true);
    //           // NavigationService.goBack();
    //         }}
    //       />
    //     </View>
    //   ),
    // });
  }, [navigation]);
  const allNotifications = data?.notificationsByBuyerId;

  const unreadNotifications = allNotifications?.filter((item) => {
    return item.notificationStatus === "UNREAD";
  });
  return (
    <View style={styles.container}>
      <FlatList
        data={data?.notificationsByBuyerId}
        ListHeaderComponent={() => {
          return (
            <View style={styles.bodyContainer}>
              <Text style={styles.heading2Bold}>Notifications</Text>
              <Text style={[styles.heading4Regular, { color: Colors.grey80 }]}>
                {`You have ${
                  isEmpty(unreadNotifications) ? 0 : unreadNotifications?.length
                } unread notifications`}
              </Text>
            </View>
          );
        }}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                updateNotifications(item);
                refetch();
                setAlert({
                  visible: true,
                  message: item?.text,
                  title: "Notification",
                });
              }}
            >
              <View
                style={{
                  backgroundColor: "white",
                  paddingHorizontal: AppConfig.paddingHorizontal,
                  marginTop: s(8),
                  opacity: item.notificationStatus === "UNREAD" ? 1 : 1,
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
                          backgroundColor:
                            item.notificationStatus === "UNREAD"
                              ? colors.primary
                              : "transparent",
                        },
                      ]}
                    ></View>
                    {/* <Image
                    style={styles.shareIcon}
                    source={{
                      uri: "https://measure.3vyd.com/uPic/iphone.png",
                    }}
                  ></Image> */}
                    <View style={{ marginLeft: 15 }}>
                      <Text style={[styles.balanceTxt, { fontSize: s(15) }]}>
                        {item.email}
                      </Text>
                      <Text
                        style={[
                          styles.balanceTxt,
                          { color: colors.grey60, fontSize: s(14) },
                          t.pR4,
                        ]}
                      >
                        {item.text}
                      </Text>
                    </View>
                  </View>
                </View>
                <Text
                  style={[
                    styles.balanceTxt,
                    {
                      color: colors.grey60,
                      fontSize: s(14),
                    },
                    t.mT2,
                    t.mL6,
                  ]}
                >
                  {moment(item?.dateTime).format("DD MMM YYYY hh:mm A")}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item, index) => `list${index}`}
      />
    </View>
  );
}

export default Notifications;
