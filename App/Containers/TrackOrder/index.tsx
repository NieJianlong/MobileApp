import React, { useMemo, useRef } from "react";
import { View, ScrollView, Text, Image, Platform } from "react-native";
import AppConfig from "../../Config/AppConfig";
import { vs, s, ScaledSheet } from "react-native-size-matters";
import fonts from "../../Themes/Fonts";
import colors from "../../Themes/Colors";

import { ApplicationStyles } from "../../Themes";
import Header from "./header";
import Footer from "./footer";
import Trackers, { ITrackItemProps } from "./trackers";
import { useRoute } from "@react-navigation/core";
import {
  DeliveryOption,
  useTrackOrderItemQuery,
} from "../../../generated/graphql";
import Qrcode from "./Qrcode/index";
import { t } from "react-native-tailwindcss";
import moment from "moment";
import PickInfo from "../../Components/PickInfo";
import { useFocusEffect } from "@react-navigation/native";
import { capitalize, isEmpty } from "lodash";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import ViewShot, { captureRef, captureScreen } from "react-native-view-shot";
import Share from "react-native-share";
const url = "https://www.google.com/";
const title = "Awesome Contents";
const message = "Please check this out.";
const icon = "data:<data_type>/<file_extension>;base64,<base64_data>";

function TrackOrder(props) {
  const viewShotRef = useRef(null);
  const {
    params: { type, data },
  } = useRoute();



  const {
    data: trackData,
    loading,
    refetch,
  } = useTrackOrderItemQuery({
    variables: {
      orderItemId: data.orderItemId,
    },
    context: {
      headers: {
        isPrivate: true,
      },
    },
  });
  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [refetch])

  );

  console.log("see the props", trackData);

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
  const events: ITrackItemProps[] = useMemo(() => {
    if (trackData) {
      const eventsArray: ITrackItemProps[] = [];
      trackData.trackOrderItem.events?.map((item, index) => {
        eventsArray.push({
          title: capitalize(item?.eventType.replace(/_/g, " ")),
          subtitle: moment(item?.eventDateTime).format("DD MMM, YYYY h:mm a"),
          status: 0,
          hasline: index !== trackData?.trackOrderItem?.events?.length - 1,
        });
      });
      return eventsArray;
    }
    return [];
  }, [trackData]);
  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: type === "track" ? "Track Order" : "Order return status",
    });
  }, [navigation, type]);
  return (
    <ViewShot
    style={{
      flex: 1,
      backgroundColor: colors.background,
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    }}
      ref={viewShotRef}
      options={{ format: "png", quality: 0.4, result: "base64" }}
    >

        <ScrollView contentContainerStyle={{ paddingBottom: vs(64) }}>
          <View
            style={{
              alignItems: "center",
              height: vs(100),
              justifyContent: "center",
            }}
          >
            <Text
              style={[ApplicationStyles.screen.txtRegular, { fontSize: s(14) }]}
            >
              {`Estimated ${type === "track" ? "delivery" : "return"} date`}
            </Text>
            <View style={{ height: 10, width: "100%" }} />

            {data.deliveryOption === DeliveryOption.CollectionPointPickup && (
              <Text
                style={[
                  ApplicationStyles.screen.heading2Bold,
                  { fontSize: s(20), paddingTop: 10 },
                ]}
              >
                {moment(
                  trackData?.trackOrderItem.collectionPoint.collectionDate ?? ""
                ).format("DD MMM YYYY")}
              </Text>
            )}
            {data.deliveryOption === DeliveryOption.SellerDirectDelivery && (
              <Text
                style={[
                  ApplicationStyles.screen.heading2Bold,
                  { fontSize: s(32), paddingTop: 10 },
                ]}
              >
                {moment(
                  trackData?.trackOrderItem.sellerDirectDelivery.deliveryDate ??
                    ""
                ).format("DD MMM YYYY")}
              </Text>
            )}
            {data.deliveryOption === DeliveryOption.SellerLocationPickup && (
              <Text
                style={[
                  ApplicationStyles.screen.heading2Bold,
                  { fontSize: s(32), paddingTop: 10 },
                ]}
              >
                {moment(
                  trackData?.trackOrderItem.sellerLocation.collectionDate ?? ""
                ).format("DD MMM YYYY")}
              </Text>
            )}
          </View>
          <View style={{ paddingHorizontal: AppConfig.paddingHorizontal }}>
            <View
              style={{
                backgroundColor: "white",
                borderRadius: s(16),
                flex: 1,
              }}
            >
              <Header orderNumber={data.orderNumber} />
              {data.deliveryOption === DeliveryOption.CourierDelivery && (
                <Trackers type={type} />
              )}
              {(data.deliveryOption === DeliveryOption.CollectionPointPickup ||
                data.deliveryOption === DeliveryOption.SellerDirectDelivery ||
                data.deliveryOption === DeliveryOption.SellerLocationPickup) &&
                (!isEmpty(trackData?.trackOrderItem.qrCodeAsBase64) ? (
                  <Qrcode uri={trackData?.trackOrderItem.qrCodeAsBase64} />
                ) : (
                  <Trackers events={events} />
                ))}
              {!isEmpty(trackData?.trackOrderItem.qrCodeAsBase64) && <Footer />}
            </View>
          </View>
          <TouchableOpacity style={styles.whatssAppbtn} onPress={toggleShareSheet}>
            <Text style={styles.textStyle}>Share code on WhatApp</Text>
            <Image
              source={require("../../Images/whatsappgreen.png")}
              style={styles.whatsAppIcon}
            />
          </TouchableOpacity>
          {data.deliveryOption === DeliveryOption.SellerDirectDelivery && (
            <View style={[t.p4]}>
              <Text style={[t.fontBold, t.textGray800]}>
                Please note returns are not allowed for this item
              </Text>
              <View style={[t.flexRow, t.itemsCenter, t.mT4]}>
                <View style={[t.w2, t.h2, t.roundedFull, t.bgGray600, t.mR2]} />
                <Text>
                  Upon delivery, there is the chance to inspect the item and
                  either accept or reject it
                </Text>
              </View>
              <View style={[t.flexRow, t.itemsCenter, t.mT4]}>
                <View style={[t.w2, t.h2, t.roundedFull, t.bgGray600, t.mR2]} />
                <Text style={[t.textGray600, t.fontBold]}>
                  Please check the item carefully before accepting the delivery
                  to make sure you are happy with your purchase
                </Text>
              </View>
            </View>
          )}
          {(data.deliveryOption === DeliveryOption.CollectionPointPickup ||
            data.deliveryOption === DeliveryOption.SellerLocationPickup) &&
            !isEmpty(trackData?.trackOrderItem.qrCodeAsBase64) && (
              <PickInfo
                deliveryOption={data.deliveryOption}
                sellerLocation={data.sellerLocation}
                collectionPoint={data.collectionPoint}
              />
            )}
        </ScrollView>
    </ViewShot>
  );
}

export default TrackOrder;
const styles = ScaledSheet.create({
  title: {
    fontFamily: fonts.primary,
    fontSize: "16@s",
    color: colors.black,
    fontWeight: "600",
  },
  whatssAppbtn: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    flexDirection: "row",
  },
  whatsAppIcon: {
    height: "31@s",
    width: "31@s",
  },
  textStyle: {
    marginRight: "120@s",
  },
});
