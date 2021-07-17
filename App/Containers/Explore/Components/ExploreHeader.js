import React, { useState } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { vs } from "react-native-size-matters";
import { ProductSearchBox } from "../../../Components";
import { Images } from "../../../Themes";
import styles from "../styles";
import NavigationService from "../../../Navigation/NavigationService";
import tailwind from "tailwind-rn";

export default function ExploreHeader(props) {
  const {
    searchText,
    onShowSearchBox,
    recentSearches,
    changeRecentSearches,
    onSearch,
  } = props;
  const [keyword, setKeyword] = useState("");

  if (keyword === "" && !searchText) {
    return (
      <View style={[styles.header]}>
        <View style={styles.icSearch} />
        <Image
          source={Images.logo3}
          style={styles.logo}
          resizeMode={"contain"}
        />
        <TouchableOpacity
          onPress={() => {
            NavigationService.navigate("ProductSearchScreen", {
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
      <TouchableOpacity
        onPress={() => {
          onShowSearchBox(true);
        }}
      >
        <View style={[styles.header, { paddingVertical: vs(10) }]}>
          <ProductSearchBox
            keyword={keyword || searchText}
            {...props}
            onPressDelete={() => {
              setKeyword("");
              NavigationService.navigate("ProductSearchScreen", {
                onSearch: onSearch,
              });
            }}
            onPressBack={() => NavigationService.goBack()}
          />
        </View>
      </TouchableOpacity>
    );
  }
}
