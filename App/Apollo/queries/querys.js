import { gql } from '@apollo/client';

/** ================== User Management ================ */





/** ================== Product Management ================ */

/**
 *  @query All_PRODUCTS 
 * returns a list of Products, for grapphql whne we have common query patterns like 
 * findOne, findMatch or findAll we use the same syntax only the shape of the query
 *  results will differ
 * 
 * for example the query below could be used for a findOne or findAll
 * 
 * schema type
 * type Product {
    id: ID!
    shortName: String
    longName: String
    description: String
}
 * to-do add buyer_id as input variable requires new schema 
 * to-do confirm flow for default Id for guest user in onboarding
 */
export const All_PRODUCTS = gql`
query GetAllProducts {
    allProducts {
      shortName
      longName
      description
  }
}
`;

/**
 *  @query  All_PRODUCT_LISTINGS
 * returns a list of Products, for grapphql whne we have common query patterns like 
 * findOne, findMatch or findAll we use the same syntax only the shape of the query
 * results will differ
 * 
 * to-do add image link and num sold products as input variable requires new schema 
 * to-do confirm flow for default Id for guest user in onboarding
 * refactor for correct semantic naming see AST input naming used in user management 
 * service for correct input AST semantics
 * 
 * schema type
 * 
 * type ProductListing {
    id: ID!
    product: Product
    store: Store
    chat: Chat
    announcement: Announcement
    address: Address
    chatMuteFlag: Boolean
    wholeSalePrice: Float
    retailPrice: Float
    discount: Float
    numberOfItems: Int
    maxQuantityPerCart: Int
    closedDate: Date
    deliveryDate: Date
    createdAt: DateTime
    updatedAt: DateTime

}
 to-do add buyerId(s) as input variable requires new schema 
 */
export const All_PRODUCT_LISTINGS = gql`
query GetAllProductListings {
    allProductListings {
        id 
        product 
        store 
        chat 
        announcement 
        address 
        chatMuteFlag 
        wholeSalePrice 
        retailPrice 
        discount 
        numberOfItems 
        maxQuantityPerCart 
        closedDate 
        deliveryDate 
        createdAt 
        updatedAt 
    }
} `;

