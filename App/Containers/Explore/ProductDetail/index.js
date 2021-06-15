import React, { Component, useState, useRef, useEffect } from "react";
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
import Collapsible from "react-native-collapsible";
import Carousel from "react-native-snap-carousel";
//help identify which component is in display
import InView from "react-native-component-inview";
import { ScrollIntoView, wrapScrollView } from "react-native-scroll-into-view";
import NumberFormat from "react-number-format";
import moment from "moment";
import { range } from "lodash";

import {
  Switch,
  StarRating,
  Picker,
  QuantitySelector,
  DescriptionText,
  Button,
  Progress,
  BottomSheet,
  BottomSheetBackground,
  Alert,
} from "../../../Components";

import { Images, Colors } from "../../../Themes";
import AppConfig from "../../../Config/AppConfig";
import styles from "./styles";
import NavigationService from "../../../Navigation/NavigationService";

import ProductItem from "../Components/ProductItem";
import Review from "../Components/Review";
import ColorOptionItem from "../Components/ColorOptionItem";
import ShareOptionList from "../Components/ShareOptionList";

const { height } = Dimensions.get("window");
const Sections = range(0, 4);
const sliderWidth = Dimensions.get("window").width;
const carouselItemWidth = Dimensions.get("window").width;
// Wrap the original ScrollView
const CustomScrollView = wrapScrollView(ScrollView);

function ProductDetail(props) {
  const fall = useRef(new Animated.Value(0)).current;

  //control whether to show the hearder (display and navigation to sections)
  const [showHeaderTabs, setShowHeaderTabs] = useState(false);
  //control whether to show the footer (display price and buy button)
  const [showFooter, setShowFooter] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  //hold the section index
  const [tabIndex, setTabIndex] = useState(0);
  //hold the index of the current product's photo
  const [photoIndex, setPhotoIndex] = useState(0);
  //hold the quantity of product
  const [quantity, setQuantity] = useState(1);
  //hold the price user should pay
  const [totalPrice, setTotalPrice] = useState(0);
  //hold the index of selected color
  const [colorIndex, setColorIndex] = useState(0);
  //hold the boolean to indicate if this product has been purchased by this user
  const [isPurchased, setIsPurchased] = useState(false);
  //hold the boolean to indicate if this product has been liked by this user
  const [isLiked, setIsLiked] = useState(false);
  //control whether to show the pickup from seller sheet
  const [showPickupFromSellerSheet, setShowPickupFromSellerSheet] = useState(
    false
  );
  //control whether to show the color sheet
  const [showColorSheet, setShowColorSheet] = useState(false);
  //control whether to show the add to cart sheet
  const [showAddToCartSheet, setShowAddToCartSheet] = useState(false);
  const [showConfirmOrderSheet, setShowConfirmOrderSheet] = useState(false);
  const [showShareSheet, setShowShareSheet] = useState(false);

  const [showReviewSentAlert, setShowReviewSentAlert] = useState(false);
  const [showReportSentAlert, setShowReportSentAlert] = useState(false);

  //reference for sheets
  const sectionsRefs = Sections.map((_section) => React.createRef());
  const pickupFromSellerSheet = useRef();
  const colorSheet = useRef();
  const shareSheet = useRef();
  const confirmOrderSheet = useRef();
  const addToCartSheet = useRef();
  const _carousel = useRef();
  /**
   *
   * UPDATES for backend
   * temp solution todo improve
   */
  const [product, setProductFromProps] = useState({});
  const [isReady, setIsReady] = useState(false);

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

  const onLikeProduct = () => {
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    setProductFromProps(props.route.params.product);
    setIsReady(true);
  }, [props]);

  useEffect(() => {
    if (showPickupFromSellerSheet) {
      if (isReady) {
        pickupFromSellerSheet.current.snapTo(0);
      }
    } else {
      if (isReady) {
        pickupFromSellerSheet.current.snapTo(1);
      }
    }
  }, [showPickupFromSellerSheet, isReady]);

  useEffect(() => {
    if (isReady) {
      if (showColorSheet) {
        colorSheet.current.snapTo(0);
      } else {
        colorSheet.current.snapTo(1);
      }
    }
  }, [showColorSheet, isReady]);

  useEffect(() => {
    if (isReady) {
      if (showShareSheet) {
        shareSheet.current.snapTo(0);
      } else {
        shareSheet.current.snapTo(1);
      }
    }
  }, [showShareSheet, isReady]);

  useEffect(() => {
    if (isReady) {
      if (showConfirmOrderSheet) {
        confirmOrderSheet.current.snapTo(0);
      } else {
        confirmOrderSheet.current.snapTo(1);
      }
    }
  }, [showConfirmOrderSheet, isReady]);

  useEffect(() => {
    if (isReady) {
      if (showAddToCartSheet) {
        addToCartSheet.current.snapTo(0);
      } else {
        addToCartSheet.current.snapTo(1);
      }
    }
  }, [showAddToCartSheet, isReady]);

  useEffect(() => {
    if (isReady) {
      if (showReportSentAlert) {
        setTimeout(() => setShowReportSentAlert(false), 2000);
      }
    }
  }, [showReportSentAlert, isReady]);

  const togglePickupFromSellerSheet = () =>
    setShowPickupFromSellerSheet(!showPickupFromSellerSheet);
  const toggleColorSheet = () => setShowColorSheet(!showColorSheet);
  const toggleShareSheet = () => setShowShareSheet(!showShareSheet);
  const toggleConfirmOrderSheet = () =>
    setShowConfirmOrderSheet(!showConfirmOrderSheet);
  const toggleAddToCartSheet = () => setShowAddToCartSheet(!showAddToCartSheet);
  const toggleReviewSentAlert = () =>
    setShowReviewSentAlert(!showReviewSentAlert);
  const toggleReportSentAlert = () =>
    setShowReportSentAlert(!showReportSentAlert);

  const renderReviewSentAlert = () => {
    return (
      <Alert
        visible={showReviewSentAlert}
        title={"Thanks for your review!"}
        message={"Your review has been added successfully"}
        color={Colors.success}
        onDismiss={() => setShowReviewSentAlert(false)}
      />
    );
  };

  const renderReportSentAlert = () => {
    return (
      <Alert
        visible={showReportSentAlert}
        title={"Thanks for your report!"}
        message={"Your report has been sent successfully"}
        color={Colors.success}
        onDismiss={() => setShowReportSentAlert(false)}
      />
    );
  };

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

  const renderFooter = () => {
    return (
      <SafeAreaView style={styles.footerSafeArea} edges={["bottom"]}>
        <QuantitySelector
          minimumValue={1}
          maximumValue={100}
          value={quantity}
          onChange={(value) => setQuantity(value)}
        />

        <View style={{ height: vs(15) }} />

        <View style={styles.rowSpaceBetween}>
          <TouchableOpacity style={styles.row} onPress={toggleAddToCartSheet}>
            <Image source={Images.cartMed} style={styles.icCart} />
            <Text style={[styles.txtBold, { color: Colors.primary }]}>
              ADD TO CART
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={toggleConfirmOrderSheet}
            style={styles.btnBuyNow}
          >
            <Text style={[styles.txtBold, { color: Colors.white }]}>
              BUY NOW
            </Text>

            <View style={styles.priceContainer}>
              <NumberFormat
                thousandSeparator={true}
                prefix={"$"}
                value={quantity * product.wholesalePrice}
                displayType={"text"}
                renderText={(text) => (
                  <Text style={[styles.txtRegular, { color: Colors.white }]}>
                    {text}
                  </Text>
                )}
              />
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };

  //render product image item
  const _renderImageItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        key={index.toString()}
        onPress={() =>
          NavigationService.navigate("ProductGalleryScreen", {
            fullscreenMode: true,
          })
        }
      >
        <Image
          resizeMode={"contain"}
          source={{ uri: product.photo }}
          style={styles.prodImage}
        />
      </TouchableOpacity>
    );
  };

  //control when swipe to another image
  const onSnapToItem = (index) => {
    setPhotoIndex(index);
  };

  //render product images
  const renderProductImages = () => {
    return (
      <View style={styles.imagesContainer}>
        <Carousel
          ref={_carousel}
          data={product.photoUrls}
          renderItem={_renderImageItem}
          sliderWidth={sliderWidth}
          itemWidth={carouselItemWidth}
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
            onPress={() => NavigationService.navigate("CartScreen")}
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
  };

  //render product info section
  const renderProductInfo = () => {
    return (
      <InView
        onChange={(isVisible) => {
          if (isVisible) {
            setTabIndex(0);
          }
        }}
      >
        <View style={styles.infoContainer}>
          <View style={styles.v2}>
            <View>
              <Text style={styles.heading2Bold}>{product.name}</Text>
              <TouchableOpacity onPress={() => scrollSectionIntoView(3)}>
                <StarRating
                  fullMode
                  rating={product.rating}
                  ratingCount={product.ratingCount}
                />
              </TouchableOpacity>
            </View>
            <View style={[styles.row, { marginTop: vs(8) }]}>
              <View style={styles.v3}>
                <Text style={[styles.heading6Bold, { color: Colors.grey60 }]}>
                  RETAIL PRICE
                </Text>
                {/* <Text style={styles.txtRetailPrice}>${product.retailPrice}</Text> */}
                <NumberFormat
                  thousandSeparator={true}
                  prefix={"$"}
                  value={product.retailPrice}
                  displayType={"text"}
                  renderText={(text) => (
                    <Text style={styles.txtRetailPrice}>{text}</Text>
                  )}
                />
              </View>

              <View style={styles.v3}>
                <Text style={[styles.heading6Bold, { color: Colors.black }]}>
                  WHOLE SALE PRICE
                </Text>
                {/* <Text style={styles.txtWholesalePrice}>${product.wholesalePrice}</Text> */}
                <NumberFormat
                  thousandSeparator={true}
                  prefix={"$"}
                  value={product.wholesalePrice}
                  displayType={"text"}
                  renderText={(text) => (
                    <Text style={styles.txtWholesalePrice}>{text}</Text>
                  )}
                />
              </View>

              <View style={styles.percentOffContainer}>
                <Text
                  style={[styles.heading6Bold, { color: Colors.secondary00 }]}
                >
                  30% OFF
                </Text>
              </View>

              {/* <Text style={[styles.heading5Regular, { marginLeft: s(8) }]}>
                                Save ${product.retailPrice - product.wholesalePrice}
                            </Text> */}
            </View>

            <View style={[styles.row, { marginVertical: vs(10) }]}>
              <Text style={styles.heading5Regular}>
                Delivery fee:{" "}
                <Text style={{ color: Colors.primary }}>$14.90</Text>
              </Text>

              <View style={[styles.row, { marginLeft: s(10) }]}>
                <Text style={[styles.heading5Regular, { marginRight: s(5) }]}>
                  Pick up from seller
                </Text>
                <Switch
                  onSwitch={(t) => {
                    if (t) {
                      togglePickupFromSellerSheet();
                    }
                  }}
                />
              </View>
            </View>
          </View>

          <View style={styles.v4}>
            <View style={{ marginRight: s(10) }}>
              <Text style={styles.heading6Regular}>Order closes on:</Text>
              <Text style={styles.txtRegular}>{product.orderClose}</Text>
            </View>

            <View style={styles.row}>
              <Progress
                currentValue={24}
                maximumValue={100}
                style={{ marginHorizontal: s(10) }}
              />

              <Image source={Images.stock} style={styles.icStock} />
              <Text style={styles.txtOrderNumber}>
                {product.orderCount}/{product.inStock}
              </Text>
              <TouchableOpacity
                onPress={() => NavigationService.navigate("ProductInfoScreen")}
              >
                <Image source={Images.info2} style={styles.icInfo} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={[styles.v2, { paddingTop: vs(15) }]}>
            <Text style={styles.heading3Bold}>Product Description</Text>
            <DescriptionText
              style={styles.descriptionContainer}
              text={
                "This is the product description vero eos et accusamus et iusto odio dignissimos ducimus" +
                "qui blad. This is the product description vero eos et accusamus et iusto odio dignissimos ducimus" +
                "qui blad"
              }
            />
          </View>

          <View style={[styles.v2, { paddingTop: vs(15) }]}>
            <Text style={styles.heading3Bold}>Details & Highlights</Text>
            <View style={styles.row}>
              <Text style={styles.txtDot}>•</Text>
              <Text style={styles.txtRegular}>
                Vero eos et accusamus et iusto odio dignissimos
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.txtDot}>•</Text>
              <Text style={styles.txtRegular}>
                Vero eos et accusamus et iusto odio dignissimos
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.txtDot}>•</Text>
              <Text style={styles.txtRegular}>
                Vero eos et accusamus et iusto odio dignissimos
              </Text>
            </View>
          </View>
        </View>
      </InView>
    );
  };

  const renderChatOptions = () => {
    return (
      <View style={styles.chatContainer}>
        <View style={styles.chatIconsContainer}>
          <TouchableOpacity
            style={[styles.chatButton, { backgroundColor: Colors.facebook }]}
          >
            <Image source={Images.facebook} style={styles.chatIcon} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.chatButton, { backgroundColor: Colors.whatsapp }]}
          >
            <Image source={Images.whatsapp} style={styles.chatIcon} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.chatButton, { backgroundColor: Colors.google }]}
          >
            <Image source={Images.google} style={styles.chatIcon} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.chatButton, { backgroundColor: Colors.twitter }]}
          >
            <Image source={Images.twitter} style={styles.chatIcon} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.chatButton, { backgroundColor: Colors.grey10 }]}
          >
            <Image source={Images.add1} style={styles.icAdd} />
          </TouchableOpacity>
        </View>

        <Text
          style={[styles.txtBold, { marginTop: vs(20), marginBottom: vs(15) }]}
        >
          You can chat here with seller and co-buyers:
        </Text>

        <View style={{ width: "100%" }}>
          <Button backgroundColor={Colors.grey80} text={"CHAT"} />
        </View>
      </View>
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

        {isPurchased && renderChatOptions()}

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

  const renderRelatedProducts = () => {
    return (
      <InView
        onChange={(isVisible) => {
          if (isVisible) {
            //setTabIndex(1)
          }
        }}
      >
        <View style={styles.relatedProductsContainer}>
          <View style={styles.relatedProductsHeader}>
            <Text style={styles.heading3Bold}>Related products</Text>

            <TouchableOpacity>
              <Text
                style={[styles.heading5Bold, { color: Colors.secondary00 }]}
              >
                See all
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            contentContainerStyle={styles.relatedProductsList}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={relatedProducs}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <ProductItem product={item} size={"S"} />
            )}
            ItemSeparatorComponent={() => <View style={{ width: s(15) }} />}
          />
        </View>
      </InView>
    );
  };

  const renderStoreInfo = () => {
    return (
      <InView
        onChange={(isVisible) => {
          if (isVisible && tabIndex === 1) {
            //setTabIndex(2)
          }
        }}
      >
        <View style={styles.storeInfoContainer}>
          <View style={styles.rowSpaceBetween}>
            <View style={styles.row}>
              <View style={styles.sellerAvatarContainer}>
                <Image
                  source={{ uri: product.seller.avatar }}
                  style={styles.sellerAvatar}
                />
              </View>
              <Text style={styles.heading5Bold}>{product.seller.name}</Text>
            </View>

            <TouchableOpacity
              onPress={() => NavigationService.navigate("SellerStoreScreen")}
            >
              <Text
                style={[styles.heading5Bold, { color: Colors.secondary00 }]}
              >
                VISIT STORE
              </Text>
            </TouchableOpacity>
          </View>

          <StarRating
            fullMode
            style={{ marginTop: vs(10) }}
            rating={product.seller.rating}
            ratingCount={product.seller.ratingCount}
          />

          <DescriptionText
            style={{ marginTop: vs(10) }}
            text={product.seller.description}
          />
        </View>
      </InView>
    );
  };
  //render users' reviews for the product
  const renderUserReview = () => {
    return (
      <TouchableOpacity
        onPress={() =>
          //add new review: navigate to the rate order screen
          NavigationService.navigate("RateOrderScreen", {
            onPost: toggleReviewSentAlert,
          })
        }
        style={styles.userReviewContainer}
      >
        <Text style={styles.heading4Bold}>Rate and review this product</Text>
        <Text style={styles.txtRegular}>Share your experience</Text>

        <View style={{ height: vs(20) }} />

        <StarRating ratingMode />
      </TouchableOpacity>
    );
  };

  const renderProductReview = () => {
    return (
      <View style={styles.productReviewContainer}>
        <InView
          onChange={(isVisible) => {
            if (isVisible && tabIndex === 2) {
              //setTabIndex(3)
            }
          }}
        >
          <Text style={styles.heading3Bold}>Product Reviews</Text>

          <Review
            rating={product.rating}
            ratingCount={product.ratingCount}
            ratingDetail={product.ratingDetail}
          />
        </InView>

        <View style={{ height: vs(15) }} />

        {isPurchased && renderUserReview()}

        <View style={{ height: vs(15) }} />

        {comments.map((comment, index) => (
          <View key={index.toString()} style={styles.commentContainer}>
            <View style={[styles.row, { marginBottom: vs(5) }]}>
              <View style={styles.sellerAvatarContainer}>
                <Image
                  source={{ uri: comment.user.avatar }}
                  style={styles.sellerAvatar}
                />
              </View>
              <Text style={styles.heading5Bold}>{comment.user.name}</Text>
            </View>
            <View style={styles.row}>
              <StarRating rating={comment.comment.rating} />
              <Text style={styles.heading6Regular}>
                {moment(comment.comment.createdDate).fromNow()}
              </Text>
            </View>

            <Text style={[styles.heading5Bold, { marginTop: vs(5) }]}>
              {comment.comment.title}
            </Text>

            <DescriptionText
              previewLength={150}
              text={
                "At vero eoset accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium" +
                "voluptatum deleniti atque corrupti quos dolores et quas mol" +
                "At vero eoset accusamus et iusto" +
                "odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas mol"
              }
            />

            {comment.comment.photos.length > 0 && (
              <View style={{ marginTop: vs(10) }}>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={comment.comment.photos}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item, index }) => (
                    <ImageBackground
                      key={index.toString()}
                      borderRadius={5}
                      source={{ uri: item }}
                      style={styles.commentPhoto}
                    />
                  )}
                />
              </View>
            )}

            <View style={[styles.row, { marginTop: vs(15) }]}>
              <TouchableOpacity style={styles.btnGrey}>
                <Text style={[styles.heading5Bold, { color: Colors.white }]}>
                  HELPFUL ({comment.comment.like})
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  NavigationService.navigate("ReportScreen", {
                    onSubmit: toggleReportSentAlert,
                  })
                }
                style={{ marginLeft: s(20) }}
              >
                <Text style={[styles.heading5Bold, { color: Colors.grey60 }]}>
                  REPORT
                </Text>
              </TouchableOpacity>
            </View>

            {comment.comment.reply.length > 0 && (
              <View style={{ marginLeft: s(15), marginTop: vs(20) }}>
                {comment.comment.reply.map((item, index) => (
                  <View key={index.toString()}>
                    <View style={[styles.row, { marginBottom: vs(5) }]}>
                      <View style={styles.sellerAvatarContainer}>
                        <Image
                          source={{ uri: item.user.avatar }}
                          style={styles.sellerAvatar}
                        />
                      </View>
                      <Text style={styles.heading5Bold}>{item.user.name}</Text>
                    </View>

                    <DescriptionText
                      previewLength={150}
                      text={
                        "At vero eoset accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium" +
                        "voluptatum deleniti atque corrupti quos dolores et quas mol" +
                        "At vero eoset accusamus et iusto" +
                        "odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas mol"
                      }
                    />

                    <View style={[styles.row, { marginTop: vs(15) }]}>
                      <TouchableOpacity style={styles.btnGrey}>
                        <Text
                          style={[styles.heading5Bold, { color: Colors.white }]}
                        >
                          HELPFUL ({comment.comment.like})
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={{ marginLeft: s(20) }}>
                        <Text
                          style={[
                            styles.heading5Bold,
                            { color: Colors.grey60 },
                          ]}
                        >
                          REPORT
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        ))}
      </View>
    );
  };

  const renderSectionDetails = () => {
    return (
      <ScrollIntoView align={"top"} key={"section0"} ref={sectionsRefs[0]}>
        {renderProductImages()}

        {renderProductInfo()}

        {renderOptions()}
      </ScrollIntoView>
    );
  };

  const renderSectionRelated = () => {
    return (
      <ScrollIntoView key={"section1"} ref={sectionsRefs[1]}>
        {renderRelatedProducts()}
      </ScrollIntoView>
    );
  };

  const renderSectionSeller = () => {
    return (
      <ScrollIntoView key={"section2"} ref={sectionsRefs[2]}>
        {renderStoreInfo()}
      </ScrollIntoView>
    );
  };

  const renderSectionReview = () => {
    return (
      <ScrollIntoView key={"section3"} ref={sectionsRefs[3]}>
        {renderProductReview()}
      </ScrollIntoView>
    );
  };

  const renderPickupFromSellerSheet = () => {
    return (
      <BottomSheet
        customRef={pickupFromSellerSheet}
        onCloseEnd={() => setShowPickupFromSellerSheet(false)}
        callbackNode={fall}
        snapPoints={[vs(290), 0]}
        initialSnap={showPickupFromSellerSheet ? 0 : 1}
        title={"Pick up from seller"}
      >
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <Text style={[styles.txtRegular, { textAlign: "center" }]}>
            This is the seller's address where you have to{"\n"}go to pick up
            your order
          </Text>

          <View style={styles.pickupLocationContainer}>
            <Image
              style={styles.pickupLocationIcon}
              source={Images.locationMed}
            />

            <View style={{ marginLeft: s(10) }}>
              <Text style={styles.heading5Bold}>Seller Address 00</Text>
              <Text style={styles.txtRegular}>Tamil Nadu 12345, Area 4</Text>
            </View>
          </View>

          <Button onPress={togglePickupFromSellerSheet} text={"OK"} />
        </View>
      </BottomSheet>
    );
  };

  const renderColorSheet = () => {
    return (
      <BottomSheet
        customRef={colorSheet}
        onCloseEnd={() => {
          setShowColorSheet(false);
        }}
        callbackNode={fall}
        snapPoints={[vs(390), 0]}
        initialSnap={showColorSheet ? 0 : 1}
        title={"Color"}
      >
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          {product.colors.map((item, index) => (
            <ColorOptionItem
              key={index.toString()}
              defaultValue={colorIndex === index}
              onSwitch={() => setColorIndex(index)}
              label={item.name}
              style={{ marginBottom: vs(16) }}
              available={item.available}
            />
          ))}
        </View>
      </BottomSheet>
    );
  };

  const renderShareSheet = () => {
    return (
      <BottomSheet
        customRef={shareSheet}
        onCloseEnd={() => setShowShareSheet(false)}
        callbackNode={fall}
        snapPoints={[vs(580), 0]}
        initialSnap={showShareSheet ? 0 : 1}
        title={"Share to"}
      >
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <ShareOptionList />
        </View>
      </BottomSheet>
    );
  };

  const renderConfirmOrderSheet = () => {
    return (
      <BottomSheet
        customRef={confirmOrderSheet}
        onCloseEnd={() => setShowConfirmOrderSheet(false)}
        callbackNode={fall}
        snapPoints={[vs(310), 0]}
        initialSnap={showConfirmOrderSheet ? 0 : 1}
        title={"Confirm your Order"}
      >
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <View
            style={[
              styles.pickupLocationContainer,
              { marginTop: 0, marginBottom: 10 },
            ]}
          >
            <Image
              style={styles.pickupLocationIcon}
              source={Images.locationMed}
            />

            <View style={{ marginLeft: s(10) }}>
              <Text style={styles.heading5Bold}>Seller Address 00</Text>
              <Text style={styles.txtRegular}>Tamil Nadu 12345, Area 4</Text>
            </View>
          </View>

          <View
            style={[
              styles.pickupLocationContainer,
              { marginTop: 0, marginBottom: 20 },
            ]}
          >
            <Image style={styles.mastercardIcon} source={Images.mastercard} />

            <View style={{ marginLeft: s(10) }}>
              <Text style={styles.heading5Bold}>***********6473</Text>
              <Text style={styles.txtRegular}>User name</Text>
            </View>
          </View>

          <Button
            onPress={() => NavigationService.navigate("OrderPlacedScreen")}
            text={"CONFIRM ORDER"}
          />
        </View>
      </BottomSheet>
    );
  };

  const renderAddToCartSheet = () => {
    return (
      <BottomSheet
        customRef={addToCartSheet}
        onCloseEnd={() => setShowAddToCartSheet(false)}
        callbackNode={fall}
        snapPoints={[vs(290), 0]}
        initialSnap={showAddToCartSheet ? 0 : 1}
        title={"An item has been added to your cart"}
      >
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <Text
            style={[
              styles.txtRegular,
              { textAlign: "center", marginBottom: vs(25) },
            ]}
          >
            There are now 2 items in your cart
          </Text>

          <Button onPress={toggleAddToCartSheet} text={"GO TO CHECKOUT"} />

          <View style={styles.btnRow}>
            <View style={styles.v5}>
              <Button
                onPress={toggleAddToCartSheet}
                text={"CONTINUE"}
                backgroundColor={Colors.grey80}
              />
            </View>

            <View style={styles.v5}>
              <Button
                text={"VIEW CART"}
                backgroundColor={Colors.grey80}
                onPress={() => NavigationService.navigate("ShoppingCartScreen")}
              />
            </View>
          </View>
        </View>
      </BottomSheet>
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

          {isReady && renderSectionRelated()}

          {isReady && renderSectionSeller()}

          {isReady && renderSectionReview()}
        </CustomScrollView>

        {showHeaderTabs && renderHeaderTabs()}

        {showFooter && renderFooter()}
      </SafeAreaView>

      {/* background for bottom sheet */}
      <BottomSheetBackground
        visible={
          showPickupFromSellerSheet ||
          showColorSheet ||
          showAddToCartSheet ||
          showConfirmOrderSheet ||
          showShareSheet
        }
        controller={fall}
      />

      {/* action sheets */}
      {isReady && renderPickupFromSellerSheet()}

      {isReady && renderColorSheet()}

      {isReady && renderShareSheet()}

      {isReady && renderConfirmOrderSheet()}

      {isReady && renderAddToCartSheet()}

      {isReady && renderReviewSentAlert()}

      {isReady && renderReportSentAlert()}
    </View>
  );
}

export default ProductDetail;

const product = {
  name: "iPhone 11",
  picture:
    "https://www.transparentpng.com/thumb/apple-iphone/fORwQR-smartphone-apple-iphone-x-transparent-background.png",
  photoUrls: [
    "https://www.transparentpng.com/thumb/apple-iphone/fORwQR-smartphone-apple-iphone-x-transparent-background.png",
    "https://www.transparentpng.com/thumb/apple-iphone/fORwQR-smartphone-apple-iphone-x-transparent-background.png",
    "https://www.transparentpng.com/thumb/apple-iphone/fORwQR-smartphone-apple-iphone-x-transparent-background.png",
    "https://www.transparentpng.com/thumb/apple-iphone/fORwQR-smartphone-apple-iphone-x-transparent-background.png",
  ],
  rating: 3.5,
  ratingCount: 624,
  ratingDetail: {
    oneStar: 41,
    twoStar: 150,
    threeStar: 50,
    fourStar: 74,
    fiveStar: 309,
  },
  retailPrice: 2345,
  wholesalePrice: 1542,
  orderClose: "22/12/2020",
  inStock: 100,
  orderCount: 24,
  seller: {
    avatar:
      "https://pbs.twimg.com/profile_images/631366930960551936/MswTZv39_400x400.png",
    name: "thegioididong",
    description:
      "Thegioididong.com là thương hiệu thuộc Công ty Cổ phần Thế giới di động, Tên tiếng Anh là Mobile World JSC, (mã Chứng Khoán: MWG) là một tập đoàn bán lẻ tại Việt Nam với lĩnh vực kinh doanh chính là bán lẻ điện thoại di động, thiết bị số và điện tử tiêu dùng[2]. Theo nghiên cứu của EMPEA, thống kê thị phần bán lẻ điện thoại di động tại Việt Nam năm 2014 thì Thế giới di động hiện chiếm 25% và là doanh nghiệp lớn nhất trong lĩnh vực của mình.",
    rating: 4.2,
    ratingCount: 1024,
  },
  colors: [
    { name: "Onyx Black", available: true },
    { name: "Glaciar Green", available: true },
    { name: "Interstella Glow", available: true },
    { name: "Blue", available: false },
  ],
};

const relatedProducs = [
  {
    name: "iPhone 11",
    picture:
      "https://www.transparentpng.com/thumb/apple-iphone/fORwQR-smartphone-apple-iphone-x-transparent-background.png",
    rating: 3.5,
    ratingCount: 124,
    retailPrice: 2345,
    wholesalePrice: 1542,
    orderClose: "22/12/2020",
    inStock: 100,
    orderCount: 24,
  },
  {
    name: "iPhone 11",
    picture:
      "https://www.transparentpng.com/thumb/apple-iphone/fORwQR-smartphone-apple-iphone-x-transparent-background.png",
    rating: 3.0,
    ratingCount: 124,
    retailPrice: 2345,
    wholesalePrice: 1542,
    orderClose: "22/12/2020",
    inStock: 100,
    orderCount: 24,
  },
  {
    name: "iPhone 11",
    picture:
      "https://www.transparentpng.com/thumb/apple-iphone/fORwQR-smartphone-apple-iphone-x-transparent-background.png",
    rating: 3.0,
    ratingCount: 124,
    retailPrice: 2345,
    wholesalePrice: 1542,
    orderClose: "22/12/2020",
    inStock: 100,
    orderCount: 24,
  },
];

const comments = [
  {
    user: {
      name: "Asley",
      avatar:
        "https://pbs.twimg.com/profile_images/631366930960551936/MswTZv39_400x400.png",
    },
    comment: {
      title: "Absolutely love it!",
      content:
        "At vero eoset accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas mol.",
      createdDate: "2019-09-12",
      rating: 4.5,
      photos: [],
      like: 123,
      reply: [],
    },
  },
  {
    user: {
      name: "Brian",
      avatar:
        "https://pbs.twimg.com/profile_images/631366930960551936/MswTZv39_400x400.png",
    },
    comment: {
      title: "Absolutely love it!",
      content:
        "At vero eoset accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas mol.",
      createdDate: "2020-12-12",
      rating: 4.5,
      like: 13,
      photos: [
        "https://www.europeanceo.com/wp-content/uploads/2019/09/Private-islands.jpg",
        "https://cdn.britannica.com/15/162615-131-0CBB2CBE/island-Caribbean.jpg",
        "https://thumbor.thedailymeal.com/ZZtexrWGOq6hJ7jOzleSrg9P_1Q=/870x565/https://www.theactivetimes.com/sites/default/files/2019/07/15/shutterstock_526092568.jpg",
        "https://a0.muscache.com/im/pictures/3d554f6c-6efa-422a-a5d6-6c442abe81a4.jpg?aki_policy=x_large",
      ],
      reply: [
        {
          user: {
            name: "Apple",
            avatar:
              "https://pbs.twimg.com/profile_images/631366930960551936/MswTZv39_400x400.png",
          },
          comment: {
            title: "",
            content:
              "At vero eoset accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas mol.",
            createdDate: "2020-18-1",
            like: 3,
          },
        },
      ],
    },
  },
];

const tabs = ["Details", "Related", "Seller", "Review"];
