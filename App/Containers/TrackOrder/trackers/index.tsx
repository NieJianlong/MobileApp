import React from "react";
import { View, Image, Text } from "react-native";
import { ApplicationStyles } from "../../../Themes";
import images from "../../../Themes/Images";
import { vs, s } from "react-native-size-matters";
import colors from "../../../Themes/Colors";

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
