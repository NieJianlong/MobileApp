import React, { useState, useEffect, useContext, useMemo } from "react";
import {
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Platform,
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
import { useMutation } from "@apollo/client";
import { ForgotPasswordStep2VerifyTokenEmail } from "./gql/validate";
import { userProfileVar } from "../../Apollo/cache";
import * as storage from "../../Apollo/local-storage";
import jwt_decode from "jwt-decode";
import colors from "../../Themes/Colors";
import { AlertContext } from "../Root/GlobalContext";
import {
  useBuyerProfileByUserIdLazyQuery,
  useForgotPasswordStep1SendNotificationEmailMutation,
  useForgotPasswordStep2VerifyTokenSmsMutation,
  useSendOtpCodeMutation,
  useValidateCodeMutation,
  ValidationType,
} from "../../../generated/graphql";
import RNOtpVerify from "react-native-otp-verify";
import { isEmpty, split } from "lodash";
import { isValidEmail } from "../../Validation";
import * as validator from "../../Validation";
import useLoading from "../../hooks/useLoading";

function OTPScreen(props) {
  const { dispatch } = useContext(AlertContext);
  const { params } = useRoute();
  const validationType = isValidEmail(params.phone)
    ? ValidationType.Email
    : ValidationType.Sms;
  const { setLoading } = useLoading();
  // refs
  let field1Input,
    field2Input,
    field3Input,
    field4Input,
    field5Input = null;
  const [validate] = useValidateCodeMutation({
    onCompleted: (res) => {
      setLoading({ show: false });
      // alert("验证成功");
      autoSignIn();
    },
    onError: (error) => {
      setLoading({ show: false });
      // autoSignIn();
      alert("Validation fails");
    },
    context: {
      headers: {
        isPrivate: true,
      },
    },
  });

  const [resetPasswordStep2] = useMutation(ForgotPasswordStep2VerifyTokenEmail);
  const [resetPasswordStep2Sms] =
    useForgotPasswordStep2VerifyTokenSmsMutation();
  const [forgetPasswordResendCode] =
    useForgotPasswordStep1SendNotificationEmailMutation();
  const [resendCode] = useSendOtpCodeMutation();
  let [keyboardHeight, setKeyboardHeight] = useState(0);
  let [allowToResendCode, setAllowToResendCode] = useState(false);
  let [onFocus, setOnFocus] = useState(1);
  let [field1, setField1] = useState("");
  let [field2, setField2] = useState("");
  let [field3, setField3] = useState("");
  let [field4, setField4] = useState("");
  let [field5, setField5] = useState("");
  const otpCode = useMemo(() => {
    return field1.concat(field2).concat(field3).concat(field4).concat(field5);
  }, [field1, field2, field3, field4, field5]);
  const [getBuyerId] = useBuyerProfileByUserIdLazyQuery({
    variables: { userProfileId: global.userProfileId },
    context: {
      headers: {
        isPrivate: true,
      },
    },
    onCompleted: (res) => {
      dispatch({
        type: "changLoading",
        payload: false,
      });
      dispatch({
        type: "changAlertState",
        payload: {
          visible: true,
          message:
            "A validation code has been sent to your registered email address",
          color: colors.success,
          title: "Congratulations on your successful registration",
        },
      });
      //server often breakon，we should use a constant for testing
      const {
        buyerProfileByUserId: { buyerId },
      } = res;
      global.buyerId = buyerId;
      NavigationService.navigate("MainScreen", { screen: "ExploreScreen" });
    },
    onError: (res) => {
      NavigationService.navigate("MainScreen", { screen: "ExploreScreen" });
    },
  });
  const autoSignIn = async () => {
    if (params.phone && params.password) {
      const { data } = await jwt.runTokenFlow({
        username: params.phone,
        password: params.password,
        //username: "vijay.msbi@gmail.com",
        //password: "123456789",
      });
      let access_token = data.access_token;

      if (access_token === "undefined") {
        console.log("no access token");
      }
      userProfileVar({
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
      getBuyerId();
      storage.setLocalStorageValue(
        storage.LOCAL_STORAGE_TOKEN_KEY,
        access_token
      );
    }
  };

  const isEmail = useMemo(() => {
    let ret = validator.loginDifferentiator(params?.phone);
    return ret.isEmail;
  }, [params.phone]);

  useEffect(() => {
    Keyboard.addListener("keyboardWillShow", _keyboardWillShow);
    Keyboard.addListener("keyboardWillHide", _keyboardWillHide);
    setTimeout(() => {
      setAllowToResendCode(true);
    }, 3000);

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
    validate({
      variables: {
        request: {
          userId: params.userId,
          validationType: validationType,
          code: otpCode,
        },
      },
    });
  };

  useEffect(() => {
    if (Platform.OS === "android") {
      RNOtpVerify.getHash()
        .then((hash) => {
          console.log("hash====================================");
          console.log(hash);
          console.log("====================================");
          // alert(hash);
        })
        .catch(console.log);
      RNOtpVerify.getOtp()
        .then((p) =>
          RNOtpVerify.addListener((message) => {
            // alert(message);
            if (!isEmpty(message)) {
              try {
                const otp = /(\d{5})/g.exec(message)[1];
                console.log("====================================");
                console.log(split(otp));
                console.log("====================================");

                setField1(otp.substring(0, 1));
                setField2(otp.substring(1, 2));
                setField3(otp.substring(2, 3));
                setField4(otp.substring(3, 4));
                setField5(otp.substring(4, 5));
                setAllowToResendCode(true);
                RNOtpVerify.removeListener();
                Keyboard.dismiss();
              } catch (error) {}
            }
          })
        )
        .catch((p) => console.log(p));
    }
    return () => {
      RNOtpVerify.removeListener();
    };
  }, []);
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
          onPress={() => {
            setLoading({ show: true });
            if (params.fromScreen === "ForgotPasswordScreen") {
              forgetPasswordResendCode({
                variables: { email: params?.phone ?? "" },
                onCompleted: (res) => {
                  setLoading({ show: false });
                  dispatch({
                    type: "changAlertState",
                    payload: {
                      visible: true,
                      message: `A validation code has been sent to ${params?.phone}`,
                      color: colors.success,
                    },
                  });
                },
                onError: () => {
                  setLoading({ show: false });
                  dispatch({
                    type: "changAlertState",
                    payload: {
                      visible: true,
                      message: "Resend validation code failed",
                      color: colors.primary,
                    },
                  });
                },
              });
            } else {
              resendCode({
                variables: {
                  sendCodeRequest: {
                    userId: params.userId,
                    validationType: isValidEmail(params.phone)
                      ? ValidationType.Email
                      : ValidationType.Sms,
                  },
                },
                context: {
                  headers: {
                    isPrivate: true,
                  },
                },
                onCompleted: (res) => {
                  setLoading({ show: false });
                  dispatch({
                    type: "changAlertState",
                    payload: {
                      visible: true,
                      message: `A validation code has been sent to ${params?.phone}`,
                      color: colors.success,
                    },
                  });
                },
                onError: () => {
                  setLoading({ show: false });
                  dispatch({
                    type: "changAlertState",
                    payload: {
                      visible: true,
                      message: "Resend validation code failed",
                      color: colors.primary,
                    },
                  });
                },
              });
            }
          }}
          style={styles.btnResendCode}
        >
          <Text
            style={[
              styles.txtAction,
              !allowToResendCode && { color: Colors.grey80 },
            ]}
          >
            I DIDN{"'"}T RECEIVE A CODE,RESEND
          </Text>
        </TouchableOpacity>
        <Button
          // disabled={!allowToResendCode}
          onPress={() => {
            setLoading({ show: true });
            if (params.fromScreen === "ForgotPasswordScreen") {
              isEmail
                ? resetPasswordStep2({
                    variables: { email: params.phone, tokenCode: otpCode },
                    onCompleted: (res) => {
                      setLoading({ show: false });
                      NavigationService.navigate("CreateNewPasswordScreen", {
                        actionTokenValue:
                          res.forgotPasswordStep2VerifyTokenEmail.actionToken,
                        isEmail,
                      });
                    },
                    //等待修改
                    onError: () => {
                      setLoading({ show: false });
                      dispatch({
                        type: "changAlertState",
                        payload: {
                          visible: true,
                          message: "Invalid verification code",
                          color: colors.error,
                          title: "Failed",
                        },
                      });
                      // NavigationService.navigate("CreateNewPasswordScreen", {
                      //   actionTokenValue: "error",
                      // });
                    },
                  })
                : resetPasswordStep2Sms({
                    variables: { sms: params.phone, tokenCode: otpCode },
                    onCompleted: (res) => {
                      setLoading({ show: false });
                      NavigationService.navigate("CreateNewPasswordScreen", {
                        actionTokenValue:
                          res?.forgotPasswordStep2VerifyTokenSms?.actionToken,
                        isEmail,
                      });
                    },
                    //等待修改
                    onError: () => {
                      setLoading({ show: false });
                      dispatch({
                        type: "changAlertState",
                        payload: {
                          visible: true,
                          message: "Invalid verification code",
                          color: colors.error,
                          title: "Failed",
                        },
                      });
                      // NavigationService.navigate("CreateNewPasswordScreen", {
                      //   actionTokenValue: "error",
                      // });
                    },
                  });
            } else {
              onValidate();
            }
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
      <View style={styles.bodyContainer}>
        <Text style={styles.heading2Bold}>{`Validate your ${
          isEmail ? "email" : "phone no"
        }`}</Text>
        <Text style={[styles.heading4Regular, { color: Colors.grey80 }]}>
          {`Please enter the code number sent to your ${
            isEmail ? "email" : "phone no"
          } [${params.phone}]`}
        </Text>
        {renderOTPInput()}
        <View style={{ flex: 1 }} />
        {renderAction()}
      </View>
    </View>
  );
}

export default OTPScreen;
