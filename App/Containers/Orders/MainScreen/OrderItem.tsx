import moment from "moment";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import NavigationService from "../../../Navigation/NavigationService";
import styles from "./styles";

function OrderItem({ item }) {
  let detail = "";
  const statusText = item?.latestEventStatus?.replace(/_/g, " ");
  detail =
    statusText?.substring(0, 1) +
    statusText?.substring(1, statusText.length).toLowerCase() +
    " on " +
    moment(item.orderDatetime).format("DD/MM/YYYY");
  return (
    <TouchableOpacity
      onPress={() => {
        NavigationService.navigate("GroupInfoScreen", {
          type: item.type,
          item: item,
        });
      }}
      disabled={item.isCompleted}
      style={[styles.itemContainer, item.isCompleted && { opacity: 0.5 }]}
    >
      <View style={styles.row}>
        <Image
          source={{ uri: item.mainImagePath }}
          resizeMode="contain"
          style={styles.itemAvatar}
        />
        <View style={styles.v2}>
          <View style={styles.row}>
            <Text style={styles.heading5Bold}>{item.shortName}</Text>

            {/* {item.isAnnoucement && (
                    <View style={styles.annoucementContainer}>
                      <Text style={styles.annoucementText}>Announcement</Text>
                    </View>
                  )} */}
          </View>
          <Text style={styles.txt3}>
            {detail}
            {/* {item.lastMessage.author}:{" "}
                  <Text style={{ color: Colors.grey60 }}>
                    {item.lastMessage.content}
                  </Text> */}
          </Text>
        </View>
      </View>

      <View style={styles.v3}>
        {item.isCompleted ? (
          <Text style={styles.heading6Regular}>COMPLETED</Text>
        ) : (
          <Text style={styles.heading6Regular}>
            {/* {moment(item.lastMessage.time).fromNow()} */}
          </Text>
        )}
        {/* {item.unreadCount > 0 && (
                <View style={styles.unreadContainer}>
                  <Text style={styles.unreadNumber}>{item.unreadCount}</Text>
                </View>
              )} */}
      </View>
    </TouchableOpacity>
  );
}

export default OrderItem;
