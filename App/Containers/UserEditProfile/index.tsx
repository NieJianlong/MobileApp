/*
 * @Author: Jianlong Nie
 * @Date: 2021-01-09 15:07:39
 * @LastEditTime: 2021-01-24 13:58:54
 * @LastEditors: Please set LastEditors
 * @Description: edit user profile
 * @FilePath: /MobileApp/App/Containers/UserEditProfile/index.js
 */
import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useContext,
} from "react";
import {
  View,
  Text,
  Image,
  Keyboard,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { ScaledSheet, s } from "react-native-size-matters";
import { AppBar, MaterialTextInput, RightButton } from "../../Components";
import AppConfig from "../../Config/AppConfig";
import Colors from "../../Themes/Colors";
import colors from "../../Themes/Colors";
import fonts from "../../Themes/Fonts";
import UserAvatar from "../UserCenter/UserAvatar";
import NavigationService from "../../Navigation/NavigationService";
import images from "../../Themes/Images";
import { ApplicationStyles } from "../../Themes";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ImagePicker from "react-native-image-crop-picker";
import ActionSheet from "react-native-actionsheet";
import { useQuery } from "@apollo/client";
import { AlertContext } from "../Root/GlobalContext";
import { FIND_BUYER_PROFILE } from "../../Apollo/queries/queries_user";
import {
  useUpdateBuyerProfileMutation,
  BuyerProfileByUserIdQuery,
  BuyerProfileByUserIdDocument,
  BuyerProfileDocument,
  useSendOtpCodeMutation,
  ValidationType,
} from "../../../generated/graphql";
import { isEmpty, omit } from "lodash";
import {
  getLocalStorageValue,
  LOCAL_STORAGE_USER_NAME,
  LOCAL_STORAGE_USER_PASSWORD,
  LOCAL_STORAGE_USER_PROFILE,
  setLocalStorageValue,
} from "../../Apollo/local-storage";
import { runTokenFlow } from "../../Apollo/jwt-request";
import jwt_decode from "jwt-decode";
import { useNavigation } from "@react-navigation/native";
import { t } from "react-native-tailwindcss";
import PubSub from "pubsub-js";
import useAlert from "../../hooks/useAlert";
/**
 * @description:User edit page
 * @param {*} props
 * @return {*}
 */
function UserEditProfile(props) {
  const {
    loading,
    error,
    data: userProfile,
    refetch,
  } = useQuery(FIND_BUYER_PROFILE, {
    variables: { buyerId: global.buyerId },
    context: {
      headers: {
        isPrivate: true,
      },
    },
    nextFetchPolicy: "no-cache",
    onCompleted: (res) => {},
    onError: (res) => {},
  });

  useEffect(() => {
    refetch && refetch();
  }, []);
  const { setAlert } = useAlert();

  const { dispatch } = useContext(AlertContext);
  const [resendCode] = useSendOtpCodeMutation();

  const [showBottom, setShowBottom] = useState(true);
  const [newAvatar, setNewAvatar] = useState(null);
  const [newFirstName, setNewFirstName] = useState(
    userProfile?.buyerProfile?.firstName ?? ""
  );
  const [newLastName, setNewLastName] = useState(
    userProfile?.buyerProfile?.lastName ?? ""
  );
  const [newEmail, setNewEmail] = useState(
    userProfile?.buyerProfile?.email ?? ""
  );
  const [newPhoneNumber, setNewPhoneNumber] = useState(
    isEmpty(userProfile?.buyerProfile?.phoneNumber)
      ? ""
      : userProfile?.buyerProfile?.phoneNumber.replace("+91", "")
  );
  useEffect(() => {
    if (userProfile) {
      setNewFirstName(userProfile?.buyerProfile?.firstName ?? "");
      setNewLastName(userProfile?.buyerProfile?.lastName ?? "");
      setNewEmail(userProfile?.buyerProfile?.email ?? "");
      setNewPhoneNumber(
        isEmpty(userProfile?.buyerProfile?.phoneNumber)
          ? ""
          : userProfile?.buyerProfile?.phoneNumber.replace("+91", "")
      );
    }
  }, [userProfile]);
  const inputs = [
    {
      placeholder: "First Name",
      value: newFirstName,
      onChangeText: (text) => setNewFirstName(text),
    },
    {
      placeholder: "Last Name",
      value: newLastName,
      onChangeText: (text) => setNewLastName(text),
    },
    {
      placeholder: "Email",
      value: newEmail,
      onChangeText: (text) => setNewEmail(text),
    },
    {
      placeholder: "Phone Number",
      value: newPhoneNumber,
      onChangeText: (text) => setNewPhoneNumber(text),
    },
  ];
  let BuyerProfileRequest = {
    buyerId: global.buyerId,
    firstName: newFirstName,
    lastName: newLastName,
    email: newEmail,
    phoneNumber: "+91" + newPhoneNumber,
  };
  const [updateProfile, { data }] = useUpdateBuyerProfileMutation({
    variables: {
      request: !isEmpty(newPhoneNumber)
        ? BuyerProfileRequest
        : omit(BuyerProfileRequest, "phoneNumber"),
    },
    context: {
      headers: {
        isPrivate: true,
      },
    },
    refetchQueries: [
      {
        query: BuyerProfileByUserIdDocument,
        variables: { userProfileId: global.userProfileId },
        context: {
          headers: {
            isPrivate: true,
          },
        },
      },
    ],
    onCompleted: (res) => {
      debugger;
      console.log("=====Res edit========", res);
      PubSub.publish("refresh-buyer-profile");
      dispatch({ type: "hideloading" });
      if (res) {
        dispatch({
          type: "changAlertState",
          payload: {
            visible: true,
            message: "You have successfully updated your ptofile.",
            color: colors.success,
            title: "Profile Changed!",
          },
        });
      }
      if (!res.updateBuyerProfile?.phoneNumberVerified) {
        resendCode({
          variables: {
            sendCodeRequest: {
              userId: res?.updateBuyerProfile?.userId ?? "",
              validationType: ValidationType.Sms,
            },
          },
          context: {
            headers: {
              isPrivate: true,
            },
          },
          onCompleted: async () => {
            dispatch({
              type: "changLoading",
              payload: false,
            });
            const password = await getLocalStorageValue(
              LOCAL_STORAGE_USER_PASSWORD
            );
            await setLocalStorageValue(
              LOCAL_STORAGE_USER_NAME,
              res?.updateBuyerProfile?.phoneNumber
            );
            NavigationService.navigate("OTPScreen", {
              fromScreen: "RegisterScreen",
              phone: res.updateBuyerProfile?.phoneNumber,
              password: password?.trim(),
              userId: res?.updateBuyerProfile?.userId,
            });
          },
          onError: () => {
            dispatch({
              type: "changLoading",
              payload: false,
            });
          },
        });
        return;
      }
    },
    onError: (err) => {
      console.log("=====Res edit err========", err);
      dispatch({ type: "hideloading" });
      dispatch({
        type: "changAlertState",
        payload: {
          visible: true,
          message: err.message,
          color: colors.error,
          title: "Faild",
        },
      });
    },
  });
  const sheetRef = useRef();
  useEffect(() => {
    const keyboardShow = (e) => {
      setShowBottom(false);
    };
    const keyboardHide = (e) => {
      setShowBottom(true);
    };
    Keyboard.addListener("keyboardDidShow", keyboardShow);
    Keyboard.addListener("keyboardDidHide", keyboardHide);
    return () => {
      Keyboard.removeListener("keyboardDisShow", keyboardShow);
      Keyboard.removeListener("keyboardDidHide", keyboardHide);
    };
  }, []);
  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={[t.mR6]}>
          <RightButton
            title="SAVE"
            onPress={() => {
              // NavigationService.goBack();
              dispatch({ type: "loading" });
              updateProfile();
            }}
          />
        </View>
      ),
    });
  }, [navigation]);
  const showSheet = useCallback(() => {
    sheetRef.current.show();
  }, []);
  const onPressGallery = useCallback(() => {
    ImagePicker.openPicker({
      //cropping: true,
      includeBase64: true,
      multiple: true,
    }).then((image) => {
      setNewAvatar(image[0]);
    });
  }, []);
  const onPressCamera = useCallback(() => {
    ImagePicker.openCamera({
      cropping: true,
      includeBase64: true,
    }).then((image) => {
      setNewAvatar(image[0]);
    });
  }, []);

  // const autoSignIn = useCallback(async () => {
  //   //get username and possword from localStorage
  //   const username = await getLocalStorageValue(LOCAL_STORAGE_USER_NAME);
  //   const password = await getLocalStorageValue(LOCAL_STORAGE_USER_PASSWORD);
  //   if (username && password) {
  //     //just for test
  //     try {
  //       const { data } = await runTokenFlow({ username, password });
  //       let access_token = data.access_token;
  //       let decoded = jwt_decode(access_token);
  //       global.access_token = access_token;
  //       global.userProfileId = decoded.sub;
  //     } catch (error) {}
  //   }
  // }, [getBuyerId]);
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView>
        <View style={styles.contentContainer}>
          {/* <UserAvatar
            uri={newAvatar ? { uri: newAvatar.path } : images.userDefaultAvatar}
          /> */}
          {/* <TouchableOpacity onPress={showSheet}>
            <Image
              style={{
                width: s(30),
                height: s(30),
                marginTop: s(-20),
                marginLeft: s(30),
              }}
              source={images.userUploadImage}
            />
          </TouchableOpacity> */}
        </View>
        <View style={styles.contentContainer}>
          {inputs.map((item, index) => {
            return (
              <View
                key={index}
                style={{ height: 80, justifyContent: "center" }}
              >
                <MaterialTextInput {...item} />
              </View>
            );
          })}
        </View>
      </KeyboardAwareScrollView>
      {showBottom && (
        <SafeAreaView style={styles.bottom}>
          <TouchableOpacity
            onPress={() => {
              NavigationService.navigate("DeleteAccountMessageScreen");
            }}
          >
            <Text
              style={[
                ApplicationStyles.screen.heading5Bold,
                { color: colors.grey80, textAlign: "center" },
              ]}
            >
              REMOVE ACCOUNT
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      )}
      <ActionSheet
        ref={sheetRef}
        title={"Select a new picture"}
        options={["Camera", "Photo Gallery", "Cancel"]}
        cancelButtonIndex={2}
        //destructiveButtonIndex={1}
        onPress={(index) => {
          if (index === 0) {
            onPressCamera();
          } else if (index === 1) {
            onPressGallery();
          }
        }}
      />
    </View>
  );
}

export default UserEditProfile;

const styles = ScaledSheet.create({
  save: {
    color: Colors.primary,
    fontSize: "12@vs",
    fontFamily: fonts.primary,
  },
  bottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: "15@vs",
  },
  contentContainer: {
    paddingHorizontal: AppConfig.paddingHorizontal,
  },
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: colors.background,
  },
  itemText: {
    textAlign: "center",
    fontFamily: fonts.primary,
  },
});
