import { gql } from "@apollo/client";

export const CreateOrderFromCart = gql`
  mutation CreateOrderFromCart($cart: CartInput!) {
    createOrderFromCart(cart: $cart) {
        id,
        orderNumber,
    }
  }
`;