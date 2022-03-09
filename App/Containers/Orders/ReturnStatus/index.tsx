import React, { useMemo } from "react";
import { View, ScrollView, Text, SafeAreaView, StatusBar } from "react-native";
import AppConfig from "../../../Config/AppConfig";
import { vs, s, ScaledSheet } from "react-native-size-matters";
import fonts from "../../../Themes/Fonts";
import colors from "../../../Themes/Colors";
import { AppBar } from "../../../Components";
import { ApplicationStyles } from "../../../Themes";
import Header from "./header";
import { useRoute } from "@react-navigation/core";
import { useGetOrderReturnStatusQuery } from "../../../../generated/graphql";
import Trackers, { ITrackItemProps } from "../../TrackOrder/trackers";
import moment from "moment";
import { capitalize } from "lodash";

function ReturnStatus(props) {
  const {
    params: { type, data },
  } = useRoute();

  const { data: trackData, loading } = useGetOrderReturnStatusQuery({
    variables: {
      orderReturnId: data.orderReturnId,
    },
    context: {
      headers: {
        isPrivate: true,
      },
    },
  });
  const events: ITrackItemProps[] = useMemo(() => {
    if (trackData) {
      const eventsArray: ITrackItemProps[] = [];
      trackData.getOrderReturnStatus.events?.map((item, index) => {
        eventsArray.push({
          title: capitalize(item?.eventType.replaceAll("_", " ")),
          subtitle: moment(item?.eventDateTime).format("DD MMM, YYYY h:mm a"),
          status: 0,
          hasline: index !== trackData?.getOrderReturnStatus.events?.length - 1,
        });
      });
      return eventsArray;
    }
    return [];
  }, [trackData]);
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
            <Text
              style={[ApplicationStyles.screen.txtRegular, { fontSize: s(14) }]}
            >
              {moment(trackData?.getOrderReturnStatus.deadline).format(
                "DD MMM yyyy"
              )}
            </Text>
            <View style={{ height: 10, width: "100%" }} />
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
              <Trackers events={events} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

export default ReturnStatus;
const styles = ScaledSheet.create({
  title: {
    fontFamily: fonts.primary,
    fontSize: "16@s",
    color: colors.black,
    fontWeight: "600",
  },
});
