import React, { useState, useContext, useMemo, useEffect } from "react";
import {
  View,
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
import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
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
import lodash, { isNumber } from "lodash";
import { GetStatesByCountryId } from "../gql/explore_queries";
import NavigationService from "../../../Navigation/NavigationService";
import { setLocalStorageValue } from "../../../Apollo/local-storage";
import { Images } from "../../../Themes";
import useMapScreen from "../../../hooks/useMapScreen";
import useRefreshData from "../../../hooks/useRefreshData";

const TouchableOpacity =
  Platform.OS === "ios" ? RNTouchableOpacity : GHTouchableOpacity;

function AddLocationSheetContent(props) {
  //123e4567-e89b-12d3-a456-556642440000
  // const [selectedState, setSelectedState] = useState();
  const { setRefreshaddress } = useRefreshData();
  const { setShowMap } = useMapScreen();
  const { stopPermission } = useMapScreen();
  const { data } = useQuery(GetStatesByCountryId, {
    variables: { countryId: "123e4567-e89b-12d3-a456-556642440000" },
  });

  const userProfileVarReactive = useReactiveVar(userProfileVar);
  const isAuth = useMemo(
    () => userProfileVarReactive.isAuth,
    [userProfileVarReactive.isAuth]
  );
  const hasNumber = /\d/;
  const houseNumber = props.locationDetails
    ? props.locationDetails.address.split(",")[0]
    : "";
  const street = props.locationDetails
    ? props.locationDetails.address.split(",")[1]
    : "";
  const city = props.locationDetails
    ? props.locationDetails.address.split(",")[2]
    : "";
  const postalCode = props.locationDetails
    ? props.locationDetails.address.split(",")[4]
    : "";
  const state = props.locationDetails
    ? props.locationDetails.address.split(",")[5]
    : "";
  const count = props.locationDetails
    ? props.locationDetails.address.split(",").length - 1
    : "";

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    if (count < 4) {
      if (data) {
        setValue("provinceState", props.state);
        setValue("townCity", props.city);
        setValue("pinCode", props.post_code);
        setValue("streetAddress1", props.street);
        setValue("building", props.houseNo);
      }
    } else {
      if (data) {
        setValue("provinceState", props.state);
        setValue("townCity", props.city ? props.city : city);
        setValue(
          "pinCode",
          props.post_code
            ? props.post_code
            : hasNumber.test(postalCode)
            ? postalCode
            : props.post_code
        );
        setValue("streetAddress1", props.street ? props.street : street);
        setValue(
          "building",
          props.houseNo
            ? props.houseNo
            : hasNumber.test(houseNumber)
            ? houseNumber
            : props.houseNo
        );
      }
    }
  }, [data, props]);
  const [open, setOpen] = useState(false);
  const [addAddress] = useMutation(
    isAuth ? CREATE_ADDRESS : CREATE_ADDRESS_FOR_GUEST,
    {
      context: {
        headers: {
          isPrivate: isAuth,
        },
      },
      onCompleted: (res) => {
        setLocalStorageValue(
          global.buyerId + "Address",
          JSON.stringify(
            isAuth ? res.createAddress : res.createAddressForGuestBuyer
          )
        ).then(() => {
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
        });
      },
      onError: (error) => {
        dispatch({ type: "hideloading" });
      },
    }
  );
  const onSubmit = (data) => {
    setRefreshaddress({ refreshLists: true });
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
      onCompleted: (res) => {
        !isAuth && NavigationService.navigate("ExploreScreen");
        console.log(res);
      },
      onError: (res) => {
        console.log(res);
      },
    });
  };
  const [showInfo, setShowInfo] = useState(false);
  const items = useMemo(() => {
    if (data) {
      const allProvinces = data.getStatesByCountryId;
      return allProvinces.map((item) => ({
        label: item.stateName,
        value: item.stateName,
      }));
    }
    return [];
  }, [data]);
  const { dispatch } = useContext(AlertContext);
  const inputs = [
    {
      placeholder: "Flat/Home No.,Apartment/Building Name*",
      showError: false,
      errorMessage: null,
      keyboardType: "default",
      rules: {
        required: "Please input home no.",
        pattern: {
          value: /^[0-9a-zA-z].*/,
          message: "Invalid home no.",
        },
      },
      type: "normal",
      name: "building",
      location:
        count < 4
          ? props.locationDetails === null
            ? ""
            : props.locationDetails.houseNo
          : props.locationDetails === null
          ? ""
          : props.locationDetails.houseNo === ""
          ? hasNumber.test(props.locationDetails.address.split(",")[0])
            ? props.locationDetails.address.split(",")[0]
            : props.locationDetails.houseNo
          : props.locationDetails.houseNo,
    },
    {
      placeholder: "Street / Colony Name*",
      showError: false,
      errorMessage: null,
      type: "normal",
      rules: {
        required: "Please input street name.",
        pattern: {
          value: /^[0-9a-zA-z].*/,
          message: "Invalid street name.",
        },
      },
      name: "streetAddress1",
      location:
        count < 4
          ? props.locationDetails === null
            ? ""
            : props.locationDetails.street
          : props.locationDetails === null
          ? ""
          : props.locationDetails.street === ""
          ? street
          : props.locationDetails.street,
    },

    {
      placeholder: "City / Town / Village*",
      showError: false,
      errorMessage: null,
      keyboardType: "default",
      rules: {
        required: "Please input city name.",
        pattern: {
          value: /^[0-9a-zA-z].*/,
          message: "Invalid city name.",
        },
      },
      type: "normal",
      name: "townCity",
      location:
        count < 4
          ? props.locationDetails === null
            ? ""
            : props.locationDetails.city
          : props.locationDetails.city === null
          ? ""
          : props.locationDetails.city === ""
          ? city
          : props.locationDetails.city,
    },
    {
      placeholder: "Pincode*",
      showError: false,
      errorMessage: null,
      keyboardType: "decimal-pad",
      rules: {
        required: "Please input pin code.",
        pattern: {
          value: /^[1-9][0-9]{5}$/,
          message: "Invalid pin code.",
        },
      },
      // type: "short",
      type: "normal",
      name: "pinCode",
      location:
        count < 4
          ? props.locationDetails === null
            ? ""
            : props.locationDetails.post_code
          : props.locationDetails.post_code === null
          ? ""
          : props.locationDetails.post_code === ""
          ? postalCode
          : props.locationDetails.post_code,
    },
    {
      placeholder: "State*",
      showError: false,
      errorMessage: null,
      rules: {
        required: true,
      },
      keyboardType: "selector",
      type: "normal",
      name: "provinceState",
      location:
        count < 4
          ? props.locationDetails === null
            ? ""
            : props.locationDetails.state
          : props.locationDetails === null
          ? ""
          : props.locationDetails.state === ""
          ? state
          : props.locationDetails.post_code,
    },
  ];

  return (
    <View style={styles.container}>
      <SafeAreaView
        style={styles.safeArea}
        edges={["top", "right", "left", "bottom"]}
      >
        <View style={styles.titleContainer}>
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
          <TouchableOpacity
            onPress={() => {
              if (stopPermission === true) {
                dispatch({
                  type: "changSheetState",
                  payload: {
                    showSheet: false,
                    height: 600,
                    children: () => (
                      <AddLocationSheetContent
                        {...location}
                        locationDetails={location}
                      />
                    ),
                    sheetTitle: "",
                  },
                });
              } else {
                setShowMap({ mapVisible: true, stopPermission: true });
              }
            }}
          >
            <Image style={styles.closeImage} source={Images.ic_close} />
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
                          rules={item.rules}
                          render={({ field: { onChange, value } }) => (
                            <DropDownPicker
                              listMode="MODAL"
                              placeholder="State (Province)*"
                              value={value}
                              searchPlaceholder="Search……"
                              open={open}
                              searchable={true}
                              setOpen={setOpen}
                              items={items}
                              setValue={onChange}
                              onChangeValue={onChange}
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
                        rules={item.rules}
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
                                {lodash.get(errors, item.name).message}
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
