import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
//import { vs } from 'react-native-size-matters'

import {
  TextInput,
  Button,
  PasswordInput,
  AppBar,
  Switch,
  Alert,
} from "../../Components";

import * as jwt from "../../Apollo/jwt-request";
import * as storage from "../../Apollo/local-storage";
/** userProfileVar is the variable for the cache to get set  userProfile attributes */
import { userProfileVar } from "../../Apollo/cache";

import { Colors } from "../../Themes";
import styles from "./styles";
import NavigationService from "../../Navigation/NavigationService";
import { useLazyQuery } from "@apollo/client";
import { AlertContext } from "../Root/GlobalContext";
import colors from "../../Themes/Colors";
import jwt_decode from "jwt-decode";
import { BUYER_PROFILE_BY_USERID } from "../../Apollo/queries/queries_user";
import DeviceInfo from "react-native-device-info";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  BuyerProfileRequestForCreate,
  useRegisterBuyerMutation,
} from "../../../generated/graphql";
import { t } from "react-native-tailwindcss";
import { startsWith, trimEnd, trimStart } from "lodash";

function RegisterScreen(props) {
  const { dispatch } = useContext(AlertContext);
  // refs
  let nameInput,
    lastNameInput,
    emailInput,
    passwordInput = null;
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<BuyerProfileRequestForCreate>();

  // validation
  let [validationDisplay, setValidationDisplay] = useState("");
  let [showValidationAlert, setShowValidationAlert] = useState(false);
  let [validationMessage, setValidationMessage] = useState("");
  // because of the way the switch component is set up this is the opposite of what you would expect
  let [termsAccepted, setTermsAccepted] = useState(false);
  useEffect(() => {
    // let phoneNumber = "+918247278755";
    // setValue("phoneNumber", trimStart(phoneNumber, "+91"));
    if (Platform.OS === "android") {
      DeviceInfo.getPhoneNumber().then((phoneNumber) => {
        if (phoneNumber.startsWith("+91")) {
          setValue("phoneNumber", trimEnd(phoneNumber, "+91"));
        }
        // alert(phoneNumber);
        // Android: null return: no permission, empty string: unprogrammed or empty SIM1, e.g. "+15555215558": normal return value
      });
    }

    return () => {
      // Anything in here is fired on component unmount.
    };
  }, [setValue]);
  const [getBuyerId] = useLazyQuery(BUYER_PROFILE_BY_USERID, {
    variables: { userProfileId: global.userProfileId },
    context: {
      headers: {
        isPrivate: true,
      },
    },
    onCompleted: (res) => {
      dispatch({
        type: "changLoading",
        payload: false,
      });
      dispatch({
        type: "changAlertState",
        payload: {
          visible: true,
          message:
            "A confirmation email has been sent to your registered email address",
          color: colors.success,
          title: "Congratulations on your successful registration",
        },
      });
      //server often breakon，we should use a constant for testing
      const {
        buyerProfileByUserId: { buyerId },
      } = res;
      global.buyerId = buyerId;
      NavigationService.navigate("MainScreen");
    },
    onError: (res) => {
      //server often breakon，we should use a constant for testing
      global.buyerId = "9fcbb7cb-5354-489d-b358-d4e2bf386ff3";
      NavigationService.navigate("MainScreen");
    },
  });

  const autoSignIn = useCallback(async () => {
    //get username and possword from localStorage
    const username = "+91" + getValues("phoneNumber");
    const password = getValues("password");

    //if username && password exits,we can login auto
    if (username && password) {
      const { data } = await jwt.runTokenFlow({ username, password });
      let access_token = data.access_token;

      if (access_token === "undefined") {
        console.log("no access token");
      }
      userProfileVar({
        email: username,
        isAuth: true,
      });
      let decoded = jwt_decode(access_token);
      console.log("====================================");
      console.log();
      console.log("====================================");
      global.access_token = access_token;
      global.userProfileId = decoded.sub;

      storage.setLocalStorageValue(
        storage.LOCAL_STORAGE_TOKEN_KEY,
        access_token
      );
      global.access_token = access_token;
      storage.setLocalStorageValue(storage.LOCAL_STORAGE_USER_NAME, username);
      storage.setLocalStorageValue(
        storage.LOCAL_STORAGE_USER_PASSWORD,
        password
      );
      getBuyerId();

      storage.setLocalStorageValue(
        storage.LOCAL_STORAGE_TOKEN_KEY,
        access_token
      );
    }
  }, [getBuyerId, getValues]);
  //when app open,when can do auto login
  useEffect(() => {
    autoSignIn();
  }, [autoSignIn]);
  /**
   * REGISTER_BUYER(registerBuyer) mutation is a public api endpoint
   * see  ./gql/register_mutations
   * collect state variable and run the mutation
   * on call back update local storage
   */
  const [registerBuyer, { data }] = useRegisterBuyerMutation({
    onError: (error) => {
      // alert("sdf");
      NavigationService.navigate("OTPScreen", {
        fromScreen: "RegisterScreen",
        phone: "+91" + getValues("phoneNumber"),
        password: getValues("password"),
      });
      dispatch({
        type: "changLoading",
        payload: false,
      });
      dispatch({
        type: "changAlertState",
        payload: {
          visible: true,
          message: error.message,
          color: colors.error,
          title: "register failed",
        },
      });
    },
    onCompleted: (result) => {
      if (typeof result.registerBuyer !== "undefined") {
        let buyerId = result.registerBuyer.buyerId;

        console.log(`registerBuyer buyerId=${buyerId}`);
        if (buyerId) {
          global.buyerId = buyerId;
          storage.setLocalStorageValue(registerInput, buyerId);
          dispatch({
            type: "changLoading",
            payload: false,
          });
          // 56alert(result.registerBuyer.userId);
          // sendVerifyEmail({
          //   variables: { userId: result.registerBuyer.userId },
          // });
          NavigationService.navigate("OTPScreen", {
            fromScreen: "RegisterScreen",
            phone: "+91" + getValues("phoneNumber"),
            userId: result.registerBuyer.userId,
            password: getValues("password"),
          });

          // NavigationService.navigate("");
          // login here for private api jwt initial getDefaultBuyerAdress
          // autoSignIn();
        }

        // NavigationService.navigate("MainScreen");
        // NavigationService.navigate('OTPScreen', { fromScreen: 'RegisterScreen', phone: registerInput })
      } else {
        dispatch({
          type: "changLoading",
          payload: false,
        });
      }
    },
  });
  const onSubmit = (data: BuyerProfileRequestForCreate) => {
    registerBuyer({
      variables: {
        request: { ...data, phoneNumber: "+91" + getValues("phoneNumber") },
      },
    });
  };

  const toggleResetValidationAlert = () => {
    setShowValidationAlert(!showValidationAlert);
  };

  const toggleTermsAccepted = () => {
    setTermsAccepted(!termsAccepted);
  };

  const renderValidationAlert = () => {
    return (
      <Alert
        visible={showValidationAlert}
        title={"One or more input(s) are not correct"}
        message={validationMessage}
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
        <AppBar showLogo onPressBack={() => props.navigation.goBack()} />
        <KeyboardAwareScrollView style={styles.bodyContainer}>
          <Text style={styles.heading2Bold}>Register</Text>
          <Text style={styles.heading4Regular}>
            Create an account to have access to the best promos in your area!
          </Text>
          <Controller
            control={control}
            rules={{
              required: "Field is required.",
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[t.mT4]}
                ref={(r) => (nameInput = r)}
                placeholder={"Type your first name"}
                onSubmitEditing={() => lastNameInput.getInnerRef().focus()}
                returnKeyType={"next"}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="firstName"
          />
          {errors.firstName && (
            <Text style={[t.textRed900, t.mT1, t.mL4]}>
              {errors.firstName.message}
            </Text>
          )}

          <Controller
            control={control}
            rules={{
              required: "Field is required.",
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[t.mT4]}
                placeholder={"Type your last name"}
                ref={(r) => (lastNameInput = r)}
                onSubmitEditing={() => emailInput.getInnerRef().focus()}
                returnKeyType={"next"}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="lastName"
          />
          {errors.lastName && (
            <Text style={[t.textRed900, t.mT1, t.mL4]}>
              {errors.lastName.message}
            </Text>
          )}

          <Controller
            control={control}
            rules={{
              required: "Field is required.",
              pattern: {
                value:
                  /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/,
                message: "invalid email address",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[t.mT4]}
                placeholder={"Type your email"}
                ref={(r) => (emailInput = r)}
                onSubmitEditing={() => passwordInput.getInnerRef().focus()}
                returnKeyType={"next"}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="email"
          />

          {errors.email && (
            <Text style={[t.textRed900, t.mT1, t.mL4]}>
              {errors.email.message}
            </Text>
          )}

          <Controller
            control={control}
            rules={{
              required: "Field is required.",
              pattern: {
                value: /^[6-9]\d{9}$/,
                message: "invalid phone number",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[t.mT4]}
                placeholder={"Type your phone number"}
                ref={(r) => (emailInput = r)}
                onSubmitEditing={() => passwordInput.getInnerRef().focus()}
                returnKeyType={"next"}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="phoneNumber"
          />

          {errors.phoneNumber && (
            <Text style={[t.textRed900, t.mT1, t.mL4]}>
              {errors.phoneNumber.message}
            </Text>
          )}
          <Controller
            control={control}
            rules={{
              required: "Field is required.",
            }}
            render={({ field: { onChange, value } }) => (
              <PasswordInput
                style={[t.mT4]}
                placeholder={"Enter your password"}
                ref={(r) => (passwordInput = r)}
                //onSubmitEditing={onRegister}
                defaultValue={""}
                returnKeyType={"done"}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="password"
          />
          {errors.password && (
            <Text style={[t.textRed900, t.mT1, t.mL4]}>
              {errors.password.message}
            </Text>
          )}

          <View style={styles.switch}>
            <Switch
              onSwitch={() => {
                toggleTermsAccepted();
              }}
            />
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate("LegalScreen", { tabIndex: 0 })
              }
            >
              <Text style={styles.txtAccept}>
                I accept
                <Text style={styles.txtPrivacy}> Privacy Policy </Text>
                and
                <Text style={styles.txtPrivacy}> Terms of use</Text>
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1 }} />
          <Text style={styles.txtValidate}>{validationDisplay} </Text>

          <Button onPress={handleSubmit(onSubmit)} text={"REGISTER"} />

          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={styles.btnSignin}
          >
            <Text style={styles.txtAction}>SIGN IN</Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </SafeAreaView>
      {renderValidationAlert()}
    </View>
  );
}

export default RegisterScreen;
