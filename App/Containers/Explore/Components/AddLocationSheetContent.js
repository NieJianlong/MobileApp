import React, { useState, useEffect, useContext, useMemo } from "react";
import {
  View,
  StatusBar,
  Text,
  TouchableOpacity as RNTouchableOpacity,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { vs } from "react-native-size-matters";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Switch, MaterialTextInput, Selector } from "../../../Components";
import styles from "./styles";

import colors from "../../../Themes/Colors";
import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import {
  CREATE_ADDRESS,
  CREATE_ADDRESS_FOR_GUEST,
} from "../../../Apollo/mutations/mutations_user";
import { AlertContext } from "../../Root/GlobalContext";
import PubSub from "pubsub-js";
import { userProfileVar } from "../../../Apollo/cache";
import { GetStatesByCountryId } from "../gql/explore_queries";

import { TouchableOpacity as GHTouchableOpacity } from "react-native-gesture-handler";
const TouchableOpacity =
  Platform.OS === "ios" ? RNTouchableOpacity : GHTouchableOpacity;
function AddLocationSheetContent(props) {
  //123e4567-e89b-12d3-a456-556642440000
  const { data } = useQuery(GetStatesByCountryId, {
    variables: { countryId: "123e4567-e89b-12d3-a456-556642440000" },
  });
  const { dispatch } = useContext(AlertContext);
  const userProfileVarReactive = useReactiveVar(userProfileVar);
  const isAuth = useMemo(() => userProfileVarReactive.isAuth, [
    userProfileVarReactive.isAuth,
  ]);
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
      streetNum.length === 0 ||
      door.length === 0 ||
      city.length === 0 ||
      mstate.length === 0 ||
      pincode.length === 0 ||
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
    defaultAddress: isAuth ? asDefault : true,
    addressType: "SHIPPING",
    provinceState: mstate,
    townCity: city,
    flat: door,
    villageArea: streetName,
    houseNumber: streetNum,
    landMark: landMark,
    streetAddress1: name,
    country: "India",
    referenceId: global.buyerId,
  };

  const [addAddress] = useMutation(
    isAuth ? CREATE_ADDRESS : CREATE_ADDRESS_FOR_GUEST,
    {
      variables: {
        request: AddressRequestForCreate,
      },
      context: {
        headers: {
          isPrivate: isAuth,
        },
      },
      onCompleted: (res) => {
        PubSub.publish("refresh-address", "");
        dispatch({
          type: "changAlertState",
          payload: {
            visible: true,
            message: "New address added.",
            color: colors.success,
            title: "Address Added",
          },
        });
        dispatch({ type: "hideloading" });
        dispatch({
          type: "changSheetState",
          payload: {
            showSheet: false,
          },
        });
      },
      onError: (error) => {
        dispatch({ type: "hideloading" });
      },
    }
  );

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
      // type: "short",
      type: "normal",
      value: pincode,
    },
    // {
    //   placeholder: "Country*",
    //   onChangeText: (text) => setCountry(text),
    //   showError: false,
    //   errorMessage: null,
    //   keyboardType: "selector",
    //   type: "short",
    //   value: country,
    // },
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
        <View style={styles.popupHeader}>
          <Text style={[styles.txtSave, { color: "transparent" }]}>SAVE</Text>
          <Text style={styles.popupTitle}>Add your delivery address</Text>
          <TouchableOpacity
            onPress={() => {
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
                dispatch({ type: "loading" });
                addAddress();
              }
            }}
          >
            <Text
              style={[
                styles.txtSave,
                { color: disable ? colors.grey40 : colors.grey80 },
              ]}
            >
              SAVE
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bodyContainer}>
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
          {isAuth && (
            <View style={{ marginTop: 20 }}>
              <Switch
                onSwitch={(res) => {
                  setAsDefault(res);
                }}
                active={asDefault}
                label="Set as default address"
              />
            </View>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}

export default AddLocationSheetContent;
