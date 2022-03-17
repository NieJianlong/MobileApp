import React, {
  useState,
  useRef,
  useCallback,
  useContext,
  useEffect,
} from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  useWindowDimensions,
} from "react-native";
import { s } from "react-native-size-matters";
import Carousel from "react-native-snap-carousel";

import { Images, Colors } from "../../../Themes";
import styles from "./styles";
import NavigationService from "../../../Navigation/NavigationService";
import { AlertContext } from "../../Root/GlobalContext";
import ShareOptionList from "../Components/ShareOptionList";
import metrics from "../../../Themes/Metrics";
import { useMutation, useQuery } from "@apollo/client";

import PubSub from "pubsub-js";

import {
  ADD_PRODUCT_TO_WISHLIST,
  DELETE_PRODUCT_FROM_WISHLIST,
} from "../../../Apollo/mutations/mutations_product";
import { IS_PRODDCT_IN_WISHLIST } from "../../../Apollo/queries/queries_prodmang";
import useRealm from "../../../hooks/useRealm";
import { t } from "react-native-tailwindcss";
import { GET_LOCAL_CART } from "../../../Apollo/cache";
//render product images
export default function ProductCarousel({ product }) {
  const { realm } = useRealm();
  const {
    data: { localCartVar },
  } = useQuery(GET_LOCAL_CART);
  const [mydatas, setMydatas] = useState(
    realm
      .objects("ShoppingCart")
      .filtered("addressId == $0", localCartVar.deliverAddress)
      .filtered("quantity > 0")
      .filtered("isDraft == false")
  );
  const { width } = useWindowDimensions();
  useEffect(() => {
    let refresh = PubSub.subscribe("refresh-shoppingcart", () => {
      setMydatas(
        realm
          .objects("ShoppingCart")
          .filtered("addressId == $0", localCartVar.deliverAddress)
          .filtered("quantity > 0")
          .filtered("isDraft == false")
      );
    });
    return () => {
      PubSub.unsubscribe(refresh);
    };
  }, [localCartVar.deliverAddress, realm]);
  const _carousel = useRef();
  const { dispatch } = useContext(AlertContext);
  const { data, refetch } = useQuery(IS_PRODDCT_IN_WISHLIST, {
    variables: {
      productId: product.productId,
      buyerId: global.buyerId,
      // billingDetailsId: billingDetails.billingDetailsId,
    },
    context: {
      headers: {
        isPrivate: true,
      },
    },
  });

  const [addToWishList] = useMutation(ADD_PRODUCT_TO_WISHLIST, {
    variables: {
      productId: product.productId,
      buyerId: global.buyerId,
      // billingDetailsId: billingDetails.billingDetailsId,
    },
    context: {
      headers: {
        isPrivate: true,
      },
    },
    onCompleted: (res) => {
      refetch();
    },
    onError: (res) => {},
  });
  const [deleteFromWishList] = useMutation(DELETE_PRODUCT_FROM_WISHLIST, {
    variables: {
      productId: product.productId,
      buyerId: global.buyerId,
      // billingDetailsId: billingDetails.billingDetailsId,
    },
    context: {
      headers: {
        isPrivate: true,
      },
    },
    onCompleted: (res) => {
      refetch();
    },
    onError: (res) => {},
  });
  //hold the index of the current product's photo
  const [photoIndex, setPhotoIndex] = useState(0);

  //control when swipe to another image
  const onSnapToItem = useCallback((index) => {
    setPhotoIndex(index);
  }, []);
  const onLikeProduct = useCallback(() => {
    data?.isProductInWishlist ? deleteFromWishList() : addToWishList();
  }, [addToWishList, data?.isProductInWishlist, deleteFromWishList]);
  const toggleShareSheet = useCallback(() => {
    dispatch({
      type: "changSheetState",
      payload: {
        showSheet: true,
        height: 250,
        children: () => (
          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <ShareOptionList />
          </View>
        ),
        sheetTitle: "Share to",
      },
    });
  }, [dispatch]);
  /**
   * when we add an item to the cart we need to update the local cart
   * see App/Apollo/cache.js const localCart
   *
   * we should not update until product variants have be added to the
   * product object
   */
  const onAddItemAndNavigateToCart = () => {
    NavigationService.navigate("CartScreen");
  };
  return (
    <View style={styles.imagesContainer}>
      <Carousel
        ref={_carousel}
        data={product.photoUrls}
        renderItem={({ item, index }) => {
          //render product image item
          return (
            <TouchableOpacity
              key={`{index}`}
              onPress={() =>
                NavigationService.navigate("ProductGalleryScreen", {
                  fullscreenMode: true,
                })
              }
            >
              <Image
                resizeMode={"contain"}
                source={{ uri: item }}
                style={styles.prodImage}
              />
            </TouchableOpacity>
          );
        }}
        sliderWidth={metrics.screenWidth}
        itemWidth={metrics.screenWidth}
        onSnapToItem={onSnapToItem}
      />
      <View style={styles.row1}>
        <TouchableOpacity
          onPress={() => NavigationService.goBack()}
          style={styles.btnRoundContainer}
        >
          <Image style={styles.btnRoundIcon} source={Images.arrow_left} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onAddItemAndNavigateToCart()}
          style={[styles.btnRoundContainer, t.justifyCenter, t.itemsCenter]}
        >
          <Image style={styles.btnRoundIcon} source={Images.cartMed} />
        </TouchableOpacity>
      </View>

      <View style={styles.row2}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={onLikeProduct}
            style={styles.btnRoundContainer}
          >
            <Image
              style={[
                styles.btnRoundIcon,
                data?.isProductInWishlist && { tintColor: Colors.primary },
              ]}
              source={
                data?.isProductInWishlist ? Images.likeFilled : Images.likeMed
              }
            />
          </TouchableOpacity>
          <View style={{ width: s(12) }} />
          <TouchableOpacity
            onPress={toggleShareSheet}
            style={styles.btnRoundContainer}
          >
            <Image style={styles.btnRoundIcon} source={Images.share} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() =>
            NavigationService.navigate("ProductGalleryScreen", {
              fullscreenMode: false,
            })
          }
          style={styles.photoNumberContainer}
        >
          <Text style={styles.photoNumberTxt}>
            {photoIndex + 1}/{product?.photoUrls?.length}
          </Text>
        </TouchableOpacity>
      </View>
      {mydatas.length > 0 && (
        <View
          style={[
            t.bgPrimary,
            t.w3,
            t.h3,
            t.roundedFull,
            t.absolute,
            t.right0,
            { marginLeft: width - 30 },
            t.mT6,
          ]}
        />
      )}
    </View>
  );
}
