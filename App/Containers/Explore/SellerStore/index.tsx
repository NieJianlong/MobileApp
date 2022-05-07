import React from "react";
import { View, StatusBar, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import { AppBar } from "../../../Components";
import { FilterType } from "../../../../generated/graphql";
import { useNavigation, useRoute } from "@react-navigation/native";
import ProductList from "../Components/ProductList/ProductList";
import AddressBar from "../Components/AddressBar";
import { localCartVar } from "../../../Apollo/cache";
import { useReactiveVar } from "@apollo/client";

function SellerStoreScreen() {
  const { params } = useRoute();
  const { width, height } = useWindowDimensions();
  const localCart = useReactiveVar(localCartVar);
  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: params?.storeName,
    });
  }, [navigation]);
  return (
    <View style={[styles.container, { width, height }]}>
      <AddressBar />
      <ProductList
        listType="All"
        isNeedTabbar={false}
        filterParams={{
          // storeId: params?.storeId,
          addressId: localCart.deliverAddress,
          sellerId: params?.seller.id,
        }}
        index={0}
        filter={FilterType.ActiveByAddressIdAndSeller}
        tabLabel="All"
      />
    </View>
  );
}

export default SellerStoreScreen;
