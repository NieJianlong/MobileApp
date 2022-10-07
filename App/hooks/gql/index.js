import { gql } from "@apollo/client";

export const RAZOR_ORDER = gql`
  mutation RazorpayCreateOrder($request: RazorpayOrderRequest!) {
    razorpayCreateOrder(request: $request) {
      razorpayOrderId
    }
  }
`;

export const RAZOR_VERIFY = gql`
  mutation RazorpayVerifyPaymentSignature(
    $request: RazorpayVerifyPaymentSignatureRequest!
  ) {
    razorpayVerifyPaymentSignature(request: $request) {
      valid
      razorpayPaymentId
      razorpayOrderId
      razorpayPaymentStatus
      razorpayOrderId
      razorpayOrderStatus
    }
  }
`;
