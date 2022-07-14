import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { vs } from "react-native-size-matters";
import { useRoute } from "@react-navigation/native";

import { TextInput, Button, PasswordInput } from "../../Components";
import styles from "./styles";

/**
 * validation and jwt modules
 */
import * as validator from "../../Validation";
import * as jwt from "../../Apollo/jwt-request";
import * as storage from "../../Apollo/local-storage";
/** userProfileVar is the variable for the cache to get set  userProfile attributes */
import { userProfileVar } from "../../Apollo/cache";
import NavigationService from "../../Navigation/NavigationService";
import jwt_decode from "jwt-decode";

import { BUYER_PROFILE_BY_USERID } from "../../Apollo/queries/queries_user";
import { client } from "../../Apollo/apolloClient";
import { AlertContext } from "../Root/GlobalContext";
import colors from "../../Themes/Colors";
import GetBillingDetail from "../../hooks/billingDetails";
import { useGetSellerProfileWithSellerIdLazyQuery } from "../../../generated/graphql";

function LoginScreen(props) {
  // refs
  let passwordInput = null;
  const { dispatch } = useContext(AlertContext);

  let [keyboardHeight, setKeyboardHeight] = useState(0);
  let [loginInput, setLoginInput] = useState("");
  let [psswd, setPsswd] = useState("");
  const { params } = useRoute();

  useEffect(() => {
    Keyboard.addListener("keyboardWillShow", _keyboardWillShow);
    Keyboard.addListener("keyboardWillHide", _keyboardWillHide);
    /**
     * this page is a bit diferent as the navigation params will aways be
     * undefined unless in the single case where we are coming from
     * ForgotPassword
     */
    if (params === undefined) {
      //console.log ('debug message caught expected undefined parameter')
    } else {
      //  console.log (`'debug message ${props.navigation.state.params.showEms}`)
    }

    return () => {
      // Anything in here is fired on component unmount.
      Keyboard.removeListener("keyboardWillShow", _keyboardWillShow);
      Keyboard.removeListener("keyboardWillHide", _keyboardWillHide);
    };
  }, [params, props]);
  const [getBuyerId] = useGetSellerProfileWithSellerIdLazyQuery();

  // useEffect(() => {
  //   if (isBillingLoaded) NavigationService.navigate("MainScreen");
  // }, [isBillingLoaded]);

  const onSignIn = async () => {
    // see /home/ubu5/vk-dev/MobileApp/__tests__/v_tests.js  'test determine user input'
    console.log("onSignIn" + `${loginInput}:::${psswd}`); // to-do remove
    let ret = validator.loginDifferentiator(loginInput);
    if (ret.isValid) {
      // we are good so we can test for email or phone
      if (ret.isEmail) {
        let loginRequest = {
          username: loginInput,
          password: psswd,
        };
        // console.log(profile.data.userProfileVar.email)// to-do remove
        dispatch({
          type: "changLoading",
          payload: true,
        });
        await jwt
          .runTokenFlow(loginRequest)
          .then(function (res) {
            if (typeof res !== "undefined") {
              let access_token = res.data.access_token;
              let decoded = jwt_decode(access_token);
              console.log("decoded====================================");
              console.log(JSON.stringify(decoded));
              console.log("====================================");
              // if (!decoded.email_verified) {
              //   resendCode({
              //     variables: { emailAddress: decoded.email },
              //     onCompleted: () => {
              //       dispatch({
              //         type: "changLoading",
              //         payload: false,
              //       });
              //       NavigationService.navigate("OTPScreen", {
              //         fromScreen: "RegisterScreen",
              //         phone: decoded.email,
              //       });
              //     },
              //     onError: () => {
              //       dispatch({
              //         type: "changLoading",
              //         payload: false,
              //       });
              //     },
              //   });
              //   return;
              // }
              if (access_token === "undefined") {
                console.log("no access token");
              }
              storage.setLocalStorageValue(
                storage.LOCAL_STORAGE_TOKEN_KEY,
                access_token
              );
              global.access_token = access_token;
              storage.setLocalStorageValue(
                storage.LOCAL_STORAGE_USER_NAME,
                loginInput
              );
              storage.setLocalStorageValue(
                storage.LOCAL_STORAGE_USER_PASSWORD,
                psswd
              );

              console.log("decoded====================================");
              console.log(JSON.stringify(decoded));
              console.log("====================================");
              global.userProfileId = decoded.sub;
              dispatch({
                type: "changLoading",
                payload: false,
              });
              NavigationService.navigate("MainScreen");
              // getBuyerId({
              //   variables: {
              //     sellerId: decoded.sub,
              //   },
              //   context: {
              //     headers: {
              //       isPrivate: true,
              //       Authorization: `Bearer ${access_token}`,
              //     },
              //   },
              // })
              //   .then((result) => {
              //     dispatch({
              //       type: "changLoading",
              //       payload: false,
              //     });
              //     if (typeof result.data !== "undefined") {
              //       console.log(
              //         `Login BUYER_PROFILE_BY_USERID look up buyerId calls back ${JSON.stringify(
              //           result.data
              //         )}`
              //       );
              //       const { buyerProfileByUserId } = result.data;
              //       if (buyerProfileByUserId.buyerId === null) {
              //         console.log("found null GuestBuyer buyerId");
              //       } else {
              //         global.buyerId = buyerProfileByUserId.buyerId;
              //         storage.setLocalStorageValue(
              //           loginRequest.username,
              //           buyerProfileByUserId.buyerId
              //         );

              //         storage.setLocalStorageValue(
              //           storage.LOCAL_STORAGE_USER_PROFILE,
              //           JSON.stringify(buyerProfileByUserId)
              //         );
              //         userProfileVar({
              //           userId: buyerProfileByUserId?.userId,
              //           buyerId: buyerProfileByUserId?.buyerId,
              //           userName: buyerProfileByUserId?.userName,
              //           email: buyerProfileByUserId?.email,
              //           phone: buyerProfileByUserId?.phoneNumber,
              //           isAuth: true,
              //         });
              //         NavigationService.navigate("MainScreen");
              //       }
              //     } else {
              //       console.log("Login BUYER_PROFILE_BY_USERID server error");
              //     }
              //   })
              //   .catch((err) => {
              //     dispatch({
              //       type: "changLoading",
              //       payload: false,
              //     });
              //     if (typeof err !== "undefined") {
              //       console.log(
              //         "Login BUYER_PROFILE_BY_USERID Query error " + err
              //       );
              //     }
              //   });
            }
            // need check for status code = 200
            // below is a mock for the expected jwt shpould be something like res.data.<some json token id>
            else {
              console.log("psswd is not correct");
              dispatch({
                type: "changLoading",
                payload: false,
              });
              dispatch({
                type: "changAlertState",
                payload: {
                  visible: true,
                  message: "Check Credentials",
                  color: colors.error,
                  title: "email or password is invalid",
                },
              });
            }
          })
          .catch(function (err) {
            // here we will need to deal with a  status` code 401 and refresh jwt and try again
          });
      } else {
        //     // must be phone
        console.log("phone is valid but not implemented");
        dispatch({
          type: "changAlertState",
          payload: {
            visible: true,
            message: "Check Credentials",
            color: colors.error,
            title: "email or password is invalid",
          },
        });
      }
    } else {
      dispatch({
        type: "changAlertState",
        payload: {
          visible: true,
          message: "Check Credentials",
          color: colors.error,
          title: "email or password is invalid",
        },
      });
    }
  };

  const _keyboardWillShow = (e) => {
    setKeyboardHeight(e.endCoordinates.height);
  };

  const _keyboardWillHide = () => {
    setKeyboardHeight(0);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView
        style={styles.safeArea}
        edges={["top", "right", "left", "bottom"]}
      >
        <View style={styles.bodyContainer}>
          <Text style={styles.txt1}>Sign In</Text>

          {/* <Text style={styles.txt2}>
            Join purchases to get what{"\n"}you want with great discounts
          </Text> */}
          <Text style={styles.txt2}></Text>

          <TextInput
            style={styles.emailInput}
            placeholder={"Email or phone number"}
            onSubmitEditing={() => passwordInput.getInnerRef().focus()}
            returnKeyType={"next"}
            onChangeText={(text) => setLoginInput(text)}
          />

          <PasswordInput
            style={styles.passwordInput}
            placeholder={"Enter your password"}
            ref={(r) => (passwordInput = r)}
            onSubmitEditing={onSignIn}
            returnKeyType={"done"}
            onChangeText={(text) => setPsswd(text)}
          />

          <View style={{ height: keyboardHeight - vs(100) }} />

          <Button
            //onPress={onDebugSignIn}
            onPress={onSignIn}
            text={"SIGN IN"}
          />

          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => NavigationService.navigate("ForgotPasswordScreen")}
            >
              <Text style={styles.txtAction}> </Text>
              {/* <Text style={styles.txtAction}>I FORGOT MY PASSWORD</Text> */}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => NavigationService.navigate("RegisterScreen")}
            >
              <Text style={styles.txtAction}></Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

export default LoginScreen;
