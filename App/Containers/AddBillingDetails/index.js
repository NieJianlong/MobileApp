import React, { useState, useEffect, useContext, useCallback } from "react";
import { View, StatusBar, Text, Keyboard } from "react-native";
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
import { useRoute } from "@react-navigation/native";
import { useMutation } from "@apollo/client";
import {
  CREATE_BILLING_DETAILS,
  DELETE_BILLING_DETAILS,
  UPDATE_BILLING_DETAILS,
} from "../../Apollo/mutations/mutations_user";
import { AlertContext } from "../Root/GlobalContext";
import * as validator from "../../Validation";
import AppConfig from "../../Config/AppConfig";
import PubSub from "pubsub-js";

function AddBillingDetails(props) {
  const {
    params: { title, billingDetails = {} },
  } = useRoute();
  const { dispatch } = useContext(AlertContext);
  const [firstName, setFirstName] = useState(billingDetails.firstName || "");
  const [lastName, setLastName] = useState(billingDetails.lastName || "");
  const [email, setEmail] = useState(billingDetails.email || "");
  const [phoneNum, setPhoneNum] = useState(billingDetails.phoneNumber || "");
  const [streetName, setStreetName] = useState(
    billingDetails.villageArea || ""
  );
  const [streetNum, setStreetNum] = useState(billingDetails.houseNumber || "");
  const [door, setDoor] = useState(billingDetails.flat || "");
  const [city, setCity] = useState(billingDetails.townCity || "");
  const [mstate, setMstate] = useState(billingDetails.provinceState || "");
  const [postcode, setPostCode] = useState(billingDetails.pinCode || "");
  const [country, setCountry] = useState(billingDetails.country || "");
  const [company, setCompany] = useState(billingDetails.companyName || "");
  const [taxid, setTaxid] = useState(billingDetails.taxCode || "");
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [disable, setDisable] = useState(true);
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
    if (
      firstName.length === 0 ||
      lastName.length === 0 ||
      email.length === 0 ||
      phoneNum.length === 0 ||
      streetName.length === 0 ||
      streetNum.length === 0 ||
      door.length === 0 ||
      city.length === 0 ||
      mstate.length === 0 ||
      postcode.length === 0 ||
      country.length === 0 ||
      company.length === 0 ||
      taxid.length === 0
    ) {
      setDisable(true);
    } else {
      setDisable(false);
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

  const [showBottom, setShowBottom] = useState(true);
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
  const billingAddress = {
    pinCode: postcode,
    addressType: disable ? "BILLING" : "SHIPPING",
    provinceState: mstate,
    townCity: city,
    flat: door,
    villageArea: streetName,
    houseNumber: streetNum,
    country,
    referenceId: global.buyerId,
    defaultAddress: disable,
    streetAddress1: "billing",
  };
  const request = {
    buyerId: global.buyerId,
    firstName: firstName,
    lastName: lastName,
    companyName: company,
    email: email,
    phoneNumber: phoneNum,
    billingAddress: billingDetails.billingDetailsId
      ? { addressId: billingDetails.addressId, ...billingAddress }
      : billingAddress,
    taxCode: taxid,
  };

  const [addBilling] = useMutation(
    billingDetails.billingDetailsId
      ? UPDATE_BILLING_DETAILS
      : CREATE_BILLING_DETAILS,
    {
      variables: {
        request: billingDetails.billingDetailsId
          ? {
              billingDetailsId: billingDetails.billingDetailsId,
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
            message: billingDetails.billingDetailsId
              ? "Billing details updated"
              : "Billing details Added",
            color: colors.success,
            title: "Success",
          },
        });
        NavigationService.goBack();
      },
      onError: (res) => {
        dispatch({ type: "hideloading" });
      },
    }
  );

  const [deleteBilling] = useMutation(DELETE_BILLING_DETAILS, {
    variables: {
      billingDetailsId: billingDetails.billingDetailsId,
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
    if (disable) {
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
  }, [addBilling, disable, dispatch, email, phoneNum]);
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <SafeAreaView
        style={styles.safeArea}
        edges={["top", "right", "left", "bottom"]}
      >
        <AppBar
          rightButton={() => {
            return (
              <RightButton
                title="SAVE"
                disable={disable}
                onPress={() => {
                  onAddBilling();
                }}
              />
            );
          }}
        />
        <KeyboardAwareScrollView>
          <View style={styles.bodyContainer}>
            <Text style={[styles.heading2Bold, { fontSize: s(22) }]}>
              {title}
            </Text>
            <View style={{ marginTop: 20 }}>
              <Switch
                onSwitch={() => {}}
                label="Use the same info as default delivery address"
              />
            </View>
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
        {billingDetails.billingDetailsId && (
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
      </SafeAreaView>
    </View>
  );
}

export default AddBillingDetails;
