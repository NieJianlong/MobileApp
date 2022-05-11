import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, Platform, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SmsRetriever from "react-native-sms-retriever";
import { TextInput, Button, PasswordInput, Switch } from "../../Components";
import * as jwt from "../../Apollo/jwt-request";
import * as storage from "../../Apollo/local-storage";
import { Colors, Images } from "../../Themes";
import styles from "./styles";
import NavigationService from "../../Navigation/NavigationService";
import colors from "../../Themes/Colors";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  BuyerProfileRequest,
  useRegisterGuestBuyerToBuyerMutation,
} from "../../../generated/graphql";
import { t } from "react-native-tailwindcss";
import { trimStart } from "lodash";
import useAlert from "../../hooks/useAlert";
import useLoading from "../../hooks/useLoading";
import useRegister from "../../hooks/useRegister";

function RegisterGuestBuyerToBuyerScreen(props) {
  const { setAlert } = useAlert();
  const nameInput = useRef();
  const lastNameInput = useRef();
  const emailInput = useRef();
  const phonenumInput = useRef();
  const passwordInput = useRef();

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<BuyerProfileRequest>();
  const { setLoading } = useLoading();

  let [termsAccepted, setTermsAccepted] = useState(false);
  const { setRegister } = useRegister();

  const [registerBuyer, { data }] = useRegisterGuestBuyerToBuyerMutation({
    onError: (error) => {
      setLoading({ show: false });
      setAlert({
        color: colors.error,
        title: "register failed",
        message: error.message,
        visible: true,
        onDismiss: () => {
          setAlert({ visible: false });
        },
      });
    },
    onCompleted: async (result) => {
      setLoading({ show: false });
      if (typeof result.registerGuestBuyerToBuyer !== "undefined") {
        let buyerId = result.registerGuestBuyerToBuyer?.buyerId;

        console.log(`registerBuyer buyerId=${buyerId}`);
        if (buyerId) {
          global.buyerId = buyerId;
          storage.setLocalStorageValue(getValues("phoneNumber"), buyerId);
          setLoading({ show: false });
          const username = getValues("email");
          const password = getValues("password");
          const { data } = await jwt.runTokenFlow({
            username: username.trim(),
            password,
          });
          let access_token = data.access_token;
          global.access_token = access_token;

          NavigationService.navigate("OTPScreen", {
            fromScreen: "RegisterScreen",
            phone: "+91" + getValues("phoneNumber"),
            email: getValues("email"),
            userId: result.registerGuestBuyerToBuyer?.userId,
            password: getValues("password"),
          });
        }
      } else {
        setLoading({ show: false });
      }
    },
  });
  const onSubmit = (data: BuyerProfileRequest) => {
    if (termsAccepted) {
      setLoading({ show: true });
      registerBuyer({
        variables: {
          request: {
            firstName: data.firstName?.trim(),
            lastName: data.firstName?.trim(),
            email: data.email.trim(),
            password: data.password,
            phoneNumber: "+91" + getValues("phoneNumber"),
          },
        },
      });
    } else {
      setAlert({
        color: colors.warning,
        title: "Warning",
        message: "Please accept Privacy Policy and Terms of use first",
        visible: true,
        onDismiss: () => {
          setAlert({ visible: false });
        },
      });
    }
  };

  const toggleTermsAccepted = () => {
    setTermsAccepted(!termsAccepted);
  };

  return (
    <View style={[styles.container, props.style]}>
      {props.style && (
        <SafeAreaView style={[t.wFull, t.flexRow, t.flexRowReverse]}>
          <TouchableOpacity
            onPress={() => {
              setRegister({ visibleRegister: false });
            }}
            style={[t.pX6]}
          >
            <Image
              style={{
                width: 30,
                height: 30,
                tintColor: Colors.grey60,
              }}
              source={Images.crossMedium}
            />
          </TouchableOpacity>
        </SafeAreaView>
      )}
      <KeyboardAwareScrollView
        style={styles.bodyContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading2Bold}>Register</Text>
        <Text style={styles.heading4Regular}>
          Create an account to have access to the best promos in your area!
        </Text>
        <Controller
          control={control}
          rules={{
            required: "Field is required.",
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={[t.mT4]}
              ref={nameInput}
              placeholder={"Type your first name"}
              onSubmitEditing={() =>
                lastNameInput.current.getInnerRef().focus()
              }
              returnKeyType={"next"}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="firstName"
        />
        {errors.firstName && (
          <Text style={[t.textRed900, t.mT1, t.mL4]}>
            {errors.firstName.message}
          </Text>
        )}

        <Controller
          control={control}
          rules={{
            required: "Field is required.",
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={[t.mT4]}
              placeholder={"Type your last name"}
              ref={lastNameInput}
              onSubmitEditing={() => emailInput?.current.getInnerRef().focus()}
              returnKeyType={"next"}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="lastName"
        />
        {errors.lastName && (
          <Text style={[t.textRed900, t.mT1, t.mL4]}>
            {errors.lastName.message}
          </Text>
        )}

        <Controller
          control={control}
          rules={{
            required: "Field is required.",
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={[t.mT4]}
              placeholder={"Type your email"}
              ref={emailInput}
              onSubmitEditing={() => {
                phonenumInput.current.getInnerRef().focus();
              }}
              returnKeyType={"next"}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="email"
        />

        {errors.email && (
          <Text style={[t.textRed900, t.mT1, t.mL4]}>
            {errors.email.message}
          </Text>
        )}

        <Controller
          control={control}
          rules={{
            required: "Field is required.",
            pattern: {
              value: /^[6-9]\d{9}$/,
              message: "invalid phone number",
            },
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={[t.mT4]}
              placeholder={"Type your phone number"}
              ref={phonenumInput}
              onFocus={() => {
                if (Platform.OS === "android") {
                  try {
                    SmsRetriever.requestPhoneNumber()
                      .then((resph) => {
                        console.log(
                          "SmsRetriever==request===PhoneNumber",
                          resph
                        );
                        if (resph.startsWith("+91")) {
                          setValue("phoneNumber", trimStart(resph, "+91"));
                        }
                        if (resph.startsWith("+86")) {
                          setValue("phoneNumber", trimStart(resph, "+86"));
                        }
                      })
                      .catch((err) => {
                        console.log("SmsRetriever error", err);
                      });
                  } catch (error) {
                    console.log(JSON.stringify(error));
                  }
                }
              }}
              onSubmitEditing={() =>
                passwordInput?.current.getInnerRef().focus()
              }
              returnKeyType={"next"}
              isPhoneNo={true}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="phoneNumber"
        />

        {errors.phoneNumber && (
          <Text style={[t.textRed900, t.mT1, t.mL4]}>
            {errors.phoneNumber.message}
          </Text>
        )}
        <Controller
          control={control}
          rules={{
            required: "Field is required.",
          }}
          render={({ field: { onChange, value } }) => (
            <PasswordInput
              style={[t.mT4]}
              placeholder={"Enter your password"}
              ref={passwordInput}
              //onSubmitEditing={onRegister}
              defaultValue={""}
              returnKeyType={"done"}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="password"
        />
        {errors.password && (
          <Text style={[t.textRed900, t.mT1, t.mL4]}>
            {errors.password.message}
          </Text>
        )}

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

        <View style={[t.mT8]} />
        <Button onPress={handleSubmit(onSubmit)} text={"REGISTER"} />
      </KeyboardAwareScrollView>
    </View>
  );
}

export default RegisterGuestBuyerToBuyerScreen;
