import React, { useMemo } from "react";
import { View, ScrollView, Text } from "react-native";
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

function TrackOrder(props) {
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
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
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
                { fontSize: s(32), paddingTop: 10 },
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
                Please check the item carefully before accepting the delivery to
                make sure you are happy with your purchase
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
    </View>
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
});
