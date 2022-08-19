import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  SectionList,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from "react-native";
import { Images } from "../../../Themes";
import styles from "./styles";
import { color, t } from "react-native-tailwindcss";
import {
  OrderItemHistoryEventType,
  ProductListingStatus,
  useIsListingAvailableLazyQuery,
  useSearchBuyerOrdersQuery,
} from "../../../../generated/graphql";
import { useFocusEffect } from "@react-navigation/native";
import useLoading from "../../../hooks/useLoading";
import OrderItem from "./OrderItem";
import { difference, groupBy, isEmpty, remove, uniq } from "lodash";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ComeFromType } from "../../../Utils/utils";
import { ItemProps, useCreateOrder } from "../../../hooks/useCreateOrder";
import useOrderInfo from "../../../hooks/useOrderInfo";
import { useReactiveVar } from "@apollo/client";
import { userProfileVar } from "../../../Apollo/cache";
import { observer } from "mobx-react";
import { useAppStore } from "../../../mobx";
import { TabbarItem } from "../../../Navigation/TabBar";

function Order(props) {
  const userProfile = useReactiveVar(userProfileVar);
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
  const [queryAvailble, { data: availbleList, loading }] =
    useIsListingAvailableLazyQuery();
  const { retryPayment } = useCreateOrder();
  const { updateMoneyInfo } = useOrderInfo();
  const { setLoading } = useLoading();

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
        <View style={[styles.header, Platform.OS === "android" && t.h24]}>
          <View style={styles.icSearch} />
          <Image
            source={Images.logo3}
            style={[
              styles.logo,
              Platform.OS === "android" ? { marginTop: 40 } : {},
            ]}
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
            if (isEmpty(data)) {
              return null;
            }
            const shippingAddressId = data[0].shippingAddressId;
            const billingDetailsId = data[0].billingDetailsId;
            const selectedItems = selecteds.filter(
              (item) => item.shippingAddressId === shippingAddressId
            );
            const isSelected = selectedItems.length === data.length;
            return status ? (
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
                    onPress={async () => {
                      setLoading({ show: true });
                      const shippingAddressId = data[0].shippingAddressId;
                      const billingDetailsId = data[0].billingDetailsId;
                      const selectedItems = selecteds.filter(
                        (item) => item.shippingAddressId === shippingAddressId
                      );
                      const isListingAvailableParams = selectedItems.map(
                        (item) => {
                          return {
                            listingId: item.listingId,
                            variantId: item.variantId,
                            quantity: item.quantity,
                          };
                        }
                      );
                      const retryParams = selectedItems.map((item) => {
                        return {
                          listingId: item.listingId,
                          variantId: item.variantId,
                          quantity: item.quantity,
                          replacedOrderItemId: item.orderItemId,
                        };
                      });
                      const results = await queryAvailble({
                        variables: { listings: isListingAvailableParams },
                      });
                      const isListingAvailable =
                        results?.data?.isListingAvailable;

                      const itemArray = [];
                      const allItems: ItemProps[] = [];
                      isListingAvailable?.map((item, index) => {
                        if (item.isAvailable) {
                          itemArray.push({
                            listingId: item.listingId,
                            variantId: item.variantId,
                            quantity: isListingAvailableParams[index].quantity,
                          });

                          allItems.push({
                            listingId: item.listingId ?? "",
                            variantId: item.variantId ?? "",
                            quantity: isListingAvailableParams[index].quantity,
                            productDetails: item?.listing,
                            variant: item.listing?.listingVariants?.find(
                              (variantItem) =>
                                variantItem?.variantId === item.variantId
                            ),
                          });
                        }
                      });

                      global.billingDetails = {
                        email: userProfile.email,
                        phoneNumber: userProfile.phone ?? "",
                        firstName: userProfile.firstName,
                        lastName: userProfile.lastName,
                      };
                      const newInfo = {
                        itemsForRequest: retryParams,
                        allItems: allItems,
                        comeFromType: ComeFromType.checkout,
                        availbleList,
                      };
                      updateMoneyInfo(newInfo);
                      retryPayment({
                        isFromInSufficientSalamiCreditScreen: false,
                        itemsForRequest: retryParams,
                        allItems: allItems,
                        availbleList: isListingAvailable ?? [],
                        billingDetailsId: billingDetailsId ?? "",
                        shippingAddressId: shippingAddressId ?? "",
                      });

                      setLoading({ show: false });
                    }}
                  >
                    <Text style={[t.pX2, t.textPrimary]}>{title}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      if (isSelected) {
                        setSelecteds(uniq([...difference(selecteds, data)]));
                      } else {
                        setSelecteds(uniq([...selecteds, ...data]));
                      }
                    }}
                  >
                    {isSelected ? (
                      <MaterialCommunityIcons
                        name="checkbox-marked-circle"
                        size={24}
                        color={color.primary}
                      />
                    ) : (
                      <View
                        style={[
                          { width: 24, height: 24 },
                          t.border,
                          t.borderPrimary,
                          t.roundedFull,
                        ]}
                      />
                    )}
                  </TouchableOpacity>
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
  const { setLoading, loading: appLoading } = useLoading();
  useEffect(() => {
    setLoading({ show: loading });
  }, [loading, setLoading]);
  useFocusEffect(
    React.useCallback(() => {
      setLoading({ show: true });
      refetch()
        .then(() => {
          setLoading({ show: false });
        })
        .catch(() => {
          setLoading({ show: false });
        });
    }, [refetch])
  );
  const { router } = useAppStore();
  useEffect(() => {
    const timer = setInterval(() => {
      try {
        if (router === TabbarItem.PackageScreen) {
          refetch();
        }
      } catch (error) {}
    }, 2000);
    return () => {
      clearInterval(timer);
    };
  }, [router]);

  return appLoading.show ? (
    <View />
  ) : (
    <Order orderItems={data?.searchBuyerOrders?.content ?? []} />
  );
}

export default observer(OrderScreen);
