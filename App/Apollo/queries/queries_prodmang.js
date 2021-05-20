import { gql } from '@apollo/client';

/**
 * @query  allProductListingsDTO 
 * 
 * allProductListingsDTO(sortfield: String!, sortDirection: String!, pageNo: Int, pageSize: Int):[ProductListingDTO]
 * 
 * ProductListingDTO { id: ID!  photo: String  productName: String  rating: Int numberOfReviews: Int  wholeSalePrice: Float
 *  retailPrice: Float  percentOff: Int closedDate: Date  progressBarValue: Float }
 * 
 */

export const ALL_PRODUCT_LISTINGS_DTO = gql`
 query AllProductListingsDTO($sortfield: String!, $sortDirection: String!, $pageNo: Int!, $pageSize: Int!)  {
  allProductListingsDTO(sortfield: $sortfield, sortDirection: $sortDirection, pageNo: $pageNo, pageSize: $pageSize)  {
        id
        photo
        productName
        rating
        numberOfReviews
        wholeSalePrice
        retailPrice
        percentOff
        closedDate
        progressBarValue
   }
 }
 `;


/**
 *   @query  productById(id: String!): Product
 * 
 *  Product { id: ID! shortName: String longName: String  description: String
 */
export const PRODUCT_BY_ID = gql`
 query ProductById($id: ID!)  {
  productById(id: $id)  {
     id
     shortName 
     longName 
     description
  }
 }
 `;


/**
 *  @query   productListingDetailResponse(id: String!): ProductListingDetailResponse
 * 
 *  ProductListing{id: ID! product: Product store: Store chat: Chat announcement: Announcement address: Address 
 *  chatMuteFlag: Boolean wholeSalePrice: Float retailPrice: Float discount: Float numberOfItems: Int maxQuantityPerCart: Int 
 *  closedDate: Date deliveryDate: Date createdAt: DateTime updatedAt: DateTime}
 * 
 */
export const PRODUCT_LISTING_DETAIL_RESPONSE = gql`
 query ProductListingDetailResponse($id: ID!)  {
  productListingDetailResponse(id: $id)  {
    id
    productName
  }
 }
 `;


/**
 *  @query  productListingsByStoreId(storeId: String,sortfield: String!, sortDirection: String!, pageNo: Int, pageSize: Int) 
 *        : StoreDTO
 * 
 * StoreDTO{ id: ID! name: String productListingDTOList: [ProductListingDTO] } 
 * 
 * ProductListingDTO {id: ID! productId: ID! photo: String productName: String rating: Int numberOfReviews: Int 
 * wholeSalePrice: Float retailPrice: Float percentOff: Int closedDate: Date progressBarValue: Float}
 * 
 */
export const PRODUCT_LISTINGS_BY_STORE_ID = gql`
 query ProductListingsByStoreId($storeId: String, $sortfield: String!, $sortDirection: String!, $pageNo: Int, $pageSize: Int)  {
  productListingsByStoreId(storeId: $storeId, sortfield: $sortfield, sortDirection: $sortDirection, pageNo: $pageNo, pageSize: $pageSize)  {
    id
        name
        productListingDTOList {
            id
            productId
            photo
            productName
            rating
            numberOfReviews
            wholeSalePrice
            retailPrice
            percentOff
            closedDate
            progressBarValue
        }
  }
 }
 `;







/**
 * @query   chatById(id: String!): Chat
 */
