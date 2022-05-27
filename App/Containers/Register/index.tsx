import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  Image,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SmsRetriever from "react-native-sms-retriever";
import {
  TextInput,
  Button,
  PasswordInput,
  Switch,
  Alert,
} from "../../Components";
import * as jwt from "../../Apollo/jwt-request";
import * as storage from "../../Apollo/local-storage";
import { userProfileVar } from "../../Apollo/cache";
import { Colors, Images } from "../../Themes";
import styles from "./styles";
import NavigationService from "../../Navigation/NavigationService";
import { AlertContext } from "../Root/GlobalContext";
import colors from "../../Themes/Colors";
import jwt_decode from "jwt-decode";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  BuyerProfileRequestForCreate,
  useBuyerProfileByUserIdLazyQuery,
  useRegisterBuyerMutation,
} from "../../../generated/graphql";
import { t } from "react-native-tailwindcss";
import { trimStart } from "lodash";
import useAlert from "../../hooks/useAlert";
import useLoading from "../../hooks/useLoading";
import useRegister from "../../hooks/useRegister";
import AsyncStorage from "@react-native-community/async-storage";
import RNUserIdentity, {
  ICLOUD_ACCESS_ERROR,
} from "react-native-user-identity";

function RegisterScreen(props) {
  const { dispatch } = useContext(AlertContext);
  const { setAlert } = useAlert();
  const nameInput = useRef();
  const lastNameInput = useRef();
  const emailInput = useRef();
  const phonenumInput = useRef();
  const passwordInput = useRef();
  const [showEmailList, setShowEmailList] = useState(false);
  const [fetchedEmail, setFetchedEmail] = useState([]);
  const [savedEmail, setSavedEmail] = useState();

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<BuyerProfileRequestForCreate>();

  // const emailRetrieve = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem("emailList");
  //     setFetchedEmail(JSON.parse(value));
  //   } catch (error) {
  //     console.log("error retrieve");
  //   }
  // };

  // useEffect(() => {
  //   emailRetrieve();
  // }, [savedEmail]);

  console.log("see email retrieved", fetchedEmail);

  // const storeEmail = async () => {
  //   if (fetchedEmail) {
  //     const isExisting = fetchedEmail.find((data) => data === savedEmail);
  //     if (isExisting === undefined) {
  //       const val = [...fetchedEmail, savedEmail];
  //       try {
  //         await AsyncStorage.setItem("emailList", JSON.stringify(val));
  //       } catch (error) {
  //         console.log("error saving data");
  //       }
  //     }
  //   } else {
  //     const val = [savedEmail];
  //     try {
  //       await AsyncStorage.setItem("emailList", JSON.stringify(val));
  //     } catch (error) {
  //       console.log("error saving data");
  //     }
  //   }
  // };

  // validation
  let [validationDisplay, setValidationDisplay] = useState("");
  let [showValidationAlert, setShowValidationAlert] = useState(false);
  let [validationMessage, setValidationMessage] = useState("");
  const { setLoading } = useLoading();
  // because of the way the switch component is set up this is the opposite of what you would expect
  let [termsAccepted, setTermsAccepted] = useState(false);
  useEffect(() => {
    // let phoneNumber = "+918247278755";
    // setValue("phoneNumber", trimStart(phoneNumber, "+91"));

    return () => {
      // Anything in here is fired on component unmount.
    };
  }, [setValue]);
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
            "A confirmation email has been sent to your registered email address",
          color: colors.success,
          title: "Congratulations on your successful registration",
        },
      });
      //server often breakon，we should use a constant for testing
      const { buyerProfileByUserId } = res;

      userProfileVar({
        userId: res?.buyerProfileByUserId?.userId ?? "",
        buyerId: res?.buyerProfileByUserId?.buyerId ?? "",
        userName: res?.buyerProfileByUserId?.userName ?? "",
        email: res?.buyerProfileByUserId?.email ?? "",
        phone: res?.buyerProfileByUserId?.phoneNumber ?? "",
        isAuth: true,
        billingDetails: res?.buyerProfileByUserId?.billingDetails,
        billingDetailsId:
          res.buyerProfileByUserId?.billingDetails?.billingDetailsId,
        isAuth: true,
        firstName: res.buyerProfileByUserId?.firstName ?? "",
        lastName: res.buyerProfileByUserId?.lastName ?? "",
      });

      global.buyerId = buyerProfileByUserId.buyerId;
    },
    onError: (res) => {
      //server often breakon，we should use a constant for testing
      global.buyerId = "9fcbb7cb-5354-489d-b358-d4e2bf386ff3";
    },
  });
  const { setRegister } = useRegister();

  const autoSignIn = useCallback(async () => {
    //get username and possword from localStorage
    const username = getValues("email");
    const password = getValues("password");

    console.log("hello ========================>");

    //if username && password exits,we can login auto
    if (username && password) {
      const { data } = await jwt.runTokenFlow({ username, password });
      let access_token = data.access_token;

      if (access_token === "undefined") {
        console.log("no access token");
      }
      userProfileVar({
        email: username,
        isAuth: true,
      });
      let decoded = jwt_decode(access_token);
      console.log("====================================");
      console.log();
      console.log("====================================");
      global.access_token = access_token;
      global.userProfileId = decoded.sub;

      storage.setLocalStorageValue(
        storage.LOCAL_STORAGE_TOKEN_KEY,
        access_token
      );
      global.access_token = access_token;
      storage.setLocalStorageValue(storage.LOCAL_STORAGE_USER_NAME, username);
      storage.setLocalStorageValue(
        storage.LOCAL_STORAGE_USER_PASSWORD,
        password
      );
      getBuyerId();

      storage.setLocalStorageValue(
        storage.LOCAL_STORAGE_TOKEN_KEY,
        access_token
      );
    }
  }, [getBuyerId, getValues]);
  //when app open,when can do auto login
  // useEffect(() => {
  //   autoSignIn();
  // }, [autoSignIn]);
  /**
   * REGISTER_BUYER(registerBuyer) mutation is a public api endpoint
   * see  ./gql/register_mutations
   * collect state variable and run the mutation
   * on call back update local storage
   */
  const [registerBuyer, { data }] = useRegisterBuyerMutation({
    onError: (error) => {
      setLoading({ show: false });
      dispatch({
        type: "changAlertState",
        payload: {
          visible: true,
          message: error.message,
          color: colors.error,
          title: "register failed",
        },
      });
    },
    onCompleted: async (result) => {
      setLoading({ show: false });
      if (typeof result.registerBuyer !== "undefined") {
        let buyerId = result.registerBuyer.buyerId;

        console.log(`registerBuyer buyerId=${buyerId}`);
        if (buyerId) {
          global.buyerId = buyerId;
          storage.setLocalStorageValue(getValues("phoneNumber"), buyerId);
          dispatch({
            type: "changLoading",
            payload: false,
          });
          // 56alert(result.registerBuyer.userId);
          // sendVerifyEmail({
          //   variables: { userId: result.registerBuyer.userId },
          // });
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
            userId: result.registerBuyer.userId,
            password: getValues("password"),
          });

          // NavigationService.navigate("");
          // login here for private api jwt initial getDefaultBuyerAdress
          // autoSignIn();
        }
      } else {
        setLoading({ show: false });
        dispatch({
          type: "changLoading",
          payload: false,
        });
      }
    },
  });
  const onSubmit = (data: BuyerProfileRequestForCreate) => {
    if (termsAccepted) {
      // storeEmail();
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

  const toggleResetValidationAlert = () => {
    setShowValidationAlert(!showValidationAlert);
  };

  const toggleTermsAccepted = () => {
    setTermsAccepted(!termsAccepted);
  };

  const deleteEmailAsync = async (data) => {
    try {
      await AsyncStorage.setItem("emailList", JSON.stringify(data));
    } catch (error) {
      console.log("error deleting email", error);
    }
  };

  const deleteEmail = (valTodelete) => {
    const filteredData = fetchedEmail.filter((item) => item !== valTodelete);
    setFetchedEmail(filteredData);
    deleteEmailAsync(filteredData);
    if (filteredData.length === 0) {
      setShowEmailList(false);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.emailListBtn}
          onPress={() => {
            setSavedEmail(item);
            setShowEmailList(false);
          }}
        >
          <Text style={styles.emailListText}>{item}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => deleteEmail(item)}
        >
          <Image source={Images.trash} style={styles.icDelete} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderValidationAlert = () => {
    return (
      <Alert
        visible={showValidationAlert}
        title={"One or more input(s) are not correct"}
        message={validationMessage}
        color={Colors.warning}
        onDismiss={toggleResetValidationAlert}
      />
    );
  };

  const fetchUserIdentity = async () => {
    try {
      const result = await RNUserIdentity.getUserId()
      setSavedEmail(result);
      if (result === null) {
        // alert('User canceled UI flow')
      } 
    } catch(error) {
      if (error === ICLOUD_ACCESS_ERROR) {
        alert('Please set up an iCloud account in settings')
      }
    }
  }

  return (
    <View style={[styles.container, props.style]}>
      <Modal
        animationType="fade"
        statusBarTranslucent={true}
        visible={showEmailList}
        transparent={true}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            setShowEmailList(false);
          }}
        >
          <View style={styles.emailListMainContainer}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.emailListContainer}>
                <Text style={styles.continueText}>Continue With</Text>
                <FlatList
                  keyboardShouldPersistTaps="handled"
                  style={styles.flatListstyle}
                  data={fetchedEmail}
                  renderItem={renderItem}
                  showsVerticalScrollIndicator={false}
                />
                <TouchableOpacity onPress={() => setShowEmailList(false)}>
                  <Text style={styles.noneText}>NONE OF THE ABOVE</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
              textAlignVertical={"center"}
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
              autoFocus={true}
              value={value}
              textAlignVertical={"center"}
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
            // pattern: {
            //   value:
            //     /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/,
            //   message: "invalid email address",
            // },
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
              onChangeText={(text) => {
                onChange(text);
                setSavedEmail(text);
              }}
              value={savedEmail}
              onBlur={() => {
                onChange(savedEmail);
              }}
              onFocus={() => {
                // if (fetchedEmail) {
                //   if (savedEmail || fetchedEmail.length === 0) {
                //     setShowEmailList(false);
                //   } else {
                //     setShowEmailList(true);
                //   }
                // }

                fetchUserIdentity();
              }}
              textAlignVertical={"center"}
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
              message: "Invalid phone number",
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
              textAlignVertical={"center"}
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

        <View style={{ flex: 1 }} />
        <Text style={styles.txtValidate}>{validationDisplay} </Text>

        <Button onPress={handleSubmit(onSubmit)} text={"REGISTER"} />

        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={styles.btnSignin}
        >
          <Text style={styles.txtAction}>SIGN IN</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>

      {/* {renderValidationAlert()} */}
    </View>
  );
}

export default RegisterScreen;
