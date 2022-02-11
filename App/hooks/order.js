import { useEffect, useState } from "react";
import { useMutation, useReactiveVar } from "@apollo/client";
import { localCartVar, userProfileVar } from "../Apollo/cache";
import { CreateOrderFromCart } from "./gql";
import { Alert } from "react-native";

export const useCreateOrder = () => {
  const userProfile = useReactiveVar(userProfileVar);
  const [order, setOrder] = useState(null);
  console.log(
    "localCartVar().items",
    localCartVar().items,
    userProfile.buyerId,
    localCartVar().deliverAddress,
    userProfile.billingDetailsId,
  );
  const [createOrderFromCart, { loading, error, data }] = useMutation(
    CreateOrderFromCart,
    {
      variables: {
        cart: {
          buyerId: userProfile.buyerId,
          shippingAddressId: localCartVar().deliverAddress,
          billingDetailsId: userProfile.billingDetailsId,
          useSalamiWallet: true,
          cartItems: localCartVar().items,
        },
      },
      context: {
        headers: {
          isPrivate: true,
        },
      },
      onCompleted: (res) => {
        console.log(`Explore useCreateOrder res ${JSON.stringify(res)}`);
        setOrder(res);
      },
      onError: (res) => {
        alert(JSON.stringify(res.message));
        console.log(`Explore useCreateOrder onError ${JSON.stringify(res)}`);
      },
    },
  );

  useEffect(() => {
    if (loading) {
      // debugger;
      return;
    }

    if (error) {
      // debugger;
      console.log("error=====", error);

      console.log("error===============", error.response);

      setOrder(null);
    }

    if (data) {
      console.log("createOrder ==>", data);
      setOrder(data);
    }
  }, [loading, error, data]);

  return {
    createOrderFromCart,
    order,
  };
};
