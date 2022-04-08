import React from "react";
import { View, StatusBar, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import { AppBar } from "../../../Components";
import { FilterType } from "../../../../generated/graphql";
import { useRoute } from "@react-navigation/native";
import ProductList from "../Components/ProductList/ProductList";

function SellerStoreScreen() {
  const { params } = useRoute();
  const { width, height } = useWindowDimensions();
  return (
    <View style={[styles.container, { width, height }]}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        <View style={styles.header}>
          <AppBar
            title={params?.storeName}
            // rightButton={() => (
            //   <TouchableOpacity onPress={this.onPost}>
            //     <Image source={Images.search} style={styles.icSearch} />
            //   </TouchableOpacity>
            // )}
          />
        </View>
      </SafeAreaView>

      <ProductList
        listType="All"
        isNeedTabbar={false}
        filterParams={{
          // storeId: params?.storeId,
          sellerId: params?.seller.id,
        }}
        index={0}
        filter={FilterType.BySeller}
        tabLabel="All"
      />
    </View>
  );
}

export default SellerStoreScreen;
