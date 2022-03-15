import React from "react";
import { View, Image, Text } from "react-native";
import { ApplicationStyles } from "../../../Themes";
import images from "../../../Themes/Images";
import { vs, s } from "react-native-size-matters";
import colors from "../../../Themes/Colors";

const trackers = [
  {
    title: "Your order has been registered",
    subtitle: "20 Oct, 2020 3.30PM",
    status: 0,
    hasline: true,
  },
  {
    title: "Order packed and ready for shipping",
    subtitle: "20 Oct, 2020 8.30PM",
    status: 0,
    hasline: true,
  },
  {
    title: "Order sent",
    subtitle: "Order in transit",
    status: 1,
    hasline: true,
  },
  {
    title: "Your order has been delivered",
    subtitle: "Your order has been delivered succesfully",
    status: 1,
    hasline: false,
  },
];

const returnStatus = [
  {
    title: "The product has been received by the seller",
    subtitle: "20 Oct, 2020 3.30PM",
    status: 0,
    hasline: true,
  },
  {
    title: "The product is being reviewed",
    subtitle: "20 Oct, 2020 8.30PM",
    status: 0,
    hasline: true,
  },
  {
    title: "Refund sent",
    subtitle: "Order in transit",
    status: 1,
    hasline: true,
  },
  {
    title: "The refund has been received by the buyer",
    subtitle: "Your refund has been sent succesfully",
    status: 1,
    hasline: false,
  },
];

export interface ITrackItemProps {
  title: string;
  subtitle: string;
  status: number;
  hasline: boolean;
}
interface ITrackOrderProps {
  events: ITrackItemProps[];
}
function index({ events }: ITrackOrderProps) {
  // const { type } = props;
  // const items = type === "track" ? trackers : returnStatus;
  if (!events) {
    return <View />;
  }
  return (
    <View style={{ paddingTop: vs(15), paddingBottom: vs(15) }}>
      {events.map((item, index) => {
        let nextItem;
        if (index < events.length - 1) {
          nextItem = events[index + 1];
        }
        return (
          <View key={`jiangshan${index}`} style={{ flexDirection: "row" }}>
            <View>
              <Image
                style={{ width: 60, height: 25, resizeMode: "contain" }}
                source={
                  item.status === 0
                    ? images.orderCheckImage
                    : images.orderUnCheckImage
                }
              />
              {item.hasline && (
                <Image
                  style={{ width: 60, height: 80, resizeMode: "contain" }}
                  source={
                    nextItem.status == 0
                      ? images.orderLineImage
                      : images.orderUnLineImage
                  }
                />
              )}
            </View>
            <View>
              <Text
                style={[
                  ApplicationStyles.screen.heading4Bold,
                  {
                    fontSize: s(14),
                    color: item.status === 0 ? colors.black : colors.grey20,
                  },
                ]}
              >
                {item.title}
              </Text>
              <View style={{ flexDirection: "row" }}>
                {item.status === 0 && (
                  <Image
                    style={{ width: 22, height: 24, resizeMode: "contain" }}
                    source={images.orderClockImage}
                  />
                )}
                <Text
                  style={[
                    ApplicationStyles.screen.txtRegular,
                    {
                      fontSize: s(12),
                      color: item.status === 0 ? colors.grey80 : colors.grey20,
                    },
                  ]}
                >
                  {item.subtitle}
                </Text>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
}

export default index;