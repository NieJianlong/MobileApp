import React, { useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import { AppBar } from "../../../Components";
import { Images } from "../../../Themes";
import NavigationService from "../../../Navigation/NavigationService";
import { useRoute } from "@react-navigation/core";
import ProductItem from "../../Explore/Components/ProductItem";
import {
  DeliveryOption,
  FilterType,
  OrderItemHistoryEventType,
  ProductListingStatus,
  useGetListingsQuery,
  useGetOrderItemDetailsQuery,
  useMarkOrderItemAsDeliveredMutation,
  useUpdateListingStatusMutation,
} from "../../../../generated/graphql";
import { useFocusEffect } from "@react-navigation/native";
import useLoading from "../../../hooks/useLoading";

function GroupInfoScreen(props) {
  const { params } = useRoute();
  const { setLoading } = useLoading();
  const data = params.item;
  const {
    data: orderData,
    refetch,
    loading,
  } = useGetOrderItemDetailsQuery({
    variables: {
      orderItemId: data.orderItemId,
    },
    onCompleted: () => {
      setLoading({ show: false });
    },
    onError: () => {
      setLoading({ show: false });
    },
    context: {
      headers: {
        isPrivate: true,
      },
    },
  });

  useEffect(() => {
    setLoading({ show: loading });
  }, [loading, setLoading]);
  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [refetch])
  );
  const { data: product } = useGetListingsQuery({
    variables: {
      searchOptions: {
        filter: FilterType.ByListingId,
        filterParams: {
          listingId: data.listingId,
          productId: data.productId,
        },
      },
    },
    context: {
      headers: {
        isPrivate: global.access_token ? true : false,
      },
    },
  });
  const [markOrderItem] = useMarkOrderItemAsDeliveredMutation();
  useEffect(() => {
    markOrderItem({
      variables: {
        request: {
          buyerId: global.buyerId,
          orderItemId: data.orderItemId,
        },
      },
      context: {
        headers: {
          isPrivate: true,
        },
      },
    });
    updateListingStatus();
  }, [data, markOrderItem]);

  const [updateListingStatus] = useUpdateListingStatusMutation({
    variables: {
      input: {
        listingId: data.listingId,
        status: ProductListingStatus.Accepted,
      },
    },
    context: {
      headers: {
        isPrivate: true,
      },
    },
  });
  // const { loading, error, data, refetch, fetchMore } = useGetListingsQuery({
  //   variables: {
  //     searchOptions: {
  //       filter: FilterType.ByListingId,
  //       filterParams: {
  //         listingId:params?.item?.listingId
  //       },
  //     },
  //   },
  //   context: {
  //     headers: {
  //       isPrivate: true,
  //     },
  //   },
  //   onError: () => {},
  //   onCompleted: (res) => {
  //     // map data from server for now
  //     // add missing fields for product review
  //     // update for name changes in data from server
  //     // setNoMore(false);
  //     // setServerData(res.getListings.content);
  //   },
  // });
  // const { loading, error, data, refetch, fetchMore } = useQuery(GET_LISTINGS, {
  //   variables: {
  //     searchOptions: {
  //       filter: "BY_LISTING_ID",
  //       filterParams: {
  //         listingId: params.item.listingId ?? "",
  //       },
  //     },
  //   },
  //   context: {
  //     headers: {
  //       isPrivate: true,
  //     },
  //   },
  //   onError: (res) => {},
  // });
  // if (data) {
  //   console.log("data====================================");
  //   console.log(data);
  //   console.log("====================================");
  // }
  function renderAction(icon, text, action) {
    return (
      <TouchableOpacity onPress={action} style={styles.actionContainer}>
        <View style={styles.row}>
          <Image
            resizeMode={"contain"}
            source={icon}
            style={styles.actionIcon}
          />
          <Text style={styles.heading5Bold}>{text}</Text>
        </View>
        <Image source={Images.arrow_left} style={styles.icArrow} />
      </TouchableOpacity>
    );
  }
  function renderActions() {
    const finalData = orderData?.getOrderItemDetails;
    return (
      <View>
        {renderAction(Images.packageMed, "Order details", () => {
          NavigationService.navigate("OrderDetailScreen", {
            data: orderData?.getOrderItemDetails,
            product: product?.getListings?.content[0],
          });
        })}
        {renderAction(Images.invoice, "Invoice", () =>
          NavigationService.navigate("InvoiceScreen", {
            data: orderData?.getOrderItemDetails,
            product: product?.getListings?.content[0],
          })
        )}
        {renderAction(Images.star, "Write a review about the product", () =>
          NavigationService.navigate("RateOrderScreen", {
            onPost: () => {
              NavigationService.goBack();
            },
            data: orderData?.getOrderItemDetails,
            product: product?.getListings?.content[0],
          })
        )}
        {renderAction(Images.user, "Evaluate the seller", () =>
          // NavigationService.navigate("RateSellerScreen")
          NavigationService.navigate("RateOrderScreen", {
            onPost: () => {
              NavigationService.goBack();
            },
            data: orderData?.getOrderItemDetails,
            title: "Evaluate the seller",
            product: product?.getListings?.content[0],
          })
        )}
        {/* when order status is reached,user can track order */}
        {(finalData?.latestEventStatus === OrderItemHistoryEventType.Paid ||
          finalData?.latestEventStatus ===
            OrderItemHistoryEventType.Delivered) &&
          (finalData?.listingStatus === ProductListingStatus.Accepted ||
            finalData?.listingStatus === ProductListingStatus.Successful) &&
          renderAction(Images.orderTrackImage, "Track order", () => {
            // if (data.deliveryOption === DeliveryOption.CourierDelivery) {
            NavigationService.navigate("TrackOrderScreen", {
              type: "track",
              data: orderData?.getOrderItemDetails,
            });
            // } else {
            // }
          })}

        {/* when order status is received,user can return product */}
        {finalData?.latestEventStatus === OrderItemHistoryEventType.Delivered &&
          finalData?.itemReturnPolicy?.isReturnAllowed &&
          renderAction(Images.orderReturnImage, "Return product", () => {
            if (
              finalData?.deliveryOption === DeliveryOption.SellerDirectDelivery
            ) {
              NavigationService.navigate("ReturnsUnavailable", { data });
              return;
            }
            NavigationService.navigate("ReturnProductStep1Screen", {
              data: orderData?.getOrderItemDetails,
              product: product?.getListings?.content[0],
            });
          })}
        {/* when order status is uncompleted,user can cancel the order */}
        {finalData?.listingStatus === ProductListingStatus.Active &&
          (finalData?.latestEventStatus ===
            OrderItemHistoryEventType.WaitingForPayment ||
            finalData?.latestEventStatus ===
              OrderItemHistoryEventType.AuthorizedPayment ||
            finalData?.latestEventStatus ===
              OrderItemHistoryEventType.FailedPayment ||
            finalData?.latestEventStatus === OrderItemHistoryEventType.Paid) &&
          renderAction(Images.orderCancelImage, "Cancel order", () =>
            NavigationService.navigate("CancelOrderScreen", {
              orderItemId: data.orderItemId,
              data: orderData?.getOrderItemDetails,
              product: product?.getListings?.content[0],
            })
          )}
        {(finalData?.latestEventStatus ===
          OrderItemHistoryEventType.ReplacementRequest ||
          finalData?.latestEventStatus ===
            OrderItemHistoryEventType.RefundRequest) &&
          renderAction(Images.orderTrackImage, "Return status", () =>
            NavigationService.navigate("ReturnStatus", {
              type: "return",
              data: orderData?.getOrderItemDetails,
            })
          )}
      </View>
    );
  }

  function renderBody() {
    if (!product) {
      return null;
    }
    if (data) {
      return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>
          <ProductItem
            isAnnouncement={false}
            product={product?.getListings.content[0]}
            size={"M"}
            notShowBottom={true}
          />
          {renderActions()}
        </ScrollView>
      );
    }
    if (!data) {
      return null;
    }
  }
  return <View style={styles.container}>{renderBody()}</View>;
}

export default GroupInfoScreen;
