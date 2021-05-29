import React, { useState, useEffect } from "react";
import { View, StatusBar, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { vs } from "react-native-size-matters";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  AppBar,
  TextInput,
  Switch,
  RightButton,
  MaterialTextInput,
  Selector,
} from "../../Components";
import styles from "./styles";
import NavigationService from "../../Navigation/NavigationService";
import colors from "../../Themes/Colors";
import { useRoute } from "@react-navigation/native";
import { useMutation } from "@apollo/client";
import { CREATE_ADDRESS } from "../../Apollo/mutations/mutations_user";

function AddNewAddress(props) {
  const [name, setName] = useState("");
  const [streetName, setStreetName] = useState("");
  const [streetNum, setStreetNum] = useState("");
  const [door, setDoor] = useState("");
  const [city, setCity] = useState("");
  const [mstate, setMstate] = useState("");
  const [pincode, setPincode] = useState("");
  const [country, setCountry] = useState("");
  const [disable, setDisable] = useState(true);
  const [landMark, setLandMark] = useState("");
  const [asDefault, setAsDefault] = useState(false);
  useEffect(() => {
    if (
      name.length === 0 ||
      streetName.length === 0 ||
      door.length === 0 ||
      mstate.length === 0 ||
      pincode.length === 0 ||
      country.length === 0 ||
      landMark.length === 0
    ) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [
    name,
    streetName,
    streetNum,
    door,
    city,
    mstate,
    pincode,
    country,
    landMark,
  ]);
  let AddressRequestForCreate = {
    pinCode: pincode,
    defaultAddress: asDefault,
    addressType: "SHIPPING",
    provinceState: mstate,
    townCity: city,
    flat: door,
    villageArea: streetName,
    houseNumber: streetNum,
    landMark: landMark,
    country,
    referenceId: global.buyerId,
  };
  const [addAddress, { data }] = useMutation(CREATE_ADDRESS, {
    variables: {
      request: AddressRequestForCreate,
    },
  });
  const inputs = [
    {
      placeholder: "Address Name (ex. home)*",
      onChangeText: (text) => setName(text),
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
      placeholder: "Pincode*",
      onChangeText: (text) => setPincode(text),
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
      placeholder: "Land Mark",
      onChangeText: (text) => setLandMark(text),
      showError: false,
      errorMessage: null,
      keyboardType: "default",
      type: "normal",
    },
  ];

  const { params } = useRoute();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <SafeAreaView
        style={styles.safeArea}
        edges={["top", "right", "left", "bottom"]}
      >
        <AppBar
          rightButton={() => (
            <RightButton
              title="SAVE"
              disable={disable}
              onPress={() => {
                addAddress();
                NavigationService.goBack();
              }}
            />
          )}
        />
        <View style={styles.bodyContainer}>
          <Text style={styles.heading2Bold}>{params.title}</Text>
          <KeyboardAwareScrollView>
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
                        style={{ marginBottom: vs(10) }}
                        placeholder={"Sate"}
                        data={["AAA", "BBB", "CCC"]}
                      />
                    ) : (
                      <MaterialTextInput
                        style={{ marginTop: vs(18) }}
                        {...item}
                      />
                    )}
                  </View>
                );
              })}
            </View>
          </KeyboardAwareScrollView>
          <View style={{ marginTop: 20 }}>
            <Switch
              onSwitch={(res) => {
                setAsDefault(res);
              }}
              label="Set as default address"
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

export default AddNewAddress;
