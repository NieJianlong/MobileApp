import React, { Component, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  SectionList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { vs } from "react-native-size-matters";
import { Button } from "../../../Components";
import NavigationService from "../../../Navigation/NavigationService";
import { Images } from "../../../Themes";
import styles from "./styles";
import { color, t } from "react-native-tailwindcss";
import {
  OrderItemHistoryEventType,
  ProductListingStatus,
  useSearchBuyerOrdersQuery,
} from "../../../../generated/graphql";
import { useFocusEffect } from "@react-navigation/native";
import useLoading from "../../../hooks/useLoading";
import OrderItem from "./OrderItem";
import { difference, groupBy, remove } from "lodash";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function Order(props) {
  const [selecteds, setSelecteds] = useState(
    props.orderItems.filter((item) => {
      return (
        (item?.latestEventStatus ===
          OrderItemHistoryEventType.WaitingForPayment ||
          item?.latestEventStatus ===
            OrderItemHistoryEventType.FailedPayment) &&
        item?.listingStatus === ProductListingStatus.Active
      );
    })
  );
  const unpaidItems = props.orderItems.filter((item) => {
    return (
      (item?.latestEventStatus ===
        OrderItemHistoryEventType.WaitingForPayment ||
        item?.latestEventStatus === OrderItemHistoryEventType.FailedPayment) &&
      item?.listingStatus === ProductListingStatus.Active
    );
  });

  const results = groupBy(unpaidItems, "shippingAddressId");
  const datas = Object.values(results);
  const sections = datas.map((data) => {
    return {
      title: "Retry Payment",
      data: data,
      status: true,
      id: data[0].shippingAddressId,
    };
  });
  const paidItems = difference(props.orderItems, unpaidItems);
  sections.push({ title: "", data: paidItems, status: false, id: "ignored" });
  return (
    <View style={[styles.container]}>
      <SafeAreaView
        style={styles.safeArea}
        edges={["top", "right", "left", "bottom"]}
      >
        <View style={styles.header}>
          <View style={styles.icSearch} />
          <Image
            source={Images.logo3}
            style={styles.logo}
            resizeMode={"contain"}
          />
          <View style={styles.icSearch} />
        </View>
        <View style={styles.v1}>
          <Text style={[t.textLg, t.mY4]}>Orders</Text>
        </View>
      </SafeAreaView>

      <View style={styles.bodyContainer}>
        <SectionList
          sections={sections}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item, section: { title, data, status } }) => {
            const isSelected =
              selecteds.findIndex((i) => i.orderItemId === item.orderItemId) >
              -1;
            return (
              <View
                style={[
                  t.mX4,
                  status && t.border,
                  status && { borderTopWidth: 0, borderBottomWidth: 0 },
                  status && t.borderBlue500,
                ]}
              >
                <OrderItem
                  item={item}
                  canSelect={status}
                  onSelect={() => {
                    if (isSelected) {
                      const items = [];
                      selecteds.forEach((i) => {
                        if (i.orderItemId !== item.orderItemId) {
                          items.push(i);
                        }
                      });
                      setSelecteds([...items]);
                    } else {
                      const items = [];
                      selecteds.forEach((i) => {
                        items.push(i);
                      });
                      items.push(item);
                      setSelecteds([...items]);
                    }
                  }}
                  selected={isSelected}
                />
              </View>
            );
          }}
          renderSectionHeader={({ section: { title, data, status } }) => {
            status ? (
              <View
                style={[
                  t.flexRow,
                  t.bgWhite,
                  t.mT2,
                  t.justifyBetween,

                  t.mX4,
                  t.border,
                  t.borderBlue500,
                  { borderBottomWidth: 0 },
                ]}
              >
                <Text style={[t.h12, t.pT6, t.pX4, t.textPrimary]}>
                  {data.length} items
                </Text>
                <View style={[t.flexRow, t.itemsCenter, t.pX4]}>
                  <TouchableOpacity
                    style={[
                      status && t.borderPrimary,
                      status && t.border,
                      t.itemsCenter,
                      t.justifyCenter,
                      t.roundedLg,
                      t.m2,
                      t.mR4,
                    ]}
                  >
                    <Text style={[t.pX2, t.textPrimary]}>{title}</Text>
                  </TouchableOpacity>
                  <MaterialCommunityIcons
                    name="checkbox-marked-circle"
                    size={24}
                    color={color.primary}
                  />
                </View>
              </View>
            ) : null;
          }}
          renderSectionFooter={({ section: { title, data } }) => (
            <View
              style={[
                t.flexRow,
                t.bgWhite,
                t.mB2,
                t.justifyBetween,
                t.mX4,
                t.border,
                t.borderBlue500,
                { borderBottomWidth: 0 },
              ]}
            />
          )}
        />
      </View>
    </View>
  );
}

function OrderScreen() {
  const { data, refetch, loading } = useSearchBuyerOrdersQuery({
    variables: {
      options: {
        searchString: "",
        pageOption: {
          pageNumber: 0,
          pageSize: 1000,
        },
      },
    },

    context: {
      headers: {
        isPrivate: true,
      },
    },
  });
  const { setLoading } = useLoading();
  useEffect(() => {
    setLoading({ show: loading });
  }, [loading, setLoading]);
  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [refetch])
  );

  return loading ? (
    <View />
  ) : (
    <Order orderItems={data?.searchBuyerOrders?.content ?? []} />
  );
}

export default OrderScreen;
