import React, { Component, useMemo, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import { Colors, Images } from "../../../Themes";
import NavigationService from "../../../Navigation/NavigationService";
import Share from "react-native-share";
import { shareOptions } from "../../Explore/Components/ShareOptionList";
import { t } from "react-native-tailwindcss";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useBuyerProfileQuery } from "../../../../generated/graphql";
import useOrderInfo from "../../../hooks/useOrderInfo";
import ViewShot, { captureRef } from "react-native-view-shot";
import RNFetchBlob from "rn-fetch-blob";
import { shareOptionsDetails } from "../Components/ShareOptionList";
import colors from "../../../Themes/Colors";
const url = "";
const title = "";
const message = "";
const icon = "data:<data_type>/<file_extension>;base64,<base64_data>";

function OrderPlaced(props) {
  const viewShotRef = useRef(null);
  console.log("props?.route?.params?.items =====", props?.route?.params?.items);
  const navigation = useNavigation();
  const { params } = useRoute();

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
      header: () => (
        <View
          style={[
            t.bgWhite,
            t.flexRow,
            t.justifyBetween,
            t.h24,
            t.itemsEnd,
            t.pX4,
            { backgroundColor: colors.background },
          ]}
        >
          <View style={{ width: 36, height: 36 }} />
          <Image
            source={Images.logo4}
            style={[styles.logo, t.mT4]}
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
      ),
    });
  }, [navigation, params]);
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
    const fs = RNFetchBlob.fs;
    let imagePath = null;
    RNFetchBlob.config({
      fileCache: true,
    })
      .fetch("GET", orderInfo.allItems[0].productDetails.photo)
      .then((resp) => {
        imagePath = resp.path();
        return resp.readFile("base64");
      })
      .then((base64Data) => {
        console.log(base64Data);
        shareOptionsDetails(base64Data, orderInfo.allItems[0].productDetails);
        return fs.unlink(imagePath);
      });
    // })
  };

  const renderBody = () => {
    let errorMessage = params?.error ? params?.error?.description : "";
    debugger;
    try {
      errorMessage = params?.error?.description.includes("cancel")
        ? "Payment processing cancelled, Please retry payment from My orders"
        : "Payment processing failed, Please retry payment from My orders";
    } catch (error) {}

    return (
      <ScrollView style={styles.body}>
        <View style={styles.textArea}>
          <Text style={styles.txt1}>
            {params?.error
              ? errorMessage
              : " Your order has been processed sucessfully"}
          </Text>
          <Text style={styles.txt2}>
            {params?.error
              ? ""
              : "Remember that you will not receive your order until the number of people required to make the purchase has been reached."}
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

          {!params?.error && renderChatOptions()}
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
  const { width, height } = useWindowDimensions();
  return (
    <View style={{ width, height }}>
      {/* <TouchableOpacity
        onPress={() => {
          NavigationService.navigate("ExploreScreen");
        }}
        style={[t.z100, { marginLeft: width - 60 }, t.w32, t.z100]}
      >
        <Image source={Images.crossMedium} style={styles.icSearch} />
      </TouchableOpacity> */}
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
          {renderBody()}
        </SafeAreaView>
      </ViewShot>
    </View>
  );
}

export default OrderPlaced;
