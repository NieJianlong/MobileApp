import React, { useState, useMemo, useEffect, useContext } from "react";
import { View, TouchableOpacity, Text } from "react-native";

import BaseScreen from "../BaseScreen";
import { AppBar, Button, Switch } from "../../Components";
import { MaterialTextInput } from "../../Components";
import { useLazyQuery, useMutation, useReactiveVar } from "@apollo/client";
import {
  userProfileVar,
  localBuyNowVar,
  localCartVar,
  cartOrderVar,
  razorOrderPaymentVar,
} from "../../Apollo/cache";
import styles from "./styles";
import { BILLING_DETAIL_BY_GUEST_BUYERID } from "../../Apollo/queries/queries_user";
import RazorpayCheckout from "react-native-razorpay";
import NavigationService from "../../Navigation/NavigationService";
import BigNumber from "bignumber.js";
import { useCreateOrder } from "../../hooks/order";
import { AlertContext } from "../Root/GlobalContext";
import { useCreateRazorOrder } from "../../hooks/razorOrder";
import { useRazorVerifyPayment } from "../../hooks/verifyPayment";
import { fn } from "moment";
import { usePaymentConfigration } from "../../Utils/utils";
import AddBillingDetail from "../../hooks/addBillingDetails";

function CheckoutGuestOrderDetail(props) {
  const userProfileVarReactive = useReactiveVar(userProfileVar);
  const [billingAddress, setBillingAddress] = useState([]);
  const [email, setEmail] = useState(billingAddress?.email || null);
  const [fName, setFName] = useState(billingAddress?.firstName || null);
  const [lName, setLName] = useState(billingAddress?.lastName || null);
  const [phno, setPhno] = useState(billingAddress?.phoneNumber || null);
  const { addBilling } = AddBillingDetail();

  const [isSameAsDelivery, setIsSameAsDelivery] = useState(true);
  const { createOrderFromCart, order } = useCreateOrder();
  const { razorpayCreateOrder, razorOrder } = useCreateRazorOrder();
  const localCart = localCartVar();
  const [deliveryAddress, setDeliveryAddress] = useState(
    localCart.callBackAddress
  );
  const { razorpayVerifyPaymentSignature, razorVerifyPayment } =
    useRazorVerifyPayment();
  const { dispatch } = useContext(AlertContext);
  const isAuth = useMemo(
    () => userProfileVarReactive.isAuth,
    [userProfileVarReactive.isAuth]
  );
  const getPaymentConfigration = usePaymentConfigration();

  //getBillingAddress of guest buyer
  const [
    getBillingAddress,
    {
      loading: loadingBillingDetails,
      error: billingError,
      data: getBillingData,
    },
  ] = useLazyQuery(BILLING_DETAIL_BY_GUEST_BUYERID, {
    variables: {
      guestBuyerId: global.buyerId,
    },

    onError: (err) => {
      console.log("Error===========BILLING_DETAIL_BY_BUYERID", err);
    },
    onCompleted: (result) => {
      console.log(
        "resultJson BILLING_DETAIL_BY_BUYERID",
        result.billingDetailsByGuestBuyerId[0]
      );
      if (result.billingDetailsByGuestBuyerId.length > 0) {
        setEmail(result.billingDetailsByGuestBuyerId[0].email);
        setFName(result.billingDetailsByGuestBuyerId[0].firstName);
        setLName(result.billingDetailsByGuestBuyerId[0].lastName);
        setPhno(result.billingDetailsByGuestBuyerId[0].phoneNumber);
        setBillingAddress(result.billingDetailsByGuestBuyerId[0]);
      }
      if (result) {
        console.log("result", result);
      }
    },
  });

  useEffect(() => {
    getBillingAddress();
  }, [getBillingAddress]);

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
                let options = getPaymentConfigration(razorId);

                RazorpayCheckout.open(options)
                  .then((data) => {
                    razorOrderPaymentVar({
                      razorpay_payment_id: data.razorpay_payment_id,
                      razorpay_order_id: data.razorpay_order_id,
                      razorpay_signature: data.razorpay_signature,
                    });
                    razorpayVerifyPaymentSignature();
                    dispatch({
                      type: "changLoading",
                      payload: false,
                    });

                    NavigationService.navigate("OrderPlacedScreen", {
                      items: props?.route?.params?.items,
                      from: props?.route?.params?.from,
                    });
                  })
                  .catch((error) => {});
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

    // NavigationService.navigate("OrderPlacedScreen", {
    //   items: props?.route?.params?.items,
    //   from: props?.route?.params?.from,
    // });
    // return;
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
            value={email}
          />
          <View style={styles.inputWrapper3}>
            <MaterialTextInput
              placeholder="phone number*"
              onChangeText={(text) => setPhno(text)}
              showError={false}
              keyboardType="default"
              value={phno}
            />
          </View>
          <View style={styles.inputsWrapper2}>
            <View style={styles.inputName}>
              <MaterialTextInput
                placeholder="FirstName*"
                onChangeText={(text) => setFName(text)}
                showError={false}
                keyboardType="default"
                value={fName}
              />
            </View>

            <View style={styles.inputName}>
              <MaterialTextInput
                placeholder="LastName*"
                onChangeText={(text) => setLName(text)}
                showError={false}
                keyboardType="default"
                value={lName}
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
              {`${deliveryAddress?.flatNumber + "," || ""}  ${
                deliveryAddress?.houseNumber || ""
              }`}
            </Text>
            <Text style={styles.deliveryDescriptionText}>
              {billingAddress.length > 0
                ? `${billingAddress.billingAddress?.pinCode} , ${billingAddress.billingAddress?.provinceState}`
                : `${deliveryAddress?.pinCode} , ${deliveryAddress?.provinceState}`}
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
