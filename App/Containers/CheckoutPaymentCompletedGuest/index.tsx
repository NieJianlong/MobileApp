import React from "react";
import { View, Text, Image, SafeAreaView } from "react-native";
import { s, vs } from "react-native-size-matters";
import { Button, PasswordInput } from "../../Components";
import AppConfig from "../../Config/AppConfig";
import { ApplicationStyles } from "../../Themes";
import colors from "../../Themes/Colors";
import images from "../../Themes/Images";
import metrics from "../../Themes/Metrics";
import TextTip from "../../Components/EmptyReminder";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import NavigationService from "../../Navigation/NavigationService";
import {
  useRegisterGuestBuyerToBuyerMutation,
  GuestBuyerProfileRequest,
  BuyerProfileResponseFieldsFragment,
  useSendOtpCodeMutation,
  ValidationType,
} from "../../../generated/graphql";
import useLoading from "../../hooks/useLoading";
import { Controller, useForm } from "react-hook-form";
import { t } from "react-native-tailwindcss";
import {
  getLocalStorageValue,
  LOCAL_STORAGE_TOKEN_KEY,
  LOCAL_STORAGE_USER_NAME,
  LOCAL_STORAGE_USER_PASSWORD,
  setLocalStorageValue,
} from "../../Apollo/local-storage";
import * as jwt from "../../Apollo/jwt-request";
import jwt_decode from "jwt-decode";

function CheckoutPaymentCompletedGuest(props) {
  const data = {
    textTip: "Your order has been processed sucessfully",
    subTextTip:
      "Remember that you will receive your order once the required number of orders is reached",
    needButton: false,
    btnMsg: "",
    onPress: "",
  };
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GuestBuyerProfileRequest>();

  const [registerGuestBuyerToBuyer] = useRegisterGuestBuyerToBuyerMutation();
  const { setLoading } = useLoading();
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
        if (!res.registerGuestBuyerToBuyer?.phoneNumberVerified) {
          NavigationService.navigate("OTPScreen", {
            fromScreen: "RegisterScreen",
            phone: res.registerGuestBuyerToBuyer?.phoneNumber,
            password: data.password,
            userId: res?.registerGuestBuyerToBuyer?.userId,
          });
          setLoading({ show: false });
        }
      },
      onError: () => {
        setLoading({ show: false });
      },
    });
  };
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: "white",
      }}
    >
      <KeyboardAwareScrollView>
        <SafeAreaView>
          <View style={{ height: 25 }} />
          <Image
            style={{
              width: metrics.screenWidth,
              height: vs(150),
              resizeMode: "contain",
            }}
            source={images.shopBagimage}
          />
        </SafeAreaView>
        <View style={{ height: vs(200) }}>
          <TextTip {...data} />
        </View>

        <Text
          style={[
            ApplicationStyles.screen.heading4Bold,
            {
              color: colors.black,
              fontSize: s(16),
              textAlign: "center",
              marginTop: -60,
            },
          ]}
        >
          Do you wish to create an account to remember your details for future
          times?
        </Text>

        <View
          style={{
            paddingHorizontal: AppConfig.paddingHorizontal,
            marginTop: 25,
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
          <Button
            text="REGISTER"
            onPress={
              handleSubmit(onRegister)

              // NavigationService.navigate("ExploreScreen");
            }
          />
          {/* <View style={{ marginTop: 30 }}>
            <Button
              backgroundColor="transparent"
              text="CLOSE WITHOUT AN ACCOUNT"
              textColor={colors.grey80}
              onPress={() => {
                NavigationService.navigate("ExploreScreen");
              }}
            />
          </View> */}
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

export default CheckoutPaymentCompletedGuest;
