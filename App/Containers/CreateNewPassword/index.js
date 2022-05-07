import React, { Component, useCallback, useContext } from "react";
import { View, StatusBar, Text, Keyboard } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { isIphoneX } from "react-native-iphone-x-helper";
import { vs } from "react-native-size-matters";

import { AppBar, Button, PasswordInput } from "../../Components";
import { Colors } from "../../Themes";

import styles from "./styles";
import { useMutation } from "@apollo/client";
import { ForgotPasswordStep3ChangeByEmail } from "../OTP/gql/validate";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AlertContext } from "../Root/GlobalContext";
import colors from "../../Themes/Colors";
import NavigationService from "../../Navigation/NavigationService";
import { useForgotPasswordStep3ChangeBySmsMutation } from "../../../generated/graphql";

class CreateNewPassword extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      password: "",
      confirmPassword: "",
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

  validateConfirmPassword = () => {
    if (this.state.confirmPassword === "") {
      return true;
    } else {
      return this.state.confirmPassword === this.state.password;
    }
  };

  renderAction() {
    return (
      <View>
        <Button
          disabled={
            this.state.password === "" ||
            this.state.confirmPassword !== this.state.password
          }
          onPress={() => {
            this.props.onGetCode(
              this.state.password,
              this.state.confirmPassword
            );
            // this.props.navigation.navigate("ExploreScreen");
          }}
          text={"CREATE NEW PASSWORD"}
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
          <View style={styles.bodyContainer}>
            <Text style={styles.heading2Bold}>Create your new password</Text>
            <Text style={[styles.heading4Regular, { color: Colors.grey80 }]}>
              Choose a new password
            </Text>

            <PasswordInput
              style={{ marginTop: vs(18) }}
              placeholder={"New password"}
              onChangeText={(text) => {
                this.setState({ password: text }, () =>
                  console.log(this.state.password)
                );
              }}
            />

            <PasswordInput
              style={{ marginTop: vs(18) }}
              placeholder={"Repeat your new password"}
              onChangeText={(text) => {
                this.setState({ confirmPassword: text });
              }}
              showError={!this.validateConfirmPassword()}
              errorMessage={"Password does not match"}
            />

            <View style={{ flex: 1 }} />

            {this.renderAction()}
          </View>
        </SafeAreaView>
      </View>
    );
  }
}
function CreateNewPasswordScreen() {
  const { params } = useRoute();
  const navigation = useNavigation();
  const { dispatch } = useContext(AlertContext);
  const [createNewPsw] = useMutation(ForgotPasswordStep3ChangeByEmail);
  const [createNewPswPhone] = useForgotPasswordStep3ChangeBySmsMutation();
  const reSetPsw = useCallback(
    (newPassword, confirmPassword) => {
      const requestParams = {
        actionTokenValue: params.actionTokenValue,
        newPassword,
        confirmPassword,
      };
      params.isEmail
        ? createNewPsw({
            variables: requestParams,
            onError: () => {
              dispatch({
                type: "changAlertState",
                payload: {
                  visible: true,
                  message: "Failed to set password",
                  color: colors.error,
                  title: "Failed",
                },
              });
            },
            onCompleted: (res) => {
              dispatch({
                type: "changAlertState",
                payload: {
                  visible: true,
                  message: "You have successfully set the password",
                  color: colors.success,
                  title: "Success",
                },
              });
              NavigationService.navigate("LoginScreen");
            },
          })
        : createNewPswPhone({
            variables: requestParams,
            onError: () => {
              dispatch({
                type: "changAlertState",
                payload: {
                  visible: true,
                  message: "Failed to set password",
                  color: colors.error,
                  title: "Failed",
                },
              });
            },
            onCompleted: (res) => {
              dispatch({
                type: "changAlertState",
                payload: {
                  visible: true,
                  message: "You have successfully set the password",
                  color: colors.success,
                  title: "Success",
                },
              });
              NavigationService.navigate("LoginScreen");
            },
          });
    },
    [
      createNewPsw,
      createNewPswPhone,
      dispatch,
      params.actionTokenValue,
      params.isEmail,
    ]
  );

  return <CreateNewPassword onGetCode={reSetPsw} navigation={navigation} />;
}
export default CreateNewPasswordScreen;
