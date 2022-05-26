import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  GuestBuyerProfileRequest,
  useRegisterGuestBuyerToBuyerMutation,
  useSendOtpCodeMutation,
  ValidationType,
} from "../../generated/graphql";
import useLoading from "../hooks/useLoading";
import * as jwt from "../Apollo/jwt-request";
import jwt_decode from "jwt-decode";
import NavigationService from "../Navigation/NavigationService";
import {
  LOCAL_STORAGE_TOKEN_KEY,
  LOCAL_STORAGE_USER_NAME,
  LOCAL_STORAGE_USER_PASSWORD,
  setLocalStorageValue,
} from "../Apollo/local-storage";
import { Image, StyleProp, Text, TextStyle, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ApplicationStyles } from "../Themes";
import colors from "../Themes/Colors";
import { s } from "react-native-size-matters";
import AppConfig from "../Config/AppConfig";
import { t } from "react-native-tailwindcss";
import Button from "./Button";
import PasswordInput from "./PasswordInput";
import useRegisterGuest from "../hooks/useRegisterGuest";
export interface RegisterGuestBuyerToBuyerFormProps {
  style?: StyleProp<TextStyle>;
}

function RegisterGuestBuyerToBuyerForm({
  style,
}: RegisterGuestBuyerToBuyerFormProps) {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GuestBuyerProfileRequest>();

  const [registerGuestBuyerToBuyer] = useRegisterGuestBuyerToBuyerMutation();
  const { setLoading } = useLoading();
  const { setRegister } = useRegisterGuest();
  const [resendCode] = useSendOtpCodeMutation();
  const onSignIn = async (data: { username: string; password: string }) => {
    await jwt.runTokenFlow(data).then(async (res) => {
      if (typeof res !== "undefined") {
        let access_token = res.data.access_token;
        global.access_token = access_token;
        // global.userProfileId = decoded.sub;
        let decoded = jwt_decode(access_token);
        if (!decoded.phone_number_verified) {
          resendCode({
            variables: {
              sendCodeRequest: {
                userId: decoded?.sub,
                validationType: ValidationType.Sms,
              },
            },
            context: {
              headers: {
                isPrivate: true,
              },
            },
            onCompleted: () => {
              setLoading({ show: false });
              setRegister({ visibleRegister: false });
              NavigationService.navigate("OTPScreen", {
                fromScreen: "RegisterScreen",
                phone: data.username,
                password: data.password,
                userId: decoded?.sub,
              });
            },
            onError: () => {
              setLoading({ show: false });
            },
          });
          return;
        }
        setLocalStorageValue(LOCAL_STORAGE_TOKEN_KEY, access_token);
        global.userProfileId = decoded.sub;
      }
    });
  };
  const onRegister = (data: GuestBuyerProfileRequest) => {
    setLoading({ show: true });
    registerGuestBuyerToBuyer({
      variables: {
        request: { buyerId: global.buyerId, password: data.password },
      },
      onCompleted: async (res) => {
        await setLocalStorageValue(
          LOCAL_STORAGE_USER_NAME,
          res?.registerGuestBuyerToBuyer?.phoneNumber
        );
        await setLocalStorageValue(LOCAL_STORAGE_USER_PASSWORD, data.password);
        onSignIn({
          username: res?.registerGuestBuyerToBuyer?.phoneNumber,
          password: data.password,
        });
      },
      onError: () => {
        setLoading({ show: false });
      },
    });
  };
  return (
    <View style={style}>
      <Text
        style={[
          ApplicationStyles.screen.heading4Bold,
          {
            color: colors.black,
            fontSize: s(16),
            textAlign: "center",
            marginTop: -60,
          },
          t.pX8,
        ]}
      >
        Please create an account to remember your details
      </Text>
      <KeyboardAwareScrollView>
        <View
          style={{
            paddingHorizontal: AppConfig.paddingHorizontal,
            marginTop: 15,
          }}
        >
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
                  placeholder={"Enter your password"}
                  value={value}
                  returnKeyType={"done"}
                  onChangeText={onChange}
                  autoCapitalize="none"
                />
              )}
              name="password"
            />
            {errors.password && (
              <Text style={[t.textRed900, t.mT2, t.mB6, t.mL4]}>
                {errors.password.message}
              </Text>
            )}
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: AppConfig.paddingHorizontal,
            marginTop: 35,
          }}
        >
          <Button text="REGISTER" onPress={handleSubmit(onRegister)} />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

export default RegisterGuestBuyerToBuyerForm;
