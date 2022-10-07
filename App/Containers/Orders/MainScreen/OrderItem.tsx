import moment from "moment";
import React from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { color, t } from "react-native-tailwindcss";
import NavigationService from "../../../Navigation/NavigationService";
import styles from "./styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function OrderItem({ item, canSelect, onSelect, selected }) {
  let detail = "";
  const statusText = item?.latestEventStatus?.replace(/_/g, " ");
  detail =
    statusText?.substring(0, 1) +
    statusText?.substring(1, statusText.length).toLowerCase() +
    " on " +
    moment(item.orderDatetime).format("DD/MM/YYYY");
  const { width } = useWindowDimensions();
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
            <Text
              style={[styles.heading5Bold, { width: width - 100 }, t.pR2]}
              numberOfLines={1}
            >
              {item.shortName}
            </Text>
          </View>
          <Text style={styles.txt3}>{detail}</Text>
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
      </View>
      {canSelect && (
        <TouchableOpacity
          onPress={onSelect}
          style={[
            t.absolute,
            t.left0,
            { marginLeft: width - 76 },
            t.mT10,
            t.p2,
          ]}
        >
          {selected ? (
            <MaterialCommunityIcons
              name="checkbox-marked-circle"
              size={24}
              color={color.primary}
            />
          ) : (
            <View
              style={[
                { width: 24, height: 24 },
                t.border,
                t.borderPrimary,
                t.roundedFull,
              ]}
            />
          )}
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

export default OrderItem;
