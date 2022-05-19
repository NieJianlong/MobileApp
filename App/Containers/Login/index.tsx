import React, { useState, useEffect, useContext, useRef, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  useWindowDimensions,
  FlatList,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { vs } from "react-native-size-matters";

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
import { Controller, useForm } from "react-hook-form";

function LoginScreen(props) {
  // refs
  // let passwordInput = null;
  const [fetchedEmail, setFetchedEmail] = useState([]);
  const passwordInput = useRef();
  const [savedEmail, setSavedEmail] = useState();
  const [showEmailList, setShowEmailList] = useState(false);
  const { showCloseButton, setLogin, onDismiss } = useLogin();
  const {
    control,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    username: string;
    password: string;
  }>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const emailRetrieve = async () => {
    try {
      const value = await AsyncStorage.getItem("emailList");
      setFetchedEmail(JSON.parse(value));
    } catch (error) {
      console.log("error retrieve");
    }
  };

  useEffect(() => {
    emailRetrieve();
  }, []);

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
          // storage.setLocalStorageValue(
          //   loginRequestMemo.username,
          //   buyerProfileByUserId.buyerId
          // );

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
          NavigationService.navigate("MainScreen", { screen: "ExploreScreen" });
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

  const loginRequestMemo = useMemo(() => {
    let ret = validator.loginDifferentiator(getValues("username"));
    if (ret.isValid) {
      // we are good so we can test for email or phone
      if (ret.isEmail || ret.isPhone) {
        let loginRequest = {
          username: ret.isPhone
            ? "+91" + getValues("username")
            : getValues("username")?.trim(),
          password: getValues("password")?.trim(),
        };
        return loginRequest;
      }
    }
    return {
      username: getValues("username")?.trim(),
      password: getValues("password")?.trim(),
    };
  }, [getValues]);
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

  const onSignIn = async (data: { username: string; password: string }) => {
    // see /home/ubu5/vk-dev/MobileApp/__tests__/v_tests.js  'test determine user input'
    let ret = validator.loginDifferentiator(data.username);
    // setEmailList({ emailListed: sampleData });
    storeEmail();
    if (ret.isValid) {
      // setEmailList({ emailListed: sampleData });
      // we are good so we can test for email or phone
      if (ret.isEmail || ret.isPhone) {
        let loginRequest = {
          username: ret.isPhone
            ? "+91" + data.username?.trim()
            : data.username?.trim(),
          password: data.password?.trim(),
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
              global.access_token = access_token;
              // global.userProfileId = decoded.sub;
              let decoded = jwt_decode(access_token);
              // phone_number_verified
              //&& !decoded.email_verified
              // if (!decoded.phone_number_verified && !decoded.email_verified) {
              //   resendCode({
              //     variables: {
              //       sendCodeRequest: {
              //         userId: decoded?.sub,
              //         validationType: validator.isValidEmail(loginInput?.trim())
              //           ? ValidationType.Email
              //           : ValidationType.Sms,
              //       },
              //     },
              //     context: {
              //       headers: {
              //         isPrivate: true,
              //       },
              //     },
              //     onCompleted: () => {
              //       dispatch({
              //         type: "changLoading",
              //         payload: false,
              //       });
              //       NavigationService.navigate("OTPScreen", {
              //         fromScreen: "RegisterScreen",
              //         phone: ret.isPhone ? "+91" + loginInput : loginInput,
              //         password: psswd?.trim(),
              //         userId: decoded?.sub,
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
                ret.isPhone ? "+91" + data.username : data.username
              );
              storage.setLocalStorageValue(
                storage.LOCAL_STORAGE_USER_PASSWORD,
                data.password
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
            storage.setLocalStorageValue(storage.LOCAL_STORAGE_USER_NAME, "");
            storage.setLocalStorageValue(
              storage.LOCAL_STORAGE_USER_PASSWORD,
              ""
            );
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

  const sampleData = ["jonathan@gmail.com"];

  const storeEmail = async () => {
    const isExisting = fetchedEmail.find((data) => data === savedEmail);
    if (isExisting === undefined) {
      const val = [...fetchedEmail, savedEmail];
      try {
        await AsyncStorage.setItem("emailList", JSON.stringify(val));
      } catch (error) {
        console.log("error saving data");
      }
    }
  };

  const deleteEmailAsync = async (data) => {
    try {
      await AsyncStorage.setItem("emailList", JSON.stringify(data));
    } catch (error) {
      console.log("error deleting email", error);
    }
  };

  const deleteEmail = (valTodelete) => {
    const filteredData = fetchedEmail.filter((item) => item !== valTodelete);
    setFetchedEmail(filteredData);
    deleteEmailAsync(filteredData);
    if (filteredData.length === 0) {
      setShowEmailList(false);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.emailListBtn}
          onPress={() => {
            setSavedEmail(item);
            setShowEmailList(false);
          }}
        >
          <Text>{item}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => deleteEmail(item)}
        >
          <Image source={Images.trash} style={styles.icDelete} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={[t.absolute, t.left0, t.top0, { width, height }, t.bgWhite]}>
      <SafeAreaView
        style={styles.safeArea}
        edges={["top", "right", "left", "bottom"]}
      >
        <View style={styles.bodyContainer}>
          <Text style={styles.txt1}>Sign In</Text>

          <Text style={styles.txt2}>
            Join purchases to get what{"\n"}you want with great discounts
          </Text>
          {showEmailList && (
            <View style={styles.emailListContainer}>
              <TouchableOpacity
                style={styles.btnClose}
                onPress={() => {
                  setShowEmailList(false);
                }}
              >
                <Image source={Images.crossMedium} style={styles.icClose} />
              </TouchableOpacity>
              <FlatList
                style={styles.flatListstyle}
                data={fetchedEmail}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
              />
            </View>
          )}

          <View>
            <Controller
              control={control}
              rules={{
                required: "Please input your email or phone number.",
                // pattern: {
                //   value: /^[6-9]\d{9}$/,
                //   message: "Invalid phone number or email",
                // },
                validate: {
                  positive: (v) => {
                    let ret = validator.loginDifferentiator(v);
                    if (ret.isValid) {
                      return true;
                    }
                    return "Invalid email or phone number";
                  },
                },
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.emailInput}
                  placeholder={"Email or phone number"}
                  onSubmitEditing={() =>
                    passwordInput?.current.getInnerRef().focus()
                  }
                  value={savedEmail ? savedEmail : value}
                  returnKeyType={"next"}
                  onChangeText={(text) => {
                    text = text.trim();
                    onChange(text);
                    setSavedEmail(text);
                  }}
                  textAlignVertical={"center"}
                  onFocus={() => {
                    onChange(savedEmail);
                    if (fetchedEmail.length !== 0) {
                      setShowEmailList(true);
                    }
                  }}
                />
              )}
              name="username"
            />
            {errors.username && (
              <Text style={[t.textRed900, t._mT6, t.mB4, t.mL4]}>
                {errors.username.message}
              </Text>
            )}
          </View>
          <View>
            <Controller
              control={control}
              rules={{
                required: "Please input your password.",
                minLength: {
                  value: 8,
                  message: "Length must be 8 or more",
                },
                validate: {
                  positive: (v) => {
                    if (v.indexOf(" ") !== -1)
                      return "Passwords should not contain Spaces";
                    return true;
                  },
                },
              }}
              render={({ field: { onChange, value } }) => (
                <PasswordInput
                  style={styles.passwordInput}
                  placeholder={"Enter your password"}
                  ref={passwordInput}
                  value={value}
                  onSubmitEditing={handleSubmit(onSignIn)}
                  returnKeyType={"done"}
                  onChangeText={onChange}
                  autoCapitalize="none"
                  onFocus={() => {
                    setShowEmailList(false);
                  }}
                />
              )}
              name="password"
            />
            {errors.password && (
              <Text style={[t.textRed900, t._mT6, t.mB6, t.mL4]}>
                {errors.password.message}
              </Text>
            )}
          </View>

          <View style={{ height: keyboardHeight - vs(100) }} />

          <Button
            //onPress={onDebugSignIn}
            onPress={handleSubmit(onSignIn)}
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
