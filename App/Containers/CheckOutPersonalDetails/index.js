import React, { useState, useEffect } from "react";
import { View, Text, Keyboard, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { vs } from "react-native-size-matters";
import {
  AppBar,
  TextInput,
  Switch,
  RightButton,
  Selector,
  MaterialTextInput,
} from "../../Components";
import { ApplicationStyles, Colors, Metrics } from "../../Themes";
import styles from "./styles";
import NavigationService from "../../Navigation/NavigationService";
import { useNavigation, useRoute } from "@react-navigation/native";

// validation
import * as validator from "../../Validation";
import { t } from "react-native-tailwindcss";

function CheckOutPersonalDetails(props) {
  /**
   * Valdiation and cache data, this will change as we evolve the apollo client
   * we will need an object to post for the mutation
   * we can validate non required fields
   * we can validate fro XSS on everything
   */
  let PERSONAL_DETAILS_CACHE_FIELDS = {
    firstName: "",
    lastName: "",
    phoneOrEmailNum: "",
    streetName: "",
    streetNum: "",
    door: "",
    city: "",
    mstate: "",
    postcode: "",
    country: "",
  };

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
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [disable, setDisable] = useState(false);

  /** Validation, will be updated when style guidelines are provided */
  let [validationDisplay, setValidationDisplay] = useState("");

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
      // door.length === 0 ||  this is not a required field
      city.length === 0 ||
      // state is not a required field mstate.length === 0 ||
      postcode.length === 0 ||
      country.length === 0
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
    // taxid,
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
      errorMessage: null,
      keyboardType: "default",
      type: "short",
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
      keyboardType: "numeric",
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
      placeholder: "Email or phone number*",
      onChangeText: (text) => setPhoneOrEmailNum(text),
      showError: false,
      errorMessage: null,
      keyboardType: "default",
      type: "normal",
    },
  ];

  const { params } = useRoute();

  /**
   * we will need values to create a grapphql mutation(update database)
   * we will probably need a mix of fields for the database update from this screen and others
   * so we will temporarly cache them until update is complete
   * also we will need to do some validation as well
   */
  const updateForCacheAndValidation = () => {
    PERSONAL_DETAILS_CACHE_FIELDS.firstName = firstName;
    PERSONAL_DETAILS_CACHE_FIELDS.lastName = lastName;
    PERSONAL_DETAILS_CACHE_FIELDS.streetName = streetName;
    PERSONAL_DETAILS_CACHE_FIELDS.streetNum = streetNum;
    PERSONAL_DETAILS_CACHE_FIELDS.door = door;
    PERSONAL_DETAILS_CACHE_FIELDS.city = city;
    PERSONAL_DETAILS_CACHE_FIELDS.mstate = mstate;
    PERSONAL_DETAILS_CACHE_FIELDS.postcode = postcode;
    PERSONAL_DETAILS_CACHE_FIELDS.country = country;
    // PERSONAL_DETAILS_CACHE_FIELDS.company = company
    PERSONAL_DETAILS_CACHE_FIELDS.phoneOrEmailNum = phoneOrEmailNum;
    let validatorResponse = validator.personalDetailsValidator(
      PERSONAL_DETAILS_CACHE_FIELDS
    );

    // do something with cache

    return validatorResponse;
  };
  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={[t.mR6]}>
          <RightButton
            title="NEXT"
            disable={disable}
            onPress={() => {
              // Validation here, simply check in state and set validation message if requried
              // make an object so code is more concise in validate function
              let reporter = updateForCacheAndValidation();
              if (reporter.hasMissing) {
                setValidationDisplay(`${reporter.missingVal}`);
              } else if (!reporter.validPhoneOrEmail) {
                setValidationDisplay("Valid Phone or Email Required");
              } else {
                NavigationService.navigate("CheckoutBillingDetailsScreen", {
                  title: "Please enter your billing details",
                });
              }
              // NavigationService.goBack();
            }}
          />
        </View>
      ),
    });
  }, [navigation]);
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        keyboardVerticalOffset={50}
        behavior="position"
        style={{ flex: 1 }}
        enabled
        contentContainerStyle={{ flex: 1 }}
      >
        <View style={styles.bodyContainer}>
          <Text style={styles.heading2Bold}>
            Please enter your personal details
          </Text>

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
          <View style={{ marginTop: 20 }}>
            <Switch onSwitch={() => {}} label="Use as default address"></Switch>
          </View>
          <Text style={styles.txtValidate}>{validationDisplay} </Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

export default CheckOutPersonalDetails;
