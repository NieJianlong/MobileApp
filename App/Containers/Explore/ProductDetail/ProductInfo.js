import React, { useCallback, useContext, useEffect, useState } from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import { s, ScaledSheet, vs } from "react-native-size-matters";
import InView from "react-native-component-inview";
import NumberFormat from "react-number-format";
import {
  Switch,
  StarRating,
  DescriptionText,
  Progress,
} from "../../../Components";

import { Images, Colors, Fonts } from "../../../Themes";
import styles from "./styles";
import NavigationService from "../../../Navigation/NavigationService";
import { AlertContext } from "../../Root/GlobalContext";
import PickupFromSellerSheetContent from "./SheetContent/PickupFromSellerSheetContent";
import {
  DeliveryOption,
  ProductListingStatus,
} from "../../../../generated/graphql";
import PubSub from "pubsub-js";
import { t } from "react-native-tailwindcss";
import { trim } from "lodash";

export default function ProductInfo({
  product,
  setTabIndex,
  scrollSectionIntoView,
  pickUp,
  onSetPickUp,
}) {
  const { dispatch } = useContext(AlertContext);
  const togglePickupFromSellerSheet = useCallback(
    (callback) => {
      dispatch({
        type: "changSheetState",
        payload: {
          showSheet: true,
          height: 290,
          children: () => (
            <PickupFromSellerSheetContent
              address={product.pickupAddress}
              onCallback={() => {
                onSetPickUp(true);
                callback && callback();
              }}
            />
          ),
          sheetTitle: "Pick up location",
        },
      });
    },
    [dispatch, onSetPickUp, product.pickupAddress]
  );
  useEffect(() => {
    let refresh = PubSub.subscribe("show-pick-up-sheet", (msg, callback) => {
      togglePickupFromSellerSheet(callback);

      if (callback && pickUp) {
        callback && callback();
      }
    });
    return () => {
      PubSub.unsubscribe(refresh);
    };
  }, [pickUp, togglePickupFromSellerSheet]);
  console.log("product.deliveryOption====================================");
  console.log(product.deliveryOption);
  console.log("====================================");
  const isMissing =
    product.status === ProductListingStatus.Accepted ||
    product.status === ProductListingStatus.Successful;
  return (
    <InView
      onChange={(isVisible) => {
        if (isVisible) {
          setTabIndex(0);
        }
      }}
    >
      <View style={styles.infoContainer}>
        <View style={styles.v2}>
          <View>
            <Text
              style={[
                {
                  fontSize: s(14),
                  fontFamily: Fonts.primary,
                  color: Colors.black,

                  lineHeight: s(20),
                },
                t.flexRow,
              ]}
            >
              {product.longName}
            </Text>
            <View style={[t.flexRow, t.flexRowReverse]}>
              <TouchableOpacity onPress={() => scrollSectionIntoView(3)}>
                <StarRating
                  rating={product.numberOfStars}
                  ratingCount={product.numberOfReviews}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.row, { marginTop: vs(8) }]}>
            <View style={styles.v3}>
              <Text style={[styles.heading6Bold, { color: Colors.grey60 }]}>
                RETAIL PRICE
              </Text>
              {/* <Text style={styles.txtRetailPrice}>${product.retailPrice}</Text> */}
              <NumberFormat
                thousandSeparator={true}
                prefix={"???"}
                value={product.retailPrice}
                displayType={"text"}
                renderText={(text) => (
                  <Text style={styles.txtRetailPrice}>{text}</Text>
                )}
              />
            </View>

            <View style={styles.v3}>
              <Text style={[styles.heading6Bold, { color: Colors.black }]}>
                WHOLE SALE PRICE
              </Text>
              {/* <Text style={styles.txtWholesalePrice}>${product.wholesalePrice}</Text> */}
              <NumberFormat
                thousandSeparator={true}
                prefix={"???"}
                value={product.wholeSalePrice}
                displayType={"text"}
                renderText={(text) => (
                  <Text style={styles.txtWholesalePrice}>{text}</Text>
                )}
              />
            </View>
            <View style={[t.flexRow, t.mT4, t._mL12]}>
              <View style={styles.percentOffContainer}>
                <Text
                  style={[styles.heading6Bold, { color: Colors.secondary00 }]}
                >
                  {product.percentOff}% OFF
                </Text>
              </View>
              <Text style={[styles.heading5Regular, { marginLeft: s(8) }]}>
                Save ???{product.retailPrice - product.wholeSalePrice}
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.v4, t.flexRow, t.justifyBetween, t.pR8]}>
          <View style={{ marginRight: s(10) }}>
            {/* <Text style={styles.heading6Regular}>Order closes on:</Text> */}
            <Text style={styles.heading6Regular}>
              {product.deliveryOption === DeliveryOption.SellerDirectDelivery
                ? "Delivery Date:"
                : "Order closes on:"}
            </Text>
            <Text style={styles.heading6Regular}>
              {product.deliveryOption === DeliveryOption.SellerDirectDelivery
                ? product.announcementDeliveryDate
                : product.openUntil}
            </Text>
          </View>
          <Progress
            maximumValue={isMissing ? "100" : product.noOfItemsInStock}
            currentValue={isMissing ? "100" : product.noOfOrderedItems}
            barWidth={s(65)}
            barHeight={vs(6)}
          />
          <View style={[styles.row]}>
            <Image source={Images.stock} style={styles.icStock} />
            <Text style={styles.txtOrderNumber}>
              {product.noOfOrderedItems}/{product.noOfItemsInStock}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => NavigationService.navigate("LearnMoreScreen")}
          >
            <Image source={Images.info2} style={styles.icInfo} />
          </TouchableOpacity>
        </View>
        <View style={[styles.row, { marginVertical: vs(10) }, t.pX4]}>
          {product.deliveryOption === DeliveryOption.CourierDelivery && (
            <Text style={styles.heading5Regular}>
              Delivery fee:{" "}
              <Text style={{ color: Colors.primary }}>
                ???{product.courierShippingFee}
              </Text>
            </Text>
          )}

          {product.deliveryOption === DeliveryOption.SellerDirectDelivery && (
            <View style={[styles.row, t.justifyEnd, t.wFull]}>
              <Text style={[styles.heading5Regular, { marginRight: s(5) }]}>
                Seller will deliver to address
              </Text>
            </View>
          )}
          {(product.deliveryOption === DeliveryOption.SellerLocationPickup ||
            product.deliveryOption ===
              DeliveryOption.CollectionPointPickup) && (
            <View style={[styles.row, t.justifyBetween, t.wFull]}>
              <Text style={styles.heading5Regular}>No Delivery Available</Text>
              <View style={[t.flexRow]}>
                <Text style={[styles.heading5Regular, { marginRight: s(5) }]}>
                  Pick up location
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    // setPickUp(!pickUp);
                    if (!pickUp) {
                      togglePickupFromSellerSheet();
                    } else {
                      onSetPickUp(false);
                      // setPickUp(false);
                    }
                  }}
                >
                  {pickUp ? (
                    <View style={styles1.activeContainer}>
                      <View style={styles1.activeCircle} />
                    </View>
                  ) : (
                    <View style={styles1.inactiveContainer}>
                      <View style={styles1.inactiveCircle} />
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
        <View style={[styles.v2, { paddingTop: vs(15) }]}>
          <Text style={[styles.heading3Bold, t.textLeft]}>
            Product Description
          </Text>
          <DescriptionText
            style={styles.descriptionContainer}
            text={product.description}
          />
        </View>

        <View style={[styles.v2, { paddingTop: vs(15) }]}>
          <Text style={[styles.heading3Bold, t.textLeft]}>
            Details & Highlights
          </Text>

          {product?.highlightBullets &&
            product?.highlightBullets.map((bul, index) => (
              <View key={index} style={[styles.row, t.itemsCenter]}>
                <View
                  style={[t.w1, t.h1, t.roundedFull, t.bgBlack, t.mR4, t.mT1]}
                />
                <Text style={styles.txtRegular}>{trim(bul)}</Text>
              </View>
            ))}

          {/* <View style={styles.row}>
              <Text style={styles.txtDot}>???</Text>
              <Text style={styles.txtRegular}>
                Vero eos et accusamus et iusto odio dignissimos
              </Text>
            </View>jjjh

            <View style={styles.row}>
              <Text style={styles.txtDot}>???</Text>
              <Text style={styles.txtRegular}>
                Vero eos et accusamus et iusto odio dignissimos
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.txtDot}>???</Text>
              <Text style={styles.txtRegular}>
                Vero eos et accusamus et iusto odio dignissimos
              </Text>
            </View> */}
        </View>
      </View>
    </InView>
  );
}
const WIDTH = "44@s";
const HEIGHT = "22@s";

const styles1 = ScaledSheet.create({
  activeContainer: {
    width: WIDTH,
    height: HEIGHT,
    borderRadius: "15@s",
    borderWidth: "2@s",
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "2@s",
  },
  activeCircle: {
    width: "14@s",
    height: "14@s",
    borderRadius: "16@s",
    backgroundColor: Colors.white,
  },
  inactiveContainer: {
    width: WIDTH,
    height: HEIGHT,
    borderRadius: "15@s",
    borderWidth: "2@s",
    borderColor: Colors.grey40,
    flexDirection: "row",
    alignItems: "center",
    padding: "2@s",
  },
  inactiveCircle: {
    width: "14@s",
    height: "14@s",
    borderRadius: "16@s",
    backgroundColor: Colors.grey40,
  },
  disabledContainer: {
    width: "48@s",
    height: "24@s",
    borderRadius: "15@s",
    borderWidth: "2@s",
    borderColor: Colors.grey10,
    backgroundColor: Colors.grey10,
    flexDirection: "row",
    alignItems: "center",
    padding: "2@s",
  },
  disabledCircle: {
    width: "16@s",
    height: "16@s",
    borderRadius: "16@s",
    backgroundColor: Colors.white,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontFamily: Fonts.primary,
    fontSize: "14@s",
    color: Colors.black,
    marginLeft: "8@s",
  },
});
