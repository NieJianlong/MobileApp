import React, { useState, useEffect, useContext } from "react";
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
import {
  CREATE_ADDRESS,
  UPDATE_ADDRESS,
} from "../../Apollo/mutations/mutations_user";
import { AlertContext } from "../Root/GlobalContext";

function AddNewAddress(props) {
  const { dispatch } = useContext(AlertContext);
  const { params } = useRoute();
  const { currentAddress } = params;
  const [name, setName] = useState("");
  const [streetName, setStreetName] = useState(
    currentAddress?.villageArea || ""
  );
  const [streetNum, setStreetNum] = useState(currentAddress?.houseNumber || "");
  const [door, setDoor] = useState(currentAddress?.flat || "");
  const [city, setCity] = useState(currentAddress?.townCity || "");
  const [mstate, setMstate] = useState(currentAddress?.provinceState || "");
  const [pincode, setPincode] = useState(currentAddress?.pinCode || "");
  const [country, setCountry] = useState(currentAddress?.country || "");
  const [disable, setDisable] = useState(true);
  const [landMark, setLandMark] = useState(currentAddress?.landMark || "");
  const [asDefault, setAsDefault] = useState(
    currentAddress?.defaultAddress || false
  );
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
  const [addAddress] = useMutation(CREATE_ADDRESS, {
    variables: {
      request: AddressRequestForCreate,
    },
    onCompleted: (res) => {
      dispatch({
        type: "changAlertState",
        payload: {
          visible: true,
          message: "New address added.",
          color: colors.success,
          title: "Address Added",
        },
      });
      NavigationService.goBack();
    },
  });
  const [updateAddress] = useMutation(UPDATE_ADDRESS, {
    variables: {
      request: {
        ...AddressRequestForCreate,
        addressId: currentAddress?.addressId,
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
          message: "You have successfully changed your address.",
          color: colors.secondary00,
          title: "Address Changed",
        },
      });
      NavigationService.goBack();
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
      value: name,
    },
    {
      placeholder: "Street Name*",
      onChangeText: (text) => setStreetName(text),
      showError: false,
      errorMessage: null,
      keyboardType: "default",
      type: "normal",
      value: streetName,
    },
    {
      placeholder: "Street Number*",
      onChangeText: (text) => setStreetNum(text),
      showError: false,
      errorMessage: null,
      keyboardType: "default",
      type: "short",
      value: streetNum,
    },
    {
      placeholder: "Flat, Floor, Door",
      onChangeText: (text) => setDoor(text),
      showError: false,
      errorMessage: null,
      keyboardType: "default",
      type: "short",
      value: door,
    },
    {
      placeholder: "City*",
      onChangeText: (text) => setCity(text),
      showError: false,
      errorMessage: null,
      keyboardType: "default",
      type: "short",
      value: city,
    },
    {
      placeholder: "State*",
      onChangeText: (text) => setMstate(text),
      showError: false,
      errorMessage: null,
      keyboardType: "selector",
      type: "short",
      value: mstate,
    },
    {
      placeholder: "Pincode*",
      onChangeText: (text) => setPincode(text),
      showError: false,
      errorMessage: null,
      keyboardType: "decimal-pad",
      type: "short",
      value: pincode,
    },
    {
      placeholder: "Country*",
      onChangeText: (text) => setCountry(text),
      showError: false,
      errorMessage: null,
      keyboardType: "default",
      type: "short",
      value: country,
    },
    {
      placeholder: "Land Mark",
      onChangeText: (text) => setLandMark(text),
      showError: false,
      errorMessage: null,
      keyboardType: "default",
      type: "normal",
      value: landMark,
    },
  ];
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
                currentAddress ? updateAddress() : addAddress();
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
                        value={mstate}
                        data={["AAA", "BBB", "CCC"]}
                        onValueChange={(text) => setMstate(text)}
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
              active={asDefault}
              label="Set as default address"
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

export default AddNewAddress;
