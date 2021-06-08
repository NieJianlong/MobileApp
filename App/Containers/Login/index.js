import React, { useState, useEffect } from "react";
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
import { gql } from "@apollo/client";

import { TextInput, Button, PasswordInput, Alert } from "../../Components";

import { Colors } from "../../Themes";
import styles from "./styles";

/**
 * validation and jwt modules
 */
import * as validator from "../../Validation";
import * as jwt from "../../Apollo/jwt-request";
import * as storage from "../../Apollo/local-storage";
import { runRefreshCron } from "../../Apollo/cache";
/** userProfileVar is the variable for the cache to get set  userProfile attributes */
import { userProfileVar } from "../../Apollo/cache";
import NavigationService from "../../Navigation/NavigationService";

import jwt_decode from "jwt-decode";

import { BUYER_PROFILE_BY_USERID } from "../../Apollo/queries/queries_user";
import { client } from "../../Apollo/apolloClient";

function LoginScreen(props) {
  // refs
  let passwordInput = null;

  let [keyboardHeight, setKeyboardHeight] = useState(0);
  let [showResetPasswordAlert, setShowResetPasswordAlert] = useState(false);
  let [showValidationAlert, setShowValidationAlert] = useState(false);
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
      toggleResetPasswordAlert();
    }

    return () => {
      // Anything in here is fired on component unmount.
      Keyboard.removeListener("keyboardWillShow", _keyboardWillShow);
      Keyboard.removeListener("keyboardWillHide", _keyboardWillHide);
    };
  }, [props]);

  // u can use this to skip login for some development, need to paste an access token to replace somejwt
  const onDebugSignIn = async () => {
    userProfileVar({
      email: loginInput,
      isAuth: true,
    });
    storage.setLocalStorageValue(storage.LOCAL_STORAGE_TOKEN_KEY, "somejwt");
    NavigationService.navigate("MainScreen");
  };

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
        await jwt
          .runTokenFlow(loginRequest)
          .then(function (res) {
            if (typeof res !== "undefined") {
              console.log("login ok set auth");
              userProfileVar({
                email: loginRequest.username,
                isAuth: true,
              });

              let access_token = res.data.access_token;
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

              let decoded = jwt_decode(access_token);
              global.userProfileId = decoded.sub;
              // this is wrong need request for buyerId from userId
              client
                .query({
                  query: BUYER_PROFILE_BY_USERID,
                  variables: { userProfileId: decoded.sub },
                  context: {
                    headers: {
                      isPrivate: true,
                      Authorization: `Bearer ${access_token}`,
                    },
                  },
                })
                .then((result) => {
                  if (typeof result.data !== "undefined") {
                    console.log(
                      `Login BUYER_PROFILE_BY_USERID look up buyerId calls back ${JSON.stringify(
                        result.data
                      )}`
                    );
                    if (result.data.buyerProfileByUserId.buyerId === null) {
                      console.log("found null GuestBuyer buyerId");
                    } else {
                      global.buyerId = result.data.buyerProfileByUserId.buyerId;
                      storage.setLocalStorageValue(
                        loginRequest.username,
                        result.data.buyerProfileByUserId.buyerId
                      );
                      NavigationService.navigate("MainScreen");
                    }
                  } else {
                    console.log("Login BUYER_PROFILE_BY_USERID server error");
                  }
                })
                .catch((err) => {
                  if (typeof err !== "undefined") {
                    console.log(
                      "Login BUYER_PROFILE_BY_USERID Query error " + err
                    );
                  }
                });
            }
            // need check for status code = 200
            // below is a mock for the expected jwt shpould be something like res.data.<some json token id>
            else {
              console.log("psswd is not correct");
              toggleResetValidationAlert();
            }
          })
          .catch(function (err) {
            // here we will need to deal with a  status` code 401 and refresh jwt and try again
          });
      } else {
        //     // must be phone
        console.log("phone is valid but not implemented");
        toggleResetValidationAlert();
        //     userProfileVar({
        //         phone: loginInput,
        //         isAuth: true
        //     })
      }
    } else {
      console.log("data not valid");
      toggleResetValidationAlert();
    }
  };

  const toggleResetPasswordAlert = () => {
    setShowResetPasswordAlert(!showResetPasswordAlert);
  };

  const toggleResetValidationAlert = () => {
    setShowValidationAlert(!showValidationAlert);
  };

  const _keyboardWillShow = (e) => {
    setKeyboardHeight(e.endCoordinates.height);
  };

  const _keyboardWillHide = () => {
    setKeyboardHeight(0);
  };

  const renderResetPasswordAlert = () => {
    return (
      <Alert
        visible={showResetPasswordAlert}
        title={"Email/SMS Sent"}
        message={
          "We have sent you an email, please use the link on it to proceed with your new password creation."
        }
        color={Colors.secondary00}
        onDismiss={toggleResetPasswordAlert}
      />
    );
  };

  const renderValidationAlert = () => {
    return (
      <Alert
        visible={showValidationAlert}
        title={"Check Credentials"}
        message={"message to do"}
        color={Colors.warning}
        onDismiss={toggleResetValidationAlert}
      />
    );
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

          <Text style={styles.txt2}>
            Join purchases to get what{"\n"}you want with great discounts
          </Text>

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
              <Text style={styles.txtAction}>I FORGOT MY PASSWORD</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => NavigationService.navigate("RegisterScreen")}
            >
              <Text style={styles.txtAction}>REGISTER</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      {renderResetPasswordAlert()}
      {renderValidationAlert()}
    </View>
  );
}

export default LoginScreen;
