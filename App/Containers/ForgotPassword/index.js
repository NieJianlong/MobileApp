import React, { Component, useCallback, useContext, useEffect } from "react";
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

class ForgotPassword extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      keyboardHeight: 0,
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

  validateEmail = (email) => {
    const reg =
      /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/;
    return reg.test(email);
  };

  validatePhone = (phone) => {
    const reg = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return reg.test(phone);
  };

  renderAction() {
    return (
      <View>
        <Button
          disabled={
            !this.validateEmail(this.state.email) &&
            !this.validatePhone(this.state.email)
          }
          onPress={() => {
            if (this.validateEmail(this.state.email)) {
              /**
               * add router parameter here for Login screen to show EMS alert
               */
              // this.props.navigation.navigate('LoginScreen')
              this.props.onGetCode(this.state.email);
              //NavigationService.navigate("LoginScreen", { showEms: true });
            } else if (this.validatePhone(this.state.email)) {
              /**
               * To-Do need clarity for OTP flow
               */

              NavigationService.navigate("OTPScreen", {
                fromScreen: "ForgotPasswordScreen",
              });
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
                this.setState({ email: text });
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
  const [getValidateCode] = useMutation(
    ForgotPasswordStep1SendNotificationEmail
  );
  const { dispatch } = useContext(AlertContext);
  const getCode = useCallback(
    (email) => {
      getValidateCode({
        variables: { email },
        onError: () => {
          dispatch({
            type: "changAlertState",
            payload: {
              visible: true,
              message: "Invalid email address",
              color: colors.error,
              title: "Failed",
            },
          });
        },
        onCompleted: (res) => {
          NavigationService.navigate("OTPScreen", {
            fromScreen: "ForgotPasswordScreen",
            phone: email,
            userId: "",
            password: "",
          });
        },
      });
    },
    [dispatch, getValidateCode]
  );

  return <ForgotPassword onGetCode={getCode} />;
}

export default ForgotPasswordScreen;
