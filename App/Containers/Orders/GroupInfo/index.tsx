import React, { useEffect, useMemo } from "react";
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
} from "../../../../generated/graphql";
import { useFocusEffect } from "@react-navigation/native";
import useLoading from "../../../hooks/useLoading";
import { useCreateOrder } from "../../../hooks/useCreateOrder";
import { userProfileVar } from "../../../Apollo/cache";
import { useReactiveVar } from "@apollo/client";
import useOrderInfo from "../../../hooks/useOrderInfo";
import { ComeFromType } from "../../../Utils/utils";

function GroupInfoScreen(props) {
  const { params } = useRoute();
  const userProfile = useReactiveVar(userProfileVar);
  const { setLoading } = useLoading();
  const data = params.item;
  const { retryPayment } = useCreateOrder();
  const { orderInfo, updateMoneyInfo } = useOrderInfo();
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
  const isStillCanOrdered = useMemo(() => {
    if (product?.getListings.content[0] && orderData) {
      const variant = product?.getListings.content[0].listingVariants?.find(
        (item) => item.variantId === orderData?.getOrderItemDetails.variantId
      );
      if (variant) {
        return (
          variant?.itemsAvailable -
            variant?.itemsSold -
            orderData.getOrderItemDetails.quantity >=
          0
        );
      } else {
        return false;
      }
    }
    return false;
  }, [product, orderData]);

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

        {/* use this to bypass the track order */}
        {/* {renderAction(Images.orderTrackImage, "Track order", () => {
            // if (data.deliveryOption === DeliveryOption.CourierDelivery) {
            NavigationService.navigate("TrackOrderScreen", {
              type: "track",
              data: orderData?.getOrderItemDetails,
            });
            // } else {
            // }
          })} */}
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
        {finalData?.listingStatus === ProductListingStatus.Active &&
          (finalData?.latestEventStatus ===
            OrderItemHistoryEventType.WaitingForPayment ||
            finalData?.latestEventStatus ===
              OrderItemHistoryEventType.FailedPayment) &&
          isStillCanOrdered &&
          renderAction(Images.orderCancelImage, "Retry payment", () => {
            const item = {
              listingId: finalData.listingId,
              quantity: finalData.quantity,
              variantId: finalData.variantId,
              replacedOrderItemId: finalData.orderItemId,
            };
            const availbleList = [
              {
                listingId: finalData.listingId,

                variantId: finalData.variantId,
                isAvailable: true,
                listing: product?.getListings.content[0],
              },
            ];
            const allItems = [
              {
                ...item,
                productDetails: product?.getListings.content[0],
                variant: product?.getListings.content[0]?.listingVariants?.find(
                  (item1) => item1?.variantId === finalData.variantId
                ),
              },
            ];
            global.billingDetails = {
              email: userProfile.email,
              phoneNumber: userProfile.phone ?? "",
              firstName: userProfile.firstName,
              lastName: userProfile.lastName,
            };
            const newInfo = {
              itemsForRequest: [item],
              allItems: allItems,
              comeFromType: ComeFromType.checkout,
              availbleList,
            };
            updateMoneyInfo(newInfo);
            retryPayment({
              isFromInSufficientSalamiCreditScreen: false,
              itemsForRequest: [item],
              allItems: allItems,
              availbleList,
              billingDetailsId: finalData.billingDetailsId ?? "",
              shippingAddressId: finalData?.deliveryAddress?.addressId ?? "",
            });
          })}
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
      const finalData = orderData?.getOrderItemDetails;
      return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>
          <ProductItem
            isAnnouncement={false}
            product={product?.getListings.content[0]}
            size={"M"}
            notShowBottom={
              !(
                finalData?.listingStatus === ProductListingStatus.Active &&
                (finalData?.latestEventStatus ===
                  OrderItemHistoryEventType.WaitingForPayment ||
                  finalData?.latestEventStatus ===
                    OrderItemHistoryEventType.AuthorizedPayment ||
                  finalData?.latestEventStatus ===
                    OrderItemHistoryEventType.FailedPayment ||
                  finalData?.latestEventStatus ===
                    OrderItemHistoryEventType.Paid)
              )
            }
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
