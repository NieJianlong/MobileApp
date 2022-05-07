import React, { useState, useRef } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert as RNAlert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductItem from "../Explore/Components/ProductItem";
import { Colors, Images } from "../../Themes";
import styles from "./styles";
import { useGetBuyerWishlistListingQuery } from "../../../generated/graphql";
import { t } from "react-native-tailwindcss";
import { useFocusEffect } from "@react-navigation/native";
import TextTip from "../../Components/EmptyReminder";
import NavigationService from "../../Navigation/NavigationService";
import { useReactiveVar } from "@apollo/client";
import { userProfileVar } from "../../Apollo/cache";
const subTip =
  "Check if there are any products on your wish list and snatch them up before they’re gone!\n \n You can also explore new products \n";

function Wishlist(props) {
  const userProfileVarReactive = useReactiveVar(userProfileVar);
  const { data, refetch } = useGetBuyerWishlistListingQuery({
    variables: {
      options: {
        buyerId: global.buyerId,
        pageNumber: 0,
        pageSize: 1000,
      },
    },
    context: {
      headers: {
        isPrivate: userProfileVarReactive.isAuth,
      },
    },
  });

  useFocusEffect(
    React.useCallback(() => {
      refetch && refetch();
    }, [refetch])
  );

  const [showProductAsRows, setShowProductAsRows] = useState(true);

  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <View style={styles.icSearch} />
        <Image
          source={Images.logo3}
          style={styles.logo}
          resizeMode={"contain"}
        />
        <TouchableOpacity>
          <Image source={Images.search} style={[styles.icSearch, t.opacity0]} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView
        style={styles.mainContainer}
        edges={["top", "left", "right"]}
      >
        {renderHeader()}
        <FlatList
          ListEmptyComponent={
            <TextTip
              textTip="Your wishlist is empty"
              subTextTip={subTip}
              needButton
              btnMsg="EXPLORE"
              onPress={() => {
                NavigationService.navigate("ExploreScreen");
              }}
            />
          }
          data={data?.getBuyerWishlistListing.content}
          renderItem={({ item, index }) => {
            return (
              <ProductItem
                key={index.toString()}
                isAnnouncement={false}
                product={item}
                size={showProductAsRows ? "M" : "L"}
                {...props}
              />
            );
          }}
        />
      </SafeAreaView>
    </View>
  );
}

export default Wishlist;
