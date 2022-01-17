import React, { useCallback, useContext } from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import { s, vs } from "react-native-size-matters";
import InView from "react-native-component-inview";
import NumberFormat from "react-number-format";
import {
  Switch,
  StarRating,
  DescriptionText,
  Progress,
} from "../../../Components";

import { Images, Colors } from "../../../Themes";
import styles from "./styles";
import NavigationService from "../../../Navigation/NavigationService";
import { AlertContext } from "../../Root/GlobalContext";
import PickupFromSellerSheetContent from "./SheetContent/PickupFromSellerSheetContent";

export default function ProductInfo({
  product,
  setTabIndex,
  scrollSectionIntoView,
}) {
  const { dispatch } = useContext(AlertContext);
  const togglePickupFromSellerSheet = useCallback(() => {
    dispatch({
      type: "changSheetState",
      payload: {
        showSheet: true,
        height: 390,
        children: () => <PickupFromSellerSheetContent />,
        sheetTitle: "Pick up from seller",
      },
    });
  }, [dispatch]);

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
            <Text style={styles.heading2Bold}>{product.longName}</Text>
            <TouchableOpacity onPress={() => scrollSectionIntoView(3)}>
              <StarRating
                fullMode
                rating={product.rating}
                ratingCount={product.ratingCount}
              />
            </TouchableOpacity>
          </View>
          <View style={[styles.row, { marginTop: vs(8) }]}>
            <View style={styles.v3}>
              <Text style={[styles.heading6Bold, { color: Colors.grey60 }]}>
                RETAIL PRICE
              </Text>
              {/* <Text style={styles.txtRetailPrice}>${product.retailPrice}</Text> */}
              <NumberFormat
                thousandSeparator={true}
                prefix={"$"}
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
                prefix={"$"}
                value={product.wholesalePrice}
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

            {/* <Text style={[styles.heading5Regular, { marginLeft: s(8) }]}>
                                Save ${product.retailPrice - product.wholesalePrice}
                            </Text> */}
          </View>

          <View style={[styles.row, { marginVertical: vs(10) }]}>
            <Text style={styles.heading5Regular}>
              Delivery fee:{" "}
              <Text style={{ color: Colors.primary }}>
                ${product.deliveryFee}
              </Text>
            </Text>
            {!product.hidePickUpFromSeller ? (
              <View style={[styles.row, { marginLeft: s(10) }]}>
                <Text style={[styles.heading5Regular, { marginRight: s(5) }]}>
                  Pick up from seller
                </Text>
                <Switch
                  onSwitch={(t) => {
                    if (t) {
                      togglePickupFromSellerSheet();
                    }
                  }}
                />
              </View>
            ) : (
              <View />
            )}
          </View>
        </View>

        <View style={styles.v4}>
          <View style={{ marginRight: s(10) }}>
            <Text style={styles.heading6Regular}>Order closes on:</Text>
            <Text style={styles.txtRegular}>{product.orderClose}</Text>
          </View>

          <View style={styles.row}>
            <Progress
              currentValue={24}
              maximumValue={100}
              style={{ marginHorizontal: s(10) }}
            />

            <Image source={Images.stock} style={styles.icStock} />
            <Text style={styles.txtOrderNumber}>
              {product.orderCount}/{product.inStock}
            </Text>
            <TouchableOpacity
              onPress={() => NavigationService.navigate("ProductInfoScreen")}
            >
              <Image source={Images.info2} style={styles.icInfo} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.v2, { paddingTop: vs(15) }]}>
          <Text style={styles.heading3Bold}>Product Description</Text>
          <DescriptionText
            style={styles.descriptionContainer}
            text={product.description}
          />
        </View>

        <View style={[styles.v2, { paddingTop: vs(15) }]}>
          <Text style={styles.heading3Bold}>Details & Highlights</Text>

          {product.highlightBullets &&
            JSON.parse(product.highlightBullets).map((bul, index) => (
              <View key={index} style={styles.row}>
                <Text style={styles.txtDot}>•</Text>
                <Text style={styles.txtRegular}>{bul}</Text>
              </View>
            ))}

          {/* <View style={styles.row}>
              <Text style={styles.txtDot}>•</Text>
              <Text style={styles.txtRegular}>
                Vero eos et accusamus et iusto odio dignissimos
              </Text>
            </View>jjjh
            
            <View style={styles.row}>
              <Text style={styles.txtDot}>•</Text>
              <Text style={styles.txtRegular}>
                Vero eos et accusamus et iusto odio dignissimos
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.txtDot}>•</Text>
              <Text style={styles.txtRegular}>
                Vero eos et accusamus et iusto odio dignissimos
              </Text>
            </View> */}
        </View>
      </View>
    </InView>
  );
}
