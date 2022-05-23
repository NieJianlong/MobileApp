import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { vs } from "react-native-size-matters";
import { ScrollIntoView, wrapScrollView } from "react-native-scroll-into-view";
import { range } from "lodash";
import styles from "./styles";
import ProductVariants from "../Components/Variants";
import ProductCarousel from "./ProductCarousel";
import StoreInfo from "./StoreInfo";
import DetailFooter from "./DetailFooter";
import ProductReview from "./ProductReview";
import ProductInfo from "./ProductInfo";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import HeaderTabs from "./HeaderTabs";
import metrics from "../../../Themes/Metrics";
import {
  DeliveryOption,
  FilterType,
  useGetListingsQuery,
  useGetProductByProductIdQuery,
} from "../../../../generated/graphql";
import ReturnPolicy from "./ReturnPolicy";
import useLoading from "../../../hooks/useLoading";

const Sections = range(0, 4);
// Wrap the original ScrollView
const CustomScrollView = wrapScrollView(ScrollView);

function ProductDetail(props) {
  const {
    params: { product: oldProduct },
  } = useRoute();
  const { setLoading } = useLoading();
  // const { data, loading } = useGetProductByProductIdQuery({
  //   variables: { productId: oldProduct.productId },
  //   onCompleted: () => {
  //     setLoading({ show: false });
  //   },
  //   onError: () => {
  //     setLoading({ show: false });
  //   },
  //   context: {
  //     headers: {
  //       isPrivate: true,
  //     },
  //   },
  // });
  const {
    data: products,
    refetch,
    loading,
  } = useGetListingsQuery({
    nextFetchPolicy: "standby",
    fetchPolicy: "network-only",
    variables: {
      searchOptions: {
        filter: FilterType.ByListingId,
        filterParams: {
          listingId: oldProduct.listingId,
          productId: oldProduct.productId,
        },
      },
    },
    context: {
      headers: {
        isPrivate: global.access_token ? true : false,
      },
    },
  });
  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [refetch])
  );
  useEffect(() => {
    setLoading({ show: loading });
  }, [loading]);
  const [pickUp, setPickUp] = useState(
    !(
      oldProduct.deliveryOption === DeliveryOption.SellerLocationPickup ||
      oldProduct.deliveryOption === DeliveryOption.CollectionPointPickup
    )
  );
  const onSetPickUp = (newValue) => {
    setPickUp(newValue);
  };
  const [currentVariant, setCurrentVariant] = useState(
    oldProduct?.listingVariants?.length > 0
      ? oldProduct?.listingVariants?.find(
          (item) => item.defaultVariant === true
        ) ?? null
      : null
  );
  useEffect(() => {
    let variant =
      oldProduct?.listingVariants?.length > 0
        ? oldProduct?.listingVariants?.find(
            (item) =>
              item.defaultVariant === true &&
              item?.itemsSold !== item?.itemsAvailable &&
              item?.itemsAvailable - item?.itemsSold >=
                oldProduct.minSoldQuantity
          ) ?? null
        : null;
    if (variant) {
      setCurrentVariant(variant);
    } else {
      variant = oldProduct?.listingVariants.find(
        (item) =>
          item?.itemsAvailable - item?.itemsSold >= oldProduct.minSoldQuantity
      );
      if (variant) {
        setCurrentVariant(variant);
      } else {
        setCurrentVariant(oldProduct?.listingVariants[0]);
      }
    }
  }, [oldProduct?.listingVariants]);

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

  return products ? (
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
            <ProductCarousel product={products?.getListings.content[0]} />
            <ProductInfo
              product={products?.getListings.content[0]}
              setTabIndex={setTabIndex}
              scrollSectionIntoView={scrollSectionIntoView}
              pickUp={pickUp}
              onSetPickUp={onSetPickUp}
            />
            <ReturnPolicy
              returnPolices={products?.getListings.content[0].returnPolicies}
            />
            {products?.getListings.content[0].listingVariants && (
              <ProductVariants
                variants={products?.getListings.content[0].listingVariants}
                product={products?.getListings.content[0]}
                currentVariant={currentVariant}
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
            <StoreInfo
              tabIndex={tabIndex}
              product={products?.getListings.content[0]}
            />
          </ScrollIntoView>
          <ScrollIntoView key={"section3"} ref={sectionsRefs[3]}>
            <ProductReview
              product={products?.getListings.content[0]}
              tabIndex={tabIndex}
              isPurchased={isPurchased}
              refetch={refetch}
            />
          </ScrollIntoView>
        </CustomScrollView>

        {/* {showHeaderTabs && (
              <HeaderTabs
                tabIndex={tabIndex}
                setTabIndex={setTabIndex}
                scrollSectionIntoView={scrollSectionIntoView}
              />
            )} */}

        <DetailFooter
          product={products?.getListings.content[0]}
          currentVariant={currentVariant}
          pickUp={pickUp}
        />
      </SafeAreaView>
    </View>
  ) : (
    <View />
  );
}

export default ProductDetail;
