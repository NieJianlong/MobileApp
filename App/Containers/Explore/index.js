import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { s } from "react-native-size-matters";
import { SafeAreaView } from "react-native-safe-area-context";
import { Alert, RadiusButton } from "../../Components";
import { Colors } from "../../Themes";
import styles from "./styles";
import CategoryAndProductList from "./CategoryAndProductList/Index";
import { useMutation, useReactiveVar } from "@apollo/client";
import { SendVerifyEmail } from "../Register/gql/register_mutations";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { userProfileVar } from "../../Apollo/cache";
import useStatusBar from "../../hooks/useStatusBar";
const SearchBarContext = React.createContext({});

function Explore(props) {
  const { setStatusBar } = useStatusBar();
  //to show an alert to users that their accounts have been activated
  const [
    showAccountActivatedSuccessfullyAlert,
    setShowAccountActivatedSuccessfullyAlert,
  ] = useState(false);
  // const [sendVerifyEmail] = useMutation(SendVerifyEmail);
  //Fixed a bug that accidentally triggered onclick when swiping
  // to show an alert to users that they need to activate their accounts
  const [showAccountActivateAlert, setShowAccountActivateAlert] =
    useState(false);
  // useEffect(() => {
  //   sendVerifyEmail({
  //     variables: { userId: global.userProfileId },
  //     context: {
  //       headers: {
  //         isPrivate: true,
  //       },
  //     },
  //   });
  // }, [sendVerifyEmail]);
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
  const navigation = useNavigation();
  React.useEffect(
    () =>
      navigation.addListener("beforeRemove", (e) => {
        e.preventDefault();
      }),
    [navigation]
  );
  useFocusEffect(
    React.useCallback(() => {
      setStatusBar({ hidden: false });
    }, [])
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
      <SafeAreaView
        style={styles.mainContainer}
        edges={["top", "left", "right"]}
      >
        <CategoryAndProductList />
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
