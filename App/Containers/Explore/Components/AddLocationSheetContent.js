import React, { useRef, useContext, useCallback, useState } from "react";
import {
  View,
  Text,
  Platform,
  TouchableOpacity as RNTouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextInput } from "../../../Components";
import styles from "../styles";
import { AlertContext } from "../../Root/GlobalContext";
import * as aQM from "../gql/explore_queries";
import * as gqlMappers from "../gql/gql_mappers";
import * as storage from "../../../Apollo/local-storage";
import { userProfileVar } from "../../../Apollo/cache";
import { getUniqueId } from "react-native-device-info";
import { TouchableOpacity as GHTouchableOpacity } from "react-native-gesture-handler";
import { useMutation } from "@apollo/client";

const TouchableOpacity =
  Platform.OS === "ios" ? RNTouchableOpacity : GHTouchableOpacity;
/**
 * queries for address
 */
export default function AddLocationSheet() {
  let stateInput = useRef();
  let cityInput = useRef();
  let villageInput = useRef();
  let houseNumberInput = useRef();
  let flatNumberInput = useRef();
  let landmarkInput = useRef();
  const { dispatch } = useContext(AlertContext);

  // mayby we can simplity this
  const [pinCodeV, setPinCode] = useState(0);
  const [stateV, setStateV] = useState("");
  const [cityV, setCityV] = useState("");
  const [areaV, setAreaV] = useState("");
  const [numHV, setNumHV] = useState("");
  const [numFV, setNumFV] = useState("");
  const [markN, setMarkV] = useState("");

  const toggleAddLocationSheet = useCallback(() => {
    // found issues with updating state here
    dispatch({
      type: "changSheetState",
      payload: {
        showSheet: false,
        height: 600,
        children: () => null,
        sheetTitle: "",
      },
    });
  }, [dispatch]);
  let AddressRequestForCreate = {
    pinCode: pinCodeV,
    defaultAddress: true,
    addressType: "SHIPPING",
    provinceState: stateV,
    townCity: cityV,
    flat: numFV,
    villageArea: areaV,
    houseNumber: numHV,
    landMark: markN,
    referenceId: buyerId,
  };
  /**
   * CREATE_ADDRESS is public api
   * run the CREATE_ADDRESS mutation
   * see './gql/explore_queries'
   *
   * auth flow use buyer id local storage  email key
   * guest flow use guest buyer id in local storage device id key
   */
  const [runAddAddessMutation, { data }] = useMutation(aQM.CREATE_ADDRESS, {
    context:{   headers: {isPrivate: true},
    variables: { request: AddressRequestForCreate },
    onCompleted: (result) => {
      console.log(`runAddAddessMutation ${JSON.stringify(result.data)}`);
      if (typeof result.data !== "undefined") {
        console.log(
          `runAddAddessMutation update userProfileVar with addressId ${JSON.stringify(
            result.data.createAddress.addressId
          )}`
        );
        userProfileVar({
          ...userProfileVar(),
          addressId: result.data.createAddress.addressId,
          addressLine1: gqlMappers.mapGQLAddressToDelivery(
            result.data.createAddress
          ),
          addressLine2: gqlMappers.mapGQLAddressToLine2(
            result.data.createAddress
          ),
        });
        console.log(userProfileVar().addressId);
      }
    },
  });

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.popupHeader}>
        <Text style={[styles.txtSave, { color: "transparent" }]}>SAVE</Text>
        <Text style={styles.popupTitle}>Add your delivery address</Text>
        <TouchableOpacity
          onPress={() => {
            // had to do this for issues getting local state for create address
            runAddAddessMutation();
            toggleAddLocationSheet();
          }}
        >
          <Text style={styles.txtSave}>SAVE</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAwareScrollView enableOnAndroid>
        <TextInput
          onChangeText={(text) => setPinCode(text)}
          placeholder={"Pin Code"}
          style={styles.textInput}
          returnKeyType={"next"}
          onSubmitEditing={() => stateInput.getInnerRef().focus()}
        />
        <TextInput
          onChangeText={(text) => setStateV(text)}
          placeholder={"State (Province)"}
          style={styles.textInput}
          ref={(r) => (stateInput = r)}
          returnKeyType={"next"}
          onSubmitEditing={() => cityInput.getInnerRef().focus()}
        />
        <TextInput
          onChangeText={(text) => setCityV(text)}
          placeholder={"Town or city"}
          style={styles.textInput}
          ref={(r) => (cityInput = r)}
          returnKeyType={"next"}
          onSubmitEditing={() => villageInput.getInnerRef().focus()}
        />
        <TextInput
          onChangeText={(text) => setAreaV(text)}
          placeholder={"Village or area"}
          style={styles.textInput}
          ref={(r) => (villageInput = r)}
          returnKeyType={"next"}
          onSubmitEditing={() => houseNumberInput.getInnerRef().focus()}
        />
        <TextInput
          onChangeText={(text) => setNumHV(text)}
          placeholder={"House number"}
          style={styles.textInput}
          ref={(r) => (houseNumberInput = r)}
          returnKeyType={"next"}
          onSubmitEditing={() => flatNumberInput.getInnerRef().focus()}
        />
        <TextInput
          onChangeText={(text) => setNumFV(text)}
          placeholder={"Flat number"}
          style={styles.textInput}
          ref={(r) => (flatNumberInput = r)}
          returnKeyType={"next"}
          onSubmitEditing={() => landmarkInput.getInnerRef().focus()}
        />
        <TextInput
          onChangeText={(text) => setMarkV(text)}
          placeholder={"Landmark"}
          style={styles.textInput}
          ref={(r) => (landmarkInput = r)}
          returnKeyType={"done"}
        />
      </KeyboardAwareScrollView>
    </View>
  );
}
