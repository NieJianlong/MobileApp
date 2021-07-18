import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StatusBar,
  Text,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { vs, s } from "react-native-size-matters";
import {
  AppBar,
  Switch,
  RightButton,
  MaterialTextInput,
  Selector,
} from "../../Components";
import { ApplicationStyles } from "../../Themes";
import styles from "./styles";
import NavigationService from "../../Navigation/NavigationService";
import colors from "../../Themes/Colors";
import { useRoute } from "@react-navigation/native";
import { useMutation } from "@apollo/client";
import {
  CREATE_ADDRESS,
  CREATE_BILLING_DETAILS,
} from "../../Apollo/mutations/mutations_user";
import { AlertContext } from "../Root/GlobalContext";

function AddBillingDetails(props) {
  const { dispatch } = useContext(AlertContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneOrEmailNum, setPhoneOrEmailNum] = useState("");
  const [streetName, setStreetName] = useState("");
  const [streetNum, setStreetNum] = useState("");
  const [door, setDoor] = useState("");
  const [city, setCity] = useState("");
  const [mstate, setMstate] = useState("");
  const [postcode, setPostCode] = useState("");
  const [country, setCountry] = useState("");
  const [company, setCompany] = useState("");
  const [taxid, setTaxid] = useState("");
  const [addressId, setAddressId] = useState("");
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
      phoneOrEmailNum.length === 0 ||
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
    phoneOrEmailNum,
    streetName,
    streetNum,
    door,
    city,
    mstate,
    postcode,
    country,
    company,
    taxid,
  ]);
  const inputs = [
    {
      placeholder: "First Name*",
      onChangeText: (text) => setFirstName(text),
      showError: false,
      errorMessage: null,
      keyboardType: "default",
      type: "short",
    },
    {
      placeholder: "Last Name*",
      onChangeText: (text) => setLastName(text),
      showError: false,
      keyboardType: "default",
      errorMessage: null,
      type: "short",
    },
    {
      placeholder: "Email or phone number*",
      onChangeText: (text) => setPhoneOrEmailNum(text),
      showError: false,
      errorMessage: null,
      keyboardType: "default",
      type: "normal",
    },
    {
      placeholder: "Street Name*",
      onChangeText: (text) => setStreetName(text),
      showError: false,
      errorMessage: null,
      keyboardType: "default",
      type: "normal",
    },
    {
      placeholder: "Street Number*",
      onChangeText: (text) => setStreetNum(text),
      showError: false,
      errorMessage: null,
      keyboardType: "default",
      type: "short",
    },
    {
      placeholder: "Flat, Floor, Door",
      onChangeText: (text) => setDoor(text),
      showError: false,
      errorMessage: null,
      keyboardType: "default",
      type: "short",
    },
    {
      placeholder: "City*",
      onChangeText: (text) => setCity(text),
      showError: false,
      errorMessage: null,
      keyboardType: "default",
      type: "short",
    },
    {
      placeholder: "State*",
      onChangeText: (text) => setMstate(text),
      showError: false,
      errorMessage: null,
      keyboardType: "selector",
      type: "short",
    },
    {
      placeholder: "Postcode*",
      onChangeText: (text) => setPostCode(text),
      showError: false,
      errorMessage: null,
      keyboardType: "decimal-pad",
      type: "short",
    },
    {
      placeholder: "Country*",
      onChangeText: (text) => setCountry(text),
      showError: false,
      errorMessage: null,
      keyboardType: "default",
      type: "short",
    },
    {
      placeholder: "Company name",
      onChangeText: (text) => setCompany(text),
      showError: false,
      errorMessage: null,
      keyboardType: "default",
      type: "short",
    },
    {
      placeholder: "TAX ID",
      onChangeText: (text) => setTaxid(text),
      showError: false,
      errorMessage: null,
      keyboardType: "default",
      type: "short",
    },
  ];
  const { params } = useRoute();
  billingAddress: {
    referenceId: "123e4567-e89b-12d3-a456-556642440009",
    pinCode: postcode,
    addressType: "BILLING",
    provinceState: mstate,
    townCity: city,
    flat: door,
    villageArea: streetName,
    houseNumber: streetNum,
    country:"china",
    referenceId: global.buyerId,
}
  let AddressRequestForCreate = {
    pinCode: postcode,
    addressType: "BILLING",
    provinceState: mstate,
    townCity: city,
    flat: door,
    villageArea: streetName,
    houseNumber: streetNum,
    country,
    referenceId: global.buyerId,
  };
  const [addBilling] = useMutation(CREATE_BILLING_DETAILS, {
    variables: {
      request: {
        buyerId: global.buyerId,
        firstName: firstName,
        lastName: lastName,
        companyName: company,
        email: phoneOrEmailNum,
        phoneNumber: phoneOrEmailNum,
        billingAddressId: addressId,
        taxCode: taxid,
      },
    },
    context: {
      headers: {
        isPrivate: true,
      },
    },
    onCompleted: (res) => {
      dispatch({
        type: "changAlertState",
        payload: {
          visible: true,
          message: "New address added.",
          color: colors.success,
          title: "Billing details Added",
        },
      });
      NavigationService.goBack();
    },
    onError: (res) => {},
  });
  useEffect(() => {
    if (addressId) {
      addBilling();
    }
  }, [addBilling, addressId]);
  const [addAddress] = useMutation(CREATE_ADDRESS, {
    variables: {
      request: AddressRequestForCreate,
    },
    onCompleted: (res) => {
      setAddressId(res.createAddress.addressId);
    },
    onError: (res) => {},
  });

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
                  addAddress();
                }}
              />
            );
          }}
        />
        <KeyboardAwareScrollView>
          <View style={styles.bodyContainer}>
            <Text style={[styles.heading2Bold, { fontSize: s(22) }]}>
              {params.title}
            </Text>
            <View style={{ marginTop: 20 }}>
              <Switch
                onSwitch={() => {}}
                label="Use the same info as my personal details"
              ></Switch>
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
                        data={["AAA", "BBB", "CCC"]}
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
      </SafeAreaView>
    </View>
  );
}

export default AddBillingDetails;
