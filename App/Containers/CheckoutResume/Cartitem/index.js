import React, { useContext } from "react";
import { Text, View, TouchableOpacity, Image, TextInput } from "react-native";
import { s, ScaledSheet, vs } from "react-native-size-matters";
import { Fonts, Colors, ApplicationStyles, Images } from "../../../Themes";
import AppConfig from "../../../Config/AppConfig";
import NavigationService from "../../../Navigation/NavigationService";
import { StarRating } from "../../../Components";
import images from "../../../Themes/Images";
import colors from "../../../Themes/Colors";
import fonts from "../../../Themes/Fonts";
import BigNumber from "bignumber.js";
// import { CartContext } from '../index';
// import { AlertContext } from '../../Root/GlobalContext';

function index(props) {
  // const { dispatch } = useContext(CartContext);
  // const Alert = useContext(AlertContext);
  const {
    product: { product, variant },
    onPress,
  } = props;
  console.log("product.shortName", product.picture);

  return (
    <TouchableOpacity
      onPress={() =>
        NavigationService.navigate("ProductDetailScreen", { product })
      }
      style={styles.productContainer}
    >
      <View
        style={[
          styles.row,
          { maxWidth: "66%", justifyContent: "space-between" },
        ]}
      >
        <Image
          source={{ uri: product.photoUrls ? product.photoUrls[0] : defultUrl }}
          style={styles.productImage}
        />
        <View
          style={[styles.v2, { maxWidth: "90%", justifyContent: "center" }]}
        >
          <View>
            <Text style={[styles.heading5Bold]}>{product.shortName}</Text>
            <Text
              style={[
                styles.heading4Bold,
                { fontSize: s(12), fontWeight: "normal", color: colors.grey80 },
              ]}
            >
              Selected product options goes here
            </Text>
          </View>
        </View>
        <View>
          <Text style={styles.txtWholesalePrice}>
            ₹
            {BigNumber(
              variant ? variant.wholeSalePrice : product.wholeSalePrice
            ).toFixed(2) + ""}
          </Text>
        </View>
      </View>
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
    width: "86@s",
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
    fontWeight: "600",
    fontFamily: fonts.primary,
    fontSize: "14@s",
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
    backgroundColor: "transparent",
    paddingTop: "10@vs",
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
    // borderBottomWidth: 1,
    // borderBottomColor: Colors.grey10,
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
