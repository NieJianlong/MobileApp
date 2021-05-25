import { gql } from "@apollo/client";

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
  query AllProductListingsDTO(
    $sortfield: String!
    $sortDirection: String!
    $pageNo: Int!
    $pageSize: Int!
  ) {
    allProductListingsDTO(
      sortfield: $sortfield
      sortDirection: $sortDirection
      pageNo: $pageNo
      pageSize: $pageSize
    ) {
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
  query ProductById($id: ID!) {
    productById(id: $id) {
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
 *  ProductListingDetailResponse{id: ID! photo: String productName: String rating: Int numberOfReviews: Int 
 *  wholeSalePrice: Float retailPrice: Float percentOff: Int closedDate: Date progressBarValue: Float amountSaved: Float 
 *  deliveryFee: Float shortName: String longName: String description: String technicalDetails: String 
 *  optionValues: [OptionValue] relatedProducts: [String] seller: SellerDTO reviewDTO: ReviewDTO 
 *  returnPolicies: [ReturnPolicy]}
 *
 */
export const PRODUCT_LISTING_DETAIL_RESPONSE = gql`
  query ProductListingDetailResponse($id: ID!) {
    productListingDetailResponse(id: $id) {
      id
      productName
    }
  }
`;

/**
 *  @query  activeProductListingsByStoreId(storeId: String, sortfield: String, sortDirection: SortDirection, pageNo: Int, pageSize: Int)
 *  : [ProductListingDTO]
 *
 * StoreDTO{ id: ID! name: String productListingDTOList: [ProductListingDTO] }
 * 
 * enum SortDirection{ UNDEFINED, ASCENDING, DESCENDING}
 *
 * ProductListingDTO {id: ID! productId: ID! photo: String productName: String rating: Int numberOfReviews: Int 
 * wholeSalePrice: Float retailPrice: Float percentOff: Int closedDate: Date progressBarValue: Float noOfItemsInStock: Int 
 * numberOfItemsAvailable: Int minQuantityPerCart: Int maxQuantityPerCart: Int}
 * 
 *
 */
export const ACTIVE_PRODUCT_LISTINGS_BY_STORE_ID = gql`
  query ActiveProductListingsByStoreId(
    $storeId: String
    $sortfield: String
    $sortDirection: SortDirection
    $pageNo: Int
    $pageSize: Int
  ) {
    activeProductListingsByStoreId(
      storeId: $storeId
      sortfield: $sortfield
      sortDirection: $sortDirection
      pageNo: $pageNo
      pageSize: $pageSize
    ) {
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
        noOfItemsInStock
        numberOfItemsAvailable
        minQuantityPerCart
        maxQuantityPerCart
 
    }
  }
`;

/**
 * @query   chatById(id: String!): Chat
 */
