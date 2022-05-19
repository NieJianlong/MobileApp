import React, { Component, useMemo } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import { Colors, Images } from "../../../Themes";
import NavigationService from "../../../Navigation/NavigationService";
import Share from "react-native-share";
import { shareOptions } from "../../Explore/Components/ShareOptionList";
import { t } from "react-native-tailwindcss";
import { useNavigation } from "@react-navigation/native";
import { useBuyerProfileQuery } from "../../../../generated/graphql";
import useOrderInfo from "../../../hooks/useOrderInfo";

function OrderPlaced(props) {
  console.log("props?.route?.params?.items =====", props?.route?.params?.items);
  const navigation = useNavigation();

  const { orderInfo, setOrderInfo } = useOrderInfo();
  const { loading, error, data, refetch } = useBuyerProfileQuery({
    variables: { buyerId: global.buyerId },
    context: {
      headers: {
        isPrivate: true,
      },
    },
    nextFetchPolicy: "network-only",
    onCompleted: (res) => {},
    onError: (res) => {},
  });
  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: () => null,
    });
  }, [navigation]);
  const userName = useMemo(() => {
    if (global.access_token) {
      return data
        ? `${data?.buyerProfile?.firstName} ${data?.buyerProfile?.lastName}`
        : "";
    } else {
      return "Guest buyer";
    }
  }, [data]);

  const renderBody = () => {
    
    return (
      <ScrollView style={styles.body}>
        <View style={styles.textArea}>
          <Text style={styles.txt1}>
            Your order has been{"\n"}processed sucessfully
          </Text>
          <Text style={styles.txt2}>
            Remember that you will not receive your order until the number of
            people required to make the purchase has been reached.
          </Text>
        </View>

        <Text style={styles.txt3}>Inform your group</Text>

        <View style={styles.informContainer}>
          {orderInfo.allItems.map((item, index) => {
            return (
              <View style={styles.row}>
                <Image
                  style={styles.productImage}
                  source={{
                    uri: item?.productDetails.photo,
                  }}
                />
                <View>
                  <Text style={styles.heading5Bold}>
                    {item?.productDetails?.shortName ?? ""}
                  </Text>
                  <Text style={styles.heading6Regular}>{userName}</Text>
                </View>
              </View>
            );
          })}
          {renderChatOptions()}
        </View>
      </ScrollView>
    );
  };

  const renderChatOptions = () => {
    return (
      <View style={styles.chatContainer}>
        <View style={styles.chatIconsContainer}>
          <TouchableOpacity
            onPress={() => {
              Share.open(shareOptions);
            }}
            style={[
              styles.chatButton,
              { backgroundColor: Colors.whatsapp, paddingLeft: 0 },
            ]}
          >
            <Image source={Images.whatsapp} style={styles.chatIcon} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView
        style={[
          styles.container,
          { marginTop: Platform.OS === "android" ? 30 : 0 },
        ]}
        edges={["top", "left", "right"]}
      >
        <View style={styles.header}>
          <View style={styles.icSearch} />

          <Image
            source={Images.logo3}
            style={styles.logo}
            resizeMode={"contain"}
          />

          <TouchableOpacity
            onPress={() => {
              NavigationService.navigate("PackageScreen");
            }}
          >
            <Image source={Images.crossMedium} style={styles.icSearch} />
          </TouchableOpacity>
        </View>

        {renderBody()}
      </SafeAreaView>
    </View>
  );
}

export default OrderPlaced;
