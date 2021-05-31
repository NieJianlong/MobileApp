import { gql } from "@apollo/client";

const NEW_CART_ID = "00000000-0000-0000-0000-000000000000";

/**
 *  @mutation
 *  createCart(buyerID: ID!, deliveryAddress: ID!): Cart
 *  schema
 *
 * Cart{id: ID! buyerID: ID! deliveryAddress: ID! subTotal: Float totalDiscount: Float totalSavingsSoFar: Float
 * createdAt: DateTime updatedAt: DateTime cartItems: [CartItem]}
 *
 * enum ShippingMehod { UNDEFINED, DELIVERY_ADDRESS, COLLECTION_POINT }
 *
 *  note javascript implements gql AST ID typre as type String
 *  see @NEW_CART_ID for default ID values
 */
export const CREATE_CART = gql`
  mutation CreateCart($buyerID: ID!, $deliveryAddress: ID!) {
    createCart(buyerID: $buyerID, deliveryAddress: $deliveryAddress) {
      cartID
    }
  }
`;

/**
 *  @mutation
 *  addItem(cartID: ID!, productListingID: ID!, quantity: Int!, shippingMethod: ShippingMehod!): Cart
 *  schema
 *
 * Cart{id: ID! buyerID: ID! deliveryAddress: ID! subTotal: Float totalDiscount: Float totalSavingsSoFar: Float
 * createdAt: DateTime updatedAt: DateTime cartItems: [CartItem]}
 *
 * CartItem{cartID: ID! productListingID: ID! productListing: ProductListing quantity: Int shippingMethod: ShippingMehod
 * collectionPointAddress: ID sellerID: ID productID: ID itemPrice: Float discount: Float createdAt: DateTime
 * updatedAt: DateTime}
 *
 * enum ShippingMehod { UNDEFINED, DELIVERY_ADDRESS, COLLECTION_POINT }
 *
 *  note javascript implements gql AST ID typre as type String
 *  see @NEW_CART_ID for default ID values
 */
export const ADD_ITEM = gql`
  mutation AddItem(
    $cartID: ID!
    $productListingID: ID!
    $quantity: Int!
    $shippingMethod: ShippingMehod!
  ) {
    addItem(
      cartID: $cartID
      productListingID: $productListingID
      quantity: $quantity
      shippingMethod: $shippingMethod
    ) {
      cartID
    }
  }
`;

/**
 *  @mutation clearCart
 *
 * clearCart(cartID: ID!): Cart
 * schema see ADD_CART_ITEM
 */
export const CLEAR_CART = gql`
  mutation ClearCart($cartID: ID!) {
    clearCart(cartID: $cartID) {
      cartID
    }
  }
`;

/**
 * @mutation cartCheckout(cartID:ID!, buyerID:ID!, homeDelivery:Boolean!): CartCheckoutResponse
 * schema
 * CartCheckoutResponse{code: String! success: Boolean! message: String! orderID: ID}
 */
export const CART_CHECKOUT = gql`
  mutation CartCheckout($cartID: ID!, $buyerID: ID!, $homeDelivery: Boolean!) {
    cartCheckout(
      cartID: $cartID
      buyerID: $buyerID
      homeDelivery: $homeDelivery
    ) {
      orderID
    }
  }
`;
