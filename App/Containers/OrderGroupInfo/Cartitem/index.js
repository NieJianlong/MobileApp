import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { s, ScaledSheet, vs } from "react-native-size-matters";
import { Fonts, Colors, ApplicationStyles, Images } from "../../../Themes";
import AppConfig from "../../../Config/AppConfig";
import NavigationService from "../../../Navigation/NavigationService";
import { StarRating } from "../../../Components";
import colors from "../../../Themes/Colors";

function index(props) {
  const { product, onPress } = props;
  return (
    <TouchableOpacity
      onPress={() => NavigationService.navigate("ProductDetailScreen")}
      style={styles.productContainer}
    >
      <View style={[styles.row]}>
        <Image source={{ uri: product.picture }} style={styles.productImage} />

        <View style={styles.v2}>
          <View>
            <Text style={[styles.heading4Bold, { width: "80%" }]}>
              {product.longName}
            </Text>
            <Text
              style={[
                ApplicationStyles.screen.txtRegular,
                { width: "80%", fontSize: s(12) },
              ]}
            >
              Deliver to - Streetname 00/Apt 404 - 000000
            </Text>
          </View>
          <View style={styles.row}>
            <View style={styles.v3}>
              <Text style={styles.txtNoteBold}>RETAIL PRICE</Text>
              <Text style={styles.txtRetailPrice}>${product.retailPrice}</Text>
            </View>

            <View style={styles.v3}>
              <Text style={[styles.txtNoteBold, { color: Colors.black }]}>
                WHOLE SALE PRICE
              </Text>
              <Text style={styles.txtWholesalePrice}>
                ${product.wholesalePrice}
              </Text>
            </View>

            <View
              style={[styles.percentOffContainer, { alignSelf: "flex-end" }]}
            >
              <Text
                style={[styles.heading6Bold, { color: Colors.secondary00 }]}
              >
                30% OFF
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.v4}>
        <View>
          <Text style={styles.txtOrderClose}>Order closes on:</Text>
          <Text style={styles.heading6Regular}>{product.orderClose}</Text>
        </View>

        <View style={styles.row}>
          <Image source={Images.stock} style={styles.icStock} />
          <Text style={styles.txtOrderNumber}>
            {product.orderCount}/{product.inStock}
          </Text>
          <TouchableOpacity>
            <Image source={Images.info2} style={styles.icInfo} />
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity>
            <Image source={Images.likeMed} style={styles.icShare} />
          </TouchableOpacity>

          <TouchableOpacity>
            <Image source={Images.share} style={styles.icShare} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

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
    height: "160@vs",
    justifyContent: "space-around",
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
  },
});

export default index;
