import React from "react";
import {
  View,
  ScrollView,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
} from "react-native";
import AppConfig from "../../Config/AppConfig";
import { vs, s, ScaledSheet } from "react-native-size-matters";
import fonts from "../../Themes/Fonts";
import colors from "../../Themes/Colors";
import { AppBar } from "../../Components";
import { ApplicationStyles } from "../../Themes";
import Header from "./header";
import Footer from "./footer";
import Trackers from "./trackers";
import { useRoute } from "@react-navigation/core";
import {
  DeliveryOption,
  useTrackOrderItemQuery,
} from "../../../generated/graphql";
import Qrcode from "./qrcode/index";
import { t } from "react-native-tailwindcss";
import moment from "moment";

function TrackOrder(props) {
  const {
    params: { type, data },
  } = useRoute();

  const { data: trackData, loading } = useTrackOrderItemQuery({
    variables: {
      orderItemId: data.orderItemId,
    },
    context: {
      headers: {
        isPrivate: true,
      },
    },
  });
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
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <SafeAreaView
        style={styles.safeArea}
        edges={["top", "right", "left", "bottom"]}
      >
        <AppBar
          title={type === "track" ? "Track Order" : "Order return status"}
        />
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
                data.deliveryOption ===
                  DeliveryOption.SellerLocationPickup) && (
                <Qrcode uri={trackData?.trackOrderItem.qrCodeAsBase64} />
              )}
              <Footer />
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
                  Please check the item carefully before accepting the delivery
                  to make sure you are happy with your purchase
                </Text>
              </View>
            </View>
          )}
          {(data.deliveryOption === DeliveryOption.CollectionPointPickup ||
            data.deliveryOption === DeliveryOption.SellerLocationPickup) && (
            <View style={[t.p4]}>
              <View style={[t.bgWhite, t.roundedLg, t.p3]}>
                <View style={[t.flexRow, t.itemsCenter]}>
                  <Image
                    style={[t.w4, t.h4]}
                    source={require("../../Images/user.png")}
                  />
                  <Text style={[t.fontBold, t.mL2]}>Contact Person</Text>
                </View>

                <Text style={[t.textGray500, t.mT2]}>John Smith</Text>
              </View>
              <View style={[t.bgWhite, t.roundedLg, t.p3, t.mT4]}>
                <View style={[t.flexRow, t.itemsCenter]}>
                  <Image
                    style={[t.w6, t.h6]}
                    source={require("../../Images/usercenter/ubiling.png")}
                  />
                  <Text style={[t.fontBold, t.mL1]}>Seller Location</Text>
                </View>
                <Text style={[t.textGray500, t.mT2]}>{`${
                  data?.pickupAddress?.houseNumber ?? ""
                }${data?.pickupAddress?.flat ?? ""}${
                  data?.pickupAddress?.villageArea ?? ""
                }${data?.pickupAddress?.townCity}${
                  data?.pickupAddress?.provinceState
                }${data?.pickupAddress?.country} ${
                  data?.pickupAddress?.pinCode ?? ""
                }`}</Text>
              </View>

              <View style={[t.bgWhite, t.roundedLg, t.p3, t.mT4]}>
                <View style={[t.flexRow, t.itemsCenter]}>
                  <Image
                    style={[t.w4, t.h4]}
                    source={require("../../Images/time2.png")}
                  />
                  <Text style={[t.fontBold, t.mL2]}>Opening Times</Text>
                </View>

                <Text style={[t.textGray500, t.mT2]}>Mon-Fri 9:00-17:00</Text>
              </View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
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
