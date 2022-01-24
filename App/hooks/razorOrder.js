import { useEffect, useState } from "react";
import { useMutation, useReactiveVar } from "@apollo/client";
import { localCartVar, userProfileVar } from "../Apollo/cache";
import { RAZOR_ORDER } from "./gql";
import { Alert } from "react-native";

export const useCreateRazorOrder = (orderNumber, orderId, amount) => {
  const userProfile = useReactiveVar(userProfileVar);
  const [razorOrder, setRazorOrder] = useState(null);
  const [razorpayCreateOrder, { loading, error, data }] = useMutation(
    RAZOR_ORDER,
    {
      variables: {
        request: {
          orderNumber: "ORDER-17012022-101727620",
          orderId: "a8f0ae56-ded2-4b82-8a64-f46f67a03037",
          amount: 10,
        },
      },
      context: {
        headers: {
          isPrivate: true,
        },
      },
      onCompleted: (res) => {
        console.log(`Explore useCreateOrder res ${JSON.stringify(res)}`);
      },
      onError: (res) => {
        alert(JSON.stringify(res.message));
        console.log(`Explore useCreateOrder onError ${JSON.stringify(res)}`);
      },
    }
  );

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
