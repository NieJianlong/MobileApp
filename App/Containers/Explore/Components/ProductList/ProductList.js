import React, { useState, useEffect, useCallback } from 'react';
import { FlatList } from 'react-native';
import * as jwt from '../../../../Apollo/jwt-request';
import ProductItem from './ProductItem';
/*explore productlist component */
export default function ProductPage(props) {
  // if show it as row
  const { showProductAsRows } = props;
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
      data={products}
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
