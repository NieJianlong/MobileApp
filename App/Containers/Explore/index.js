import React, { Component, useState, useEffect, useRef } from 'react';
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
} from 'react-native';
import { vs, s } from 'react-native-size-matters';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-snap-carousel';
import { TabView, SceneMap } from 'react-native-tab-view';

import {
  Button,
  BottomSheet,
  LocationSearchBox,
  TextInput,
  Alert,
  RadiusButton,
  ProductSearchBox,
} from '../../Components';
import CheckBox from './Components/CheckBox';
import ProductItem from './Components/ProductItem';
import ShareOptionList from './Components/ShareOptionList';

import { Colors, Images } from '../../Themes';
import styles from './styles';
import NavigationService from '../../Navigation/NavigationService';

import * as jwt from '../../Apollo/jwt-request';

const sliderWidth = Dimensions.get('window').width;
const carouselItemWidth = Dimensions.get('window').width;

function Explore(props) {
  const FirstRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#ff4081' }} />
  );

  const SecondRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
  ]);
  const fall = useRef(new Animated.Value(0)).current;

  const addressSheet = useRef();
  const addLocationSheet = useRef();
  const addAddressSheet = useRef();
  const sortBySheet = useRef();
  const shareSheet = useRef();
  const categoriesFlatlist = useRef();
  const _carousel = useRef();

  let [products, setProducts] = useState([]);

  const [showLocationSheet, setShowLocationSheet] = useState(true);
  const [showAddLocationSheet, setShowAddLocationSheet] = useState(false);
  const [showAddAddressSheet, setShowAddAddressSheet] = useState(false);
  const [
    showAccountActivatedSuccessfullyAlert,
    setShowAccountActivatedSuccessfullyAlert,
  ] = useState(false);
  const [showAccountActivateAlert, setShowAccountActivateAlert] = useState(
    false
  );
  const [showSortBySheet, setShowSortBySheet] = useState(false);
  const [showShareSheet, setShowShareSheet] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [showProductAsRows, setShowProductAsRows] = useState(true);
  const [sortOption, setSortOption] = useState(1);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    getProductList();

    return () => {};
  }, [props]);

  useEffect(() => {
    if (showLocationSheet) {
      addressSheet.current.snapTo(0);
    } else {
      addressSheet.current.snapTo(1);
    }
  }, [showLocationSheet]);

  useEffect(() => {
    if (showAddLocationSheet) {
      addLocationSheet.current.snapTo(0);
    } else {
      addLocationSheet.current.snapTo(1);
    }
  }, [showAddLocationSheet]);

  useEffect(() => {
    if (showAddAddressSheet) {
      addAddressSheet.current.snapTo(0);
    } else {
      addAddressSheet.current.snapTo(1);
    }
  }, [showAddAddressSheet]);

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

  useEffect(() => {
    if (showAccountActivatedSuccessfullyAlert) {
      setTimeout(() => {
        setShowAccountActivatedSuccessfullyAlert(false);
      }, 5000);
    }
  }, [showAccountActivatedSuccessfullyAlert]);

  const getProductList = async () => {
    await jwt
      .runMockGetProductList()
      .then(function (res) {
        //setProducts(res.productList)
        setProducts(JSON.parse(res.productList));
      })
      .catch(function (error) {});
  };

  const toggleAddressSheet = () => {
    setShowLocationSheet(!showLocationSheet);
  };

  const toggleAddLocationSheet = () => {
    setShowAddLocationSheet(!showAddLocationSheet);
  };

  const toggleAddAddressSheet = () => {
    setShowAddAddressSheet(!showAddAddressSheet);
  };

  const toggleSortBySheet = () => {
    setShowSortBySheet(!showSortBySheet);
  };

  const toggleShareSheet = () => {
    setShowShareSheet(!showShareSheet);
  };

  const renderAddressItem = (address) => {
    return (
      <View style={styles.pickupLocationContainer}>
        <Image style={styles.pickupLocationIcon} source={Images.locationMed} />

        <View style={{ marginLeft: s(10) }}>
          <Text style={styles.heading5Bold}>Seller Address 00</Text>
          <Text style={styles.txtRegular}>Tamil Nadu 12345, Area 4</Text>
        </View>

        <View style={{ flex: 1 }} />

        <TouchableOpacity style={styles.btnEditAddress}>
          <Image
            style={styles.editAddressIcon}
            source={Images.userAddressEditImage}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderAddressSheet = () => {
    return (
      <BottomSheet
        customRef={addressSheet}
        onCloseEnd={() => {
          setShowLocationSheet(false);
        }}
        callbackNode={fall}
        snapPoints={[vs(380), 0]}
        initialSnap={showLocationSheet ? 0 : 1}
        title={'Add your delivery address'}
      >
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <Button
            backgroundColor={Colors.grey80}
            onPress={() => {
              toggleAddressSheet();
              toggleAddAddressSheet();
            }}
            prefixIcon={Images.location}
            text={'CURRENT LOCATION'}
          />

          <View style={{ height: vs(12) }} />

          <Button
            backgroundColor={Colors.grey80}
            prefixIcon={Images.add1}
            onPress={() => {
              toggleAddressSheet();
              toggleAddLocationSheet();
            }}
            text={'ADD ADDRESS'}
          />

          <View style={{ height: vs(20) }} />

          {renderAddressItem({
            name: 'Address Name 00',
            address: 'Tamil Nadu 33243',
          })}
          {renderAddressItem({
            name: 'Address Name 01',
            address: 'Sala Nadu 33243',
          })}
        </View>
      </BottomSheet>
    );
  };

  const renderAddLocationSheet = () => {
    var stateInput = useRef();
    var cityInput = useRef();
    var villageInput = useRef();
    var houseNumberInput = useRef();
    var flatNumberInput = useRef();
    var landmarkInput = useRef();

    return (
      <BottomSheet
        customRef={addLocationSheet}
        onCloseEnd={() => setShowAddLocationSheet(false)}
        callbackNode={fall}
        snapPoints={[vs(600), 0]}
        initialSnap={showAddLocationSheet ? 0 : 1}
        //title={'Add your location'}
      >
        {/* <View style={{ flex: 1 }}>
                    <LocationSearchBox
                        onPressAddAddressManually={() => {
                            toggleAddLocationSheet()
                            toggleAddAddressSheet()
                        }}
                    />
                </View> */}
        <View style={{ flex: 1 }}>
          <View style={styles.popupHeader}>
            <Text style={[styles.txtSave, { color: 'transparent' }]}>SAVE</Text>
            <Text style={styles.popupTitle}>Add your delivery address</Text>
            <TouchableOpacity onPress={toggleAddLocationSheet}>
              <Text style={styles.txtSave}>SAVE</Text>
            </TouchableOpacity>
          </View>

          <KeyboardAwareScrollView enableOnAndroid>
            <TextInput
              placeholder={'Pin Code'}
              style={styles.textInput}
              returnKeyType={'next'}
              onSubmitEditing={() => stateInput.getInnerRef().focus()}
            />
            <TextInput
              placeholder={'State (Province)'}
              style={styles.textInput}
              ref={(r) => (stateInput = r)}
              returnKeyType={'next'}
              onSubmitEditing={() => cityInput.getInnerRef().focus()}
            />
            <TextInput
              placeholder={'Town or city'}
              style={styles.textInput}
              ref={(r) => (cityInput = r)}
              returnKeyType={'next'}
              onSubmitEditing={() => villageInput.getInnerRef().focus()}
            />
            <TextInput
              placeholder={'Village or area'}
              style={styles.textInput}
              ref={(r) => (villageInput = r)}
              returnKeyType={'next'}
              onSubmitEditing={() => houseNumberInput.getInnerRef().focus()}
            />
            <TextInput
              placeholder={'House number'}
              style={styles.textInput}
              ref={(r) => (houseNumberInput = r)}
              returnKeyType={'next'}
              onSubmitEditing={() => flatNumberInput.getInnerRef().focus()}
            />
            <TextInput
              placeholder={'Flat number'}
              style={styles.textInput}
              ref={(r) => (flatNumberInput = r)}
              returnKeyType={'next'}
              onSubmitEditing={() => landmarkInput.getInnerRef().focus()}
            />
            <TextInput
              placeholder={'Landmark'}
              style={styles.textInput}
              ref={(r) => (landmarkInput = r)}
              returnKeyType={'done'}
            />
          </KeyboardAwareScrollView>
        </View>
      </BottomSheet>
    );
  };

  const renderAddAddressSheet = () => {
    var stateInput = useRef();
    var cityInput = useRef();
    var villageInput = useRef();
    var houseNumberInput = useRef();
    var flatNumberInput = useRef();
    var landmarkInput = useRef();

    return (
      <BottomSheet
        customRef={addAddressSheet}
        onCloseEnd={() => setShowAddAddressSheet(false)}
        callbackNode={fall}
        snapPoints={[vs(600), 0]}
        initialSnap={showAddAddressSheet ? 0 : 1}
      >
        <View style={{ flex: 1 }}>
          <View style={styles.popupHeader}>
            <Text style={[styles.txtSave, { color: 'transparent' }]}>SAVE</Text>
            <Text style={styles.popupTitle}>Add your delivery address</Text>
            <TouchableOpacity onPress={toggleAddAddressSheet}>
              <Text style={styles.txtSave}>SAVE</Text>
            </TouchableOpacity>
          </View>

          <KeyboardAwareScrollView enableOnAndroid>
            <TextInput
              placeholder={'Pin Code'}
              style={styles.textInput}
              returnKeyType={'next'}
              onSubmitEditing={() => stateInput.getInnerRef().focus()}
            />
            <TextInput
              placeholder={'State (Province)'}
              style={styles.textInput}
              ref={(r) => (stateInput = r)}
              returnKeyType={'next'}
              onSubmitEditing={() => cityInput.getInnerRef().focus()}
            />
            <TextInput
              placeholder={'Town or city'}
              style={styles.textInput}
              ref={(r) => (cityInput = r)}
              returnKeyType={'next'}
              onSubmitEditing={() => villageInput.getInnerRef().focus()}
            />
            <TextInput
              placeholder={'Village or area'}
              style={styles.textInput}
              ref={(r) => (villageInput = r)}
              returnKeyType={'next'}
              onSubmitEditing={() => houseNumberInput.getInnerRef().focus()}
            />
            <TextInput
              placeholder={'House number'}
              style={styles.textInput}
              ref={(r) => (houseNumberInput = r)}
              returnKeyType={'next'}
              onSubmitEditing={() => flatNumberInput.getInnerRef().focus()}
            />
            <TextInput
              placeholder={'Flat number'}
              style={styles.textInput}
              ref={(r) => (flatNumberInput = r)}
              returnKeyType={'next'}
              onSubmitEditing={() => landmarkInput.getInnerRef().focus()}
            />
            <TextInput
              placeholder={'Landmark'}
              style={styles.textInput}
              ref={(r) => (landmarkInput = r)}
              returnKeyType={'done'}
            />
          </KeyboardAwareScrollView>
        </View>
      </BottomSheet>
    );
  };

  const renderSortBySheet = () => {
    return (
      <BottomSheet
        customRef={sortBySheet}
        onCloseEnd={() => setShowSortBySheet(false)}
        callbackNode={fall}
        snapPoints={[vs(320), 0]}
        initialSnap={showSortBySheet ? 0 : 1}
        title={'Sort By'}
      >
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
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
        snapPoints={[vs(580), 0]}
        initialSnap={showShareSheet ? 0 : 1}
        title={'Share to'}
      >
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <ShareOptionList />
        </View>
      </BottomSheet>
    );
  };

  const renderAccountActivatedSuccessfullyAlert = () => {
    return (
      <Alert
        visible={showAccountActivatedSuccessfullyAlert}
        message={'Your account has been activated successfully'}
        color={Colors.success}
        onDismiss={() => setShowAccountActivatedSuccessfullyAlert(false)}
      />
    );
  };

  const renderActivateAccountAlert = () => {
    return (
      <Alert
        visible={showAccountActivateAlert}
        title={'Activate First'}
        message={
          "You've successfully registered your account. Please check your email for the activation link so can make full use of your account."
        }
        color={Colors.secondary00}
        onDismiss={() => setShowAccountActivateAlert(false)}
        action={() => (
          <View style={{ width: s(120) }}>
            <RadiusButton text={'RESEND EMAIL'} />
          </View>
        )}
      />
    );
  };

  const onSearch = (keyword) => {
    setKeyword(keyword);
  };

  const renderHeader = () => {
    if (keyword === '') {
      return (
        <View style={styles.header}>
          <View style={styles.icSearch} />

          <Image
            source={Images.logo3}
            style={styles.logo}
            resizeMode={'contain'}
          />

          <TouchableOpacity
            onPress={() => {
              NavigationService.navigate('ProductSearchScreen', {
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
              setKeyword('');
              NavigationService.navigate('ProductSearchScreen', {
                onSearch: onSearch,
              });
            }}
            onPressBack={() => setKeyword('')}
          />
        </View>
      );
    }
  };

  const scrollToIndex = (index) => {
    categoriesFlatlist.current.scrollToIndex({
      animated: true,
      index,
      viewOffset: (Dimensions.get('window').width / 7) * 3,
    });
  };

  const renderCategories = () => {
    if (keyword === '') {
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
                    _carousel.current.snapToItem(index);
                    scrollToIndex(index);
                  }}
                  style={[
                    styles.categoryItemContainer,
                    !isFocused && { borderBottomColor: 'transparent' },
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
            onPress={() => NavigationService.navigate('EditCategoriesScreen')}
            style={styles.btnAddContainer}
          >
            <Image source={Images.add1} style={styles.icAdd} />
          </TouchableOpacity>
        </View>
      );
    }
  };

  const renderAddressBar = () => {
    return (
      <View style={styles.addressBarContainer}>
        <View style={styles.row}>
          <Image source={Images.locationMed} style={styles.icLocation} />
          <Text style={styles.heading5Regular}>
            Deliver to - Tanil Nadu 12345
          </Text>
          <View style={styles.areaContainer}>
            <Text style={styles.heading6Bold}>Area 4</Text>
          </View>
        </View>

        <TouchableOpacity onPress={toggleAddressSheet}>
          <Image source={Images.arrow_left} style={styles.icArrowDown} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderStickyParts = () => {
    return (
      <View>
        {renderCategories()}
        {renderAddressBar()}
      </View>
    );
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
        size={showProductAsRows ? 'M' : 'L'}
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
        size={showProductAsRows ? 'M' : 'L'}
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
        backgroundColor={'rgba(0,0,0,0.0)'}
      />

      <SafeAreaView
        style={styles.mainContainer}
        edges={['top', 'left', 'right']}
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

      {renderAddressSheet()}

      {renderAddLocationSheet()}

      {renderAddAddressSheet()}

      {renderSortBySheet()}

      {renderShareSheet()}

      {/* background for bottom sheet */}
      {(showLocationSheet ||
        showAddAddressSheet ||
        showAddLocationSheet ||
        showSortBySheet ||
        showShareSheet) && (
        <TouchableWithoutFeedback onPress={() => {}}>
          <Animated.View
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              alignItems: 'center',
              backgroundColor: 'rgb(29,29,29)',
              opacity: Animated.add(0.85, Animated.multiply(-1.0, fall)),
            }}
          />
        </TouchableWithoutFeedback>
      )}

      {renderAccountActivatedSuccessfullyAlert()}

      {renderActivateAccountAlert()}
    </View>
  );
}

export default Explore;

const categories = [
  'All',
  'Announcements',
  'Electronics',
  'Food & Beverage',
  'Fashion',
];

const sortOptions = [
  'About to be completed',
  'Last added',
  'Price: low to high',
  'Price: high to low',
];

const announcements = [
  {
    name: 'iPhone 11',
    picture:
      'https://bizweb.dktcdn.net/100/116/615/products/12promax.png?v=1602751668000',
    rating: 3.0,
    ratingCount: 124,
    retailPrice: 2345,
    wholesalePrice: 1542,
    deliveryDate: '22/12/2020',
    inStock: 100,
    orderCount: 24,
    minOrder: 10,
  },
  {
    name: 'iPhone 11',
    picture:
      'https://bizweb.dktcdn.net/100/116/615/products/12promax.png?v=1602751668000',
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
    name: 'iPhone 11',
    picture:
      'https://bizweb.dktcdn.net/100/116/615/products/12promax.png?v=1602751668000',
    rating: 3.0,
    ratingCount: 124,
    retailPrice: 2345,
    wholesalePrice: 1542,
    deliveryDate: '22/12/2020',
    inStock: 100,
    orderCount: 24,
    minOrder: 10,
  },
  {
    name: 'iPhone 11',
    picture:
      'https://bizweb.dktcdn.net/100/116/615/products/12promax.png?v=1602751668000',
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
    name: 'iPhone 11',
    picture:
      'https://bizweb.dktcdn.net/100/116/615/products/12promax.png?v=1602751668000',
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
