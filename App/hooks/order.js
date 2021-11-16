import { useEffect, useState } from "react";
import { useMutation, useReactiveVar } from "@apollo/client";
import { localCartVar, userProfileVar } from "../Apollo/cache";
import { CreateOrderFromCart } from "./gql";

export const CreateOrder = () => {
    const userProfile = useReactiveVar(userProfileVar);
    const [order, setOrder] = useState(null);

    const [createOrderFromCart, { loading, error, data}] = useMutation(
        CreateOrderFromCart, 
        {
            variables: {
                cart: {
                    buyerId: userProfile.buyerId,
                    shippingAddressId: localCartVar().deliverAddress,
                    billingDetailsId: userProfile.billingDetailsId,
                    useSalamiWallet: true,
                    cartItems: localCartVar().items
                }
            },
            context: {
                headers: {
                    isPrivate: true,
                },
            },
        }
    );

    useEffect(() => {
        if (loading) return;

        if (error) {
            setOrder(null);
        }
    
        if (data) {
            console.log('createOrder ==>', data);
            setOrder(data);
        }

    }, [loading, error, data]);

    return {
        createOrderFromCart,
        order,
    };
};