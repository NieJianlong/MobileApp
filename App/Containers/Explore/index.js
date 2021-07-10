import React, { useState, useEffect, useCallback, useRef } from "react";
import { View, StatusBar, Image, TouchableOpacity } from "react-native";
import { s, vs } from "react-native-size-matters";
import { SafeAreaView } from "react-native-safe-area-context";
import { Alert, RadiusButton } from "../../Components";
import { Colors, Images } from "../../Themes";
import styles from "./styles";
import AddressBar from "./Components/AddressBar";
import ExploreHeader from "./Components/ExploreHeader";
import ProductList from "./Components/ProductList/ProductList";
import { CollapsibleHeaderTabView } from "react-native-scrollable-tab-view-collapsible-header";
import { ScrollableTabBar } from "react-native-scrollable-tab-view";
import colors from "../../Themes/Colors";
import fonts from "../../Themes/Fonts";

import NavigationService from "../../Navigation/NavigationService";
import useWindowDimensions from "react-native/Libraries/Utilities/useWindowDimensions";

/** updates for new queries get co-ordintaes delivery address */
/** updates for the cart */
import { localCartVar } from "../../Apollo/cache";
import { useReactiveVar, useLazyQuery, useQuery } from "@apollo/client";
import * as aQM from "./gql/explore_queries";

function Explore(props) {
  const ref = useRef();
  const screenWidth = useWindowDimensions().width;
  //to show an alert to users that their accounts have been activated
  const [
    showAccountActivatedSuccessfullyAlert,
    setShowAccountActivatedSuccessfullyAlert,
  ] = useState(false);
  //Fixed a bug that accidentally triggered onclick when swiping
  const [canGoNext, setCanGoNext] = useState(true);
  // to show an alert to users that they need to activate their accounts
  const [showAccountActivateAlert, setShowAccountActivateAlert] = useState(
    false
  );
  const ableGoNext = useCallback(() => {
    setCanGoNext(true);
  }, []);
  const goFirst = useCallback(() => {
    ref.current.goToPage(0);
  }, []);
  useEffect(() => {
    if (showAccountActivatedSuccessfullyAlert) {
      setTimeout(() => {
        setShowAccountActivatedSuccessfullyAlert(false);
      }, 5000);
    }
  }, [showAccountActivatedSuccessfullyAlert]);

  /** updates for local cart Appollo cache
   * useReactiveVar => we will get updates from other screens
   */
  const localCartVarReactive = useReactiveVar(localCartVar);

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
  const [location, setLocation] = useState([]);

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
      console.log(`Explore runGeoQuery onCompleted ${JSON.stringify(res)}`);
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
      location.push(1.5, 1.5);
      setLocation(location);
      // setIsReady(true);
    },
    onError: (res) => {
      console.log(`Explore runGeoQuery onError ${JSON.stringify(res)}`);
      location.push(1.5, 1.5);
      setLocation(location);
      // setIsReady(true);
    },
  });

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
  const { loading, error, data, refetch, fetchMore } = useQuery(
    aQM.GET_CATEGORIES,
    {
      variables: {
        filter: "ACTIVE_BY_COORDINATES_AND_ANNOUNCEMENT",
        filterParams: {
          latitude: 1.5,
          longitude: 1.5,
        },
        pageNo: 1,
        pageSize: 100,
      },
      context: {
        headers: {
          isPrivate: false,
        },
      },
      onError: (res) => {},
      onCompleted: (res) => {
        // map data from server for now
        // add missing fields for product review
        // update for name changes in data from server
      },
    }
  );

  /**
   *  design  updates see below  {isReady && (
   *  <ProductList
   *  we need to only call for the product data when we have the geo-cords
   *  see isReady location runGeoQuery
   *  temp soln can be updated to something better later
   *
   */
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <SafeAreaView
        style={styles.mainContainer}
        edges={["top", "left", "right"]}
      >
        <View
          style={{ flex: 1 }}
          onMoveShouldSetResponder={({ nativeEvent }) => {
            if (canGoNext) {
              setCanGoNext(false);
            }
            return false;
          }}
        >
          <CollapsibleHeaderTabView
            prerenderingSiblingsNumber={1}
            makeHeaderHeight={() => vs(50)}
            tabBarActiveTextColor={colors.primary}
            ref={ref}
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
                    textStyle={{
                      fontFamily: fonts.primary,
                      width: "100%",
                      fontWeight: "bold",
                      fontSize: 14,
                    }}
                  />
                  <AddressBar />
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
                        NavigationService.navigate("EditCategoriesScreen");
                      }}
                      style={[styles.btnAddContainer]}
                    >
                      <Image source={Images.add1} style={styles.icAdd} />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
            renderScrollHeader={() => <ExploreHeader />}
          >
            {location !== [] && (
              <ProductList
                listType="All"
                location={location}
                index={0}
                tabLabel="All"
                canGoNext={canGoNext}
                callBack={ableGoNext}
              />
            )}
            {location !== [] && (
              <ProductList
                listType="Announcements"
                location={location}
                index={1}
                tabLabel="Announcements"
                isAnnouncement={true}
                canGoNext={canGoNext}
                callBack={ableGoNext}
              />
            )}
            {location !== [] && (
              <ProductList
                listType="Electronics"
                location={location}
                index={2}
                tabLabel="Electronics"
                canGoNext={canGoNext}
                callBack={ableGoNext}
              />
            )}
            {location !== [] && (
              <ProductList
                listType="Food"
                location={location}
                index={3}
                tabLabel="Food & Beverage"
                canGoNext={canGoNext}
                callBack={ableGoNext}
              />
            )}
            {location !== [] && (
              <ProductList
                listType="Fashion"
                location={location}
                index={4}
                goFirst={goFirst}
                //last one item we must add a invalid string for it can show normal,pls not delete
                tabLabel="Fashion        dxx"
                canGoNext={canGoNext}
                callBack={ableGoNext}
              />
            )}
          </CollapsibleHeaderTabView>
        </View>
      </SafeAreaView>
      {showAccountActivatedSuccessfullyAlert && (
        <Alert
          visible={showAccountActivatedSuccessfullyAlert}
          message={"Your account has been activated successfully"}
          color={Colors.success}
          onDismiss={() => setShowAccountActivatedSuccessfullyAlert(false)}
        />
      )}
      {showAccountActivateAlert && (
        <Alert
          visible={showAccountActivateAlert}
          title={"Activate First"}
          message={
            "You've successfully registered your account. Please check your email for the activation link so can make full use of your account."
          }
          color={Colors.secondary00}
          onDismiss={() => setShowAccountActivateAlert(false)}
          action={() => (
            <View style={{ width: s(120) }}>
              <RadiusButton text={"RESEND EMAIL"} />
            </View>
          )}
        />
      )}
    </View>
  );
}
export default Explore;
