import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useContext,
} from "react";
import {
  View,
  StatusBar,
  Image,
  ScrollView,
  TouchableOpacity,
  Text,
  Dimensions,
  FlatList,
  ImageBackground,
  Alert as RNAlert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { s, vs } from "react-native-size-matters";
import Animated from "react-native-reanimated";
import Carousel from "react-native-snap-carousel";

import { Images, Colors } from "../../../Themes";
import styles from "./styles";
import NavigationService from "../../../Navigation/NavigationService";
import { AlertContext } from "../../Root/GlobalContext";
import ShareOptionList from "../Components/ShareOptionList";
import metrics from "../../../Themes/Metrics";
import { useReactiveVar } from "@apollo/client";
import { localCartVar } from "../../../Apollo/cache";
//render product images
export default function ProductCarousel({ product }) {
  /**
   * updates for state and cart, will be used to add this product to the cart
   * useReactiveVar => we will get updates from other screens
   */
  const localCartVarReactive = useReactiveVar(localCartVar);
  const _carousel = useRef();
  const { dispatch } = useContext(AlertContext);
  //hold the index of the current product's photo
  const [photoIndex, setPhotoIndex] = useState(0);

  //hold the boolean to indicate if this product has been liked by this user
  const [isLiked, setIsLiked] = useState(false);
  //control when swipe to another image
  const onSnapToItem = useCallback((index) => {
    setPhotoIndex(index);
  }, []);
  const onLikeProduct = useCallback(() => {
    setIsLiked(!isLiked);
  }, [isLiked]);
  const toggleShareSheet = useCallback(() => {
    dispatch({
      type: "changSheetState",
      payload: {
        showSheet: true,
        height: 580,
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
    // we need to add this product to the cart then navigate to the cart
    console.log(
      `add to cache then navigate ${JSON.stringify(localCartVarReactive)}`
    );
    // get latest cart values
    let uI = localCartVarReactive.items;
    // update cart items list
    uI.push(product);
    localCartVar({
      items: uI,
    });
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
          style={styles.btnRoundContainer}
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
                isLiked && { tintColor: Colors.primary },
              ]}
              source={isLiked ? Images.likeFilled : Images.likeMed}
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
            {photoIndex + 1}/{product.photoUrls.length}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
