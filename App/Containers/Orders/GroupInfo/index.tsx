import React, { useEffect } from "react";
import {
  View,
  StatusBar,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
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
  useMarkOrderItemAsDeliveredMutation,
} from "../../../../generated/graphql";

function GroupInfoScreen(props) {
  const { params } = useRoute();
  const data = params.item;
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
  }, [data, markOrderItem]);
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
    return (
      <View>
        {renderAction(Images.packageMed, "Order details", () =>
          NavigationService.navigate("OrderDetailScreen", {
            data,
            product: product?.getListings?.content[0],
          })
        )}
        {renderAction(Images.invoice, "Invoice", () =>
          NavigationService.navigate("InvoiceScreen", {
            data,
            product: product?.getListings?.content[0],
          })
        )}
        {renderAction(Images.star, "Write a review about the product", () =>
          NavigationService.navigate("RateOrderScreen", {
            onPost: () => {
              NavigationService.goBack();
            },
            data,
            product: product?.getListings?.content[0],
          })
        )}
        {renderAction(Images.user, "Evaluate the seller", () =>
          // NavigationService.navigate("RateSellerScreen")
          NavigationService.navigate("RateOrderScreen", {
            onPost: () => {
              NavigationService.goBack();
            },
            data,
            title: "Evaluate the seller",
            product: product?.getListings?.content[0],
          })
        )}
        {/* when order status is reached,user can track order */}
        {data.latestEventStatus === OrderItemHistoryEventType.Paid &&
          renderAction(Images.orderTrackImage, "Track order", () => {
            // if (data.deliveryOption === DeliveryOption.CourierDelivery) {
            NavigationService.navigate("TrackOrderScreen", {
              type: "track",
              data,
            });
            // } else {
            // }
          })}
        {/* when order status is received,user can return product */}
        {data.latestEventStatus === OrderItemHistoryEventType.Delivered &&
          renderAction(Images.orderReturnImage, "Return product", () => {
            if (data.deliveryOption === DeliveryOption.SellerDirectDelivery) {
              NavigationService.navigate("ReturnsUnavailable", { data });
              return;
            }
            NavigationService.navigate("ReturnProductStep1Screen", {
              data,
              product: product?.getListings?.content[0],
            });
          })}
        {/* when order status is uncompleted,user can cancel the order */}
        {data.listingStatus === ProductListingStatus.Active &&
          renderAction(Images.orderCancelImage, "Cancel order", () =>
            NavigationService.navigate("CancelOrderScreen", {
              orderItemId: data.orderItemId,
            })
          )}
        {(data.latestEventStatus ===
          OrderItemHistoryEventType.ReplacementRequest ||
          data.latestEventStatus === OrderItemHistoryEventType.RefundRequest) &&
          renderAction(Images.orderTrackImage, "Return status", () =>
            NavigationService.navigate("ReturnStatus", {
              type: "return",
              data,
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
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        <View style={styles.header}>
          <AppBar title={"Group Info"} />
        </View>
        {renderBody()}
      </SafeAreaView>
    </View>
  );
}

export default GroupInfoScreen;
