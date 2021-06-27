import React, { useState, useContext, useReducer, useEffect } from "react";
import {
  StatusBar,
  View,
  SafeAreaView,
  SectionList,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import Empty from "./Empty";
import AddressBar from "./AddressBar";
import styles from "./styles";
import CartSummary from "./CartSummary";
import CartItem from "./Cartitem";
import { Button } from "../../Components";
import { s, vs } from "react-native-size-matters";
import AppConfig from "../../Config/AppConfig";
import colors from "../../Themes/Colors";
import images from "../../Themes/Images";
import NavigationService from "../../Navigation/NavigationService";
import { AlertContext } from "../Root/GlobalContext";
import TextTip from "../../Components/EmptyReminder";

/** updates for local cart Appollo cache */
import { localCartVar } from "../../Apollo/cache";
import { useReactiveVar } from "@apollo/client";

export const CartContext = React.createContext({});

/**
 * cart management temporary updates here just to get somethig working for a dynamic state
 * wtf means this is  an attempt to get something thast currenty broken to work
 */
function reducer(state, action) {
  const datas = state.datas;

  switch (action.type) {
    case "addCartCount":
      return {
        ...state,
        datas: datas.map((item) => {
          if (item.id == action.payload) {
            item.count = item.count + 1;
          }
          return item;
        }),
      };
    case "subCartCount":
      return {
        ...state,
        datas: datas.map((item) => {
          if (item.id == action.payload) {
            item.count = item.count - 1;
          }
          return item;
        }),
      };
    case "revomeCartCount":
      const index = datas.findIndex((item) => item.id == action.payload);
      datas.splice(index, 1);
      return { ...state, datas };
    default:
      throw new Error();
  }
}
function ShoppingCart(props) {
  const [paidDuringDelivery, setPaidDuringDeliver] = useState(false);

  /** updates for local cart Appollo cache
   * useReactiveVar => we will get updates from other screens
   */
  const localCartVarReactive = useReactiveVar(localCartVar);

  // we do this to match the exisitng code
  const wtfState = { datas: localCartVarReactive.items };

  // I think we need some comments explaing how you intend for these reducers to be used
  // I am not sure if this is the best approach
  // swap out hard coded state with data from apollo cache
  const [{ datas }, dispatch] = useReducer(reducer, wtfState);
  const sheetContext = useContext(AlertContext);
  // temporay fix original code fails for empty cart
  const [isReady, setIsReady] = useState(false);

  /**
   * can be removed later,
   * currently some parts of code break  depends on cart state
   * we can debug state here
   */
  useEffect(() => {
    console.log(
      `ShoppingCart check data in cart ${JSON.stringify(localCartVarReactive)}`
    );
    if (!localCartVarReactive.items) {
      console.log("no data in cart");
    } else {
      setIsReady(true);
    }
  }, [localCartVarReactive]);
  /** nasavge thnks we should put the blocks of view code below into functions
   * to make the code more readable
   */
  return (
    <CartContext.Provider value={{ dispatch }}>
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          translucent={false}
          backgroundColor={colors.background}
        />
        <SafeAreaView
          style={styles.mainContainer}
          edges={["top", "left", "right"]}
        >
          <SectionList
            sections={datas.length > 0 ? [{ title: "", data: datas }] : []}
            ListEmptyComponent={() => {
              return <Empty />;
            }}
            contentContainerStyle={{ paddingBottom: 60 }}
            renderSectionHeader={() => (
              <View
                style={{
                  paddingHorizontal: AppConfig.paddingHorizontal,
                  backgroundColor: "white",
                  height: 80,
                }}
              >
                <Button
                  onPress={() => {
                    NavigationService.navigate("CheckoutNoAuthScreen");
                  }}
                  text="PROCEED TO CHECKOUT"
                />
              </View>
            )}
            renderSectionFooter={() => (
              <View
                style={{
                  paddingHorizontal: AppConfig.paddingHorizontal,
                  backgroundColor: "white",
                  height: 80,
                }}
              >
                {!paidDuringDelivery ? (
                  <TouchableOpacity
                    onPress={() => setPaidDuringDeliver(true)}
                    style={{
                      borderRadius: s(40),
                      backgroundColor: colors.grey80,
                      width: s(170),
                      height: s(32),
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: -15,
                    }}
                  >
                    <Text
                      style={[
                        styles.heading5Bold,
                        { color: "white", textAlign: "center" },
                      ]}
                    >
                      PAY DURING DELIVERY
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={[
                          styles.txtRegular,
                          { fontSize: s(14), color: colors.black },
                        ]}
                      >
                        Product paid during delivery.
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          sheetContext.dispatch({
                            type: "changSheetState",
                            payload: {
                              showSheet: true,
                              height: 300,
                              children: () => {
                                const data = {
                                  textTip: "Paying during delivery",
                                  subTextTip:
                                    "This is an explanatory text about this feature, lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professo.",
                                  needButton: true,
                                  btnMsg: "OK",
                                  onPress: () => {
                                    sheetContext.dispatch({
                                      type: "changSheetState",
                                      payload: {
                                        showSheet: false,
                                      },
                                    });
                                  },
                                };
                                return (
                                  <View
                                    style={{
                                      height: 320,
                                      marginLeft: -AppConfig.paddingHorizontal,
                                    }}
                                  >
                                    <TextTip {...data} />
                                  </View>
                                );
                              },
                            },
                          });
                        }}
                      >
                        <Text
                          style={[
                            styles.txtRegular,
                            { color: colors.secondary00, paddingLeft: 6 },
                          ]}
                        >
                          Details
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity>
                      <Text
                        style={[
                          styles.txtRegular,
                          { color: colors.secondary00, paddingLeft: 6 },
                        ]}
                      >
                        PAY NOW
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
                <View
                  style={{
                    marginTop: 30,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Image
                    style={{
                      width: s(28),
                      height: s(28),
                      resizeMode: "contain",
                      marginRight: s(10),
                    }}
                    source={images.shopcartInfoImage}
                  />
                  <View>
                    <Text style={[styles.txtRegular, { color: colors.grey80 }]}>
                      Remember that you will get your product once the
                    </Text>
                    <View style={styles.row}>
                      <Text
                        style={[styles.txtRegular, { color: colors.grey80 }]}
                      >
                        number of slices has been reached
                      </Text>
                      <TouchableOpacity>
                        <Text
                          style={[
                            styles.txtRegular,
                            { color: colors.secondary00, paddingLeft: 6 },
                          ]}
                        >
                          Learn more
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            )}
            stickySectionHeadersEnabled={true}
            stickyHeaderIndices={0}
            ListHeaderComponent={() => {
              return datas.length > 0 ? (
                <View style={{ backgroundColor: "white" }}>
                  <AddressBar />
                  <CartSummary />
                </View>
              ) : null;
            }}
            renderItem={({ item }) => {
              return <CartItem dispatch={dispatch} product={item} />;
            }}
            keyExtractor={(item, index) => `lll${index}`}
          />
        </SafeAreaView>
      </View>
    </CartContext.Provider>
  );
}

export default ShoppingCart;
