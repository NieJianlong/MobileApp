import React, { useState, useMemo, useContext } from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";

import BaseScreen from "../BaseScreen";
import { Button, Switch } from "../../Components";
import { MaterialTextInput } from "../../Components";
import { useReactiveVar } from "@apollo/client";
import { localCartVar, userProfileVar } from "../../Apollo/cache";
import styles from "./styles";
import NavigationService from "../../Navigation/NavigationService";
import { ComeFromType, usePaymentConfigration } from "../../Utils/utils";
import { Controller, useForm } from "react-hook-form";

import { useFocusEffect } from "@react-navigation/native";
import {
  BillingDetailsRequestForCreate,
  useBillingDetailsByGuestBuyerIdLazyQuery,
} from "../../../generated/graphql";
import { get, isEmpty } from "lodash";
import { t } from "react-native-tailwindcss";
import { vs } from "react-native-size-matters";
import useLoading from "../../hooks/useLoading";

import useOrderInfo from "../../hooks/useOrderInfo";
import { useCreateOrder } from "../../hooks/useCreateOrder";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

function CheckoutGuestOrderDetail(props) {
  const userProfile = useReactiveVar(userProfileVar);
  const [billingAddress, setBillingAddress] = useState([]);
  const { setLoading } = useLoading();
  const { orderInfo } = useOrderInfo();
  const { createOrder } = useCreateOrder();

  const localCart = useReactiveVar(localCartVar);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BillingDetailsRequestForCreate>();

  //getBillingAddress of guest buyer
  const [getBillingAddress] = useBillingDetailsByGuestBuyerIdLazyQuery({
    variables: {
      guestBuyerId: global.buyerId,
    },
    onError: () => {
      setLoading({ show: false });
    },

    onCompleted: (result) => {
      setLoading({ show: false });
      if (result.billingDetailsByGuestBuyerId.length > 0) {
        const billingDetails = result.billingDetailsByGuestBuyerId[0];
        setValue(
          "phoneNumber",
          !isEmpty(billingDetails?.phoneNumber)
            ? billingDetails?.phoneNumber?.replace("+91", "")
            : ""
        );
        setValue("email", billingDetails?.email ?? "");
        setValue("firstName", billingDetails?.firstName ?? "");
        setValue("lastName", billingDetails?.lastName ?? "");

        userProfileVar({
          ...userProfile,
          billingDetails: billingDetails,
          billingDetailsId: billingDetails?.billingDetailsId,
          firstName: billingDetails?.firstName ?? "",
          lastName: billingDetails?.lastName ?? "",
          email: billingDetails?.email ?? "",
          phone: billingDetails?.phoneNumber ?? "",
        });
      }
    },
  });
  useFocusEffect(
    React.useCallback(() => {
      setLoading({ show: true });
      getBillingAddress();
    }, [])
  );

  const onSubmit = async (data: BillingDetailsRequestForCreate) => {
    const data1 = { ...data, phoneNumber: "+91" + data.phoneNumber };

    if (orderInfo.comeFromType === ComeFromType.checkout) {
      NavigationService.navigate("CheckoutResumeScreen", { data: data1 });
    } else {
      createOrder({ data: data1 });
    }
  };

  return (
    <BaseScreen {...props}>
      <KeyboardAwareScrollView contentContainerStyle={[t.pB48]}>
        <View style={styles.container}>
          <View style={styles.horizontalCenter}>
            <Text style={styles.title}>Please enter details for the order</Text>
            <Text style={styles.description}>
              All guests receive confirmation through email only.
            </Text>
            <Text style={styles.boldDescription}>
              Please make sure your email is correct!
            </Text>
          </View>

          <View style={styles.inputsWrapper}>
            <Controller
              control={control}
              rules={{
                required: true,
                pattern:
                  /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/,
                minLength: 10,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View>
                  <MaterialTextInput
                    placeholder="Email*"
                    style={{ marginTop: vs(18) }}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                  {get(errors, "email") && (
                    <Text style={[{ color: "red" }, t.mL2, t.mT1]}>
                      {get(errors, "email.type") === "pattern"
                        ? "Invalid email"
                        : "This is required."}
                    </Text>
                  )}
                </View>
              )}
              name={"email"}
            />

            <View style={styles.inputWrapper3}>
              <Controller
                control={control}
                rules={{
                  required: true,
                  pattern: /^[6-9]\d{9}$/,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View>
                    <MaterialTextInput
                      placeholder="Phone Number*"
                      style={{ marginTop: vs(18) }}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                    />
                    {get(errors, "phoneNumber") && (
                      <Text style={[{ color: "red" }, t.mL2, t.mT1]}>
                        {get(errors, "phoneNumber.type") === "pattern"
                          ? "Invalid phone number"
                          : "This is required."}
                      </Text>
                    )}
                  </View>
                )}
                name={"phoneNumber"}
              />
            </View>
            <View style={styles.inputsWrapper2}>
              <View style={styles.inputName}>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View>
                      <MaterialTextInput
                        placeholder="FirstName*"
                        style={{ marginTop: vs(18) }}
                        onChangeText={onChange}
                        value={value}
                      />
                      {get(errors, "firstName") && (
                        <Text style={[{ color: "red" }, t.mL2, t.mT1]}>
                          This is required.
                        </Text>
                      )}
                    </View>
                  )}
                  name={"firstName"}
                />
              </View>

              <View style={styles.inputName}>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View style={[t.bgBlue200]}>
                      <MaterialTextInput
                        placeholder="LastName*"
                        style={{ marginTop: vs(18) }}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                      />
                      {get(errors, "lastName") && (
                        <Text style={[{ color: "red" }, t.mL2, t.mT1]}>
                          This is required.
                        </Text>
                      )}
                    </View>
                  )}
                  name={"lastName"}
                />
              </View>
            </View>
          </View>

          <View style={styles.deliveryAddressSection}>
            <Text style={styles.deliveryAddressSectionTitle}>
              Current Delivery Address
            </Text>
            <View style={styles.deliveryDescriptionBox}>
              <Text style={styles.deliveryDescriptionText}>
                {`${localCart?.callBackAddress?.building + "," || ""}`}
              </Text>
              <Text style={styles.deliveryDescriptionText}>
                {billingAddress.length > 0
                  ? `${billingAddress.billingAddress?.pinCode} , ${billingAddress.billingAddress?.provinceState}`
                  : `${localCart?.callBackAddress?.pinCode} , ${localCart?.callBackAddress?.provinceState}`}
              </Text>
              <Text style={styles.deliveryDescriptionText}>India</Text>
            </View>

            <View style={styles.switch}>
              <Switch
                // onSwitch={(b) => setIsSameAsDelivery(b)}
                disabled={true}
                active={true}
                label="Billing address is the same as delivery"
              />
            </View>
            <SafeAreaView>
              <View style={[styles.button, t.mB6]}>
                <Button text="NEXT" onPress={handleSubmit(onSubmit)} />
              </View>
            </SafeAreaView>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </BaseScreen>
  );
}

export default CheckoutGuestOrderDetail;
