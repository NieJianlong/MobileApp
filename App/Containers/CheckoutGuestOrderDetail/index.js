import React, { useState, useMemo, useContext } from "react";
import { View, TouchableOpacity, Text } from "react-native";

import BaseScreen from "../BaseScreen";
import { AppBar, Button, Switch } from "../../Components";
import { MaterialTextInput } from "../../Components";
import { useReactiveVar } from "@apollo/client";
import {
  userProfileVar,
  localBuyNowVar,
  localCartVar,
  cartOrderVar,
} from "../../Apollo/cache";
import styles from "./styles";
import NavigationService from "../../Navigation/NavigationService";
import { useCreateOrder } from "../../hooks/order";
import { AlertContext } from "../Root/GlobalContext";
import { useCreateRazorOrder } from "../../hooks/razorOrder";
import { useRazorVerifyPayment } from "../../hooks/verifyPayment";
import { usePaymentConfigration } from "../../Utils/utils";

import { useFocusEffect } from "@react-navigation/native";
import { useBillingDetailsByGuestBuyerIdLazyQuery } from "../../../generated/graphql";
import UseBillingDetail from "../../hooks/useBillingDetail";

function CheckoutGuestOrderDetail(props) {
  const userProfile = useReactiveVar(userProfileVar);
  const [billingAddress, setBillingAddress] = useState([]);

  const { addBilling } = UseBillingDetail();

  const [isSameAsDelivery, setIsSameAsDelivery] = useState(true);
  const { createOrderFromCart } = useCreateOrder();
  const { razorpayCreateOrder } = useCreateRazorOrder();
  const localCart = useReactiveVar(localCartVar);

  const { razorpayVerifyPaymentSignature } = useRazorVerifyPayment();
  const { dispatch } = useContext(AlertContext);
  const isAuth = useMemo(() => userProfile.isAuth, [userProfile.isAuth]);
  const getPaymentConfigration = usePaymentConfigration();

  //getBillingAddress of guest buyer
  const [getBillingAddress] = useBillingDetailsByGuestBuyerIdLazyQuery({
    variables: {
      guestBuyerId: global.buyerId,
    },

    onCompleted: (result) => {
      if (result.billingDetailsByGuestBuyerId.length > 0) {
        const billingDetails = result.billingDetailsByGuestBuyerId[0];
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
      getBillingAddress();
    }, [])
  );

  //need to call updateORcreatebillingaddress here
  const onPressNext = async () => {
    const billingDetailsId = await addBilling();
    dispatch({
      type: "changLoading",
      payload: true,
    });
    if (props?.route?.params?.from === "checkout") {
      dispatch({
        type: "changLoading",
        payload: false,
      });
      NavigationService.navigate("CheckoutResumeScreen", {
        orderStatus: 0,
        data: props?.route?.params?.items,
        availbleList: props?.route?.params?.availbleList,
      });
    } else {
      const productBuyNow = {
        listingId: props?.route?.params?.product?.listingId,
        quantity: props?.route?.params?.product?.quantity,
        variantId: props?.route?.params?.product?.variantId,
      };
      localBuyNowVar({
        items: [productBuyNow],
      });
      // createUpdateBillingAddress();
      createOrderFromCart({
        variables: {
          cart: {
            buyerId: global.buyerId,
            shippingAddressId: localCartVar.deliverAddress,
            billingDetailsId: billingDetailsId,
            useSalamiWallet: false,
            cartItems:
              localBuyNowVar().items.length > 0
                ? localBuyNowVar().items
                : localCartVar().items,
          },
        },
        context: {
          headers: {
            isPrivate: isAuth,
          },
        },
        onCompleted: (res) => {
          console.log(`Explore useCreateOrder res ${JSON.stringify(res)}`);
          dispatch({
            type: "changLoading",
            payload: false,
          });
          const order = res?.createOrderFromCart;
          if (res?.createOrderFromCart?.orderId) {
            cartOrderVar({
              orderNumber: order?.orderNumber,
              orderId: order?.orderId,
              amount: order?.subTotal,
            });
            razorpayCreateOrder().then((res) => {
              if (res?.data) {
                const razorId = res?.data?.razorpayCreateOrder?.razorpayOrderId;
                getPaymentConfigration(
                  razorId,
                  props?.route?.params?.items,
                  props?.route?.params?.from
                );
              }
            });
          }
          return res?.createOrderFromCart;
        },
        onError: (err) => {
          console.log("Here createOrder", err);
          dispatch({
            type: "changLoading",
            payload: false,
          });
          // alert(err.message);
        },
      });
    }
  };

  return (
    <BaseScreen {...props}>
      <AppBar
        rightButton={() => {
          return (
            <TouchableOpacity
              onPress={() => {
                onPressNext();
              }}
            >
              <Text style={styles.rightButton}>Next</Text>
            </TouchableOpacity>
          );
        }}
      />
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
          <MaterialTextInput
            placeholder="Email*"
            onChangeText={(email) =>
              userProfileVar({
                ...userProfile,
                email,
              })
            }
            showError={false}
            keyboardType="email-address"
            value={userProfile.email}
          />
          <View style={styles.inputWrapper3}>
            <MaterialTextInput
              placeholder="phone number*"
              onChangeText={(phone) =>
                userProfileVar({
                  ...userProfile,
                  phone,
                })
              }
              showError={false}
              keyboardType="default"
              value={userProfile.phone}
            />
          </View>
          <View style={styles.inputsWrapper2}>
            <View style={styles.inputName}>
              <MaterialTextInput
                placeholder="FirstName*"
                onChangeText={(firstName) =>
                  userProfileVar({
                    ...userProfile,
                    firstName,
                  })
                }
                showError={false}
                keyboardType="default"
                value={userProfile.firstName}
              />
            </View>

            <View style={styles.inputName}>
              <MaterialTextInput
                placeholder="LastName*"
                onChangeText={(lastName) =>
                  userProfileVar({
                    ...userProfile,
                    lastName,
                  })
                }
                showError={false}
                keyboardType="default"
                value={userProfile.lastName}
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
              onSwitch={(b) => setIsSameAsDelivery(b)}
              active={isSameAsDelivery}
              label="Billing address is the same as delivery"
            />
          </View>
          <View style={styles.button}>
            <Button text="NEXT" onPress={onPressNext} />
          </View>
        </View>
      </View>
    </BaseScreen>
  );
}

export default CheckoutGuestOrderDetail;
