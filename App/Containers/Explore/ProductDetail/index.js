import React, { useState, useContext } from "react";
import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { vs } from "react-native-size-matters";
import { ScrollIntoView, wrapScrollView } from "react-native-scroll-into-view";
import { range } from "lodash";
import styles from "./styles";
import ProductVariants from "../Components/Variants";
import ProductCarousel from "./ProductCarousel";
import { AlertContext } from "../../Root/GlobalContext";
import RelatedProducts from "./RelatedProducts";
import StoreInfo from "./StoreInfo";
import DetailFooter from "./DetailFooter";
import ProductReview from "./ProductReview";
import ProductInfo from "./ProductInfo";
import { useRoute } from "@react-navigation/native";
import HeaderTabs from "./HeaderTabs";
import metrics from "../../../Themes/Metrics";
import { DeliveryOption } from "../../../../generated/graphql";
import ReturnPolicy from "./ReturnPolicy";

const Sections = range(0, 4);
// Wrap the original ScrollView
const CustomScrollView = wrapScrollView(ScrollView);

function ProductDetail(props) {
  const {
    params: { product },
  } = useRoute();
  console.log("params====================================");
  console.log(product);
  console.log("====================================");
  const [pickUp, setPickUp] = useState(
    !(
      product.deliveryOption === DeliveryOption.SellerLocationPickup ||
      product.deliveryOption === DeliveryOption.CollectionPointPickup
    )
  );
  const onSetPickUp = (newValue) => {
    setPickUp(newValue);
  };
  const [currentVariant, setCurrentVariant] = useState(
    product?.listingVariants?.length > 0
      ? product?.listingVariants?.find(
          (item) => item.defaultVariant === true
        ) ?? null
      : null
  );
  //control whether to show the hearder (display and navigation to sections)
  const [showHeaderTabs, setShowHeaderTabs] = useState(false);
  //control whether to show the footer (display price and buy button)
  const [showFooter, setShowFooter] = useState(false);
  //hold the section index
  const [tabIndex, setTabIndex] = useState(0);
  //hold the boolean to indicate if this product has been purchased by this user
  const [isPurchased, setIsPurchased] = useState(false);

  //reference for sheets
  const sectionsRefs = Sections.map((_section) => React.createRef());

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
  let threshold = metrics.screenHeight / 4;
  const handleScroll = (event) => {
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
    console.log("handleScrollEnd");
    setShowFooter(true);
  };

  return (
    <View style={styles.container}>
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
          <ScrollIntoView align={"top"} key={"section0"} ref={sectionsRefs[0]}>
            <ProductCarousel product={product} />
            <ProductInfo
              product={product}
              setTabIndex={setTabIndex}
              scrollSectionIntoView={scrollSectionIntoView}
              pickUp={pickUp}
              onSetPickUp={onSetPickUp}
            />
            <ReturnPolicy returnPolices={product.returnPolicies} />
            {product.listingVariants && (
              <ProductVariants
                variants={product.listingVariants}
                product={product}
                onChange={(variant) => {
                  setCurrentVariant(variant);
                }}
              />
            )}
            {/* need to add ProductVariants components */}
          </ScrollIntoView>
          {/* <ScrollIntoView key={"section1"} ref={sectionsRefs[1]}>
            <RelatedProducts productId={product.productId} />
          </ScrollIntoView> */}
          <ScrollIntoView key={"section2"} ref={sectionsRefs[2]}>
            <StoreInfo tabIndex={tabIndex} product={product} />
          </ScrollIntoView>
          <ScrollIntoView key={"section3"} ref={sectionsRefs[3]}>
            <ProductReview
              product={product}
              tabIndex={tabIndex}
              isPurchased={isPurchased}
            />
          </ScrollIntoView>
        </CustomScrollView>

        {showHeaderTabs && (
          <HeaderTabs
            tabIndex={tabIndex}
            setTabIndex={setTabIndex}
            scrollSectionIntoView={scrollSectionIntoView}
          />
        )}

        {showFooter && (
          <DetailFooter
            product={product}
            currentVariant={currentVariant}
            pickUp={pickUp}
          />
        )}
      </SafeAreaView>
    </View>
  );
}

export default ProductDetail;
