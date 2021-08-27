import React, { useContext, useState } from "react";
import { Text, View, TouchableOpacity, Image, TextInput } from "react-native";
import { s, ScaledSheet, vs } from "react-native-size-matters";
import { Fonts, Colors, ApplicationStyles, Images } from "../../../Themes";
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
const defultUrl =
  "https://bizweb.dktcdn.net/100/116/615/products/12promax.png?v=1602751668000";
function Index(props) {
  const { realm } = useRealm();
  // Alert and AlertContext are not correct semantic names, very confusing,  @nsavage
  const Alert = useContext(AlertContext);
  const {
    product: { product, cartInfo },
    onPress,
  } = props;
  const [quantity, setQuantity] = useState(cartInfo[0].quantity);

  return (
    <TouchableOpacity
      onPress={() => NavigationService.navigate("ProductDetailScreen")}
      style={[styles.productContainer, { opacity: product.id == 1 ? 0.6 : 1 }]}
    >
      <View
        style={[styles.row, { paddingHorizontal: AppConfig.paddingHorizontal }]}
      >
        <Image
          source={{ uri: product.photo ?? defultUrl }}
          style={styles.productImage}
        />
        <View style={styles.v2}>
          <View>
            <Text style={styles.heading4Bold}>{product.shortName}</Text>
            <Text
              style={[
                styles.heading4Bold,
                { fontSize: s(12), fontWeight: "normal", color: colors.grey80 },
              ]}
            >
              Selected product options goes here
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
                ${product.wholeSalePrice}
              </Text>
            </View>

            <View style={styles.percentOffContainer}>
              <Text
                style={[styles.heading6Bold, { color: Colors.secondary00 }]}
              >
                {product.percentOff}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.v4}>
        {product.id !== 1 ? (
          <View style={styles.counter}>
            <TouchableOpacity
              onPress={() => {
                if (product.count === 1) {
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
                  realm.write(() => {
                    const shoppingCartId = product.productId;
                    realm.create(
                      "ShoppingCart",
                      {
                        id: shoppingCartId,
                        product: product,
                        cartInfo: [
                          {
                            quantity: quantity - 1,
                            variant: null,
                          },
                        ],
                        created: new Date(),
                        updated: new Date(),
                      },
                      true
                    );
                  });
                  setQuantity(quantity - 1);
                  PubSub.publish("refresh-shoppingcart");
                }
              }}
            >
              <Image
                style={styles.cartadd}
                source={
                  product.count === 1
                    ? images.shopcartRemoveImage
                    : images.shopcartSubImage
                }
              />
            </TouchableOpacity>
            <TextInput style={styles.cartinput} value={quantity + ""} />
            <TouchableOpacity
              onPress={() => {
                realm.write(() => {
                  const shoppingCartId = product.productId;
                  realm.create(
                    "ShoppingCart",
                    {
                      id: shoppingCartId,
                      product: product,
                      cartInfo: [
                        {
                          quantity: quantity + 1,
                          variant: null,
                        },
                      ],
                      created: new Date(),
                      updated: new Date(),
                    },
                    true
                  );
                });
                setQuantity(quantity + 1);
                PubSub.publish("refresh-shoppingcart");
              }}
            >
              <Image style={styles.cartadd} source={images.shopcartAddImage} />
            </TouchableOpacity>
          </View>
        ) : (
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
        )}

        <View style={styles.row}>
          <TouchableOpacity
            style={styles.removebtn}
            onPress={() => {
              realm.write(() => {
                // Delete the task from the realm.
                realm.delete(props.product);
                // Discard the reference.
                PubSub.publish("refresh-shoppingcart");
                props.product = null;
              });
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
            onPress={() => {
              NavigationService.navigate("EditShoppingCartScreen", {
                product: product,
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

export default Index;
