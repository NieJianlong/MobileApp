import React, { useEffect, useMemo, useState } from "react";
import AddressBar from "../Components/AddressBar";
import ExploreHeader from "../Components/ExploreHeader";
import ProductList from "../Components/ProductList/ProductList";
import { CollapsibleHeaderTabView } from "react-native-scrollable-tab-view-collapsible-header";
import { ScrollableTabBar } from "react-native-scrollable-tab-view";
import colors from "../../../Themes/Colors";
import fonts from "../../../Themes/Fonts";
import { View, Image, TouchableOpacity } from "react-native";
import NavigationService from "../../../Navigation/NavigationService";
import { vs } from "react-native-size-matters";
import useWindowDimensions from "react-native/Libraries/Utilities/useWindowDimensions";
import { Images } from "../../../Themes";
import { useLazyQuery, useQuery, useReactiveVar } from "@apollo/client";
import * as aQM from "../gql/explore_queries";
import { localCartVar, userProfileVar } from "../../../Apollo/cache";
import styles from "../styles";

export default function Index(props) {
  const { textToSearch = "" } = props;
  const screenWidth = useWindowDimensions().width;

  /** updates for local cart Appollo cache
   * useReactiveVar => we will get updates from other screens
   */
  const localCartVarReactive = useReactiveVar(localCartVar);
  const userProfileVarReactive = useReactiveVar(userProfileVar);
  const isAuth = useMemo(() => userProfileVarReactive.isAuth, [
    userProfileVarReactive.isAuth,
  ]);

  // temporay fix original code for empty address and new requirments
  // imposed by backend and VK, diverges from original design
  // only call products data when ready, ie have geo co-ords
  // const [isReady, setIsReady] = useState(false);
  /** temp solution adding location as a prop
   * below see <ProductList
   * there are many ways wecould do this but we should not
   * call out for the product data until we have the location(co-ords)
   *
   */
  const [location, setLocation] = useState({ latitude: "", longitude: "" });

  /**
   * this will be the query we will run on load to get the adrress co-ords
   * for the delivery address
   * this will be complicated as there are many ways this can happen
   * ie no initial address, guest, registered ect ....
   */
  const [runGeoQuery] = useLazyQuery(aQM.FIND_COORDINATES_FOR_ADDRESS_REQUEST, {
    variables: { address: localCartVarReactive.callBackAddress }, // need to add some structure here  address:{vars...}
    context: {
      headers: {
        isPrivate: false,
      },
    },
    onCompleted: (res) => {
      // data has shape below
      // {"data":{"coordinatesForAddressRequest":{ latitude":51.50735,"longitude":-0.1277583}} }
      // just guessing for now until we can test the query
      const {
        coordinatesForAddressRequest: { latitude, longitude },
      } = res;

      console.log(
        `Explore runGeoQuery debug lat long ${latitude}  ${longitude}`
      );
      // put lattitude and longiue into state and pass thru as props
      //location.push(latitude, longitude);
      // for forseable future will need these values so backend can cope

      setLocation({ latitude, longitude });
      // setIsReady(true);
    },
    onError: (res) => {
      console.log(`Explore runGeoQuery onError ${JSON.stringify(res)}`);
      setLocation({ latitude: 1.5, longitude: 1.5 });
      // setIsReady(true);
    },
  });

  const [getStoneIds, { data: storeIds }] = useLazyQuery(
    aQM.OnlineStoreByGeoCoordinates,
    {
      variables: { ...location },
    }
  );

  useEffect(() => {
    if (location.latitude) {
      getStoneIds();
    }
  }, [getStoneIds, location]);
  useEffect(() => {
    console.log(
      `Explore check for address in cart ${JSON.stringify(
        localCartVarReactive
      )}`
    );
    // weird I know testing for empty object, is more perfomant this way
    if (JSON.stringify(localCartVarReactive.callBackAddress) === "{}") {
      console.log("no address in cart");
    } else {
      console.log("run geoquery");
      // will  run the get geo co-ordinates now
      runGeoQuery(); // currently works on the backend
      // for forseable future will need these values so backend can cope
      // location.push(1.5, 1.5);
      // setIsReady(true);
    }
  }, [localCartVarReactive, runGeoQuery]);
  //get user's current favourite categories
  const { data: categories, refetch } = useQuery(aQM.GET_PREFERRED_CATEGORIES, {
    variables: {
      buyerId: global.buyerId,
    },
    context: {
      headers: {
        isPrivate: false,
      },
    },
  });

  return (
    <View style={{ flex: 1 }}>
      <CollapsibleHeaderTabView
        prerenderingSiblingsNumber={1}
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
                style={{ borderWidth: 0, paddingRight: 50 }}
                textStyle={{
                  fontFamily: fonts.primary,
                  width: "100%",
                  fontWeight: "bold",
                  fontSize: 14,
                }}
              />
              <AddressBar />
              {location && categories?.getPreferredCategories && isAuth && (
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
        {location && (
          <ProductList
            listType="All"
            filterParams={{
              stores: storeIds?.onlineStoreByGeoCoordinates
                ? storeIds.onlineStoreByGeoCoordinates.map((item) => item.id)
                : [],
              textToSearch,
            }}
            index={0}
            filter={
              textToSearch.length > 0
                ? "ACTIVE_BY_STORES_AND_FULL_TEXT_SEARCH"
                : "ACTIVE_BY_STORES"
            }
            tabLabel="All"
          />
        )}
        {location && (
          <ProductList
            listType="Announcements"
            filterParams={{
              stores: storeIds?.onlineStoreByGeoCoordinates
                ? storeIds.onlineStoreByGeoCoordinates.map((item) => item.id)
                : [],
              textToSearch,
            }}
            index={1}
            filter={
              textToSearch.length > 0
                ? "ACTIVE_BY_STORES_AND_FULL_TEXT_SEARCH"
                : "ACTIVE_BY_STORES_AND_ANNOUNCEMENT"
            }
            tabLabel="Announcements"
            isAnnouncement={true}
          />
        )}
        {location &&
          categories?.getPreferredCategories &&
          categories?.getPreferredCategories.map((category, index) => (
            <ProductList
              key={`${index}`}
              listType={category.name}
              index={index + 2}
              filter={
                textToSearch.length > 0
                  ? "ACTIVE_BY_STORES_AND_FULL_TEXT_SEARCH"
                  : "ACTIVE_BY_STORES_AND_CATEGORY"
              }
              tabLabel={category.name}
              filterParams={{
                stores: storeIds?.onlineStoreByGeoCoordinates
                  ? storeIds.onlineStoreByGeoCoordinates.map((item) => item.id)
                  : [],
                category: category.name,
                textToSearch,
              }}
            />
          ))}
      </CollapsibleHeaderTabView>
    </View>
  );
}
