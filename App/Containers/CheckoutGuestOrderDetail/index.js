import React, { useState, useMemo, useEffect, useContext } from "react";
import { View, TouchableOpacity, Text } from "react-native";

import BaseScreen from "../BaseScreen";
import { AppBar, Button, Switch } from "../../Components";
import { MaterialTextInput } from "../../Components";
import {
  useLazyQuery,
  useMutation,
  useQuery,
  useReactiveVar,
} from "@apollo/client";
import {
  userProfileVar,
  localBuyNowVar,
  localCartVar,
  cartOrderVar,
  razorOrderPaymentVar,
} from "../../Apollo/cache";
import styles from "./styles";
import * as aQM from "../../Containers/Explore/gql/explore_queries";
import * as gqlMappers from "../../Containers/Explore/gql/gql_mappers";
import {
  FIND_GUEST_BUYER_DEFAULT_ADDRESS_BY_ID,
  FIND_GUEST_ADDRESS_BY_ID_AND_TPYE,
  BILLING_DETAIL_BY_BUYERID,
} from "../../Apollo/queries/queries_user";

import {
  CREATE_BILLING_DETAILS_FOR_GUEST_BUYER,
  UPDATE_BILLING_DETAILS_FOR_GUEST_BUYER,
} from "../../Apollo/mutations/mutations_user";
import NavigationService from "../../Navigation/NavigationService";
import BigNumber from "bignumber.js";
import { useCreateOrder } from "../../hooks/order";
import { AlertContext } from "../Root/GlobalContext";
import { useCreateRazorOrder } from "../../hooks/razorOrder";

function CheckoutGuestOrderDetail(props) {
  const userProfileVarReactive = useReactiveVar(userProfileVar);
  const [email, setEmail] = useState(null);
  const [fName, setFName] = useState(null);
  const [lName, setLName] = useState(null);
  const [phno, setPhno] = useState(null);
  const [deliveryAddress, setDeliveryAddress] = useState(null);
  const [isSameAsDelivery, setIsSameAsDelivery] = useState(true);
  const { createOrderFromCart, order } = useCreateOrder();
  const { razorpayCreateOrder, razorOrder } = useCreateRazorOrder();
  const { dispatch } = useContext(AlertContext);
  const isAuth = useMemo(
    () => userProfileVarReactive.isAuth,
    [userProfileVarReactive.isAuth]
  );

  //getBillingAddress of guest buyer
  const [
    getBillingAddress,
    {
      loading: loadingBillingDetails,
      error: billingError,
      data: getBillingData,
    },
  ] = useLazyQuery(BILLING_DETAIL_BY_BUYERID, {
    variables: {
      buyerId: global.buyerId,
    },
    context: {
      headers: {
        isPrivate: isAuth,
      },
    },
    onError: (err) => {
      debugger;
      console.log("Error===========BILLING_DETAIL_BY_BUYERID", err);
    },
    onCompleted: (result) => {
      console.log("resultJson BILLING_DETAIL_BY_BUYERID", result);
      if (result) {
        console.log("result", result);
      }
    },
  });

  useEffect(() => {
    getBillingAddress();
  }, []);

  console.log("getBillingDataResponse", getBillingData);

  //To get default delivery address
  const { loading, refetch } = useQuery(
    aQM.FIND_GUEST_BUYER_DEFAULT_ADDRESS_BY_ID,
    {
      variables: { buyerId: global.buyerId },
      context: {
        headers: {
          isPrivate: isAuth,
        },
      },
      onError: (err) => {
        debugger;
        console.log("Error===========", err);
      },
      onCompleted: (result) => {
        console.log(
          "resultJson FIND_GUEST_BUYER_DEFAULT_ADDRESS_BY_ID",
          result
        );
        if (result) {
          debugger;
          const resultJson = result.getGuestBuyerDefaultAddressByBuyerId;
          setDeliveryAddress(resultJson);
        }
      },
    }
  );
  console.log(
    "HERE VALUE getBillingData",
    getBillingData ? "create" : "update"
  );
  const [
    createUpdateBillingAddress,
    {
      loading: createloadingBilling,
      error: createbillingError,
      data: createBillingData,
    },
  ] = useMutation(
    getBillingData
      ? CREATE_BILLING_DETAILS_FOR_GUEST_BUYER
      : UPDATE_BILLING_DETAILS_FOR_GUEST_BUYER,
    {
      variables: {
        request: {
          buyerId: global.buyerId,
          firstName: fName,
          lastName: lName,
          companyName: "",
          email: email,
          phoneNumber: "+91" + phno,
          billingAddress: {
            flat: deliveryAddress?.flat,
            floor: deliveryAddress?.floor,
            defaultAddress: true,
            houseNumber: deliveryAddress?.houseNumber,
            villageArea: deliveryAddress?.villageArea,
            country: "India",
            landMark: deliveryAddress?.landMark,
            pinCode: deliveryAddress?.pinCode,
          },
          taxCode: deliveryAddress?.pinCode,
        },
      },
      context: {
        headers: {
          isPrivate: isAuth,
        },
      },
    }
  );
  console.log("createBillingData", createBillingData);
  const onPressNext = () => {
    const productBuyNow = {
      listingId: props?.route?.params?.product?.listingId,
      quantity: props?.route?.params?.product?.quantity,
      variantId: props?.route?.params?.product?.variantId,
    };
    localBuyNowVar({
      items: [productBuyNow],
    });
    console.log("props?.route?.params?.product", props?.route?.params?.product);
    console.log("localCartVar.deliverAddress", localCartVar.deliverAddress);
    // createUpdateBillingAddress();
    createOrderFromCart({
      variables: {
        cart: {
          buyerId: global.buyerId,
          shippingAddressId: "0cce0bf6-28bb-4528-91f8-d56381b7e11c",
          billingDetailsId: "0cce0bf6-28bb-4528-91f8-d56381b7e11c",
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
              var options = {
                description: "Credits towords consultation",
                image: "https://i.imgur.com/3g7nmJC.png",
                currency: "INR",
                key: "rzp_test_I8X2v4LgupMLv0",
                name: "Acme Corp",
                order_id: razorId, //Replace this with an order_id created using Orders API.
                prefill: {
                  email: userProfile?.email,
                  contact: userProfile?.phoneNumber,
                  name: userProfile?.firstName + userProfile.lastName,
                },
                theme: { color: "#53a20e" },
              };
              RazorpayCheckout.open(options)
                .then((data) => {
                  razorOrderPaymentVar({
                    razorpay_payment_id: data.razorpay_payment_id,
                    razorpay_order_id: data.razorpay_order_id,
                    razorpay_signature: data.razorpay_signature,
                  });
                  razorpayVerifyPaymentSignature();
                  alert(`Success: ${data.razorpay_payment_id}`);

                  NavigationService.navigate("OrderPlacedScreen", {
                    items: product,
                    from: "Buynow",
                  });
                })
                .catch((error) => {
                  alert(`Error: ${error.code} | ${error.description}`);
                });
            }
          });
        }
        return res?.createOrderFromCart;
      },
      onError: (res) => {
        dispatch({
          type: "changLoading",
          payload: false,
        });
        alert(JSON.stringify(res.message));
        console.log(`Explore useCreateOrder onError ${JSON.stringify(res)}`);
      },
    });
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
            onChangeText={(text) => setEmail(text)}
            showError={false}
            keyboardType="email-address"
          />
          <View style={styles.inputWrapper3}>
            <MaterialTextInput
              placeholder="phone number*"
              onChangeText={(text) => setPhno(text)}
              showError={false}
              keyboardType="default"
            />
          </View>
          <View style={styles.inputsWrapper2}>
            <View style={styles.inputName}>
              <MaterialTextInput
                placeholder="FirstName*"
                onChangeText={(text) => setFName(text)}
                showError={false}
                keyboardType="default"
              />
            </View>

            <View style={styles.inputName}>
              <MaterialTextInput
                placeholder="LastName*"
                onChangeText={(text) => setLName(text)}
                showError={false}
                keyboardType="default"
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
              {`${deliveryAddress?.flat || ""} , ${
                deliveryAddress?.houseNumber || ""
              }`}
            </Text>
            <Text style={styles.deliveryDescriptionText}>
              {`${deliveryAddress?.pinCode} , ${deliveryAddress?.provinceState}`}
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
        </View>
      </View>
    </BaseScreen>
  );
}

export default CheckoutGuestOrderDetail;
