import { useReactiveVar } from "@apollo/client";
import { trimStart } from "lodash";
import { colors } from "react-native-tailwindcss";
import {
  localCartVar,
  razorOrderPaymentVar,
  userProfileVar,
} from "../Apollo/cache";
import RazorpayCheckout from "react-native-razorpay";
import NavigationService from "../Navigation/NavigationService";

import { useRazorVerifyPayment } from "../hooks/verifyPayment";
import { useContext, useState } from "react";
import { AlertContext } from "../Containers/Root/GlobalContext";
import useRealm from "../hooks/useRealm";
import PubSub from "pubsub-js";
import useOrderInfo from "../hooks/useOrderInfo";
import useAlert from "../hooks/useAlert";
import { Colors } from "../Themes";
import useLoading from "../hooks/useLoading";
export enum ComeFromType {
  checkout = "checkout",
  Buynow = "Buynow",
}

export function usePaymentConfigration() {
  const userProfile = useReactiveVar(userProfileVar);
  const localCart = useReactiveVar(localCartVar);
  const { orderInfo } = useOrderInfo();
  const { setAlert } = useAlert();
  const { dispatch } = useContext(AlertContext);
  const { realm } = useRealm();
  const { setLoading } = useLoading();
  const [mydatas, setMydatas] = useState(
    realm
      .objects("ShoppingCart")
      .filtered("addressId == $0", localCart.deliverAddress)
      .filtered("quantity > 0")
      .filtered("isDraft == false")
  );
  const clearData = () => {
    let index = mydatas.length - 1;
    while (index >= 0) {
      if (mydatas[index]) {
        if (
          mydatas[index].variant.itemsAvailable !==
          mydatas[index].variant.itemsSold
        ) {
          realm.write(() => {
            realm.delete(mydatas[index]);
            PubSub.publish("refresh-shoppingcart");
          });
          console.log("IN if condition");
        } else {
          console.log("IN else condition");
        }
      }
      index--;
    }
  };

  const { razorpayVerifyPaymentSignature } = useRazorVerifyPayment();
  const getPaymentConfigration = (orderId: string, amount: number) => {
    const options = {
      description: "Wholesale Marketplace",
      image:
        "https://raw.githubusercontent.com/zhuchuanwu/publicImage/main/App-Icon.png",
      currency: "INR",
      // key: "rzp_test_AAkNOAMQXtr8LJ", //(production)
      key: "rzp_test_I8X2v4LgupMLv0", //(dev)
      name: "Salami Slicing",
      amount: amount,
      order_id: orderId, //Replace this with an order_id created using Orders API.
      prefill: {
        email: global.billingDetails.email,
        contact: global.billingDetails.phoneNumber,
        name: global.billingDetails?.firstName + global.billingDetails.lastName,
      },
      theme: { color: colors.primary },
    };

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
        setLoading({ show: false });
        if (orderInfo.comeFromType === ComeFromType.checkout) {
          clearData();
        }
        if (global.access_token) {
          NavigationService.navigate("OrderPlacedScreen");
        } else {
          NavigationService.navigate("CheckoutPaymentCompletedGuestScreen");
        }
      })
      .catch((error) => {
        debugger;
        dispatch({
          type: "changLoading",
          payload: false,
        });

        setLoading({ show: false });
        // setAlert({
        //   visible: true,
        //   title: "Payment failed",
        //   message: error.description,
        //   color: Colors.error,
        // });
        NavigationService.navigate("OrderPlacedScreen", { error });
      });
  };

  return getPaymentConfigration;
}
