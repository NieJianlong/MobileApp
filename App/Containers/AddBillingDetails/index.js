import React, { useState, useEffect, useContext, useCallback } from "react";
import { View, Text, Keyboard, TouchableOpacity, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { vs, s } from "react-native-size-matters";
import {
  AppBar,
  Switch,
  RightButton,
  MaterialTextInput,
  Selector,
  Button,
} from "../../Components";
import styles from "./styles";
import NavigationService from "../../Navigation/NavigationService";
import colors from "../../Themes/Colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useMutation, useReactiveVar, useLazyQuery } from "@apollo/client";
import {
  CREATE_BILLING_DETAILS,
  DELETE_BILLING_DETAILS,
  UPDATE_BILLING_DETAILS,
} from "../../Apollo/mutations/mutations_user";

import { AlertContext } from "../Root/GlobalContext";
import * as validator from "../../Validation";
import AppConfig from "../../Config/AppConfig";
import PubSub from "pubsub-js";
import { userProfileVar } from "../../Apollo/cache";
import { Action_Type, Billing_Type } from "./const";
import GetBillingDetail from "../../hooks/billingDetails";
import images from "../../Themes/Images";
import { t } from "react-native-tailwindcss";

function AddBillingDetails(props) {
  const {
    params: {
      title,
      billingType = Billing_Type.BILLING,
      actionType = Action_Type.SAVE,
    },
  } = useRoute();
  const userProfile = useReactiveVar(userProfileVar);

  const { billingDetail } = GetBillingDetail();

  const { dispatch } = useContext(AlertContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [streetName, setStreetName] = useState("");
  const [streetNum, setStreetNum] = useState("");
  const [door, setDoor] = useState("");
  const [city, setCity] = useState("");
  const [mstate, setMstate] = useState("");
  const [postcode, setPostCode] = useState("");
  const [country, setCountry] = useState("");
  const [company, setCompany] = useState("");
  const [taxid, setTaxid] = useState("");
  const [isEmpty, setIsEmpty] = useState(true);
  const [useDefaultAddress, setUseDefaultAddress] = useState(true);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
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

  useEffect(() => {
    if (billingDetail) {
      setFirstName(billingDetail.firstName);
      setLastName(billingDetail.lastName);
      setPhoneNum(billingDetail.phoneNumber);
      setEmail(billingDetail.email);
      setStreetName(billingDetail.billingAddress.villageArea);
      setStreetNum(billingDetail.billingAddress.streetAddress1);
      setDoor(billingDetail.billingAddress.flat);
      setCity(billingDetail.billingAddress.townCity);
      setMstate(billingDetail.billingAddress.provinceState);
      setPostCode(billingDetail.billingAddress.pinCode);
      setCountry(billingDetail.billingAddress.country);
      setCompany(billingDetail.companyName);
      setTaxid(billingDetail.taxCode);
    }
  }, [billingDetail]);

  useEffect(() => {
    if (
      firstName?.length === 0 ||
      lastName?.length === 0 ||
      email?.length === 0 ||
      phoneNum?.length === 0 ||
      streetName?.length === 0 ||
      streetNum?.length === 0 ||
      door?.length === 0 ||
      city?.length === 0 ||
      mstate?.length === 0 ||
      postcode?.length === 0 ||
      country?.length === 0 ||
      company?.length === 0 ||
      taxid?.length === 0
    ) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  }, [
    firstName,
    lastName,
    streetName,
    streetNum,
    door,
    city,
    mstate,
    postcode,
    country,
    company,
    taxid,
    email,
    phoneNum,
  ]);

  const inputs = [
    {
      placeholder: "First Name*",
      onChangeText: (text) => setFirstName(text),
      value: firstName,
      showError: false,
      errorMessage: null,
      keyboardType: "default",
      type: "short",
    },
    {
      placeholder: "Last Name*",
      onChangeText: (text) => setLastName(text),
      value: lastName,
      showError: false,
      keyboardType: "default",
      errorMessage: null,
      type: "short",
    },
    {
      placeholder: "Email",
      onChangeText: (text) => setEmail(text),
      value: email,
      showError: false,
      errorMessage: null,
      keyboardType: "default",
      type: "normal",
    },
    {
      placeholder: "phone number*",
      onChangeText: (text) => setPhoneNum(text),
      value: phoneNum,
      showError: false,
      errorMessage: null,
      keyboardType: "default",
      type: "normal",
    },
    {
      placeholder: "Street Name*",
      onChangeText: (text) => setStreetName(text),
      value: streetName,
      showError: false,
      errorMessage: null,
      keyboardType: "default",
      type: "normal",
    },
    {
      placeholder: "Street Number*",
      onChangeText: (text) => setStreetNum(text),
      value: streetNum,
      streetNum: streetNum,
      showError: false,
      errorMessage: null,
      keyboardType: "default",
      type: "short",
    },
    {
      placeholder: "Flat, Floor, Door",
      onChangeText: (text) => setDoor(text),
      value: door,
      showError: false,
      errorMessage: null,
      keyboardType: "default",
      type: "short",
    },
    {
      placeholder: "City*",
      onChangeText: (text) => setCity(text),
      value: city,
      showError: false,
      errorMessage: null,
      keyboardType: "default",
      type: "short",
    },
    {
      placeholder: "State*",
      onChangeText: (text) => setMstate(text),
      value: mstate,
      showError: false,
      errorMessage: null,
      keyboardType: "selector",
      type: "short",
    },
    {
      placeholder: "Postcode*",
      onChangeText: (text) => setPostCode(text),
      value: postcode,
      showError: false,
      errorMessage: null,
      keyboardType: "decimal-pad",
      type: "short",
    },
    {
      placeholder: "Country*",
      onChangeText: (text) => setCountry(text),
      value: country,
      showError: false,
      errorMessage: null,
      keyboardType: "default",
      type: "short",
    },
    {
      placeholder: "Company name",
      onChangeText: (text) => setCompany(text),
      value: company,
      showError: false,
      errorMessage: null,
      keyboardType: "default",
      type: "short",
    },
    {
      placeholder: "TAX ID",
      onChangeText: (text) => setTaxid(text),
      value: taxid,
      showError: false,
      errorMessage: null,
      keyboardType: "default",
      type: "short",
    },
  ];

  const billingAddress = {
    pinCode: postcode,
    addressType: billingType,
    provinceState: mstate,
    townCity: city,
    flat: door,
    villageArea: streetName,
    houseNumber: streetNum,
    country,
    referenceId: global.buyerId,
    defaultAddress: useDefaultAddress,
    streetAddress1: streetNum,
  };
  const request = {
    buyerId: global.buyerId,
    firstName: firstName,
    lastName: lastName,
    companyName: company,
    email: email,
    phoneNumber: !phoneNum?.startsWith("+91") ? "+91" + phoneNum : phoneNum,
    billingAddress: billingDetail?.billingDetailsId
      ? { addressId: billingDetail?.billingDetailsId, ...billingAddress }
      : billingAddress,
    taxCode: taxid,
  };

  const [addBilling] = useMutation(
    billingDetail?.billingDetailsId
      ? UPDATE_BILLING_DETAILS
      : CREATE_BILLING_DETAILS,
    {
      variables: {
        request: billingDetail?.billingDetailsId
          ? {
              billingDetailsId: billingDetail?.billingDetailsId,
              ...request,
            }
          : request,
      },
      context: {
        headers: {
          isPrivate: true,
        },
      },
      onCompleted: (res) => {
        PubSub.publish("refresh-billing-detail");
        dispatch({ type: "hideloading" });
        dispatch({
          type: "changAlertState",
          payload: {
            visible: true,
            message: billingDetail?.billingDetailsId
              ? "Billing details updated"
              : "Billing details Added",
            color: colors.success,
            title: "Success",
          },
        });

        switch (actionType) {
          case Billing_Type.BILLING:
            break;

          default:
            NavigationService.goBack();
        }
      },
      onError: (err) => {
        dispatch({ type: "hideloading" });
        dispatch({
          type: "changAlertState",
          payload: {
            visible: true,
            message: err?.message,
            color: colors.error,
          },
        });
      },
    }
  );

  const [deleteBilling] = useMutation(DELETE_BILLING_DETAILS, {
    variables: {
      billingDetailsId: billingDetail?.billingDetailsId,
    },
    context: {
      headers: {
        isPrivate: true,
      },
    },
    onCompleted: (res) => {
      PubSub.publish("refresh-billing-detail");
      dispatch({ type: "hideloading" });
      dispatch({
        type: "changAlertState",
        payload: {
          visible: true,
          message: "You have successfully removed your billing address.",
          color: colors.secondary00,
          title: "Billing Details removed",
        },
      });
      NavigationService.goBack();
    },
    onError: (res) => {
      dispatch({ type: "hideloading" });
    },
  });

  const onAddBilling = useCallback(() => {
    if (isEmpty && !useDefaultAddress) {
      dispatch({
        type: "changAlertState",
        payload: {
          visible: true,
          message: "",
          color: colors.error,
          title: "Make sure you have entered the correct information",
        },
      });
    } else {
      if (!validator.isValidEmail(email)) {
        dispatch({
          type: "changAlertState",
          payload: {
            visible: true,
            message: "",
            color: colors.error,
            title: "The email format you entered is incorrect.",
          },
        });
      } else if (!validator.isValidPhone(phoneNum)) {
        dispatch({
          type: "changAlertState",
          payload: {
            visible: true,
            message: "",
            color: colors.error,
            title: "The phone no format you entered is incorrect.",
          },
        });
      } else {
        dispatch({ type: "loading" });
        addBilling();
      }
    }
  }, [addBilling, isEmpty, dispatch, email, phoneNum]);
  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={[t.mR6]}>
          <RightButton
            title={actionType}
            disable={isEmpty && !useDefaultAddress}
            onPress={() => {
              onAddBilling();
            }}
          />
        </View>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView>
        <View style={styles.bodyContainer}>
          <Text style={[styles.heading2Bold, { fontSize: s(20) }]}>
            {title}
          </Text>
          <View style={{ marginTop: 20 }}>
            <Switch
              onSwitch={(b) => setUseDefaultAddress(b)}
              label="Use the same info as default delivery address"
            />
          </View>
          <TouchableOpacity onPress={() => {}}>
            <View style={styles.saveAddress}>
              <View style={styles.addressIcon}>
                <Image source={images.addressIcon} />
              </View>
              <Text style={styles.saveAddressText}>Use a saved address</Text>
            </View>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {inputs.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    width: item.type == "short" ? "48%" : "100%",
                    marginTop: vs(18),
                  }}
                >
                  {item.keyboardType === "selector" ? (
                    <Selector
                      placeholder={"Sate"}
                      value={mstate}
                      data={["AAA", "BBB", "CCC"]}
                      onValueChange={(text) => setMstate(text)}
                    />
                  ) : (
                    <MaterialTextInput {...item} />
                  )}
                </View>
              );
            })}
          </View>
        </View>
      </KeyboardAwareScrollView>
      {billingDetail?.billingDetailsId && billingType !== Billing_Type.BILLING && (
        <View
          style={{
            position: "absolute",
            bottom: 10,
            right: 0,
            backgroundColor: colors.background,
            left: 0,
            paddingHorizontal: AppConfig.paddingHorizontal,
          }}
        >
          <Button
            onPress={() => {
              dispatch({ type: "loading" });
              deleteBilling();
            }}
            textColor={colors.grey80}
            text="REMOVE BILLING DETAILS"
            backgroundColor="transparent"
          />
        </View>
      )}
    </View>
  );
}

export default AddBillingDetails;
