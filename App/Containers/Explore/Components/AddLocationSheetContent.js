import React, { useState, useEffect, useContext, useMemo } from "react";
import {
  View,
  StatusBar,
  Text,
  TouchableOpacity as RNTouchableOpacity,
  Platform,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { vs } from "react-native-size-matters";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MaterialTextInput, Button } from "../../../Components";
import styles from "./styles";
import colors from "../../../Themes/Colors";
import { useMutation, useReactiveVar } from "@apollo/client";
import {
  CREATE_ADDRESS,
  CREATE_ADDRESS_FOR_GUEST,
} from "../../../Apollo/mutations/mutations_user";
import { AlertContext } from "../../Root/GlobalContext";
import PubSub from "pubsub-js";
import { userProfileVar } from "../../../Apollo/cache";
import { TouchableOpacity as GHTouchableOpacity } from "react-native-gesture-handler";
import DropDownPicker from "react-native-dropdown-picker";
import { t } from "react-native-tailwindcss";
import { Controller, useForm } from "react-hook-form";
import lodash from "lodash";

const TouchableOpacity =
  Platform.OS === "ios" ? RNTouchableOpacity : GHTouchableOpacity;

function AddLocationSheetContent(props) {
  //123e4567-e89b-12d3-a456-556642440000
  // const [selectedState, setSelectedState] = useState();
  // const { data } = useQuery(GetStatesByCountryId, {
  //   variables: { countryId: "123e4567-e89b-12d3-a456-556642440000" },
  // });
  // if (data) {
  //   console.log("data====================================");
  //   console.log(data);
  //   console.log("====================================");
  // }
  const userProfileVarReactive = useReactiveVar(userProfileVar);
  const isAuth = useMemo(
    () => userProfileVarReactive.isAuth,
    [userProfileVarReactive.isAuth]
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [open, setOpen] = useState();
  const [addAddress] = useMutation(
    isAuth ? CREATE_ADDRESS : CREATE_ADDRESS_FOR_GUEST,
    {
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
  const onSubmit = (data) => {
    dispatch({ type: "loading" });

    addAddress({
      variables: {
        request: {
          ...data,
          country: "India",
          referenceId: global.buyerId,
          addressType: "SHIPPING",
          defaultAddress: true,
        },
      },
    });
  };
  const [showInfo, setShowInfo] = useState(false);
  const [items, setItems] = useState([
    { label: "Andhra Pradesh", value: "Andhra Pradesh" },
    { label: "Arunachal Pradesh", value: "Arunachal Pradesh" },
    { label: "Assam", value: "Assam" },
    { label: "Bihar", value: "Bihar" },
    { label: "Chhattisgarh", value: "Chhattisgarh" },
    { label: "Goa", value: "Goa" },
    { label: "Gujarat", value: "Gujarat" },
    { label: "Haryana", value: "Haryana" },
    { label: "Himachal Pradesh", value: "Himachal Pradesh" },
    { label: "Jharkhand", value: "Jharkhand" },
    { label: "Karnataka", value: "Karnataka" },
    { label: "Kerala", value: "Kerala" },
    { label: "Madhya Pradesh", value: "Madhya Pradesh" },
    { label: "Maharashtra", value: "Maharashtra" },
    { label: "Manipur", value: "Manipur" },
    { label: "Meghalaya", value: "Meghalaya" },
    { label: "Mizoram", value: "Mizoram" },
    { label: "Nagaland", value: "Nagaland" },
    { label: "Odisha", value: "Odisha" },
    { label: "Punjab", value: "Punjab" },
    { label: "Rajasthan", value: "Rajasthan" },
    { label: "Sikkim", value: "Sikkim" },
    { label: "Tamil Nadu", value: "Tamil Nadu" },
    { label: "Telangana", value: "Telangana" },
    { label: "Tripura", value: "Tripura" },
    { label: "Uttarakhand", value: "Uttarakhand" },
    { label: "Uttar Pradesh", value: "Uttar Pradesh" },
    { label: "West Bengal", value: "West Bengal" },
  ]);
  const { dispatch } = useContext(AlertContext);

  const inputs = [
    {
      placeholder: "Flat/Home No.,Apartment/Building Name*",
      showError: false,
      errorMessage: null,
      keyboardType: "default",
      type: "normal",
      name: "building",
    },
    {
      placeholder: "Street / Colony Name*",
      showError: false,
      errorMessage: null,
      type: "normal",
      name: "streetAddress1",
    },

    {
      placeholder: "City / Town / Village*",
      showError: false,
      errorMessage: null,
      keyboardType: "default",
      type: "normal",
      name: "townCity",
    },
    {
      placeholder: "Pincode*",
      showError: false,
      errorMessage: null,
      keyboardType: "decimal-pad",
      // type: "short",
      type: "normal",
      name: "pinCode",
    },
    {
      placeholder: "State*",
      showError: false,
      errorMessage: null,
      keyboardType: "selector",
      type: "normal",
      name: "provinceState",
    },
  ];
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <SafeAreaView
        style={styles.safeArea}
        edges={["top", "right", "left", "bottom"]}
      >
        <View style={[t.itemsCenter, t.h16, t.mT4, t.flexCol]}>
          {/* <Text style={[styles.txtSave, { color: "transparent" }]}>SAVE</Text> */}
          <Text style={styles.popupTitle}>Add your delivery address</Text>
          <TouchableOpacity
            style={[t.flexRow, t.itemsCenter]}
            onPress={() => {
              setShowInfo(!showInfo);
              setTimeout(() => {
                setShowInfo(false);
              }, 2000);
            }}
          >
            <Text style={[{ color: colors.grey80, marginTop: 8 }]}>
              Please separate your address with commas
            </Text>
            <Image
              source={require("../../../Images/info.png")}
              style={[t.mT2]}
            />
          </TouchableOpacity>
        </View>

        <View style={[styles.bodyContainer]}>
          <KeyboardAwareScrollView contentContainerStyle={[t.flex1]}>
            <View
              style={[
                {
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                },
                t.flex1,
              ]}
            >
              {inputs.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      width: item.type === "short" ? "48%" : "100%",
                      marginTop: vs(18),
                    }}
                  >
                    {item.keyboardType === "selector" ? (
                      <View>
                        <Controller
                          control={control}
                          rules={{
                            required: true,
                          }}
                          render={({ field: { onChange, value } }) => (
                            <DropDownPicker
                              listMode="SCROLLVIEW"
                              placeholder="State (Province)*"
                              value={value}
                              open={open}
                              setOpen={setOpen}
                              items={items}
                              setValue={onChange}
                              setItems={setItems}
                              // onChangeValue={(item) =>
                              //   console.log(item.label, item.value)
                              // }
                              placeholderStyle={[
                                { color: colors.grey40, fontSize: 16 },
                              ]}
                              // containerStyle={[t.bgBlue300]}
                              style={[
                                {
                                  borderRadius: 20,
                                  height: vs(46),
                                  borderColor: colors.grey20,
                                },
                              ]}
                              dropDownContainerStyle={{ borderWidth: 0 }}
                            />
                          )}
                          name={item.name}
                        />
                        {lodash.get(errors, item.name) && (
                          <Text style={[{ color: "red" }, t.mL2, t.mT1]}>
                            This is required.
                          </Text>
                        )}
                      </View>
                    ) : (
                      <Controller
                        control={control}
                        rules={{
                          required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <View>
                            <MaterialTextInput
                              style={{ marginTop: vs(18) }}
                              {...item}
                              onChangeText={onChange}
                              onBlur={onBlur}
                              value={value}
                            />
                            {lodash.get(errors, item.name) && (
                              <Text style={[{ color: "red" }, t.mL2, t.mT1]}>
                                This is required.
                              </Text>
                            )}
                          </View>
                        )}
                        name={item.name}
                      />
                    )}
                  </View>
                );
              })}
            </View>
          </KeyboardAwareScrollView>
          <Button text="CONFIRM ADDRESS" onPress={handleSubmit(onSubmit)} />
        </View>
        {showInfo && (
          <Image
            source={require("../../../Images/Infoalert.png")}
            style={[t.wFull, t.absolute, t.mT20]}
          />
        )}
      </SafeAreaView>
    </View>
  );
}

export default AddLocationSheetContent;
