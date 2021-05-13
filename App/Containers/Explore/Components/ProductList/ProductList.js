import React, { useState, useEffect, useCallback } from 'react';
import { FlatList } from 'react-native';
import * as jwt from '../../../../Apollo/jwt-request';
import ProductItem from '../ProductItem';

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
  const { showProductAsRows, isAnnouncement } = props;
  const [showShareSheet, setShowShareSheet] = useState(false);
  let [products, setProducts] = useState([]);
  const toggleShareSheet = useCallback(() => {
    setShowShareSheet(!showShareSheet);
  }, [showShareSheet]);
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
    <FlatList
      showsHorizontalScrollIndicator={false}
      data={isAnnouncement ? announcements : products}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => {
        return (
          <ProductItem
            onPressShare={toggleShareSheet}
            key={index.toString()}
            product={item}
            size={showProductAsRows ? 'M' : 'L'}
          />
        );
      }}
    />
  );
}
