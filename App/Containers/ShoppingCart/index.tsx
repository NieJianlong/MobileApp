import React, { useState, useContext, useEffect, useMemo } from "react";
import {
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
import { localCartVar } from "../../Apollo/cache";
import { useIsListingAvailableLazyQuery } from "../../../generated/graphql";
import useOrderInfo from "../../hooks/useOrderInfo";
import { ItemProps } from "../../hooks/useCreateOrder";
import { ComeFromType } from "../../Utils/utils";

export const CartContext = React.createContext({});

function ShoppingCart(props) {
  const { realm } = useRealm();
  const localCart = localCartVar();
  // const { addBilling } = AddBillingDetail();
  const [mydatas, setMydatas] = useState([]);
  const { orderInfo, setOrderInfo } = useOrderInfo();
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
          id: item.id,
          listingId: item.listingId,
          productId: item.productId,
          variantId: item.variantId,
          quantity: item.quantity,
          variant: item.variant,
          isDraft: item.isDraft,
          addressId: item.addressId,
          product: item.product,
          created: item.created,
          updated: item.updated,
        };

        datas.push(newItem);
      });
    } else {
      setMydatas(datas);
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
            id: item.id,
            listingId: item.listingId,
            productId: item.productId,
            variantId: item.variantId,
            quantity: item.quantity,
            variant: item.variant,
            isDraft: item.isDraft,
            addressId: item.addressId,
            product: item.product,
            created: item.created,
            updated: item.updated,
          };
          datas.push(newItem);
        });
        setMydatas(datas);
      } else {
        setMydatas([]);
      }
    });
  }, []);

  useEffect(() => {
    let refresh = PubSub.subscribe("refresh-shoppingcart", () => {
      const query1 = realm
        .objects("ShoppingCart")
        .filtered("addressId == $0", localCart.deliverAddress)
        .filtered("quantity > 0")
        .filtered("isDraft == false");
      const datas = [];
      if (query1) {
        query1.map((item) => {
          const newItem = {
            id: item.id,
            listingId: item.listingId,
            productId: item.productId,
            variantId: item.variantId,
            quantity: item.quantity,
            variant: item.variant,
            isDraft: item.isDraft,
            addressId: item.addressId,
            product: item.product,
            created: item.created,
            updated: item.updated,
          };
          datas.push(newItem);
        });
        setMydatas(datas);
      } else {
        setMydatas([]);
      }
    });
    return () => {
      if (refresh) {
        PubSub.unsubscribe(refresh);
      }
    };
  }, [localCart.deliverAddress]);

  const isAvailableList = useMemo(() => {
    return mydatas?.map((item) => {
      return {
        listingId: item?.product?.listingId,
        variantId: item.variantId ?? "",
        quantity: item.quantity,
      };
    });
  }, [mydatas]);
  console.log("isAvailableList", isAvailableList);
  const [queryAvailble, { data: availbleList }] =
    useIsListingAvailableLazyQuery({
      variables: { listings: isAvailableList },
    });
  useEffect(() => {
    if (isAvailableList.length > 0) {
      queryAvailble();
    }
  }, [isAvailableList]);

  /** nasavge thnks we should put the blocks of view code below into functions
   * to make the code more readable
   */
  const onProceed = async () => {
    // await addBilling();
    console.log("global.access_token", global.access_token);
    const itemArray = [];
    const allItems: ItemProps[] = [];
    mydatas.map((item, index) => {
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

        allItems.push({
          listingId: item.product.listingId,
          variantId: item.variantId,
          quantity: item.quantity,
          productDetails: Object.assign({}, item?.product),
          variant: Object.assign({}, item.variant),
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
      NavigationService.navigate("Page_CheckoutAuth");
    } else {
      NavigationService.navigate("CheckoutResumeScreen");
    }
  };

  return (
    <CartContext.Provider>
      <View style={styles.container}>
        <SafeAreaView
          style={styles.mainContainer}
          edges={["top", "left", "right"]}
        >
          <SectionList
            sections={mydatas.length > 0 ? [{ title: "", data: mydatas }] : []}
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
            ListHeaderComponent={() => {
              return mydatas.length > 0 ? (
                <View style={{ backgroundColor: "white" }}>
                  <AddressBar />
                  <CartSummary availbleList={availbleList} />
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
