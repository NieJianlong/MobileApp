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
// import { shareOptions } from "../Components/ShareOptionList";
import { shareOptionsDetails } from "../Components/ShareOptionList";
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
import Swiper from "react-native-swiper";
import ViewShot, { captureRef, captureScreen } from "react-native-view-shot";
import RNFetchBlob from "rn-fetch-blob";

//render product images
export default function ProductCarousel({ product, onPress }) {
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
  const viewShotRef = useRef(null);
  const [screenShot, setScreenshot] = useState();

  // useEffect(() => {
  //   viewShotRef.current.capture().then((uri) => {
  //     console.log("do something with ", uri);
  //     setScreenshot(uri);
  //     console.log("seee the screenshot", uri);
  //   });
  // }, []);

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
    // Share.open(shareOptions);
    // var base64Data = `data:image/png;base64,` + screenShot;
    // shareOptionsDetails(base64Data);
    // console.log("seee the screenshot2", base64Data);
    // let imagePath = null;
    // RNFetchBlob.config({
    //   fileCache: true,
    // })
    // .fetch('GET', screenShot)
    // .then((resp) => {
    //   imagePath = resp.path();
    //   return resp.readFile('base64');
    // })
    // .then((base64Data) => {
    //   var imageUrl = 'data:image/png;base64,' + base64Data;
    //   shareOptionsDetails(imageUrl);

    captureRef(viewShotRef, {
      format: "png",
      quality: 0.8,
      result: "base64",
    }).then(
      (uri) => {
        console.log("seee the uri", uri);
        Share.open({
          title: "Title",
          message: "Message to share", // Note that according to the documentation at least one of "message" or "url" fields is required
          url: "data:image/png;base64," + uri,
          subject: "Subject",
        });
      },
      (error) => console.error("Oops, snapshot failed", error)
    );
    // })
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
    <ViewShot
      ref={viewShotRef}
      options={{ format: "png", quality: 0.4, result: "base64" }}
    >
      <View style={styles.imagesContainer}>
        <Swiper>
          {product?.photoUrls?.map((item, index) => {
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
          })}
        </Swiper>

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
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={onLikeProduct}
              style={styles.btnRoundContainer}
            >
              <Image
                style={[
                  styles.btnRoundIcon,
                  { transform: [{ rotateY: "180deg" }] },
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
    </ViewShot>
  );
}
