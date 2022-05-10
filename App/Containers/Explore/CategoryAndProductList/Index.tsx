import React, { useMemo } from "react";
import AddressBar from "../Components/AddressBar";
import ExploreHeader from "../Components/ExploreHeader";
import ProductList from "../Components/ProductList/ProductList";
import { CollapsibleHeaderTabView } from "react-native-scrollable-tab-view-collapsible-header";
import { ScrollableTabBar } from "react-native-scrollable-tab-view";
import colors from "../../../Themes/Colors";
import fonts from "../../../Themes/Fonts";
import {
  View,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  SafeAreaView,
} from "react-native";
import NavigationService from "../../../Navigation/NavigationService";
import { vs } from "react-native-size-matters";
import { Images } from "../../../Themes";
import { useReactiveVar } from "@apollo/client";
import { localCartVar, userProfileVar } from "../../../Apollo/cache";
import styles from "../styles";
import {
  FilterType,
  useGetPreferredCategoriesQuery,
} from "../../../../generated/graphql";
import { ActivityIndicator } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";

export default function Index(props) {
  const { textToSearch = "" } = props;
  const screenWidth = useWindowDimensions().width;

  /** updates for local cart Appollo cache
   * useReactiveVar => we will get updates from other screens
   */
  const localCartVarReactive = useReactiveVar(localCartVar);
  const userProfileVarReactive = useReactiveVar(userProfileVar);
  const isAuth = useMemo(
    () => userProfileVarReactive.isAuth,
    [userProfileVarReactive.isAuth]
  );

  const {
    data: categories,
    refetch,
    loading,
  } = useGetPreferredCategoriesQuery({
    variables: {
      buyerId: global.buyerId,
    },
    nextFetchPolicy: "standby",
    fetchPolicy: "network-only",
    context: {
      headers: {
        isPrivate: global.access_token ? true : false,
      },
    },
  });

  const { width, height } = useWindowDimensions();

  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [refetch])
  );
  return loading ? (
    <SafeAreaView>
      <ActivityIndicator
        color={"red"}
        style={{ top: "50%" }}
        animating={true}
      />
    </SafeAreaView>
  ) : (
    <View style={{ height, width }}>
      <CollapsibleHeaderTabView
        prerenderingSiblingsNumber={1}
        style={[{ height, width: width }]}
        makeHeaderHeight={() => vs(50)}
        tabBarActiveTextColor={colors.primary}
        renderTabBar={(mprops) => {
          return (
            <View style={{ flex: 1, backgroundColor: "white" }}>
              <ScrollableTabBar
                {...mprops}
                underlineStyle={{
                  backgroundColor: colors.primary,
                }}
                inactiveTextColor={colors.grey60}
                activeTextColor={colors.primary}
                style={{ borderWidth: 0 }}
                tabsContainerStyle={{ paddingRight: 60 }}
                textStyle={{
                  fontFamily: fonts.primary,
                  width: "100%",
                  fontWeight: "bold",
                  fontSize: 14,
                }}
              />
              <AddressBar />
              {categories?.getPreferredCategories && isAuth && (
                <View
                  style={{
                    backgroundColor: "white",
                    width: 60,
                    height: 46,
                    marginTop: -100,
                    marginBottom: 60,
                    zIndex: 1000,
                    marginLeft: screenWidth - 60,
                  }}
                >
                  <TouchableOpacity
                    // activeOpacity={1}
                    onPress={() => {
                      NavigationService.navigate(
                        "EditCategoriesScreen",
                        categories?.getPreferredCategories
                      );
                    }}
                    style={[styles.btnAddContainer]}
                  >
                    <Image source={Images.add1} style={styles.icAdd} />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          );
        }}
        renderScrollHeader={() => (
          <ExploreHeader searchText={props.textToSearch} {...props} />
        )}
      >
        <ProductList
          listType="All"
          isNeedTabbar={true}
          filterParams={{
            // will change in future
            addressId: localCartVarReactive.deliverAddress,
            textToSearch,
          }}
          index={0}
          filter={
            textToSearch.length > 0
              ? FilterType.ActiveByAddressIdAndFullTextSearch
              : FilterType.Active
          }
          tabLabel="All"
        />

        <ProductList
          listType="Announcements"
          isNeedTabbar={true}
          filterParams={{
            // will change in future
            addressId: localCartVarReactive.deliverAddress,
            textToSearch,
          }}
          index={1}
          filter={
            textToSearch.length > 0
              ? FilterType.ActiveByAddressIdAndFullTextSearch
              : FilterType.ActiveByAddressIdAndAnnouncement
          }
          tabLabel="Announcements"
          isAnnouncement={true}
        />
        {categories?.getPreferredCategories.map((category, index) => (
          <ProductList
            isNeedTabbar={true}
            key={`${index}`}
            listType={category.name}
            index={index + 2}
            filter={
              textToSearch.length > 0
                ? FilterType.ActiveByAddressIdAndFullTextSearch
                : FilterType.ActiveByAddressIdAndCategory
            }
            tabLabel={category.name}
            filterParams={{
              addressId: localCartVarReactive.deliverAddress,
              textToSearch,
              category: category.name,
            }}
          />
        ))}
      </CollapsibleHeaderTabView>
    </View>
  );
}
