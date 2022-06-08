import React, { Component, useMemo, useRef } from "react";
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
import ViewShot, { captureRef } from "react-native-view-shot";
const url = "https://www.google.com/";
const title = "Awesome Contents";
const message = "Please check this out.";
const icon = "data:<data_type>/<file_extension>;base64,<base64_data>";

function OrderPlaced(props) {
  const viewShotRef = useRef(null);
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

  const toggleShareSheet = () => {
    captureRef(viewShotRef, {
      format: "png",
      quality: 0.8,
      result: "base64",
    }).then(
      (uri) => {
        const shareOptions = Platform.select({
          ios: {
            activityItemSources: [
              {
                // For sharing url with custom title.
                placeholderItem: { type: "url", content: url },
                item: {
                  default: { type: "url", content: url },
                },
                subject: {
                  default: title,
                },
                linkMetadata: { originalUrl: url, url, title },
              },
              {
                // For sharing text.
                placeholderItem: { type: "text", content: message },
                item: {
                  default: { type: "text", content: message },
                  message: null, // Specify no text to share via Messages app.
                },
                linkMetadata: {
                  // For showing app icon on share preview.
                  title: message,
                },
              },
              {
                // For using custom icon instead of default text icon at share preview when sharing with message.
                placeholderItem: {
                  type: "url",
                  content: icon,
                },
                item: {
                  default: {
                    type: "text",
                    content: `${message} ${url}`,
                  },
                },
                linkMetadata: {
                  title: message,
                  icon: icon,
                },
              },
            ],
          },
          default: {
            title: "Title",
            url: "data:image/png;base64," + uri,
            subject: "Subject",
          },
        });
        Share.open(shareOptions);
      },
      (error) => console.error("Oops, snapshot failed", error)
    );
    // })
  };

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

        <Text style={styles.txt3}></Text>

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
              toggleShareSheet();
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
    <ViewShot
      ref={viewShotRef}
      options={{ format: "png", quality: 0.4, result: "base64" }}
      style={styles.container}
    >
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
    </ViewShot>
  );
}

export default OrderPlaced;
