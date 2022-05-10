import { useEffect, useMemo, useState } from "react";
import { useMutation, useReactiveVar } from "@apollo/client";
import { cartOrderVar, userProfileVar } from "../Apollo/cache";
import { RAZOR_ORDER } from "./gql";
import {
  OrderResponseFieldsFragment,
  useRazorpayCreateOrderMutation,
} from "../../generated/graphql";

export const useCreateRazorOrder = () => {
  const userProfile = useReactiveVar(userProfileVar);
  const isAuth = useMemo(() => userProfile.isAuth, [userProfile.isAuth]);
  const [razorOrder, setRazorOrder] = useState(null);
  useRazorpayCreateOrderMutation;
  const [razorpayCreateOrderMutation, { loading, error, data }] =
    useRazorpayCreateOrderMutation();
  const razorpayCreateOrder = (data: OrderResponseFieldsFragment) => {
    return razorpayCreateOrderMutation({
      variables: {
        request: {
          orderNumber: data.orderNumber ?? "", //"ORDER-17012022-101727620",
          orderId: data.orderId ?? "", //"a8f0ae56-ded2-4b82-8a64-f46f67a03037",
          amount: data.paymentDetails?.balanceToPay, //10,
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
  };

  useEffect(() => {
    if (loading) {
      return;
    }

    if (error) {
      console.log("error=====", error);
      console.log("error===============", error.response);
      setRazorOrder(null);
    }

    if (data) {
      console.log("createRazorOrder ==>", data);
      setRazorOrder(data);
    }
  }, [loading, error, data]);

  return {
    razorpayCreateOrder,
    razorOrder,
  };
};
