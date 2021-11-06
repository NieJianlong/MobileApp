import { gql } from "@apollo/client";

export const GetProducts = gql`
  query GetProducts($searchOptions: SearchOptions) {
    getProducts(searchOptions: $searchOptions) {
      listingId
      variantId
      isAvailable
    }
  }
`;
