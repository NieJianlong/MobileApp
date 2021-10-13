import { gql } from "@apollo/client";

export const GetBuyerOrders = gql`
  query GetBuyerOrders($buyerId: ID!, $searchString: String!) {
    getBuyerOrders(buyerId: $buyerId, searchString: $searchString) {
      cartID
    }
  }
`;
