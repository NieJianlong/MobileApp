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
import { shareOptions } from "../Components/ShareOptionList";
import metrics from "../../../Themes/Metrics";
import { useQuery, useReactiveVar } from "@apollo/client";

import PubSub from "pubsub-js";
import useRealm from "../../../hooks/useRealm";
import { t } from "react-native-tailwindcss";
import { GET_LOCAL_CART, userProfileVar } from "../../../Apollo/cache";
import {
  useAddListingToWishlistMutation,
  useDeleteListingFromWishlistMutation,
  useIsListingInWishlistQuery,
} from "../../../../generated/graphql";
import Share from "react-native-share";
import useImageViewer from "../../../hooks/useImageViewer";
//render product images
export default function ProductCarousel({ product }) {
  const { realm } = useRealm();
  const userProfileVarReactive = useReactiveVar(userProfileVar);
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
  const { data, refetch } = useIsListingInWishlistQuery({
    variables: {
      buyerId: global.buyerId,
      listingId: product.listingId,
    },
    context: {
      headers: {
        isPrivate: userProfileVarReactive.isAuth,
      },
    },
  });
  const [addToWishList] = useAddListingToWishlistMutation({
    variables: { buyerId: global.buyerId, listingId: product.listingId },
    context: {
      headers: {
        isPrivate: userProfileVarReactive.isAuth,
      },
    },
    onCompleted: (res) => {
      refetch();
    },
    onError: (res) => {},
  });
  const [deleteFromWishList] = useDeleteListingFromWishlistMutation({
    variables: { buyerId: global.buyerId, listingId: product.listingId },
    context: {
      headers: {
        isPrivate: userProfileVarReactive.isAuth,
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
    data?.isListingInWishlist ? deleteFromWishList() : addToWishList();
  }, [addToWishList, data?.isListingInWishlist, deleteFromWishList]);
  const toggleShareSheet = useCallback(() => {
    Share.open(shareOptions);
    // dispatch({
    //   type: "changSheetState",
    //   payload: {
    //     showSheet: true,
    //     height: 250,
    //     children: () => (
    //       <View style={{ flex: 1, justifyContent: "flex-end" }}>
    //         <ShareOptionList />
    //       </View>
    //     ),
    //     sheetTitle: "Share to",
    //   },
    // });
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
  const { setImageViewer } = useImageViewer();
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
              onPress={
                () => {
                  const imageUrls =
                    product.photoUrls?.map((item: string) => {
                      return { url: item };
                    }) ?? [];
                  setImageViewer({ visible: true, images: imageUrls });
                }
                // NavigationService.navigate("ProductGalleryScreen", {
                //   fullscreenMode: true,
                //   urls: product.photoUrls,
                // })
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
                data?.isListingInWishlist && { tintColor: Colors.primary },
              ]}
              source={
                data?.isListingInWishlist ? Images.likeFilled : Images.likeMed
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
          onPress={() => {
            const imageUrls =
              product.photoUrls?.map((item: string) => {
                return { url: item };
              }) ?? [];
            setImageViewer({ visible: true, images: imageUrls });
          }}
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
