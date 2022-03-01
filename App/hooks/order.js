import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { CreateOrderFromCart } from "./gql";

export const useCreateOrder = () => {
  const [order, setOrder] = useState(null);
  const [createOrderFromCart, { loading, error, data }] =
    useMutation(CreateOrderFromCart);

  useEffect(() => {
    if (loading) {
      return;
    }

    if (error) {
      console.log("error=====", error);
      alert(error);
      console.log("error===============", error.response);
      setOrder(null);
    }

    if (data) {
      console.log("createOrder data ==>", data);
      setOrder(data);
    }
  }, [loading, error, data]);

  return {
    createOrderFromCart,
    order,
  };
};
