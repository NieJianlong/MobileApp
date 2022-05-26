import React, { useState, useContext, useEffect, useMemo } from "react";
import {
  View,
  SafeAreaView,
  SectionList,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
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
import { localCartVar } from "../../Apollo/cache";
import {
  useIsListingAvailableLazyQuery,
  IsListingAvailableInput,
} from "../../../generated/graphql";
import useOrderInfo from "../../hooks/useOrderInfo";
import { ItemProps } from "../../hooks/useCreateOrder";
import { ComeFromType } from "../../Utils/utils";
import { Page_CheckoutGuestOrderDetail } from "../../Navigation/const";

export const CartContext = React.createContext({});

function ShoppingCart(props) {
  const { realm } = useRealm();
  const localCart = localCartVar();
  // const { addBilling } = AddBillingDetail();
  const [requestArray, setRequestArray] = useState<IsListingAvailableInput[]>(
    []
  );
  const { orderInfo, setOrderInfo } = useOrderInfo();
  const [finalData, setFinalData] = useState([]);
  const { updateMoneyInfo } = useOrderInfo();

  useEffect(() => {
    const query1 = realm
      .objects("ShoppingCart")
      .filtered("addressId == $0", localCart.deliverAddress)
      .filtered("quantity > 0")
      .filtered("isDraft == false");
    const datas = [];
    if (query1) {
      query1.map((item) => {
        const newItem = {
          listingId: item.listingId,
          variantId: item.variantId,
          quantity: item.quantity,
        };

        datas.push(newItem);
      });
    } else {
      setRequestArray(datas);
    }
    props.navigation.addListener("focus", () => {
      const query1 = realm
        .objects("ShoppingCart")
        .filtered("addressId == $0", localCart.deliverAddress)
        .filtered("quantity > 0")
        .filtered("isDraft == false");
      const datas = [];
      if (query1) {
        query1.map((item) => {
          const newItem = {
            listingId: item.listingId,
            variantId: item.variantId,
            quantity: item.quantity,
          };
          datas.push(newItem);
        });
        setRequestArray(datas);
      } else {
        setRequestArray([]);
      }
    });
  }, []);

  useEffect(() => {
    const query1 = realm
      .objects("ShoppingCart")
      .filtered("addressId == $0", localCart.deliverAddress)
      .filtered("quantity > 0")
      .filtered("isDraft == false");
    const datas = [];
    debugger;
    if (query1) {
      query1.map((item) => {
        debugger;
        const newItem = {
          listingId: item.listingId,
          variantId: item.variantId,
          quantity: item.quantity,
        };
        datas.push(newItem);
      });
      setRequestArray(datas);
    } else {
      setRequestArray([]);
    }
    let refresh = PubSub.subscribe("refresh-shoppingcart", () => {
      const query1 = realm
        .objects("ShoppingCart")
        .filtered("addressId == $0", localCart.deliverAddress)
        .filtered("quantity > 0")
        .filtered("isDraft == false");
      const datas = [];
      debugger;
      if (query1) {
        query1.map((item) => {
          debugger;
          const newItem = {
            listingId: item.listingId,
            variantId: item.variantId,
            quantity: item.quantity,
          };
          datas.push(newItem);
        });
        setRequestArray(datas);
      } else {
        setRequestArray([]);
      }
    });
    return () => {
      if (refresh) {
        PubSub.unsubscribe(refresh);
      }
    };
  }, [localCart.deliverAddress]);

  console.log("isAvailableList", requestArray);
  const [queryAvailble, { data: availbleList, loading }] =
    useIsListingAvailableLazyQuery({
      variables: { listings: requestArray },
    });
  useEffect(() => {
    if (requestArray.length > 0) {
      queryAvailble();
    }
  }, [requestArray]);
  useEffect(() => {
    let timer = setInterval(() => {
      queryAvailble();
    }, 3000);
    // props.navigation.addListener("blur", () => {});
    return () => {
      clearInterval(timer);
    };
  }, []);
  useEffect(() => {
    if (availbleList) {
      setFinalData(availbleList.isListingAvailable);
    }
  }, [availbleList]);

  // const finalData = useMemo(() => {
  //   if (availbleList?.isListingAvailable) {
  //     return availbleList?.isListingAvailable ?? [];
  //   } else {
  //     return [];
  //   }
  // }, [availbleList?.isListingAvailable]);

  // const finalData = availbleList?.isListingAvailable ?? [];
  /** nasavge thnks we should put the blocks of view code below into functions
   * to make the code more readable
   */
  const onProceed = async () => {
    // await addBilling();
    console.log("global.access_token", global.access_token);
    const itemArray = [];
    const allItems: ItemProps[] = [];
    finalData.map((item, index) => {
      if (item.isAvailable) {
        itemArray.push({
          listingId: item.listingId,
          variantId: item.variantId,
          quantity: requestArray[index].quantity,
        });

        allItems.push({
          listingId: item.listingId,
          variantId: item.variantId,
          quantity: requestArray[index].quantity,
          productDetails: item?.listing,
          variant: item.listing?.listingVariants?.find(
            (variantItem) => variantItem?.variantId === item.variantId
          ),
        });
      }
    });

    updateMoneyInfo({
      ...orderInfo,
      itemsForRequest: itemArray,
      allItems,
      comeFromType: ComeFromType.checkout,
      availbleList: availbleList?.isListingAvailable ?? [],
    });
    // updateMoneyInfo({
    //   data: allItems,
    //   availbleList: availbleList?.isListingAvailable ?? [],
    // });

    if (global.access_token === "" || !global.access_token) {
      NavigationService.navigate(Page_CheckoutGuestOrderDetail);
    } else {
      NavigationService.navigate("CheckoutResumeScreen");
    }
  };

  console.log("finalData====================================");
  console.log(finalData);
  console.log("====================================");

  return (
    <CartContext.Provider>
      <View style={styles.container}>
        <SafeAreaView
          style={styles.mainContainer}
          edges={["top", "left", "right"]}
        >
          <ScrollView>
            {finalData.length > 0 ? (
              <View style={{ backgroundColor: "white" }}>
                <AddressBar />
                <CartSummary availbleList={availbleList} />
              </View>
            ) : null}
            <SectionList
              sections={
                finalData.length > 0 ? [{ title: "", data: finalData }] : []
              }
              ListEmptyComponent={() => {
                return <Empty />;
              }}
              contentContainerStyle={{ paddingBottom: 60 }}
              renderSectionHeader={() => {
                let disabled = false;
                if (finalData.find((sditem) => sditem.isAvailable)) {
                  disabled = false;
                } else {
                  disabled = true;
                }
                return (
                  <View
                    style={{
                      paddingHorizontal: AppConfig.paddingHorizontal,
                      backgroundColor: "white",
                      height: 80,
                    }}
                  >
                    <Button
                      disabled={disabled}
                      disabledColor={"grey"}
                      onPress={onProceed}
                      text="PROCEED TO CHECKOUT"
                    />
                  </View>
                );
              }}
              renderSectionFooter={() => (
                <View
                  style={{
                    paddingHorizontal: AppConfig.paddingHorizontal,
                    backgroundColor: "white",
                    height: 80,
                  }}
                >
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
                      <Text
                        style={[styles.txtRegular, { color: colors.grey80 }]}
                      >
                        Remember that you will get your product once the
                      </Text>
                      <View style={styles.row}>
                        <Text
                          style={[styles.txtRegular, { color: colors.grey80 }]}
                        >
                          number of slices has been reached
                        </Text>
                        <TouchableOpacity
                          onPress={() => {
                            props.navigation.navigate("LearnMoreScreen");
                          }}
                        >
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
              renderItem={({ item, index }) => {
                let variant = null;
                if (item.listing?.listingVariants?.length === 0) {
                  variant = item.listing?.listingVariants[0];
                } else {
                  variant = item.listing?.listingVariants?.find(
                    (variantItem) => variantItem?.variantId === item.variantId
                  );
                }
                const requsetItem = requestArray[index];
                return (
                  <CartItem
                    key={index}
                    product={item.listing}
                    variant={variant}
                    availble={item.isAvailable}
                    quantity={requsetItem?.quantity ?? 0}
                    onChangeQuanlity={(quantity) => {
                      // Open a transaction.
                      realm.write(() => {
                        const queryItems = realm
                          .objects("ShoppingCart")
                          .filtered("addressId == $0", localCart.deliverAddress)
                          .filtered("listingId == $0", item.listingId)
                          .filtered("variantId == $0", item.variantId)
                          .filtered("quantity > 0")
                          .filtered("isDraft == false");
                        const queryItem = queryItems[0];
                        // Update some properties on the instance.
                        // These changes are saved to the realm.
                        queryItem.quantity = quantity;
                      });
                      PubSub.publish("refresh-shoppingcart");
                    }}
                  />
                );
              }}
              keyExtractor={(item, index) => `lll${index}`}
            />
          </ScrollView>
        </SafeAreaView>
      </View>
    </CartContext.Provider>
  );
}

export default ShoppingCart;
