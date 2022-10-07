import React, { useEffect, useState, useRef, useContext } from "react";
import {
  View,
  Text,
  Keyboard,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  useWindowDimensions,
} from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { MaterialTextInput } from "../../Components";
import AppConfig from "../../Config/AppConfig";
import Colors from "../../Themes/Colors";
import colors from "../../Themes/Colors";
import fonts from "../../Themes/Fonts";
import NavigationService from "../../Navigation/NavigationService";
import { ApplicationStyles } from "../../Themes";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useQuery } from "@apollo/client";
import { AlertContext } from "../Root/GlobalContext";
import { FIND_BUYER_PROFILE } from "../../Apollo/queries/queries_user";
import {
  useUpdateBuyerProfileMutation,
  useSendOtpCodeMutation,
  ValidationType,
  UpdateBuyerProfileMutationVariables,
  BuyerProfileByUserIdDocument,
  useBuyerProfileByUserIdQuery,
  useBuyerProfileQuery,
} from "../../../generated/graphql";
import { isEmpty, omit } from "lodash";
import {
  getLocalStorageValue,
  LOCAL_STORAGE_USER_NAME,
  LOCAL_STORAGE_USER_PASSWORD,
  setLocalStorageValue,
} from "../../Apollo/local-storage";
import { useNavigation } from "@react-navigation/native";
import { t } from "react-native-tailwindcss";
import PubSub from "pubsub-js";
import { Controller, useForm } from "react-hook-form";
import RenameBox from "../../Components/RenameBox";
import useRename from "../../hooks/useRename";
/**
 * @description:User edit page
 * @param {*} props
 * @return {*}
 */
function UserEditProfile() {
  const { show, setRename, rename, userProfile } = useRename();
  const { data, refetch } = useBuyerProfileQuery({
    variables: { buyerId: global.buyerId },
    context: {
      headers: {
        isPrivate: true,
      },
    },
    nextFetchPolicy: "no-cache",
  });
  useEffect(() => {
    if (data) {
      setRename({ ...rename, userProfile: data.buyerProfile });
    }
  }, [data]);

  useEffect(() => {
    refetch && refetch();
  }, []);
  const {
    control,

    setValue,
    formState: { errors },
  } = useForm<UpdateBuyerProfileMutationVariables>();

  const [showBottom, setShowBottom] = useState(true);

  useEffect(() => {
    if (userProfile) {
      setValue("request.firstName", userProfile?.firstName);
      setValue("request.lastName", userProfile?.lastName);
      setValue("request.email", userProfile?.email);
      setValue(
        "request.phoneNumber",
        isEmpty(userProfile?.phoneNumber)
          ? ""
          : userProfile?.phoneNumber.replace("+91", "")
      );
    }
  }, [userProfile]);
  useEffect(() => {
    let refresh = PubSub.subscribe("refresh-buyer-profile", () => {
      refetch();
    });
    return () => {
      if (refresh) {
        PubSub.unsubscribe(refresh);
      }
    };
  }, []);

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
  const { width, height } = useWindowDimensions();

  const getFirstName = () => {
    return (
      <View style={[t.mT8]}>
        <Controller
          control={control}
          rules={{
            required: "Type your first name.",
            validate: {
              positive: (v) => {
                if (v?.trim().length === 0)
                  return "First name should not  only contain Spaces";
                return true;
              },
            },
          }}
          render={({ field: { onChange, value } }) => (
            <View>
              <MaterialTextInput
                editable={false}
                style={[t.mT4]}
                placeholder={"Type your first name"}
                autoCapitalize="words"
                returnKeyType={"next"}
                onChangeText={onChange}
                value={value}
                textAlignVertical={"center"}
              />

              <TouchableOpacity
                onPress={() => {
                  setRename({
                    defaultValue: value ?? "",
                    element: getFirstName,
                    controlName: "request.firstName",
                    palceHolder: "Type your first name",
                    title: "First Name",
                    keyboardType: "default",
                    show: true,
                    rules: {
                      required: "Type your first name.",
                      validate: {
                        positive: (v) => {
                          if (v?.trim().length === 0)
                            return "First name should not  only contain Spaces";
                          return true;
                        },
                      },
                    },
                  });
                }}
                style={[
                  t.absolute,

                  { marginLeft: width - 100 },
                  t.pX4,
                  t.pY4,
                  t.w16,
                ]}
              >
                <Text style={[t.mT1, { color: "red" }]}>EDIT</Text>
              </TouchableOpacity>
            </View>
          )}
          name="request.firstName"
        />
        {errors.request?.firstName && (
          <Text style={[t.textRed900, t.mT1, t.mL4]}>
            {errors.request?.firstName.message}
          </Text>
        )}
      </View>
    );
  };
  const getLastName = () => {
    return (
      <View style={[t.mT4]}>
        <Controller
          control={control}
          rules={{
            required: "Type your last name.",
            validate: {
              positive: (v) => {
                if (v?.trim().length === 0)
                  return "Last name should not  only contain Spaces";
                return true;
              },
            },
          }}
          render={({ field: { onChange, value } }) => (
            <View>
              <MaterialTextInput
                editable={false}
                placeholder={"Type your last name"}
                returnKeyType={"next"}
                onChangeText={onChange}
                value={value}
                textAlignVertical={"center"}
              />
              <TouchableOpacity
                onPress={() => {
                  setRename({
                    defaultValue: value ?? "",
                    element: getFirstName,
                    controlName: "request.lastName",
                    palceHolder: "Type your last name",
                    title: "Last Name",
                    keyboardType: "default",
                    show: true,
                    rules: {
                      required: "Type your last name.",
                      validate: {
                        positive: (v) => {
                          if (v?.trim().length === 0)
                            return "Last name should not  only contain Spaces";
                          return true;
                        },
                      },
                    },
                  });
                }}
                style={[
                  t.absolute,

                  { marginLeft: width - 100 },
                  t.pX4,
                  t.pY4,
                  t.w16,
                ]}
              >
                <Text style={[t.mT1, { color: "red" }]}>EDIT</Text>
              </TouchableOpacity>
            </View>
          )}
          name="request.lastName"
        />
        {errors.request?.lastName && (
          <Text style={[t.textRed900, t.mT1, t.mL4]}>
            {errors.request.lastName.message}
          </Text>
        )}
      </View>
    );
  };
  const getEmail = () => {
    return (
      <View style={[t.mT4]}>
        <Controller
          control={control}
          rules={{
            required: "Field is required.",
            pattern: {
              value:
                /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/,
              message: "invalid email address",
            },
          }}
          render={({ field: { onChange, value } }) => (
            <View>
              <MaterialTextInput
                editable={false}
                style={[t.mT4]}
                placeholder={"Type your email"}
                autoCapitalize="words"
                returnKeyType={"next"}
                onChangeText={onChange}
                value={value}
                textAlignVertical={"center"}
              />
              <TouchableOpacity
                onPress={() => {
                  setRename({
                    defaultValue: value ?? "",
                    element: getFirstName,
                    controlName: "request.email",
                    palceHolder: "Type your email",
                    title: "Email",
                    keyboardType: "default",
                    show: true,
                    rules: {
                      required: "Field is required.",
                      pattern: {
                        value:
                          /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/,
                        message: "invalid email address",
                      },
                    },
                  });
                }}
                style={[
                  t.absolute,

                  { marginLeft: width - 100 },
                  t.pX4,
                  t.pY4,
                  t.w16,
                ]}
              >
                <Text style={[t.mT1, { color: "red" }]}>EDIT</Text>
              </TouchableOpacity>
            </View>
          )}
          name="request.email"
        />

        {errors.request?.email && (
          <Text style={[t.textRed900, t.mT1, t.mL4]}>
            {errors.request?.email.message}
          </Text>
        )}
      </View>
    );
  };
  const getPhoneNumer = () => {
    return (
      <View style={[t.mT4]}>
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
            <View>
              <MaterialTextInput
                style={[t.mT4, t.textGray500]}
                editable={false}
                placeholder={"Type your phone number"}
                autoCapitalize="words"
                keyboardType={
                  Platform.OS === "android" ? "phone-pad" : "number-pad"
                }
                // keyboardType="numeric"
                onChangeText={onChange}
                value={value}
                textAlignVertical={"center"}
              />
              <TouchableOpacity
                onPress={() => {
                  // setRename({
                  //   defaultValue: value ?? "",
                  //   element: getFirstName,
                  //   keyboardType:
                  //     Platform.OS === "android" ? "phone-pad" : "number-pad",
                  //   controlName: "request.phoneNumber",
                  //   palceHolder: "Type your phone number",
                  //   title: "Phone number",
                  //   show: true,
                  //   rules: {
                  //     required: "Field is required.",
                  //     pattern: {
                  //       value: /^[6-9]\d{9}$/,
                  //       message: "Invalid phone number",
                  //     },
                  //   },
                  // });
                }}
                style={[
                  t.absolute,

                  { marginLeft: width - 100 },
                  t.pX4,
                  t.pY4,
                  t.w16,
                ]}
              >
                {/* <Text style={[t.mT1, { color: "red" }]}>EDIT</Text> */}
              </TouchableOpacity>
            </View>
          )}
          name="request.phoneNumber"
        />

        {errors.request?.phoneNumber && (
          <Text style={[t.textRed900, t.mT1, t.mL4]}>
            {errors.request?.phoneNumber.message}
          </Text>
        )}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView>
        <View style={styles.contentContainer}>
          {getFirstName()}
          {getLastName()}
          {getEmail()}
          {getPhoneNumer()}
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
      {show && <RenameBox />}
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
