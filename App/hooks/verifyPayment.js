import { useEffect, useState } from "react";
import { useMutation, useReactiveVar } from "@apollo/client";
import { razorOrderPaymentVar } from "../Apollo/cache";
import { RAZOR_VERIFY } from "./gql";

export const useRazorVerifyPayment = () => {
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
          isPrivate: true,
        },
      },
      onCompleted: (res) => {
        console.log(`Explore VerifyPayment res ${JSON.stringify(res)}`);
      },
      onError: (res) => {
        alert(JSON.stringify(res.message));
        console.log(`Explore VerifyPayment onError ${JSON.stringify(res)}`);
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
