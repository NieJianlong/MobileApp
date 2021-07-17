import React, { useState, useEffect } from "react";
import { View, StatusBar } from "react-native";
import { s } from "react-native-size-matters";
import { SafeAreaView } from "react-native-safe-area-context";
import { Alert, RadiusButton } from "../../Components";
import { Colors } from "../../Themes";
import styles from "./styles";
import CategoryAndProductList from "./CategoryAndProductList/Index";
const SearchBarContext = React.createContext({});

function Explore(props) {
  const [showSearchBar, setShowSearchBar] = useState(false);
  //to show an alert to users that their accounts have been activated
  const [
    showAccountActivatedSuccessfullyAlert,
    setShowAccountActivatedSuccessfullyAlert,
  ] = useState(false);
  //Fixed a bug that accidentally triggered onclick when swiping
  // to show an alert to users that they need to activate their accounts
  const [showAccountActivateAlert, setShowAccountActivateAlert] = useState(
    false
  );
  // const setSearchBar = useCallback(() => {
  //   setShowSearchBar
  // }, [input]);
  useEffect(() => {
    if (showAccountActivatedSuccessfullyAlert) {
      setTimeout(() => {
        setShowAccountActivatedSuccessfullyAlert(false);
      }, 5000);
    }
  }, [showAccountActivatedSuccessfullyAlert]);

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
        <SearchBarContext.Provider value={{ showSearchBar }}>
          <CategoryAndProductList />
        </SearchBarContext.Provider>
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
