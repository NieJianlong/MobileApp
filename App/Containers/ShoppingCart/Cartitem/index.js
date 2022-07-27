import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  useWindowDimensions,
} from "react-native";
import { s, ScaledSheet } from "react-native-size-matters";
import { Fonts, Colors, ApplicationStyles } from "../../../Themes";
import AppConfig from "../../../Config/AppConfig";
import NavigationService from "../../../Navigation/NavigationService";
import images from "../../../Themes/Images";
import colors from "../../../Themes/Colors";
import PubSub from "pubsub-js";

/**
 * issues
 * function name  index wtf
 * we willhave a product id in state already and it wont be like 1,2,3,....
 *
 */
import { AlertContext } from "../../Root/GlobalContext";
import useRealm from "../../../hooks/useRealm";
import BigNumber from "bignumber.js";
import { t } from "react-native-tailwindcss";
import useAlert from "../../../hooks/useAlert";
import { isEmpty } from "lodash";
const defultUrl =
  "https://bizweb.dktcdn.net/100/116/615/products/12promax.png?v=1602751668000";
function Index(props) {
  const { realm } = useRealm();
  const { setAlert, visible } = useAlert();
  // Alert and AlertContext are not correct semantic names, very confusing,  @nsavage
  const Alert = useContext(AlertContext);
  const {
    product,
    availble,
    onPress,
    variant,
    quantity,
    onChangeQuanlity,
    onEditVariant,
  } = props;
  let selectedVariant = "";
  if (!isEmpty(variant?.options)) {
    variant?.options.map((item) => {
      selectedVariant = selectedVariant + item.key + ":" + item.value + ",";
    });
    selectedVariant.trimEnd(",");
  }
  if (selectedVariant.length > 34) {
    selectedVariant = selectedVariant.substring(0, 34) + "...";
  }
  const { width, height } = useWindowDimensions();
  return (
    <TouchableOpacity
      // disabled={!availble}
      onPress={() =>
        NavigationService.navigate("ProductDetailScreen", { product })
      }
      // { opacity: availble ? 1 : 0.6 }
      style={[styles.productContainer]}
    >
      <View
        style={[styles.row, { paddingHorizontal: AppConfig.paddingHorizontal }]}
      >
        <Image
          source={{
            uri: product?.photoUrls ? product?.photoUrls[0] : defultUrl,
          }}
          style={[styles.productImage, t.mR2]}
        />
        <View style={styles.v2}>
          <View>
            <Text
              style={[styles.heading4Bold, { width: width - 116 }]}
              numberOfLines={2}
            >
              {product?.shortName}
            </Text>
            <Text
              style={[
                styles.heading4Bold,
                { fontSize: s(12), fontWeight: "normal", color: colors.grey80 },
              ]}
            >
              {selectedVariant}
            </Text>
          </View>
          <View style={styles.row}>
            <View style={styles.v3}>
              <Text style={styles.txtNoteBold}>RETAIL PRICE</Text>
              <Text style={styles.txtRetailPrice}>
                ₹
                {BigNumber(
                  variant ? variant?.retailPrice : product?.retailPrice
                ).toFixed(2) + ""}
              </Text>
            </View>
            <View style={styles.v3}>
              <Text style={[styles.txtNoteBold, { color: Colors.black }]}>
                WHOLE SALE PRICE
              </Text>
              <Text style={styles.txtWholesalePrice}>
                ₹
                {BigNumber(
                  variant ? variant?.wholeSalePrice : product?.wholeSalePrice
                ).toFixed(2) + ""}
              </Text>
            </View>

            <View style={styles.percentOffContainer}>
              <Text
                style={[styles.heading6Bold, { color: Colors.secondary00 }]}
              >
                {product?.percentOff}% OFF
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.v4}>
        <View style={styles.counter}>
          <TouchableOpacity
            // disabled={!availble}
            onPress={() => {
              if (quantity === 1) {
                onChangeQuanlity(0);
                //dispatch({ type: "revomeCartCount", payload: product.id });
                Alert.dispatch({
                  type: "changAlertState",
                  payload: {
                    visible: true,
                    message: "",
                    color: colors.secondary00,
                    title: "Removed item",
                  },
                });
              } else {
                if (quantity - 1 < product.minQtyPerCart) {
                  !visible &&
                    setAlert({
                      color: colors.warning,
                      title: `Purchase a minimum of ${product.minQtyPerCart} units of this product`,
                      visible: true,
                      onDismiss: () => {
                        setAlert({ visible: false });
                      },
                    });
                  return;
                }
                onChangeQuanlity(quantity - 1);
              }
            }}
          >
            <Image
              style={styles.cartadd}
              source={
                product?.count === 1
                  ? images.shopcartRemoveImage
                  : images.shopcartSubImage
              }
            />
          </TouchableOpacity>
          <TextInput style={styles.cartinput} value={quantity + ""} />
          <TouchableOpacity
            // disabled={variant?.itemsAvailable - variant?.itemsSold <= quantity}
            onPress={() => {
              if (variant?.itemsAvailable - variant?.itemsSold <= quantity) {
                Alert.dispatch({
                  type: "changAlertState",
                  payload: {
                    visible: true,
                    message: `Can't increase the quantity any more`,
                    color: colors.warning,
                    title: "Removed item",
                  },
                });
                return;
              }
              onChangeQuanlity(quantity + 1);
            }}
          >
            <Image style={styles.cartadd} source={images.shopcartAddImage} />
          </TouchableOpacity>
        </View>
        {/* : (
          <View>
            <TouchableOpacity
              style={{
                height: s(32),
                borderRadius: s(40),
                backgroundColor: colors.grey60,
                justifyContent: "center",
                paddingHorizontal: 10,
              }}
            >
              <Text
                style={[
                  ApplicationStyles.screen.heading6Regular,
                  { color: "white", fontSize: s(10) },
                ]}
              >
                This product is no longer available
              </Text>
            </TouchableOpacity>
          </View>
        )} */}
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.removebtn}
            // disabled={!availble}
            onPress={() => {
              onChangeQuanlity(0);
              // props.product = null;

              Alert.dispatch({
                type: "changAlertState",
                payload: {
                  visible: true,
                  message: "",
                  color: colors.secondary00,
                  title: "Removed item",
                },
              });
            }}
          >
            <Text
              style={[ApplicationStyles.screen.heading5Bold, styles.removetext]}
            >
              REMOVE
            </Text>
          </TouchableOpacity>
          <View style={{ width: s(10) }} />
          <TouchableOpacity
            disabled={!availble}
            onPress={() => {
              if (isEmpty(variant.options)) {
                NavigationService.navigate("ProductDetailScreen", { product });
                return;
              }

              NavigationService.navigate("EditShoppingCartScreen", {
                listingId: product.listingId,
                variantId: variant.variantId,
                productId: product.productId,
                onEditVariant: onEditVariant,
              });
            }}
            style={[styles.removebtn, { width: s(60) }]}
          >
            <Text
              style={[ApplicationStyles.screen.heading5Bold, styles.removetext]}
            >
              EDIT
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {!availble && (
        <View style={[t.pX4, t.mT4, { width: 174 }, t.justifyCenter]}>
          <TouchableOpacity
            style={{
              height: s(32),
              borderRadius: s(40),
              backgroundColor: colors.grey60,
              justifyContent: "center",
              paddingHorizontal: 10,
            }}
          >
            <Text
              style={[
                ApplicationStyles.screen.heading6Regular,
                { color: "white", fontSize: s(10) },
              ]}
            >
              Units/Slices not available
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = ScaledSheet.create({
  ...ApplicationStyles.screen,
  counter: {
    height: "32@s",
    width: "96@s",
    borderRadius: "40@s",
    borderColor: "#DDDFE3",
    borderWidth: 1,
    backgroundColor: "#F8F9FA",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: "5@s",
  },
  cartadd: {
    width: "25@s",
    height: "25@s",
    resizeMode: "contain",
  },
  removebtn: {
    width: "80@s",
    height: "32@s",
    borderColor: "#DDDFE3",
    borderWidth: 1,
    borderRadius: "40@s",
  },
  removetext: {
    textAlign: "center",
    height: "30@s",
    lineHeight: "30@s",
    color: colors.grey80,
  },
  cartinput: {
    width: "32@s",
    height: "32@s",
    backgroundColor: "white",
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#DDDFE3",
  },
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
    // borderTopWidth: 2,
    // borderTopColor: Colors.grey10,
    marginTop: "5@vs",
    paddingTop: "10@vs",
  },
  icStock: {
    width: "22@s",
    height: "22@s",
    tintColor: Colors.grey60,
    marginRight: "5@s",
  },
  txtOrderNumber: {
    ...ApplicationStyles.screen.heading6Regular,
    fontSize: "13@s",
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
  },
});

export default Index;
