import React from "react";
import { View, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import { AppBar } from "../../../Components";
import { FilterType } from "../../../../generated/graphql";
import { useRoute } from "@react-navigation/native";
import ProductList from "../Components/ProductList/ProductList";
import { t } from "react-native-tailwindcss";

function SellerStoreScreen() {
  const { params } = useRoute();
  console.log("params====================================");
  console.log(params?.seller);
  console.log(params?.seller.id);
  console.log("====================================");
  return (
    <View style={styles.container}>
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
      <View style={[t.mT12]}>
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
      {/*  */}
    </View>
  );
}

export default SellerStoreScreen;
