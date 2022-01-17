import React, { useState, useEffect, useContext, useCallback } from "react";
import { View, StatusBar, Text, TouchableOpacity } from "react-native";
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

// validation and auth api
import * as validator from "../../Validation";
import * as jwt from "../../Apollo/jwt-request";
import * as storage from "../../Apollo/local-storage";
/** userProfileVar is the variable for the cache to get set  userProfile attributes */
import { userProfileVar } from "../../Apollo/cache";

import { Colors } from "../../Themes";
import styles from "./styles";
import NavigationService from "../../Navigation/NavigationService";
import { REGISTER_BUYER } from "../../Apollo/mutations/mutations_user";
import { useLazyQuery, useMutation } from "@apollo/client";
import { AlertContext } from "../Root/GlobalContext";
import colors from "../../Themes/Colors";
import jwt_decode from "jwt-decode";
import { BUYER_PROFILE_BY_USERID } from "../../Apollo/queries/queries_user";
import { SendVerifyEmail } from "./gql/register_mutations";

function RegisterScreen(props) {
  const { dispatch } = useContext(AlertContext);
  // refs
  let nameInput,
    lastNameInput,
    emailInput,
    passwordInput = null;
  // validation
  let [validationDisplay, setValidationDisplay] = useState("");
  let [showValidationAlert, setShowValidationAlert] = useState(false);
  let [validationMessage, setValidationMessage] = useState("");
  // local state
  let [name, setName] = useState("");
  let [lastName, setLastName] = useState("");
  // registerInput  is indeterminate value that can be a phone or email
  let [registerInput, setRegisterInput] = useState("");
  let [psswd, setPsswd] = useState("");
  // because of the way the switch component is set up this is the opposite of what you would expect
  let [termsAccepted, setTermsAccepted] = useState(true);
  useEffect(() => {
    return () => {
      // Anything in here is fired on component unmount.
    };
  }, []);
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
        buyerProfileByUserId,
      } = res;

      userProfileVar({
        userId: buyerProfileByUserId?.userId,
        buyerId: buyerProfileByUserId?.buyerId,
        userName: buyerProfileByUserId?.userName,
        email: buyerProfileByUserId?.email,
        phone: buyerProfileByUserId?.phoneNumber,
        isAuth: true,
      });

      global.buyerId = buyerProfileByUserId.buyerId;
      NavigationService.navigate("MainScreen");
    },
    onError: (res) => {
      //server often breakon，we should use a constant for testing
      global.buyerId = "9fcbb7cb-5354-489d-b358-d4e2bf386ff3";
      NavigationService.navigate("MainScreen");
    },
  });
  let BuyerProfileRequestForCreate = {
    // userName: registerInput,
    firstName: name,
    lastName: lastName,
    email: registerInput,
    password: psswd,
    // phoneNumber: "",
  };
  const autoSignIn = useCallback(async () => {
    //get username and possword from localStorage
    const username = registerInput;
    const password = psswd;

    console.log('hello ========================>');

    //if username && password exits,we can login auto
    if (username && password) {
      const { data } = await jwt.runTokenFlow({ username, password });
      let access_token = data.access_token;

      console.log(`=======================> ${access_token}`);
      if (access_token === "undefined") {
        console.log("no access token");
      }
      
      let decoded = jwt_decode(access_token);
      global.access_token = access_token;
      global.userProfileId = decoded.sub;

      storage.setLocalStorageValue(
        storage.LOCAL_STORAGE_TOKEN_KEY,
        access_token
      );
      global.access_token = access_token;
      storage.setLocalStorageValue(storage.LOCAL_STORAGE_USER_NAME, username);
      storage.setLocalStorageValue(storage.LOCAL_STORAGE_USER_PASSWORD, psswd);
      getBuyerId();

      storage.setLocalStorageValue(
        storage.LOCAL_STORAGE_TOKEN_KEY,
        access_token
      );
    }
  }, [getBuyerId, psswd, registerInput]);
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
  const [sendVerifyEmail] = useMutation(SendVerifyEmail);
  const [registerBuyer, { data }] = useMutation(REGISTER_BUYER, {
    variables: { request: BuyerProfileRequestForCreate },
    onError: (error) => {
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
            phone: registerInput,
            userId: result.registerBuyer.userId,
            password: psswd,
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

  /**
   * currently we are only using email @see VK
   * onRegister runs the runRegisterBuyer after much validation
   */
  const onRegister = async () => {
    // first decide are we an email or a phone
    let registerUserValidation = { name, lastName, registerInput, psswd };
    setValidationDisplay("");
    console.log(`${name}::${lastName}::${registerInput}::${psswd}`);
    // here registerInput can be email not phone
    let reporter = validator.registerValidator(registerUserValidation);
    console.log(`validation state ${JSON.stringify(reporter)}`);
    // first validate for missing values
    if (reporter.hasMissing) {
      setValidationDisplay(`${reporter.missingVal} is required`);
    } else {
      // now check is valid password
      if (!reporter.validPassword) {
        setValidationDisplay(
          "Password requires 1 uppercase, 1 number and min 8 characters"
        );
        return;
      }
      // now check is valid email or phone
      if (reporter.validPhoneOrEmail) {
        console.log(`setTermsAccepted=${termsAccepted}`);

        if (termsAccepted) {
          setValidationDisplay("Please accept terms and privacy policy");
          return;
        }
        // for now use email only
        if (reporter.isEmail) {
          dispatch({
            type: "changLoading",
            payload: true,
          });
          registerBuyer();
        } else {
          // must be phone
          setValidationDisplay(" please use email not phone");
        }
      } else {
        setValidationDisplay(" phone or email is invalid");
      }
    } // end else => no missing fields block
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
        <View style={styles.bodyContainer}>
          <Text style={styles.heading2Bold}>Register</Text>
          <Text style={styles.heading4Regular}>
            Create an account to have access to the best promos in your area!
          </Text>

          <TextInput
            style={styles.textInput}
            ref={(r) => (nameInput = r)}
            placeholder={"Type your first name"}
            onSubmitEditing={() => lastNameInput.getInnerRef().focus()}
            returnKeyType={"next"}
            onChangeText={(text) => setName(text)}
            value={name}
          />

          <TextInput
            style={styles.textInput}
            placeholder={"Type your last name"}
            ref={(r) => (lastNameInput = r)}
            onSubmitEditing={() => emailInput.getInnerRef().focus()}
            returnKeyType={"next"}
            onChangeText={(text) => setLastName(text)}
            value={lastName}
          />
          <TextInput
            style={styles.textInput}
            placeholder={"Type your email or phone number"}
            ref={(r) => (emailInput = r)}
            onSubmitEditing={() => passwordInput.getInnerRef().focus()}
            returnKeyType={"next"}
            onChangeText={(text) => setRegisterInput(text)}
            value={registerInput}
          />

          <PasswordInput
            style={styles.textInput}
            placeholder={"Enter your password"}
            ref={(r) => (passwordInput = r)}
            //onSubmitEditing={onRegister}
            defaultValue={""}
            returnKeyType={"done"}
            onChangeText={(text) => setPsswd(text)}
            value={psswd}
          />
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

          <Button
            onPress={onRegister}
            // onPress={onDebug}
            text={"REGISTER"}
          />

          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={styles.btnSignin}
          >
            <Text style={styles.txtAction}>SIGN IN</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {renderValidationAlert()}
    </View>
  );
}

export default RegisterScreen;
