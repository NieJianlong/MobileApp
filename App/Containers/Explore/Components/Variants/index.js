/**
 * Under Construction
 * @nsavage
 * The remote data type for Variants is missing attributes like
 * title wich we could use for the header
 *
 * code is to conform to RNative guidelines
 * see https://reactnative.dev/docs/intro-react
 *
 */
import React, {
  useState,
  useCallback,
  useContext,
  useMemo,
  useEffect,
} from "react";
import { Button, View, Text } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
// import { Text, View, Image, TouchableOpacity } from "react-native";
import { useQuery } from "@apollo/client";
import * as gqlMappers from "../../gql/gql_mappers";
import * as aQM from "../../gql/explore_queries";

import Variant from "./Variant";

/**
 *
 *  props.product.prodVariants
 *  array of variants for this product
 */
const ProductVariants = (props) => {
  // will probably need to pass the product down to variants so it can be updated on selection
  const [product, setProductFromProps] = useState({});
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    console.log("variants constructor");
    setProductFromProps(props.product);
    // console.log(JSON.stringify(product));
    setIsReady(true);
  }, [props, product]);

  // to do reduce number props if possible
  if (isReady) {
    return (
      <View style={styles.pageContainer}>
        {product.prodVariants.map((variant, index) => {
          return <Variant variant={variant} product={product} key={index} />;
        })}
      </View>
    );
  } else {
    return <View style={styles.pageContainer} />;
  }
};

const styles = ScaledSheet.create({
  pageContainer: {
    flex: 0,
    flexDirection: "column",
    // height: "80@vs",
    flexWrap: "wrap",
    margin: 8,
    borderColor: "red",
    borderWidth: 2,
    borderRadius: 15,
    padding: 8,
  },
});

export default ProductVariants;
