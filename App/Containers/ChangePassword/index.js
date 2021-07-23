import React, { useState, useEffect, useCallback, useContext } from "react";
import { View, StatusBar, Text, Keyboard } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { vs } from "react-native-size-matters";
import { AppBar, Button, PasswordInput, RightButton } from "../../Components";
import { Colors } from "../../Themes";
import styles from "./styles";
import NavigationService from "../../Navigation/NavigationService";
import colors from "../../Themes/Colors";
import { useMutation, useQuery } from "@apollo/client";
import { CHANGE_PASSWORD } from "../../Apollo/mutations/mutations_user";
import { AlertContext } from "../Root/GlobalContext";
import * as storage from "../../Apollo/local-storage";
function ChangePassword(props) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const { dispatch } = useContext(AlertContext);
  const inputs = [
    {
      placeholder: "Enter your Current Password",
      onChangeText: (text) => setPassword(text),
      showError: false,
      errorMessage: null,
    },
    {
      placeholder: "Enter your New Password",
      onChangeText: (text) => setNewPassword(text),
      showError: false,
      errorMessage: null,
    },
    {
      placeholder: "Repeat your New Password",
      onChangeText: (text) => setConfirmPassword(text),
      showError: false,
      errorMessage: "Password does not match",
    },
  ];
  const [changePwd] = useMutation(CHANGE_PASSWORD, {
    variables: {
      oldPassword: password,
      newPassword: newPassword,
      userId: global.userProfileId,
    },
    context: {
      headers: {
        isPrivate: true,
      },
    },
    onCompleted: (res) => {
      storage.setLocalStorageValue(
        storage.LOCAL_STORAGE_USER_PASSWORD,
        newPassword
      );
      dispatch({ type: "hideloading" });
      dispatch({
        type: "changAlertState",
        payload: {
          visible: true,
          message: "You have successfully Changed your password.",
          color: colors.success,
          title: "Password Changed",
        },
      });
      NavigationService.goBack();
    },
  });
  const changePassword = useCallback(() => {
    if (
      password.length === 0 ||
      newPassword.length === 0 ||
      confirmPassword.length === 0
    ) {
      dispatch({
        type: "changAlertState",
        payload: {
          visible: true,
          message: "Please confirm that you have entered all fileds.",
          color: colors.error,
          title: "Error!",
        },
      });
      return;
    }
    if (newPassword === confirmPassword) {
      dispatch({ type: "loading" });
      changePwd();
    } else {
      dispatch({
        type: "changAlertState",
        payload: {
          visible: true,
          message: "The passwords you entered do not match each other.",
          color: colors.error,
          title: "Error!",
        },
      });
    }
  }, [changePwd, confirmPassword, dispatch, newPassword, password.length]);
  useEffect(() => {
    const keyboardShow = (e) => {
      setKeyboardHeight(e.endCoordinates.height);
    };
    const keyboardHide = (e) => {
      setKeyboardHeight(0);
    };
    Keyboard.addListener("keyboardWillShow", keyboardShow);
    Keyboard.addListener("keyboardWillHide", keyboardHide);
    return () => {
      Keyboard.removeListener("keyboardWillShow", keyboardShow);
      Keyboard.removeListener("keyboardWillHide", keyboardHide);
    };
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <SafeAreaView
        style={styles.safeArea}
        edges={["top", "right", "left", "bottom"]}
      >
        <AppBar
          rightButton={() => (
            <RightButton
              title="UPDATE"
              disable={false}
              onPress={changePassword}
            />
          )}
        />
        <View style={styles.bodyContainer}>
          <Text style={styles.heading2Bold}>Change my password</Text>
          <Text style={[styles.heading4Regular, { color: Colors.grey80 }]}>
            For security reasons please first enter your current password.
          </Text>

          <View>
            {inputs.map((item, index) => {
              return (
                <PasswordInput
                  key={index}
                  style={{ marginTop: vs(18) }}
                  {...item}
                />
              );
            })}
          </View>

          {/* <View style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
            <Button
              backgroundColor="transparent"
              textColor={colors.grey80}
              onPress={changePassword}
              text={"I DON’T REMEMBER MY PASSWORD"}
            />
          </View> */}
        </View>
      </SafeAreaView>
    </View>
  );
}

export default ChangePassword;
