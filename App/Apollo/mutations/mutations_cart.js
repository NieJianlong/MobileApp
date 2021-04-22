import { gql  } from '@apollo/client';
 

/**
 *  @mutation
 *  schema
 *  addCartItem(cartID: ID!, buyerID: ID!, productListingID: ID!, quantity: Int!): Cart
 * 
 *  note javascript implements gql AST ID typre as type String
 *  see @NEW_ENTITY_ID for default ID values
 */
 export const ADD_CART_ITEM = gql`
 mutation AddCartItem($cartID: String!, $buyerID: String!, $productListingID: String!, $quantity: Int!) {
    addCartItem(cartID: $cartID,  buyerID: $buyerID, productListingID: $productListingID, quantity: $quantity) {
     id
   }
 }
`;



 