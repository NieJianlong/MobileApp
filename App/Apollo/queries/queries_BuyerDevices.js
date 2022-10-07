import { gql } from "@apollo/client";

export const BUYER_DEVICES_BY_BUYER_ID = gql`
  query BuyerDevicesByBuyerId($buyerId: ID!) {
    buyerDevicesByBuyerId(buyerId: $buyerId) {
      deviceId
      buyerId
    }
  }
`;
