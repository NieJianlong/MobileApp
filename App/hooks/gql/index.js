import { gql } from "@apollo/client";

export const CreateOrderFromCart = gql`
  mutation CreateOrderFromCart($cart: CartInput!) {
    createOrderFromCart(request: $cart) {
      orderId
      buyerId
      orderNumber
      subTotal
      discount
      serviceFees
      shippingFees
      taxes
      totalSavings
      orderTotal
      orderItems {
        orderItemId
        listingId
        variantId
        sellerId
        quantity
        itemPrice
      }
      paymentDetails {
        balanceToPay
        usedGiftAmount
        usedWalletAmount
      }
    }
  }
`;

export const RAZOR_ORDER = gql`
  mutation RazorpayCreateOrder($request: RazorpayOrderRequest!) {
    razorpayCreateOrder(request: $request) {
      razorpayOrderId
    }
  }
`;
