import React, { useState, useEffect, useCallback, useContext } from 'react';
import { FlatList, View } from 'react-native';
import * as jwt from '../../../../Apollo/jwt-request';
import ProductItem from '../ProductItem';
import { HPageViewHoc } from 'react-native-head-tab-view';
import { CollapsibleHeaderTabView } from 'react-native-scrollable-tab-view-collapsible-header';
import ExploreSortBar from '../ExploreSortBar';
import { AlertContext } from '../../../Root/GlobalContext';
import ShareOptionList from '../ShareOptionList';
const HFlatList = HPageViewHoc(FlatList);
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

/*explore productlist component */
export default function ProductList(props) {
  // if show it as row
  const { dispatch } = useContext(AlertContext);
  const { isAnnouncement, index } = props;

  const [showProductAsRows, setShowProductAsRows] = useState(true);
  let [products, setProducts] = useState([]);
  const toggleShareSheet = useCallback(() => {
    dispatch({
      type: 'changSheetState',
      payload: {
        showSheet: true,
        height: 580,
        children: () => (
          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <ShareOptionList />
          </View>
        ),
        sheetTitle: 'Share to',
      },
    });
  }, [dispatch]);
  const getProductList = async () => {
    await jwt
      .runMockGetProductList()
      .then(function (res) {
        //setProducts(res.productList)
        setProducts(JSON.parse(res.productList));
      })
      .catch(function (error) {});
  };
  useEffect(() => {
    getProductList();
    return () => {};
  }, [props]);
  return (
    <HFlatList
      index={index}
      keyboardShouldPersistTaps="always"
      ListHeaderComponent={
        <ExploreSortBar
          onChange={(showAsRow) => {
            setShowProductAsRows(!showProductAsRows);
          }}
        />
      }
      showsHorizontalScrollIndicator={false}
      data={isAnnouncement ? announcements : products}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => {
        return (
          <ProductItem
            onPressShare={toggleShareSheet}
            key={index.toString()}
            isAnnouncement={isAnnouncement}
            product={item}
            size={showProductAsRows ? 'M' : 'L'}
            {...props}
          />
        );
      }}
      {...props}
    />
  );
}
