import { gql } from "@apollo/client";

export const GetBuyerOrders = gql`
  query GetBuyerOrders($buyerId: ID!, $searchString: String!) {
    getBuyerOrders(buyerId: $buyerId, searchString: $searchString) {
      orderId
      orderNumber
      orderDatetime
      deliveryAddress
      billingAddress
      subTotal
      serviceFees
      shippingFees
      totalSavings
      orderTotal
      orderItems {
        orderItemId
        listingId
        quantity
        latestStatus
        sellerId
        variantId
        variantOptions
        shortName
        photo
        itemPrice
        discount
      }
    }
  }
`;
