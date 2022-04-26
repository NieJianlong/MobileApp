import { useEffect, useState, useMemo } from "react";
import { useMutation, useReactiveVar } from "@apollo/client";
import { razorOrderPaymentVar, userProfileVar } from "../Apollo/cache";
import { RAZOR_VERIFY } from "./gql";

export const useRazorVerifyPayment = () => {
  const userProfile = useReactiveVar(userProfileVar);
  const isAuth = useMemo(() => userProfile.isAuth, [userProfile.isAuth]);
  const razorOrderPayment = useReactiveVar(razorOrderPaymentVar);
  const [razorVerifyPayment, setRazorVerifyPayment] = useState(null);
  const [razorpayVerifyPaymentSignature, { loading, error, data }] =
    useMutation(RAZOR_VERIFY, {
      variables: {
        request: {
          razorpayPaymentId: razorOrderPayment.razorpay_payment_id,
          razorpayOrderId: razorOrderPayment.razorpay_order_id,
          razorpaySignature: razorOrderPayment.razorpay_signature,
        },
      },
      context: {
        headers: {
          isPrivate: isAuth,
        },
      },
      onCompleted: (res) => {},
      onError: (res) => {
        alert(JSON.stringify(res.message));
      },
    });

  useEffect(() => {
    if (loading) {
      return;
    }

    if (error) {
      console.log("error=====", error);
      console.log("error===============", error.response);
      setRazorVerifyPayment(null);
    }

    if (data) {
      console.log("Verify Payment... ==>", data);
      setRazorVerifyPayment(data);
    }
  }, [loading, error, data]);

  return {
    razorpayVerifyPaymentSignature,
    razorVerifyPayment,
  };
};
