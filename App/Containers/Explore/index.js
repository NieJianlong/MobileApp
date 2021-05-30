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

function Explore(props) {
  const ref = useRef();
  const screenWidth = useWindowDimensions().width;
  const [
    showAccountActivatedSuccessfullyAlert,
    setShowAccountActivatedSuccessfullyAlert,
  ] = useState(false);
  //Fixed a bug that accidentally triggered onclick when swiping
  const [canGoNext, setCanGoNext] = useState(true);

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
            <ProductList
              listType="All"
              index={0}
              tabLabel="All"
              canGoNext={canGoNext}
              callBack={ableGoNext}
            />
            <ProductList
              listType="Announcements"
              index={1}
              tabLabel="Announcements"
              isAnnouncement={true}
              canGoNext={canGoNext}
              callBack={ableGoNext}
            />
            <ProductList
              listType="Electronics"
              index={2}
              tabLabel="Electronics"
              canGoNext={canGoNext}
              callBack={ableGoNext}
            />
            <ProductList
              listType="Food"
              index={3}
              tabLabel="Food & Beverage"
              canGoNext={canGoNext}
              callBack={ableGoNext}
            />
            <ProductList
              listType="Fashion"
              index={4}
              goFirst={goFirst}
              tabLabel="Fashion"
              canGoNext={canGoNext}
              callBack={ableGoNext}
            />
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
