import React, { useContext, useEffect, useRef } from "react";
import {
  useWindowDimensions,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Modal, Portal } from "react-native-paper";
import { color, t } from "react-native-tailwindcss";
import { AntDesign } from "@expo/vector-icons";
import { Controller, useForm } from "react-hook-form";

import { TextInput as PaperTextInput } from "react-native-paper";
import {
  BuyerProfileByUserIdDocument,
  UpdateBuyerProfileMutationVariables,
  useSendOtpCodeMutation,
  useUpdateBuyerProfileMutation,
  ValidationType,
} from "../../generated/graphql";
import Button from "./Button";
import useRename from "../hooks/useRename";
import MaterialTextInput from "./MaterialTextInput";
import { get, isEmpty } from "lodash";
import PubSub from "pubsub-js";
import { AlertContext } from "../Containers/Root/GlobalContext";
import colors from "../Themes/Colors";
import NavigationService from "../Navigation/NavigationService";
import {
  getLocalStorageValue,
  LOCAL_STORAGE_USER_NAME,
  LOCAL_STORAGE_USER_PASSWORD,
  setLocalStorageValue,
} from "../Apollo/local-storage";

interface Props {
  submit: (data: UpdateBuyerProfileMutationVariables) => void;
}
function RenameBox({ submit }: Props) {
  const { width, height } = useWindowDimensions();
  const { setRename, rename } = useRename();
  const { dispatch } = useContext(AlertContext);
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<UpdateBuyerProfileMutationVariables>({
    defaultValues: {},
  });
  const [resendCode] = useSendOtpCodeMutation();
  const [updateProfile] = useUpdateBuyerProfileMutation({
    onCompleted: (res) => {
      setRename({
        ...rename,
        show: false,
        userProfile: res.updateBuyerProfile,
      });
      // PubSub.publish("refresh-buyer-profile");
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

      if (
        !res.updateBuyerProfile?.phoneNumberVerified ||
        !res.updateBuyerProfile?.emailVerified
      ) {
        if (
          isEmpty(getValues("request.email")) &&
          isEmpty(getValues("request.phoneNumber"))
        ) {
          return;
        }
        resendCode({
          variables: {
            sendCodeRequest: {
              userId: res?.updateBuyerProfile?.userId ?? "",
              validationType: getValues("request.phoneNumber")
                ? ValidationType.Sms
                : ValidationType.Email,
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
              phone: getValues("request.phoneNumber")
                ? res.updateBuyerProfile?.phoneNumber
                : res.updateBuyerProfile?.email,
              password: password?.trim(),
              userId: res?.updateBuyerProfile?.userId,
              hidebackButton: true,
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
      setRename({ ...rename, show: false });
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

  useEffect(() => {
    if (rename.defaultValue) {
      setValue(rename.controlName, rename.defaultValue);
    }
  }, [rename.defaultValue]);
  const onSubmit = async (data: UpdateBuyerProfileMutationVariables) => {
    dispatch({
      type: "changLoading",
      payload: true,
    });
    let buyerProfileRequest = {
      buyerId: global.buyerId,
    };
    if (data.request.firstName) {
      buyerProfileRequest = {
        ...buyerProfileRequest,
        firstName: data.request.firstName,
      };
    }
    if (data.request.lastName) {
      buyerProfileRequest = {
        ...buyerProfileRequest,
        lastName: data.request.lastName,
      };
    }
    if (data.request.email) {
      buyerProfileRequest = {
        ...buyerProfileRequest,
        email: data.request.email,
      };
    }
    if (data.request.phoneNumber) {
      buyerProfileRequest = {
        ...buyerProfileRequest,
        phoneNumber: "+91" + data.request.phoneNumber,
      };
    }

    updateProfile({
      variables: {
        request: buyerProfileRequest,
      },
      context: {
        headers: {
          isPrivate: true,
        },
      },
    });
  };
  const ref = useRef<typeof PaperTextInput | null>(null);
  console.log(errors.request);

  return (
    <Portal>
      <Modal visible={true} dismissable={false}>
        <View
          onLayout={() => {
            if (ref.current) {
              ref.current.focus();
            }
          }}
          style={[
            t.bgWhite,
            { marginHorizontal: 0.08 * width, width: 0.84 * width },
            { borderRadius: 16 },
            t.pY6,
            t.mB32,
          ]}
        >
          <View>
            <View
              style={[t.pX6, t.flexRow, t.justifyBetween, t.itemsCenter, t.mB2]}
            >
              <View style={[t.flexRow, t.itemsCenter]}>
                <View>
                  <Text
                    style={[
                      t.text16,
                      t.textPrimaryNavyLight,
                      t.fontPrimaryBoldHeavy,
                    ]}
                    numberOfLines={1}
                  >
                    {rename.title}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setRename({ ...rename, show: false });
                }}
              >
                <AntDesign name="close" size={24} color={"gray"} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={[t.pX4, t.mT2]}>
            <Controller
              control={control}
              rules={rename.rules}
              render={({ field: { onChange, value } }) => (
                <MaterialTextInput
                  editable={true}
                  style={[t.mT4]}
                  placeholder={rename.palceHolder}
                  autoCapitalize="words"
                  returnKeyType={"next"}
                  onChangeText={onChange}
                  value={value}
                  autoFocus={true}
                  textAlignVertical={"center"}
                />
              )}
              name={rename.controlName}
            />
            {errors.request && get(errors, rename.controlName) && (
              <Text style={[t.textRed900, t.mT1, t.mL4]}>
                {get(errors, rename.controlName).message}
              </Text>
            )}
          </View>

          <View style={[t.flexRow, t.justifyEnd, t.pX4, t.mT4]}>
            <Button
              onPress={() => {
                setRename({ ...rename, show: false });
              }}
              text="Cancel"
              style={[t.w20, t.h10, t.mR4, t.bgGray500]}
            />
            <Button
              style={[t.mL6]}
              onPress={handleSubmit(onSubmit)}
              style={[t.w20, t.h10]}
              text="Save"
            />
          </View>
        </View>
      </Modal>
    </Portal>
  );
}

export default RenameBox;
