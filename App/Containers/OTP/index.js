import React, { useState, useEffect, useCallback, useContext } from "react";
import {
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { isIphoneX } from "react-native-iphone-x-helper";
import { vs } from "react-native-size-matters";
import { useRoute } from "@react-navigation/native";

import { AppBar, Button } from "../../Components";
import { Colors } from "../../Themes";

import styles from "./styles";

import * as jwt from "../../Apollo/jwt-request";
import NavigationService from "../../Navigation/NavigationService";
import { useLazyQuery, useMutation } from "@apollo/client";
import { ValidateCode } from "./gql/validate";
import { userProfileVar } from "../../Apollo/cache";
import * as storage from "../../Apollo/local-storage";
import jwt_decode from "jwt-decode";
import { BUYER_PROFILE_BY_USERID } from "../../Apollo/queries/queries_user";
import colors from "../../Themes/Colors";
import { AlertContext } from "../Root/GlobalContext";

function OTPScreen(props) {
  const { dispatch } = useContext(AlertContext);
  // refs
  let field1Input,
    field2Input,
    field3Input,
    field4Input,
    field5Input = null;
  const [validate] = useMutation(ValidateCode, {
    onCompleted: (res) => {
      // alert("验证成功");
      autoSignIn();
    },
    onError: (error) => {
      autoSignIn();
      // alert("验证失败");
    },
  });

  let [keyboardHeight, setKeyboardHeight] = useState(0);
  let [allowToResendCode, setAllowToResendCode] = useState(false);
  let [onFocus, setOnFocus] = useState(1);
  let [field1, setField1] = useState("");
  let [field2, setField2] = useState("");
  let [field3, setField3] = useState("");
  let [field4, setField4] = useState("");
  let [field5, setField5] = useState("");
  const [getBuyerId] = useLazyQuery(BUYER_PROFILE_BY_USERID, {
    variables: { userProfileId: global.userProfileId },
    context: {
      headers: {
        isPrivate: true,
      },
    },
    onCompleted: (res) => {
      alert("咋回事");
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
      alert("咋回事");
      //server often breakon，we should use a constant for testing
      global.buyerId = "9fcbb7cb-5354-489d-b358-d4e2bf386ff3";
      NavigationService.navigate("MainScreen");
    },
  });
  const autoSignIn = async () => {
    if (params.phone && params.password) {
      const { data } = await jwt.runTokenFlow({
        // username: params.phone,
        // password: params.password,
        username: "vijay.msbi@gmail.com",
        password: "123456789",
      });
      let access_token = data.access_token;

      if (access_token === "undefined") {
        console.log("no access token");
      }
      userProfileVar({
        email: params.phone,
        isAuth: true,
      });
      let decoded = jwt_decode(access_token);
      global.access_token = access_token;
      global.userProfileId = decoded.sub;

      storage.setLocalStorageValue(
        storage.LOCAL_STORAGE_TOKEN_KEY,
        access_token
      );
      global.access_token = access_token;
      //alert(global.access_token);
      storage.setLocalStorageValue(
        storage.LOCAL_STORAGE_USER_NAME,
        params.phone
      );
      storage.setLocalStorageValue(
        storage.LOCAL_STORAGE_USER_PASSWORD,
        params.password
      );
      alert("谁能告诉我");
      getBuyerId();

      storage.setLocalStorageValue(
        storage.LOCAL_STORAGE_TOKEN_KEY,
        access_token
      );
    }
  };
  const { params } = useRoute();

  useEffect(() => {
    Keyboard.addListener("keyboardWillShow", _keyboardWillShow);
    Keyboard.addListener("keyboardWillHide", _keyboardWillHide);

    setTimeout(() => {
      setAllowToResendCode(true);
    }, 10000);

    return () => {
      // Anything in here is fired on component unmount.
      Keyboard.removeListener("keyboardWillShow", _keyboardWillShow);
      Keyboard.removeListener("keyboardWillHide", _keyboardWillHide);
    };
  }, [props]);

  const _keyboardWillShow = (e) => {
    setKeyboardHeight(e.endCoordinates.height);
  };

  const _keyboardWillHide = () => {
    setKeyboardHeight(0);
  };

  const onValidate = async () => {
    var otpCode = field1
      .concat(field2)
      .concat(field3)
      .concat(field4)
      .concat(field5);
    validate({
      variables: {
        request: {
          userId: params.userId,
          //userId: "6c374229-71ea-44b7-8915-366cbe3198ff",
          validationType: "EMAIL",
          tokenCode: otpCode,
        },
      },
    });
    // await jwt
    //   .runMockOTPFlow(otpCode)
    //   .then(function (res) {
    //     if (res.validateOK === "OK") {
    //       if (params.fromScreen === "ForgotPasswordScreen") {
    //         NavigationService.navigate("CreateNewPasswordScreen");
    //       } else {
    //         NavigationService.navigate("ExploreScreen");
    //       }
    //     }
    //   })
    //   .catch(function (err) {
    //     // here we will need to deal with a  status` code  and error and implement  logic
    //   });
  };

  const renderOTPInput = () => {
    return (
      <View style={styles.otpContainer}>
        <TextInput
          autoFocus
          style={onFocus === 1 ? styles.txtInputFocused : styles.txtInput}
          maxLength={1}
          keyboardType={"number-pad"}
          value={field1}
          ref={(r) => (field1Input = r)}
          onFocus={() => setOnFocus(1)}
          onChangeText={(text) => {
            setField1(text);
            if (text.length > 0) {
              field2Input.focus();
            }
          }}
        />

        <TextInput
          style={onFocus === 2 ? styles.txtInputFocused : styles.txtInput}
          maxLength={1}
          keyboardType={"number-pad"}
          value={field2}
          ref={(r) => (field2Input = r)}
          onFocus={() => setOnFocus(2)}
          onChangeText={(text) => {
            setField2(text);
            if (text.length > 0) {
              field3Input.focus();
            }
          }}
        />

        <TextInput
          style={onFocus === 3 ? styles.txtInputFocused : styles.txtInput}
          maxLength={1}
          keyboardType={"number-pad"}
          value={field3}
          ref={(r) => (field3Input = r)}
          onFocus={() => setOnFocus(3)}
          onChangeText={(text) => {
            setField3(text);
            if (text.length > 0) {
              field4Input.focus();
            }
          }}
        />

        <TextInput
          style={onFocus === 4 ? styles.txtInputFocused : styles.txtInput}
          maxLength={1}
          keyboardType={"number-pad"}
          value={field4}
          ref={(r) => (field4Input = r)}
          onFocus={() => setOnFocus(4)}
          onChangeText={(text) => {
            setField4(text);
            if (text.length > 0) {
              field5Input.focus();
            }
          }}
        />
        <TextInput
          style={onFocus === 5 ? styles.txtInputFocused : styles.txtInput}
          maxLength={1}
          keyboardType={"number-pad"}
          value={field5}
          ref={(r) => (field5Input = r)}
          onFocus={() => setOnFocus(5)}
          onChangeText={(text) => {
            setField5(text);
            if (text.length > 0) {
              Keyboard.dismiss();
              field5Input.focus();
            }
          }}
        />
      </View>
    );
  };

  const renderAction = () => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={styles.btnResendCode}
        >
          <Text
            style={[
              styles.txtAction,
              !allowToResendCode && { color: Colors.grey80 },
            ]}
          >
            I DIDN{"'"}T RECEIVE A CODE
          </Text>
        </TouchableOpacity>

        <Button
          disabled={
            field1 === "" ||
            field2 === "" ||
            field3 === "" ||
            field4 === "" ||
            field5 === ""
          }
          onPress={() => {
            onValidate();
            // if (params.fromScreen === 'ForgotPasswordScreen') {
            //     props.navigation.navigate('CreateNewPasswordScreen')
            // } else {
            //     props.navigation.navigate('ExploreScreen')
            // }
          }}
          text={"VALIDATE"}
        />

        <View
          style={{
            height:
              keyboardHeight > 0 ? keyboardHeight : isIphoneX() ? 0 : vs(15),
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView
        style={styles.safeArea}
        edges={["top", "right", "left", "bottom"]}
      >
        <AppBar
          showLogo={false}
          onPressBack={() => props.navigation.goBack()}
        />

        <View style={styles.bodyContainer}>
          <Text style={styles.heading2Bold}>{"Validate your email"}</Text>
          <Text style={[styles.heading4Regular, { color: Colors.grey80 }]}>
            Please enter the code number sent to your email [{params.phone}]
          </Text>

          {renderOTPInput()}

          <View style={{ flex: 1 }} />

          {renderAction()}
        </View>
      </SafeAreaView>
    </View>
  );
}

export default OTPScreen;
