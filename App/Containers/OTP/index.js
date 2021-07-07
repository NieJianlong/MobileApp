import React, { useState, useEffect } from "react";
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

function OTPScreen(props) {
  // refs
  let field1Input,
    field2Input,
    field3Input,
    field4Input = null;

  let [keyboardHeight, setKeyboardHeight] = useState(0);
  let [allowToResendCode, setAllowToResendCode] = useState(false);
  let [onFocus, setOnFocus] = useState(1);
  let [field1, setField1] = useState("");
  let [field2, setField2] = useState("");
  let [field3, setField3] = useState("");
  let [field4, setField4] = useState("");

  const { params } = useRoute();

  useEffect(() => {
    Keyboard.addListener("keyboardWillShow", _keyboardWillShow);
    Keyboard.addListener("keyboardWillHide", _keyboardWillHide);

    console.log(JSON.stringify(props));

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
    var otpCode = field1.concat(field2).concat(field3).concat(field4);
    console.log(otpCode);
    await jwt
      .runMockOTPFlow(otpCode)
      .then(function (res) {
        console.log(res.validateOK);
        if (res.validateOK === "OK") {
          if (params.fromScreen === "ForgotPasswordScreen") {
            NavigationService.navigate("CreateNewPasswordScreen");
          } else {
            NavigationService.navigate("ExploreScreen");
          }
        }
      })
      .catch(function (err) {
        // here we will need to deal with a  status` code  and error and implement  logic
      });
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
              Keyboard.dismiss();
              setOnFocus(4);
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
            field1 === "" || field2 === "" || field3 === "" || field4 === ""
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
          <Text style={styles.heading2Bold}>
            {"Validate your phone number"}
          </Text>
          <Text style={[styles.heading4Regular, { color: Colors.grey80 }]}>
            Please enter the code number sent by sms to your phone [
            {params.phone}]
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
