import React, { useState, useEffect, useCallback, useContext } from "react";
import { View, Text, Keyboard } from "react-native";
import { vs } from "react-native-size-matters";
import { PasswordInput, RightButton } from "../../Components";
import { Colors } from "../../Themes";
import styles from "./styles";
import NavigationService from "../../Navigation/NavigationService";
import colors from "../../Themes/Colors";
import { AlertContext } from "../Root/GlobalContext";
import * as storage from "../../Apollo/local-storage";
import { useNavigation } from "@react-navigation/native";
import { t } from "react-native-tailwindcss";
import { Controller, useForm } from "react-hook-form";
import {
  useChangePasswordMutation,
  MutationChangePasswordArgs,
} from "../../../generated/graphql";
import { get, trim } from "lodash";
import useLoading from "../../hooks/useLoading";
function ChangePassword(props) {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const { dispatch } = useContext(AlertContext);
  const { setLoading } = useLoading();

  const [changePwd] = useChangePasswordMutation({
    context: {
      headers: {
        isPrivate: true,
      },
    },

    onError: () => {
      setLoading({ show: false });
      dispatch({
        type: "changAlertState",
        payload: {
          visible: true,
          message: "Changed your password failed.",
          color: colors.error,
          title: "Password Changed",
        },
      });
    },
  });

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
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<MutationChangePasswordArgs & { psw: string }>({
    defaultValues: {
      newPassword: "",
      oldPassword: "",
      userId: global.userProfileId,
      psw: "",
    },
  });
  const onSubmit = (data: MutationChangePasswordArgs & { psw: string }) => {
    if (data.psw !== data.newPassword) {
      dispatch({
        type: "changAlertState",
        payload: {
          visible: true,
          message: "The passwords you entered do not match each other.",
          color: colors.error,
          title: "Error!",
        },
      });
      return;
    }
    setLoading({ show: true });
    changePwd({
      variables: {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
        userId: global.userProfileId,
      },
      onCompleted: (res) => {
        storage.setLocalStorageValue(
          storage.LOCAL_STORAGE_USER_PASSWORD,
          data.newPassword
        );
        setLoading({ show: false });
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
  };
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={[t.mR6]}>
          <RightButton
            title="UPDATE"
            disable={false}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      ),
    });
  }, [navigation]);
  const password = watch("newPassword", "");

  return (
    <View style={styles.container}>
      <View style={styles.bodyContainer}>
        <Text style={styles.heading2Bold}>Change my password</Text>
        <Text style={[styles.heading4Regular, { color: Colors.grey80 }]}>
          For security reasons please first enter your current password.
        </Text>

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
                  if (trim(v).indexOf(" ") !== -1) {
                    return "Passwords should not contain Spaces";
                  }
                  return true;
                },
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View>
                <PasswordInput
                  style={{ marginTop: vs(18) }}
                  placeholder="Enter your Current Password"
                  value={value}
                  onChangeText={onChange}
                />
                {get(errors, "oldPassword") && (
                  <Text style={[{ color: "red" }, t.mL2, t.mT1]}>
                    This is required.
                  </Text>
                )}
              </View>
            )}
            name={"oldPassword"}
          />
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
                  if (trim(v).indexOf(" ") !== -1) {
                    return "Passwords should not contain Spaces";
                  }
                  return true;
                },
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View>
                <PasswordInput
                  style={{ marginTop: vs(18) }}
                  placeholder="Enter your New Password"
                  value={value}
                  onChangeText={onChange}
                />
                {get(errors, "newPassword") && (
                  <Text style={[{ color: "red" }, t.mL2, t.mT1]}>
                    {get(errors, "newPassword")?.message}
                  </Text>
                )}
              </View>
            )}
            name={"newPassword"}
          />
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
                  if (trim(v).indexOf(" ") !== -1) {
                    return "Passwords should not contain Spaces";
                  }
                  if (password !== v) {
                    return "The passwords do not match";
                  }
                  return true;
                },
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View>
                <PasswordInput
                  style={{ marginTop: vs(18) }}
                  placeholder="Repeat your New Password"
                  value={value}
                  onChangeText={onChange}
                />
                {get(errors, "psw") && (
                  <Text style={[{ color: "red" }, t.mL2, t.mT1]}>
                    {get(errors, "psw")?.message}
                  </Text>
                )}
              </View>
            )}
            name={"psw"}
          />
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
    </View>
  );
}

export default ChangePassword;
