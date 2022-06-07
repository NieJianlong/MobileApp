import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { View, Text, SafeAreaView, SectionList } from "react-native";
import AppConfig from "../../Config/AppConfig";
import { vs, s, ScaledSheet } from "react-native-size-matters";
import fonts from "../../Themes/Fonts";
import colors from "../../Themes/Colors";
import { AppBar, RightButton } from "../../Components";
import NavigationService from "../../Navigation/NavigationService";
import CheckBox from "../Explore/Components/CheckBox";
import metrics from "../../Themes/Metrics";
import { ApplicationStyles } from "../../Themes";

import * as ecM from "./editCartMappers.js";
import { lowerFirst } from "lodash";
import useRealm from "../../hooks/useRealm";
import { t } from "react-native-tailwindcss";
import { FilterType, useGetListingsQuery } from "../../../generated/graphql";
import ProductVariants from "../Explore/Components/Variants";

/**
 * we are coming here from a navigation event
 */
function EditShoppingCart(props) {
  const { params } = useRoute();
  const { realm } = useRealm();

  const [currentVariant, setCurrentVariant] = useState();
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
          listingId: params.listingId,
          productId: params.productId,
        },
      },
    },
    context: {
      headers: {
        isPrivate: global.access_token ? true : false,
      },
    },
  });

  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Edit details",
      headerRight: () => (
        <View style={[t.mR6]}>
          <RightButton
            title="SAVE"
            onPress={() => {
              params.onEditVariant(currentVariant.variantId);
              NavigationService.goBack();
            }}
          />
        </View>
      ),
    });
  }, [navigation, currentVariant]);

  useEffect(() => {
    if (products?.getListings?.content[0]?.listingVariants) {
      const variant = products?.getListings?.content[0]?.listingVariants.find(
        (item) => item.variantId === params.variantId
      );
      if (variant) {
        setCurrentVariant(variant);
      }
    }
  }, [products]);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
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
    </View>
  );
}

export default EditShoppingCart;
const styles = ScaledSheet.create({
  title: {
    fontFamily: fonts.primary,
    fontSize: "16@s",
    color: colors.black,
    fontWeight: "600",
  },
});
