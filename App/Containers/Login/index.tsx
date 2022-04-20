import React, { useState, useEffect, useContext, useRef, useMemo } from "react";
import {
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  Keyboard,
  Image,
  useWindowDimensions,
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

import { AlertContext } from "../Root/GlobalContext";
import colors from "../../Themes/Colors";
import { useBuyerProfileByUserIdLazyQuery } from "../../../generated/graphql";
import { Images } from "../../Themes";
import { t } from "react-native-tailwindcss";
import useLogin from "../../hooks/useLogin";

function LoginScreen(props) {
  // refs
  // let passwordInput = null;
  const passwordInput = useRef();
  const { showCloseButton, setLogin, onDismiss } = useLogin();

  const [getBuerIdProfile] = useBuyerProfileByUserIdLazyQuery({
    onError: (err) => {
      dispatch({
        type: "changLoading",
        payload: false,
      });
    },
    onCompleted: (result) => {
      dispatch({
        type: "changLoading",
        payload: false,
      });
      if (typeof result.buyerProfileByUserId !== "undefined") {
        const { buyerProfileByUserId } = result;
        if (buyerProfileByUserId?.buyerId === null) {
          console.log("found null GuestBuyer buyerId");
        } else {
          global.buyerId = buyerProfileByUserId?.buyerId;
          storage.setLocalStorageValue(
            loginRequestMemo.username,
            buyerProfileByUserId.buyerId
          );

          storage.setLocalStorageValue(
            storage.LOCAL_STORAGE_USER_PROFILE,
            JSON.stringify(buyerProfileByUserId)
          );

          userProfileVar({
            userId: buyerProfileByUserId?.userId ?? "",
            buyerId: buyerProfileByUserId?.buyerId ?? "",
            userName: buyerProfileByUserId?.userName ?? "",
            email: buyerProfileByUserId?.email ?? "",
            phone: buyerProfileByUserId?.phoneNumber ?? "",
            isAuth: true,
            billingDetails: buyerProfileByUserId?.billingDetails,
            billingDetailsId:
              buyerProfileByUserId?.billingDetails?.billingDetailsId,
            firstName: buyerProfileByUserId?.firstName ?? "",
            lastName: buyerProfileByUserId?.lastName ?? "",
          });
          NavigationService.navigate("MainScreen");
          if (onDismiss) {
            onDismiss();
          }
        }
      } else {
        console.log("Login  server error");
      }
    },
  });

  const { dispatch } = useContext(AlertContext);

  let [keyboardHeight, setKeyboardHeight] = useState(0);
  let [loginInput, setLoginInput] = useState("");
  let [psswd, setPsswd] = useState("");
  const loginRequestMemo = useMemo(() => {
    let ret = validator.loginDifferentiator(loginInput);
    if (ret.isValid) {
      // we are good so we can test for email or phone
      if (ret.isEmail || ret.isPhone) {
        let loginRequest = {
          username: ret.isPhone
            ? "+91" + loginInput?.trim()
            : loginInput?.trim(),
          password: psswd?.trim(),
        };
        return loginRequest;
      }
    }
    return {
      username: loginInput?.trim(),
      password: psswd?.trim(),
    };
  }, [loginInput, psswd]);
  useEffect(() => {
    storage.setLocalStorageEmpty();
  }, []);

  useEffect(() => {
    Keyboard.addListener("keyboardWillShow", _keyboardWillShow);
    Keyboard.addListener("keyboardWillHide", _keyboardWillHide);

    return () => {
      // Anything in here is fired on component unmount.
      Keyboard.removeListener("keyboardWillShow", _keyboardWillShow);
      Keyboard.removeListener("keyboardWillHide", _keyboardWillHide);
    };
  }, [props]);

  // useEffect(() => {
  //   if (isBillingLoaded) NavigationService.navigate("MainScreen");
  // }, [isBillingLoaded]);

  const onSignIn = async () => {
    // see /home/ubu5/vk-dev/MobileApp/__tests__/v_tests.js  'test determine user input'
    console.log("onSignIn" + `${loginInput}:::${psswd}`); // to-do remove
    let ret = validator.loginDifferentiator(loginInput);
    if (ret.isValid) {
      // we are good so we can test for email or phone
      if (ret.isEmail || ret.isPhone) {
        let loginRequest = {
          username: ret.isPhone
            ? "+91" + loginInput?.trim()
            : loginInput?.trim(),
          password: psswd?.trim(),
        };
        // console.log(profile.data.userProfileVar.email)// to-do remove
        dispatch({
          type: "changLoading",
          payload: true,
        });
        await jwt
          .runTokenFlow(loginRequest)
          .then(async (res) => {
            if (typeof res !== "undefined") {
              let access_token = res.data.access_token;
              let decoded = jwt_decode(access_token);
              console.log("decoded====================================");
              console.log(JSON.stringify(decoded));
              console.log("====================================");
              // await userHasVerifiedPhoneNumber({
              //   variables: { userId: decoded.sub },
              // });
              // if (!decoded.email_verified) {
              //   resendCode({
              //     variables: { phoneNumber: decoded.email },
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
                ret.isPhone ? "+91" + loginInput : loginInput
              );
              storage.setLocalStorageValue(
                storage.LOCAL_STORAGE_USER_PASSWORD,
                psswd
              );

              console.log("decoded====================================");
              console.log(decoded);
              console.log("====================================");
              global.userProfileId = decoded.sub;
              // this is wrong need request for buyerId from userId
              getBuerIdProfile({
                variables: { userProfileId: decoded.sub },
                context: {
                  headers: {
                    isPrivate: true,
                    Authorization: `Bearer ${access_token}`,
                  },
                },
              });
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
  const { width, height } = useWindowDimensions();
  return (
    <View style={[t.absolute, t.left0, t.top0, { width, height }, t.bgWhite]}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView
        style={styles.safeArea}
        edges={["top", "right", "left", "bottom"]}
      >
        <TouchableOpacity
          style={[{ marginLeft: width - 50 }, t.mT4]}
          onPress={() => {
            NavigationService.goBack();
          }}
        >
          <Image style={[t.h6, t.w6]} source={Images.crossMedium} />
        </TouchableOpacity>

        <View style={styles.bodyContainer}>
          <Text style={styles.txt1}>Sign In</Text>

          <Text style={styles.txt2}>
            Join purchases to get what{"\n"}you want with great discounts
          </Text>

          <TextInput
            style={styles.emailInput}
            placeholder={"Email or phone number"}
            onSubmitEditing={() => passwordInput?.current.getInnerRef().focus()}
            returnKeyType={"next"}
            onChangeText={(text) => setLoginInput(text)}
          />

          <PasswordInput
            style={styles.passwordInput}
            placeholder={"Enter your password"}
            ref={passwordInput}
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
    </View>
  );
}

export default LoginScreen;
