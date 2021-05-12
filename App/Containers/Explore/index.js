import React, { useState, useEffect, useRef, useContext } from 'react';
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
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { AlertContext } from '../Root/GlobalContext';

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
import colors from '../../Themes/Colors';
import AddressSheetContent from './Components/AddressSheetContent';

const sliderWidth = Dimensions.get('window').width;

function Explore(props) {
  const { dispatch } = useContext(AlertContext);
  const productPage = () => (
    <View style={{ flex: 1, backgroundColor: 'red' }} />
  );

  const SecondRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
  );

  const renderScene = SceneMap({
    All: productPage,
    Announcements: productPage,
    Electronics: productPage,
    'Food & Beverage': productPage,
    Fashion: productPage,
  });
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'All', title: 'All' },
    { key: 'Announcements', title: 'Announcements' },
    { key: 'Electronics', title: 'Electronics' },
    { key: 'Food & Beverage', title: 'Food & Beverage' },
    { key: 'Fashion', title: 'Fashion' },
  ]);
  const fall = useRef(new Animated.Value(0)).current;
  const sortBySheet = useRef();
  const shareSheet = useRef();
  const categoriesFlatlist = useRef();

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
    dispatch({
      type: 'changSheetState',
      payload: {
        showSheet: true,
        height: 380,
        children: () => <AddressSheetContent />,
        sheetTitle: 'Add your delivery address',
      },
    });
  }, [dispatch]);

  // useEffect(() => {
  //   if (showLocationSheet) {
  //     addressSheet.current.snapTo(0);
  //   } else {
  //     addressSheet.current.snapTo(1);
  //   }
  // }, [showLocationSheet]);

  // useEffect(() => {
  //   if (showSortBySheet) {
  //     sortBySheet.current.snapTo(0);
  //   } else {
  //     sortBySheet.current.snapTo(1);
  //   }
  // }, [showSortBySheet]);

  // useEffect(() => {
  //   if (showShareSheet) {
  //     shareSheet.current.snapTo(0);
  //   } else {
  //     shareSheet.current.snapTo(1);
  //   }
  // }, [showShareSheet]);

  useEffect(() => {
    if (showAccountActivatedSuccessfullyAlert) {
      setTimeout(() => {
        setShowAccountActivatedSuccessfullyAlert(false);
      }, 5000);
    }
  }, [showAccountActivatedSuccessfullyAlert]);

  const toggleAddressSheet = () => {
    setShowLocationSheet(!showLocationSheet);
  };


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
                    //scrollToIndex(index);
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
        {/* {renderCategories()} */}
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
    debugger;
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

  const renderProductPage = (index) => {
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
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      tabStyle={{ width: 'auto' }}
      indicatorStyle={{ backgroundColor: colors.primary, marginTop: -40 }}
      indicatorContainerStyle={{ marginTop: -40 }}
      renderLabel={({ route, focused, color }) => (
        <Text
          style={[
            styles.heading5Bold,
            styles.categoryItemContainer,
            // !focused && { borderBottomColor: 'transparent' },
            { color: focused ? Colors.primary : Colors.grey60 },
          ]}
        >
          {route.title}
        </Text>
      )}
      scrollEnabled
      style={{ backgroundColor: 'transparent' }}
    />
  );
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
          contentContainerStyle={{ flexGrow: 1 }}
        >
          {renderHeader()}

          {renderStickyParts()}

          {renderSortBar()}

          {/* {renderProducList()} */}
          <TabView
            // lazy
            // renderLazyPlaceholder={<Text>refreshing</Text>}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={(index) => {
              debugger;
              setSelectedCategory(index);
              setIndex(index);
            }}
            renderTabBar={renderTabBar}
            initialLayout={{ width: sliderWidth }}
          />
        </ScrollView>
      </SafeAreaView>

      {renderAddLocationSheet()}

      {renderAddAddressSheet()}

      {renderSortBySheet()}

      {renderShareSheet()}

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
