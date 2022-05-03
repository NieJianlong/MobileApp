import React, { Component, useCallback, useContext } from "react";
import { View, StatusBar, Text, Keyboard } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { isIphoneX } from "react-native-iphone-x-helper";
import { vs } from "react-native-size-matters";
import NavigationService from "../../Navigation/NavigationService";
import { AppBar, Button, TextInput } from "../../Components";
import { Colors } from "../../Themes";

import styles from "./styles";
import { useMutation } from "@apollo/client";
import { ForgotPasswordStep1SendNotificationEmail } from "./forgot_mutation";
import colors from "../../Themes/Colors";
import { AlertContext } from "../Root/GlobalContext";
import {
  useForgotPasswordStep1SendNotificationEmailMutation,
  useForgotPasswordStep1SendNotificationSmsMutation,
} from "../../../generated/graphql";
const validateEmail = (email) => {
  const reg =
    /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/;
  return reg.test(email);
};
const validatePhone = (phone) => {
  const reg = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  return reg.test(phone);
};
class ForgotPassword extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      keyboardHeight: 0,
      disable: false,
    };

    Keyboard.addListener("keyboardWillShow", this._keyboardWillShow);
    Keyboard.addListener("keyboardWillHide", this._keyboardWillHide);
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    if (this._isMounted) {
      this._isMounted = false;
      Keyboard.removeListener("keyboardWillShow", this._keyboardWillShow);
      Keyboard.removeListener("keyboardWillHide", this._keyboardWillHide);
    }
  }

  _keyboardWillShow = (e) => {
    this.setState({
      keyboardHeight: e.endCoordinates.height,
    });
  };

  _keyboardWillHide = () => {
    this.setState({
      keyboardHeight: 0,
    });
  };

  renderAction() {
    return (
      <View>
        <Button
          disabled={this.state.email.length === 0 || this.state.disable}
          onPress={() => {
            if (validateEmail(this.state.email)) {
              /**
               * add router parameter here for Login screen to show EMS alert
               */
              // this.props.navigation.navigate('LoginScreen')
              this.props.onGetCode(this.state.email, true);
              //NavigationService.navigate("LoginScreen", { showEms: true });
            } else if (validatePhone(this.state.email)) {
              /**
               * To-Do need clarity for OTP flow
               */
              this.props.onGetCode(this.state.email, false);
              // NavigationService.navigate("OTPScreen", {
              //   fromScreen: "ForgotPasswordScreen",
              // });
            }
          }}
          text={"RESET PASSWORD"}
        />

        <View
          style={{
            height:
              this.state.keyboardHeight > 0
                ? this.state.keyboardHeight
                : isIphoneX()
                ? 0
                : vs(15),
          }}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView
          style={styles.safeArea}
          edges={["top", "right", "left", "bottom"]}
        >
          <AppBar
            showLogo={false}
            onPressBack={() => NavigationService.goBack()}
          />

          <View style={styles.bodyContainer}>
            <Text style={styles.heading2Bold}>Forgot your password?</Text>
            <Text style={[styles.heading4Regular, { color: Colors.grey80 }]}>
              Please enter your information below to create a new one
            </Text>

            <TextInput
              style={{ marginTop: vs(12) }}
              placeholder={"Email or phone number"}
              onChangeText={(text) => {
                this.setState({
                  email: text,
                  disable: !validateEmail(text) && !validatePhone(text),
                });
              }}
            />

            <View style={{ flex: 1 }} />

            {this.renderAction()}
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

function ForgotPasswordScreen() {
  const [getValidateCode] =
    useForgotPasswordStep1SendNotificationEmailMutation();
  const [getPhoneValidateCode] =
    useForgotPasswordStep1SendNotificationSmsMutation();
  const { dispatch } = useContext(AlertContext);
  const onSuccess = (email) => {
    NavigationService.navigate("OTPScreen", {
      fromScreen: "ForgotPasswordScreen",
      phone: email,
      userId: "",
      password: "",
    });
  };
  const onError = () => {
    dispatch({
      type: "changAlertState",
      payload: {
        visible: true,
        message: "Invalid email address",
        color: colors.error,
        title: "Failed",
      },
    });
  };
  const getCode = useCallback(
    (email, isEmail) => {
      isEmail
        ? getValidateCode({
            variables: { email },
            onError: () => {
              onError();
            },
            onCompleted: (res) => {
              onSuccess(email);
            },
          })
        : getPhoneValidateCode({
            variables: { sms: "+91" + email },
            onError: () => {
              onError();
            },
            onCompleted: (res) => {
              onSuccess("+91" + email);
            },
          });
    },
    [getPhoneValidateCode, getValidateCode]
  );

  return <ForgotPassword onGetCode={getCode} />;
}

export default ForgotPasswordScreen;
