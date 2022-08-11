import React, { useCallback, useState, useRef } from "react";
import {
  Text,
  View,
  Image,
  Platform,
  TouchableOpacity as RNTouchableOpacity,
} from "react-native";
import { s, ScaledSheet, vs } from "react-native-size-matters";
import NumberFormat from "react-number-format";

import { Fonts, Colors, ApplicationStyles, Images } from "../../../Themes";
import AppConfig from "../../../Config/AppConfig";
import NavigationService from "../../../Navigation/NavigationService";
import { StarRating, Progress } from "../../../Components";
import {
  DeliveryOption,
  ProductListingStatus,
} from "../../../../generated/graphql";
import { t } from "react-native-tailwindcss";
import { TouchableOpacity as GHTouchableOpacity } from "react-native-gesture-handler";
import Share from "react-native-share";
import { shareOptionsDetails } from "./ShareOptionList";
import ViewShot, { captureRef, captureScreen } from "react-native-view-shot";
const defultUrl = "";

const TouchableOpacity =
  Platform.OS === "ios" ? RNTouchableOpacity : GHTouchableOpacity;
function ProductItem(props) {
  const [startX, setSartX] = useState(999);
  const [endX, setEndX] = useState(999);
  const {
    size,
    product,
    onPressShare,
    isAnnouncement,
    callBack,
    goFirst,
    notShowBottom,
  } = props;
  const viewShotRef = useRef(null);
  const toggleShareSheet = useCallback(() => {
    // shareOptionsDetails(product);
    captureRef(viewShotRef, {
      format: "png",
      quality: 0.8,
      result: "base64",
    }).then(
      (uri) => {
        console.log("seee the uri", uri);
        shareOptionsDetails(uri, product);
      },
      (error) => console.error("Oops, snapshot failed", error)
    );
  }, []);
  const isMissing =
    product.status === ProductListingStatus.Accepted ||
    product.status === ProductListingStatus.Successful;
  if (size === "M" || size === "L") {
    return (
      <TouchableOpacity
        // onPressIn={({ nativeEvent }) => {
        //   setSartX(nativeEvent.locationX);
        //   if (callBack) {
        //     callBack();
        //   }
        // }}
        // onPressOut={({ nativeEvent }) => {
        //   setEndX(nativeEvent.locationX);
        //   if (endX - startX < -50) {
        //     goFirst && goFirst();
        //   }
        // }}
        onPress={() => {
          //

          NavigationService.navigate("ProductDetailScreen", {
            product: product,
          });
        }}
        disabled={isMissing}
        style={[
          styles.productContainer,
          // {
          //   opacity: isMissing ? 0.5 : 1.0,
          // },
        ]}
      >
        {size === "M" ? (
          <View
            style={[
              styles.row,
              { paddingHorizontal: AppConfig.paddingHorizontal },
            ]}
          >
            <ViewShot
              ref={viewShotRef}
              options={{ format: "png", quality: 0.4, result: "base64" }}
            >
              <Image
                source={{
                  uri: product.photo || defultUrl,
                }}
                resizeMode="contain"
                style={[styles.productImage, t.mR2]}
              />
            </ViewShot>
            <View style={styles.v2}>
              <View>
                <Text style={styles.heading4Bold}>{product.shortName}</Text>
                <StarRating
                  rating={product.numberOfStars}
                  ratingCount={product.numberOfReviews}
                />
              </View>
              <View style={styles.row}>
                <View style={styles.v3}>
                  <Text style={styles.txtNoteBold}>RETAIL PRICE</Text>
                  <NumberFormat
                    thousandSeparator={true}
                    prefix={"₹"}
                    value={product.retailPrice}
                    displayType={"text"}
                    renderText={(text) => (
                      <Text style={styles.txtRetailPrice}>{text}</Text>
                    )}
                  />
                </View>

                <View style={styles.v3}>
                  <Text style={[styles.txtNoteBold, { color: Colors.black }]}>
                    WHOLE SALE PRICE
                  </Text>
                  <NumberFormat
                    thousandSeparator={true}
                    prefix={"₹"}
                    value={product.wholeSalePrice}
                    displayType={"text"}
                    renderText={(text) => (
                      <Text style={styles.txtWholesalePrice}>{text}</Text>
                    )}
                  />
                </View>

                <View style={styles.percentOffContainer}>
                  <Text
                    style={[styles.heading6Bold, { color: Colors.secondary00 }]}
                  >
                    {product.percentOff}% OFF
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ) : (
          <View style={[{ paddingHorizontal: AppConfig.paddingHorizontal }]}>
            <ViewShot
              ref={viewShotRef}
              options={{ format: "png", quality: 0.4, result: "base64" }}
            >
              <Image
                source={{ uri: product.photo ? product.photo : defultUrl }}
                style={styles.productImageBig}
                resizeMode={"contain"}
              />
            </ViewShot>

            <View style={styles.v2}>
              <View>
                <Text style={styles.heading4Bold}>{product.shortName}</Text>
                <StarRating
                  rating={product.numberOfStars}
                  ratingCount={product.numberOfReviews}
                />
              </View>
              <View style={styles.row}>
                <View style={styles.v3}>
                  <Text style={styles.txtNoteBold}>RETAIL PRICE</Text>
                  <NumberFormat
                    thousandSeparator={true}
                    prefix={"₹"}
                    value={product.retailPrice}
                    displayType={"text"}
                    renderText={(text) => (
                      <Text style={styles.txtRetailPrice}>{text}</Text>
                    )}
                  />
                </View>

                <View style={styles.v3}>
                  <Text style={[styles.txtNoteBold, { color: Colors.black }]}>
                    WHOLE SALE PRICE
                  </Text>
                  <NumberFormat
                    thousandSeparator={true}
                    prefix={"₹"}
                    value={product.wholeSalePrice}
                    displayType={"text"}
                    renderText={(text) => (
                      <Text style={styles.txtWholesalePrice}>{text}</Text>
                    )}
                  />
                </View>

                <View style={styles.percentOffContainer}>
                  <Text
                    style={[styles.heading6Bold, { color: Colors.secondary00 }]}
                  >
                    30% OFF
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}

        <View>
          {!notShowBottom ? (
            <View style={[styles.v4, t.justifyBetween]}>
              <View>
                <Text style={styles.txtOrderClose}>
                  {product.deliveryOption ===
                  DeliveryOption.SellerDirectDelivery
                    ? "Delivery Date:"
                    : "Order closes on:"}
                </Text>
                <Text style={styles.heading6Regular}>
                  {product.deliveryOption ===
                  DeliveryOption.SellerDirectDelivery
                    ? product.announcementDeliveryDate
                    : product.openUntil}
                </Text>
              </View>
              <Progress
                maximumValue={isMissing ? "100" : product.noOfItemsInStock}
                currentValue={isMissing ? "100" : product.noOfOrderedItems}
                barWidth={s(60)}
                barHeight={vs(6)}
              />
              <View style={styles.row}>
                <Image source={Images.stock} style={styles.icStock} />
                <Text style={styles.txtOrderNumber}>
                  {product.noOfOrderedItems < 0 ? 0 : product.noOfOrderedItems}{" "}
                  sold out of {product.noOfItemsInStock}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => NavigationService.navigate("LearnMoreScreen")}
              >
                <Image source={Images.info2} style={[styles.icInfo, t.mL0]} />
              </TouchableOpacity>

              <View style={styles.row}>
                {/* <TouchableOpacity>
                  <Image source={Images.likeMed} style={styles.icShare} />
                </TouchableOpacity> */}
                <TouchableOpacity onPress={toggleShareSheet}>
                  <Image source={Images.share} style={styles.icShare} />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View />
          )}
        </View>
      </TouchableOpacity>
    );
  } else if (size === "S") {
    return (
      <TouchableOpacity
        onPress={() =>
          NavigationService.navigate("ProductDetailScreen", {
            product: product,
          })
        }
        style={styles.productContainerSmall}
      >
        <View style={styles.productInfoSmall}>
          <View>
            <Image
              source={{ uri: product.photo ? product.photo : defultUrl }}
              style={styles.productImageSmall}
              resizeMode={"contain"}
            />

            <View style={styles.productSmallActionContainer}>
              <TouchableOpacity style={styles.roundBtnContainer}>
                <Image source={Images.likeMed} style={styles.roundBtnIcon} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.roundBtnContainer}
                onPress={toggleShareSheet}
              >
                <Image source={Images.share} style={styles.roundBtnIcon} />
              </TouchableOpacity>
            </View>
          </View>

          <Text style={[styles.txtBold, { color: Colors.black }]}>
            {product.shortName}
          </Text>
          <StarRating
            rating={product.rating}
            ratingCount={product.numberOfReviews}
          />

          <View style={[styles.row, { marginTop: vs(5) }]}>
            <View style={{ marginRight: s(10) }}>
              <Text style={styles.txtNoteBold}>RETAIL PRICE</Text>
              {/* <Text style={styles.txtRetailPrice}>${product.retailPrice}</Text> */}
              <NumberFormat
                thousandSeparator={true}
                prefix={"₹"}
                value={product.retailPrice}
                displayType={"text"}
                renderText={(text) => (
                  <Text style={styles.txtRetailPrice}>{text}</Text>
                )}
              />
            </View>

            <View style={{ marginRight: s(10) }}>
              <Text style={[styles.txtNoteBold, { color: Colors.black }]}>
                WHOLE SALE PRICE
              </Text>
              {/* <Text style={styles.txtWholesalePrice}>${product.wholesalePrice}</Text> */}
              <NumberFormat
                thousandSeparator={true}
                prefix={"₹"}
                value={product.wholeSalePrice}
                displayType={"text"}
                renderText={(text) => (
                  <Text style={styles.txtWholesalePrice}>{text}</Text>
                )}
              />
            </View>

            <View style={styles.percentOffContainerSmall}>
              <Text style={[styles.txtNoteBold, { color: Colors.secondary00 }]}>
                30% OFF
              </Text>
            </View>
          </View>
        </View>

        <View
          style={[styles.row, { paddingHorizontal: s(8), marginTop: vs(5) }]}
        >
          <Progress
            maximumValue={product.noOfItemsInStock}
            currentValue={product.noOfOrderedItems}
            barWidth={s(60)}
            barHeight={vs(6)}
          />
          <Image source={Images.stock} style={styles.icStockSmall} />
          <Text style={styles.heading6Regular}>
            {product.noOfOrderedItems} sold out of {product.noOfItemsInStock}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

ProductItem.propTypes = {};

ProductItem.defaultProps = {};

const styles = ScaledSheet.create({
  ...ApplicationStyles.screen,
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  productContainer: {
    backgroundColor: Colors.white,
    paddingTop: "10@vs",
    paddingBottom: "10@vs",
    marginBottom: "16@vs",
  },
  productImage: {
    width: "88@s",
    height: "88@s",
  },
  productImageBig: {
    width: "300@s",
    height: "300@s",
  },
  v2: {
    justifyContent: "space-between",
    height: "88@s",
  },
  txtRetailPrice: {
    ...ApplicationStyles.screen.heading4Bold,
    color: Colors.grey60,
    textDecorationLine: "line-through",
    marginTop: "2@vs",
  },
  txtWholesalePrice: {
    ...ApplicationStyles.screen.heading4Bold,
    color: Colors.primary,
    marginTop: "2@vs",
  },
  v3: {
    marginRight: "20@s",
  },
  percentOffContainer: {
    backgroundColor: Colors.secondary01,
    paddingHorizontal: "10@s",
    paddingVertical: "5@s",
    borderRadius: "30@s",
  },
  txtOrderClose: {
    fontSize: "8@s",
    fontFamily: Fonts.primary,
    color: Colors.black,
  },
  v4: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: AppConfig.paddingHorizontal,
    borderTopWidth: 2,
    borderTopColor: Colors.grey10,
    marginTop: "5@vs",
    paddingTop: "10@vs",
  },
  v5: {
    backgroundColor: Colors.grey10,
    paddingHorizontal: "7@s",
    paddingVertical: "3@s",
    borderRadius: "30@s",
    marginLeft: "5@s",
  },
  icStock: {
    width: "22@s",
    height: "22@s",
    tintColor: Colors.grey60,
    marginRight: "5@s",
  },
  txtOrderNumber: {
    ...ApplicationStyles.screen.heading6Regular,
    fontSize: "12@s",
  },
  icInfo: {
    width: "22@s",
    height: "22@s",
    tintColor: Colors.secondary00,
    marginLeft: "5@s",
  },
  icShare: {
    width: "22@s",
    height: "22@s",
    tintColor: Colors.black,
    marginLeft: "5@s",
  },
  productContainerSmall: {
    width: "175@s",
    backgroundColor: Colors.white,
    paddingTop: "5@vs",
    paddingBottom: "5@vs",
    marginBottom: "16@vs",
  },
  productInfoSmall: {
    paddingHorizontal: "8@s",
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey10,
    paddingBottom: "8@vs",
  },
  productImageSmall: {
    width: "150@s",
    height: "150@s",
    alignSelf: "center",
  },
  percentOffContainerSmall: {
    backgroundColor: Colors.secondary01,
    paddingHorizontal: "5@s",
    paddingVertical: "2@s",
    borderRadius: "30@s",
  },
  roundBtnContainer: {
    width: "24@s",
    height: "24@s",
    borderRadius: "15@s",
    backgroundColor: Colors.grey10,
    justifyContent: "center",
    alignItems: "center",
  },
  roundBtnIcon: {
    width: "15@s",
    height: "15@s",
    tintColor: Colors.grey80,
  },
  productSmallActionContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  icStockSmall: {
    width: "15@s",
    height: "15@s",
    tintColor: Colors.grey60,
    marginLeft: "10@s",
  },
  txtAction: {
    fontFamily: Fonts.semibold,
    color: Colors.primary,
    fontSize: AppConfig.fontSize,
  },
});

export default ProductItem;
