import React, { useState, useEffect, useContext, useMemo } from "react";
import { View, StatusBar, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { vs } from "react-native-size-matters";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  AppBar,
  Switch,
  RightButton,
  MaterialTextInput,
} from "../../Components";
import styles from "./styles";
import colors from "../../Themes/Colors";
import { useRoute } from "@react-navigation/native";
import { useMutation, useQuery } from "@apollo/client";
import {
  CREATE_ADDRESS,
  UPDATE_ADDRESS,
} from "../../Apollo/mutations/mutations_user";
import { AlertContext } from "../Root/GlobalContext";
import { Controller, useForm } from "react-hook-form";
import DropDownPicker from "react-native-dropdown-picker";
import lodash, { isEmpty } from "lodash";
import { t } from "react-native-tailwindcss";
import { GetStatesByCountryId } from "../Explore/gql/explore_queries";
import NavigationService from "../../Navigation/NavigationService";
import { AddressRequestForCreate } from "../../../generated/graphql";

function AddNewAddress() {
  const { dispatch } = useContext(AlertContext);
  const { params } = useRoute();
  const { currentAddress } = params;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressRequestForCreate>({
    defaultValues: {
      building: currentAddress?.building,
      streetAddress1: currentAddress?.streetAddress1,
      townCity: currentAddress?.townCity,
      pinCode: currentAddress?.pinCode,
      provinceState: currentAddress?.provinceState,
    },
  });
  const { data } = useQuery(GetStatesByCountryId, {
    variables: { countryId: "123e4567-e89b-12d3-a456-556642440000" },
  });

  const [open, setOpen] = useState();

  const [asDefault, setAsDefault] = useState(
    currentAddress?.defaultAddress || false
  );
  const [updateAddress] = useMutation(UPDATE_ADDRESS, {
    context: {
      headers: {
        isPrivate: true,
      },
    },
    onCompleted: () => {
      dispatch({ type: "hideloading" });
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
    onError: () => {
      dispatch({ type: "hideloading" });
    },
  });
  const [addAddress] = useMutation(CREATE_ADDRESS, {
    context: {
      headers: {
        isPrivate: true,
      },
    },
    onCompleted: () => {
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
      NavigationService.goBack();
    },
    onError: () => {
      dispatch({ type: "hideloading" });
    },
  });
  const onSubmit = (data) => {
    dispatch({ type: "loading" });
    isEmpty(currentAddress)
      ? addAddress({
          variables: {
            request: {
              ...data,
              country: "India",
              referenceId: global.buyerId,
              addressType: "SHIPPING",
              defaultAddress: asDefault,
            },
          },
        })
      : updateAddress({
          variables: {
            request: {
              ...data,
              country: "India",
              referenceId: global.buyerId,
              addressType: "SHIPPING",
              defaultAddress: asDefault,
              addressId: currentAddress?.addressId,
            },
          },
        });
  };
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
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <SafeAreaView
        style={styles.safeArea}
        edges={["top", "right", "left", "bottom"]}
      >
        <AppBar
          rightButton={() => (
            <RightButton title="SAVE" onPress={handleSubmit(onSubmit)} />
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
