import { gql } from "@apollo/client";

/**
 * @query getCartByBuyerID(buyerID: ID!): Cart
 * schema
 *
 * Cart{id: ID! buyerID: ID! subTotal: Float totalDiscount: Float totalSavingsSoFar: Float
 * createdAt: DateTime updatedAt: DateTime cartItems: [CartItem]}
 *
 * CartItem{cartID: ID! productListingID: ID! productListing: ProductListing quantity: Int createdAt: DateTime
 * updatedAt: DateTime}
 *
 *  note javascript implements gql AST ID typre as type String
 *  see @NEW_CART_ID for default ID values
 */
export const GET_CART_BY_BUYER_ID = gql`
  query GetCartByBuyerID($buyerID: ID!) {
    getCartByBuyerID(buyerID: $buyerID) {
      cartID
    }
  }
`;

/**
 * @query  getCart(cartID: ID!): Cart
 * schema see GET_CART_BY_BUYER_ID
 */
export const GET_CART = gql`
  query GetCart($cartID: ID!) {
    getCart(cartID: $cartID) {
      cartID
    }
  }
`;
