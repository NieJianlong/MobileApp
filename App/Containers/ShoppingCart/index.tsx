import React, { useState, useContext, useEffect, useMemo } from "react";
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
import AddressBar from "../Explore/Components/AddressBar";
import styles from "./styles";
import CartSummary from "./CartSummary";
import CartItem from "./Cartitem";
import { Button } from "../../Components";
import { s } from "react-native-size-matters";
import AppConfig from "../../Config/AppConfig";
import colors from "../../Themes/Colors";
import images from "../../Themes/Images";
import NavigationService from "../../Navigation/NavigationService";
import PubSub from "pubsub-js";
import useRealm from "../../hooks/useRealm";
import { useLazyQuery } from "@apollo/client";
import { localCartVar } from "../../Apollo/cache";
import { IsListingAvailable } from "../Explore/gql/explore_queries";
import useShoppingCart from "../../hooks/useShoppingCart";

export const CartContext = React.createContext({});

function ShoppingCart(props) {
  const { queryShoppingCart, shoppingcartList } = useShoppingCart();
  const localCart = localCartVar();
  const [total, setTotal] = useState(0);
  useEffect(() => {
    props.navigation.addListener("focus", () => {
      queryShoppingCart(localCart.deliverAddress);
    });
  }, [localCart.deliverAddress, props.navigation, queryShoppingCart]);

  useEffect(() => {
    queryShoppingCart(localCart.deliverAddress);
    let refresh = PubSub.subscribe("refresh-shoppingcart", () => {
      queryShoppingCart(localCart.deliverAddress);
    });
    return () => {
      if (refresh) {
        PubSub.unsubscribe(refresh);
      }
    };
  }, [localCart.deliverAddress]);

  const isAvailableList = useMemo(() => {
    return shoppingcartList?.map((item) => {
      return {
        listingId: item?.product?.listingId,
        variantId: item.variantId ?? "",
        quantity: item.quantity,
      };
    });
  }, [shoppingcartList]);
  console.log("isAvailableList", isAvailableList);
  const [queryAvailble, { data: availbleList }] = useLazyQuery(
    IsListingAvailable,
    {
      variables: { listings: isAvailableList },
    }
  );
  useEffect(() => {
    if (isAvailableList.length > 0) {
      queryAvailble();
    }
  }, [isAvailableList, queryAvailble]);

  /** nasavge thnks we should put the blocks of view code below into functions
   * to make the code more readable
   */
  const onProceed = () => {
    console.log("global.access_token", global.access_token);
    const itemArray = [];
    shoppingcartList.map((item, index) => {
      let itemAvailble = true;
      if (availbleList) {
        const i = availbleList.isListingAvailable[index];
        itemAvailble = i?.isAvailable;
      }
      if (itemAvailble) {
        itemArray.push({
          listingId: item.product.listingId,
          variantId: item.variantId,
          quantity: item.quantity,
        });
      }
    });
    console.log("itemArray", itemArray);
    localCartVar({
      ...localCart,
      items: itemArray,
    });

    // if (userProfile?.isAuth && global.buyerId !== AppConfig.guestId) {
    //   if (userProfile.phone) {
    //   } else {
    //   }
    //
    //   const params = {
    //     title: "Please enter your billing details",
    //
    //     actionButtonText: Action_Type.NEXT,
    //     actionType: Billing_Type.BILLING,
    //   };
    //   NavigationService.navigate("AddBillingDetailsScreen", params);
    // } else {
    //   NavigationService.navigate("CheckoutNoAuthScreen");
    // }
    if (global.access_token === "" || !global.access_token) {
      NavigationService.navigate("Page_CheckoutAuth", {
        items: shoppingcartList,
        availbleList: availbleList,
        from: "checkout",
      });
    } else {
      NavigationService.navigate("CheckoutResumeScreen", {
        orderStatus: 0,
        data: shoppingcartList,
        availbleList: availbleList,
      });
    }
  };

  const subTotal = (subtotal) => {
    setTotal(parseInt(subtotal));

    console.log("total", total);
    console.log("total===0", total === 0);
  };
  return (
    <CartContext.Provider>
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
            sections={
              shoppingcartList.length > 0
                ? [{ title: "", data: shoppingcartList }]
                : []
            }
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
                  disabledColor={"grey"}
                  disabled={total === 0}
                  onPress={onProceed}
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
                {/*{!paidDuringDelivery ? (*/}
                {/*  <TouchableOpacity*/}
                {/*    onPress={() => setPaidDuringDeliver(true)}*/}
                {/*    style={{*/}
                {/*      borderRadius: s(40),*/}
                {/*      backgroundColor: colors.grey80,*/}
                {/*      width: s(170),*/}
                {/*      height: s(32),*/}
                {/*      alignItems: "center",*/}
                {/*      justifyContent: "center",*/}
                {/*      marginTop: -15,*/}
                {/*    }}*/}
                {/*  >*/}
                {/*    <Text*/}
                {/*      style={[*/}
                {/*        styles.heading5Bold,*/}
                {/*        { color: "white", textAlign: "center" },*/}
                {/*      ]}*/}
                {/*    >*/}
                {/*      PAY DURING DELIVERY*/}
                {/*    </Text>*/}
                {/*  </TouchableOpacity>*/}
                {/*) : (*/}
                {/*  <View*/}
                {/*    style={{*/}
                {/*      flexDirection: "row",*/}
                {/*      justifyContent: "space-between",*/}
                {/*    }}*/}
                {/*  >*/}
                {/*    <View style={{ flexDirection: "row" }}>*/}
                {/*      <Text*/}
                {/*        style={[*/}
                {/*          styles.txtRegular,*/}
                {/*          { fontSize: s(14), color: colors.black },*/}
                {/*        ]}*/}
                {/*      >*/}
                {/*        Product paid during delivery.*/}
                {/*      </Text>*/}
                {/*      <TouchableOpacity*/}
                {/*        onPress={() => {*/}
                {/*          sheetContext.dispatch({*/}
                {/*            type: "changSheetState",*/}
                {/*            payload: {*/}
                {/*              showSheet: true,*/}
                {/*              height: 300,*/}
                {/*              children: () => {*/}
                {/*                const data = {*/}
                {/*                  textTip: "Paying during delivery",*/}
                {/*                  subTextTip:*/}
                {/*                    "This is an explanatory text about this feature, lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professo.",*/}
                {/*                  needButton: true,*/}
                {/*                  btnMsg: "OK",*/}
                {/*                  onPress: () => {*/}
                {/*                    sheetContext.dispatch({*/}
                {/*                      type: "changSheetState",*/}
                {/*                      payload: {*/}
                {/*                        showSheet: false,*/}
                {/*                      },*/}
                {/*                    });*/}
                {/*                  },*/}
                {/*                };*/}
                {/*                return (*/}
                {/*                  <View*/}
                {/*                    style={{*/}
                {/*                      height: 320,*/}
                {/*                      marginLeft: -AppConfig.paddingHorizontal,*/}
                {/*                    }}*/}
                {/*                  >*/}
                {/*                    <TextTip {...data} />*/}
                {/*                  </View>*/}
                {/*                );*/}
                {/*              },*/}
                {/*            },*/}
                {/*          });*/}
                {/*        }}*/}
                {/*      >*/}
                {/*        <Text*/}
                {/*          style={[*/}
                {/*            styles.txtRegular,*/}
                {/*            { color: colors.secondary00, paddingLeft: 6 },*/}
                {/*          ]}*/}
                {/*        >*/}
                {/*          Details*/}
                {/*        </Text>*/}
                {/*      </TouchableOpacity>*/}
                {/*    </View>*/}
                {/*    <TouchableOpacity*/}
                {/*      onPress={() => {*/}
                {/*        // NavigationService.navigate("PaymentScreen")*/}
                {/*      }}*/}
                {/*    >*/}
                {/*      <Text*/}
                {/*        style={[*/}
                {/*          styles.txtRegular,*/}
                {/*          { color: colors.secondary00, paddingLeft: 6 },*/}
                {/*        ]}*/}
                {/*      >*/}
                {/*        PAY NOW*/}
                {/*      </Text>*/}
                {/*    </TouchableOpacity>*/}
                {/*  </View>*/}
                {/*)}*/}
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
              return shoppingcartList.length > 0 ? (
                <View style={{ backgroundColor: "white" }}>
                  <AddressBar />
                  <CartSummary
                    availbleList={availbleList}
                    subtotal={subTotal}
                  />
                </View>
              ) : null;
            }}
            renderItem={({ item, index }) => {
              let itemAvailble = true;
              if (availbleList) {
                const i = availbleList.isListingAvailable[index];
                itemAvailble = i?.isAvailable;
              }
              return (
                <CartItem key={index} product={item} availble={itemAvailble} />
              );
            }}
            keyExtractor={(item, index) => `lll${index}`}
          />
        </SafeAreaView>
      </View>
    </CartContext.Provider>
  );
}

export default ShoppingCart;
