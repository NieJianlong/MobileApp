import React, { Component, useState, useEffect, useRef } from "react";
import {
  View,
  StatusBar,
  Image,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
  Alert as RNAlert,
} from "react-native";
import { vs, s } from "react-native-size-matters";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated from "react-native-reanimated";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LinearGradient from "react-native-linear-gradient";
import Carousel from "react-native-snap-carousel";

import {
  Button,
  BottomSheet,
  LocationSearchBox,
  TextInput,
  Alert,
  RadiusButton,
  ProductSearchBox,
} from "../../Components";
import CheckBox from "../Explore/Components/CheckBox";
import ProductItem from "../Explore/Components/ProductItem";
import ShareOptionList from "../Explore/Components/ShareOptionList";

import { Colors, Images } from "../../Themes";
import styles from "./styles";
import NavigationService from "../../Navigation/NavigationService";

const sliderWidth = Dimensions.get("window").width;
const carouselItemWidth = Dimensions.get("window").width;

function Wishlist(props) {
  const fall = useRef(new Animated.Value(0)).current;

  const sortBySheet = useRef();
  const shareSheet = useRef();
  const categoriesFlatlist = useRef();
  const _carousel = useRef();

  const [showSortBySheet, setShowSortBySheet] = useState(false);
  const [showShareSheet, setShowShareSheet] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [showProductAsRows, setShowProductAsRows] = useState(true);
  const [sortOption, setSortOption] = useState(1);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    if (showSortBySheet) {
      sortBySheet.current.snapTo(0);
    } else {
      sortBySheet.current.snapTo(1);
    }
  }, [showSortBySheet]);

  useEffect(() => {
    if (showShareSheet) {
      shareSheet.current.snapTo(0);
    } else {
      shareSheet.current.snapTo(1);
    }
  }, [showShareSheet]);

  const toggleSortBySheet = () => {
    setShowSortBySheet(!showSortBySheet);
  };

  const toggleShareSheet = () => {
    setShowShareSheet(!showShareSheet);
  };

  const renderSortBySheet = () => {
    return (
      <BottomSheet
        customRef={sortBySheet}
        onCloseEnd={() => setShowSortBySheet(false)}
        callbackNode={fall}
        snapPoints={[vs(320), 0]}
        initialSnap={showSortBySheet ? 0 : 1}
        title={"Sort By"}
      >
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          {sortOptions.map((i, index) => {
            return (
              <View key={index.toString()}>
                <View style={{ height: vs(12) }} />
                <CheckBox
                  defaultValue={sortOption === index}
                  onSwitch={(t) => setSortOption(index)}
                  label={i}
                />
              </View>
            );
          })}
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
        snapPoints={[vs(250), 0]}
        initialSnap={showShareSheet ? 0 : 1}
        title={"Share to"}
      >
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <ShareOptionList />
        </View>
      </BottomSheet>
    );
  };

  const onSearch = (keyword) => {
    setKeyword(keyword);
  };

  const renderHeader = () => {
    if (keyword === "") {
      return (
        <View style={styles.header}>
          <View style={styles.icSearch} />

          <Image
            source={Images.logo3}
            style={styles.logo}
            resizeMode={"contain"}
          />

          <TouchableOpacity
            onPress={() => {
              NavigationService.navigate("ProductSearchScreen", {
                onSearch: onSearch,
              });
            }}
          >
            <Image source={Images.search} style={styles.icSearch} />
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={[styles.header, { paddingVertical: vs(10) }]}>
          <ProductSearchBox
            disabled={true}
            keyword={keyword}
            onPressDelete={() => {
              setKeyword("");
              NavigationService.navigate("ProductSearchScreen", {
                onSearch: onSearch,
              });
            }}
            onPressBack={() => setKeyword("")}
          />
        </View>
      );
    }
  };

  const scrollToIndex = (index) => {
    categoriesFlatlist.current.scrollToIndex({
      animated: true,
      index,
      viewOffset: (Dimensions.get("window").width / 7) * 3,
    });
  };

  const renderCategories = () => {
    if (keyword === "") {
      return (
        <View style={styles.categryContainer}>
          <FlatList
            ref={categoriesFlatlist}
            contentContainerStyle={styles.categoryListContainer}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categories}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
              const isFocused = selectedCategory === index;
              return (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedCategory(index);
                    this?._carousel?.snapToItem(index);
                    scrollToIndex(index);
                  }}
                  style={[
                    styles.categoryItemContainer,
                    !isFocused && { borderBottomColor: "transparent" },
                  ]}
                >
                  <Text
                    style={[
                      styles.heading5Bold,
                      { color: isFocused ? Colors.primary : Colors.grey60 },
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
          {/* <LinearGradient
                        colors={['#ffffff00', Colors.white]}
                        start={{ x: 0.0, y: 0.0 }} end={{ x: 1.0, y: 0.0 }}
                        style={styles.v1}
                    >
                        <TouchableOpacity
                            onPress={() => NavigationService.navigate('EditCategoriesScreen')}
                            style={styles.btnAddContainer}>
                            <Image source={Images.add1} style={styles.icAdd} />
                        </TouchableOpacity>
                    </LinearGradient> */}

          <TouchableOpacity
            onPress={() => NavigationService.navigate("EditCategoriesScreen")}
            style={styles.btnAddContainer}
          >
            <Image source={Images.add1} style={styles.icAdd} />
          </TouchableOpacity>
        </View>
      );
    }
  };

  const renderStickyParts = () => {
    return <View>{renderCategories()}</View>;
  };

  const renderSortBar = () => {
    return (
      <View style={styles.sortBarContainer}>
        <TouchableOpacity onPress={toggleSortBySheet} style={styles.row}>
          <Image source={Images.arrow_left} style={styles.icArrowDown2} />
          <Text style={styles.txtBold}>{sortOptions[sortOption]}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setShowProductAsRows(!showProductAsRows);
          }}
        >
          <Image
            source={showProductAsRows ? Images.sortRows : Images.sortSquares}
            style={styles.icSort}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderProduct = (item, index) => {
    return (
      <ProductItem
        onPressShare={toggleShareSheet}
        key={index.toString()}
        product={item}
        size={showProductAsRows ? "M" : "L"}
      />
    );
  };

  const renderAnnoucementItem = (item, index) => {
    return (
      <ProductItem
        navigation={props.navigation}
        isAnnouncement
        onPressShare={toggleShareSheet}
        key={index.toString()}
        product={item}
        size={showProductAsRows ? "M" : "L"}
      />
    );
  };

  const renderProductPage = ({ item, index }) => {
    if (index !== 1) {
      return (
        <View style={{ width: sliderWidth, height: products.length * vs(180) }}>
          {products.map((itm, idx) => renderProduct(itm, idx))}
        </View>
      );
    } else {
      return (
        <View
          style={{ width: sliderWidth, height: announcements.length * vs(180) }}
        >
          {announcements.map((itm, idx) => renderAnnoucementItem(itm, idx))}
        </View>
      );
    }
  };

  const onSnapToItem = (index) => {
    setSelectedCategory(index);
    scrollToIndex(index);
  };

  const renderProducList = () => {
    return (
      <View style={styles.prodListContainer}>
        <Carousel
          //loop
          style={{ flex: 1 }}
          ref={_carousel}
          data={categories}
          renderItem={renderProductPage}
          sliderWidth={sliderWidth}
          itemWidth={carouselItemWidth}
          onBeforeSnapToItem={onSnapToItem}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={"rgba(0,0,0,0.0)"}
      />

      <SafeAreaView
        style={styles.mainContainer}
        edges={["top", "left", "right"]}
      >
        <ScrollView
          stickyHeaderIndices={[1]}
          showsVerticalScrollIndicator={false}
        >
          {renderHeader()}

          {renderStickyParts()}

          {renderSortBar()}

          {renderProducList()}
        </ScrollView>
      </SafeAreaView>

      {renderSortBySheet()}

      {renderShareSheet()}

      {/* background for bottom sheet */}
      {(showSortBySheet || showShareSheet) && (
        <TouchableWithoutFeedback onPress={() => {}}>
          <Animated.View
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              alignItems: "center",
              backgroundColor: "rgb(29,29,29)",
              opacity: Animated.add(0.85, Animated.multiply(-1.0, fall)),
            }}
          />
        </TouchableWithoutFeedback>
      )}
    </View>
  );
}

export default Wishlist;

const categories = [
  "All",
  "Announcements",
  "Electronics",
  "Food & Beverage",
  "Fashion",
];

const sortOptions = [
  "About to be completed",
  "Last added",
  "Price: low to high",
  "Price: high to low",
];

const products = [
  {
    name: "iPhone 11",
    picture:
      "https://bizweb.dktcdn.net/100/116/615/products/12promax.png?v=1602751668000",
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
      "https://bizweb.dktcdn.net/100/116/615/products/12promax.png?v=1602751668000",
    rating: 4.0,
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
      "https://bizweb.dktcdn.net/100/116/615/products/12promax.png?v=1602751668000",
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
      "https://bizweb.dktcdn.net/100/116/615/products/12promax.png?v=1602751668000",
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
      "https://bizweb.dktcdn.net/100/116/615/products/12promax.png?v=1602751668000",
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
      "https://bizweb.dktcdn.net/100/116/615/products/12promax.png?v=1602751668000",
    rating: 3.0,
    ratingCount: 124,
    retailPrice: 2345,
    wholesalePrice: 1542,
    orderClose: "22/12/2020",
    inStock: 100,
    orderCount: 24,
  },
];

const announcements = [
  {
    name: "iPhone 11",
    picture:
      "https://bizweb.dktcdn.net/100/116/615/products/12promax.png?v=1602751668000",
    rating: 3.0,
    ratingCount: 124,
    retailPrice: 2345,
    wholesalePrice: 1542,
    deliveryDate: "22/12/2020",
    inStock: 100,
    orderCount: 24,
    minOrder: 10,
  },
  {
    name: "iPhone 11",
    picture:
      "https://bizweb.dktcdn.net/100/116/615/products/12promax.png?v=1602751668000",
    rating: 3.0,
    ratingCount: 124,
    retailPrice: 2345,
    wholesalePrice: 1542,
    deliveryDate: null,
    inStock: 100,
    orderCount: 24,
    minOrder: 10,
  },
  {
    name: "iPhone 11",
    picture:
      "https://bizweb.dktcdn.net/100/116/615/products/12promax.png?v=1602751668000",
    rating: 3.0,
    ratingCount: 124,
    retailPrice: 2345,
    wholesalePrice: 1542,
    deliveryDate: "22/12/2020",
    inStock: 100,
    orderCount: 24,
    minOrder: 10,
  },
  {
    name: "iPhone 11",
    picture:
      "https://bizweb.dktcdn.net/100/116/615/products/12promax.png?v=1602751668000",
    rating: 3.0,
    ratingCount: 124,
    retailPrice: 2345,
    wholesalePrice: 1542,
    deliveryDate: null,
    inStock: 100,
    orderCount: 24,
    minOrder: 10,
  },
  {
    name: "iPhone 11",
    picture:
      "https://bizweb.dktcdn.net/100/116/615/products/12promax.png?v=1602751668000",
    rating: 3.0,
    ratingCount: 124,
    retailPrice: 2345,
    wholesalePrice: 1542,
    deliveryDate: null,
    inStock: 100,
    orderCount: 24,
    minOrder: 10,
  },
];
