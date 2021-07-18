import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  View,
  StatusBar,
  Image,
  ScrollView,
  TouchableOpacity,
  Text,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { s, vs } from "react-native-size-matters";
import { ScrollIntoView, wrapScrollView } from "react-native-scroll-into-view";
import { range } from "lodash";
import { StarRating } from "../../../Components";

import { Images, Colors } from "../../../Themes";
import styles from "./styles";
import NavigationService from "../../../Navigation/NavigationService";
import ProductVariants from "../Components/Variants";

/** updates for the cart */
import { localCartVar } from "../../../Apollo/cache";
import { useReactiveVar } from "@apollo/client";
import ProductCarousel from "./ProductCarousel";
import { AlertContext } from "../../Root/GlobalContext";

import Picker from "../../../Components/Picker";
import ColorSheetContent from "./SheetContent/ColorSheetContent";
import ChatOptions from "./ChatOptions";
import RelatedProducts from "./RelatedProducts";
import StoreInfo from "./StoreInfo";
import DetailFooter from "./DetailFooter";
import ProductReview from "./ProductReview";
import ProductInfo from "./ProductInfo";

const { height } = Dimensions.get("window");
const Sections = range(0, 4);
// Wrap the original ScrollView
const CustomScrollView = wrapScrollView(ScrollView);

function ProductDetail(props) {
  /**
   * updates for state and cart, will be used to add this product to the cart
   * useReactiveVar => we will get updates from other screens
   */
  const localCartVarReactive = useReactiveVar(localCartVar);
  const { dispatch } = useContext(AlertContext);

  //control whether to show the hearder (display and navigation to sections)
  const [showHeaderTabs, setShowHeaderTabs] = useState(false);
  //control whether to show the footer (display price and buy button)
  const [showFooter, setShowFooter] = useState(false);
  //hold the section index
  const [tabIndex, setTabIndex] = useState(0);

  //hold the boolean to indicate if this product has been purchased by this user
  const [isPurchased, setIsPurchased] = useState(false);

  const [showReviewSentAlert, setShowReviewSentAlert] = useState(false);

  //reference for sheets
  const sectionsRefs = Sections.map((_section) => React.createRef());
  /**
   *
   * UPDATES for backend
   * temp solution todo improve
   */
  const [product, setProductFromProps] = useState({});
  const [isReady, setIsReady] = useState(false);
  const [bullets, setBullets] = useState([]);

  //function to scroll the specific section
  const scrollSectionIntoView = (section) => {
    sectionsRefs[section].current.scrollIntoView({
      align: "top",
      insets: {
        top: vs(35),
        bottom: 0,
      },
    });
  };

  //handle when scrolling
  const handleScroll = (event) => {
    let threshold = height / 4;
    let y = event.nativeEvent.contentOffset.y;
    //control when to show footer and header
    if (y > threshold && !showHeaderTabs) {
      setShowHeaderTabs(true);
      setShowFooter(false);
    } else if (y <= threshold && showHeaderTabs) {
      setShowHeaderTabs(false);
      setShowFooter(false);
    }
    //detect which tab is showing
    if (y > 1430 && tabIndex === 0) {
      setTabIndex(1);
    } else if (y > 1840 && tabIndex === 1) {
      setTabIndex(2);
    } else if (y > 2020 && tabIndex === 2) {
      setTabIndex(3);
    } else if (y < 2020 && tabIndex === 3) {
      setTabIndex(2);
    } else if (y < 1840 && tabIndex === 2) {
      setTabIndex(1);
    }
  };

  //handle when users stop scrolling, show footer
  const handleScrollEnd = (event) => {
    setShowFooter(true);
  };

  useEffect(() => {
    // console.log(`check url ${props.route.params.product.photo}`);
    setProductFromProps(props.route.params.product);
    if (product.highlightBullets) {
      let bulls = JSON.parse(product.highlightBullets);
      setBullets(bulls);
    } else {
      setBullets([]);
    }

    setIsReady(true);
  }, [props, localCartVarReactive, product.highlightBullets]);

  const toggleColorSheet = useCallback(() => {
    dispatch({
      type: "changSheetState",
      payload: {
        showSheet: true,
        height: 390,
        children: () => <ColorSheetContent />,
        sheetTitle: "Color",
      },
    });
  }, [dispatch]);

  const toggleReviewSentAlert = () =>
    setShowReviewSentAlert(!showReviewSentAlert);

  const renderHeaderTabs = () => {
    return (
      <SafeAreaView style={styles.headerTabsSafeArea} edges={["top"]}>
        <View style={styles.headerTabsContainer}>
          {tabs.map((i, index) => (
            <TouchableOpacity
              key={index.toString()}
              onPress={() => {
                setTabIndex(index);
                scrollSectionIntoView(index);
              }}
              style={[
                styles.headerTabItem,
                tabIndex === index && { borderBottomColor: Colors.primary },
              ]}
            >
              <Text
                style={[
                  styles.heading5Bold,
                  {
                    color: tabIndex === index ? Colors.primary : Colors.grey60,
                  },
                ]}
              >
                {i}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>
    );
  };

  const renderOptions = () => {
    return (
      <View style={styles.optionContainer}>
        <View style={styles.noteContainer}>
          <Text style={styles.heading6Regular}>
            Covered by Seller Name 7 day return policy, for:
          </Text>

          <View style={[styles.rowSpaceBetween, { marginTop: vs(15) }]}>
            <Image
              resizeMode={"contain"}
              style={styles.returnPolicyImage}
              source={Images.returnPolicy3}
            />
            <Image
              resizeMode={"contain"}
              style={styles.returnPolicyImage}
              source={Images.returnPolicy2}
            />
            <Image
              resizeMode={"contain"}
              style={styles.returnPolicyImage}
              source={Images.returnPolicy1}
            />
          </View>
        </View>

        {isPurchased && <ChatOptions />}

        {/* Upadates for variants here */}
        <ProductVariants product={product} />

        <Picker
          onPress={toggleColorSheet}
          style={styles.picker}
          title={"Size"}
          value={"256GB"}
        />

        <Picker
          onPress={toggleColorSheet}
          style={styles.picker}
          title={"Style"}
          value={"OnePlus 8 Pro"}
        />

        <Picker
          onPress={toggleColorSheet}
          style={styles.picker}
          title={"Color"}
          value={"Black"}
        />
      </View>
    );
  };

  const renderSectionDetails = () => {
    return (
      <ScrollIntoView align={"top"} key={"section0"} ref={sectionsRefs[0]}>
        <ProductCarousel product={product} />

        <ProductInfo />

        {renderOptions()}
      </ScrollIntoView>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView
        style={styles.mainContainer}
        edges={["top", "left", "right"]}
      >
        <CustomScrollView
          contentContainerStyle={{ paddingBottom: vs(150) }}
          onScroll={handleScroll}
          onMomentumScrollEnd={handleScrollEnd}
          scrollEventThrottle={60}
          showsVerticalScrollIndicator={false}
        >
          {/* 4 sections of this screen */}

          {isReady && renderSectionDetails()}

          {isReady && (
            <ScrollIntoView key={"section1"} ref={sectionsRefs[1]}>
              <RelatedProducts />
            </ScrollIntoView>
          )}

          {isReady && (
            <ScrollIntoView key={"section2"} ref={sectionsRefs[2]}>
              <StoreInfo tabIndex={tabIndex} product={product} />
            </ScrollIntoView>
          )}

          {isReady && (
            <ScrollIntoView key={"section3"} ref={sectionsRefs[3]}>
              <ProductReview
                product={product}
                tabIndex={tabIndex}
                isPurchased={isPurchased}
              />
            </ScrollIntoView>
          )}
        </CustomScrollView>

        {showHeaderTabs && renderHeaderTabs()}

        {showFooter && <DetailFooter product={product} />}
      </SafeAreaView>
    </View>
  );
}

export default ProductDetail;

const tabs = ["Details", "Related", "Seller", "Review"];
