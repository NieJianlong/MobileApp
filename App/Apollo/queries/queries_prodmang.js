import { gql } from "@apollo/client";

/**
 *
 * @query  getListings
 *
 * getListings(searchOptions: SearchOptions): [ProductListingView]
 *
 * enum FilterType { UNDEFINED, ALL, ACTIVE, ACTIVE_BY_COORDINATES, ACTIVE_BY_COORDINATES_AND_ANNOUNCEMENT,
    ACTIVE_BY_COORDINATES_AND_CATEGORY, ACTIVE_BY_COORDINATES_AND_SELLER, BY_LISTING_ID, BY_STORE_ID,
    ACTIVE_BY_COORDINATES_AND_WISH_LIST, BY_COORDINATES_AND_SHARE_LIST }
 *
 * ProductListingView { id: String productId: String numberOfReviews: Int rating: Int closedDate: String deliveryDate: String
 * productListingType: String shippingMethodsAvailable: String noOfOrderedItems: Int progressBarValue: Int
 * noOfItemsInStock: Int numberOfItemsAvailable: Int minQuantityPerCart: Int maxQuantityPerCart: Int
 * pickUpFromSeller: Boolean collectionPointAddressId: String collectionPointAddress: Address returnAddressId: String
 * returnAddress: Address amountSaved: Float deliveryFee: Float shortName: String longName: String description: String
 * technicalDetails: String announcementId: String productOptionValues: [ProductOptionValueView] relatedProducts: String
 * sellerId: String seller: SellerView reviews: [ReviewView] returnPolicies: [ProductReturnPolicyView]
 * categories: [ProductCategoryView] images: [Images] productListingsOptionGroups: [ProductListingsOptionGroup]
 * retailPrice: Float wholeSalePrice: Float percentOff: Int }
 *
 * ProductListingsOptionGroup { listingId: ID productId: ID groupId: ID itemsAvailable: Int  itemsSold: Int  retailPrice: Float
 *   wholeSalePrice: Float discount: Float optionsGroup: OptionsGroup }
 *
 * OptionsGroup {
 *  groupId: ID initialItemsCount: Int itemsAvailable: Int itemsSold: Int optionsGroupPrice: Float optionsGroupDiscount: Float
 *  optionValues: [OptionValueView]}
 *
 * OptionValueView { valueId: ID optionId: ID value: String defaultOptionValue: String priceIncrease: Float discount: Float
 *  name: String description: String}
 *
 *  SellerView { id: ID brandName: String businessName: String avatarUrl: String usersRating: Float }
 *
 */
export const GET_LISTINGS = gql`
  query GetListings($searchOptions: SearchOptions) {
    getListings(searchOptions: $searchOptions) {
      productId
      numberOfReviews
      rating
      closedDate
      deliveryDate
      productListingType
      shippingMethodsAvailable
      noOfOrderedItems
      progressBarValue
      noOfItemsInStock
      numberOfItemsAvailable
      minQuantityPerCart
      maxQuantityPerCart
      pickUpFromSeller
      amountSaved
      deliveryFee
      shortName
      longName
      description
      technicalDetails
      announcementId
      collectionPointAddressId
      relatedProducts
      sellerId
      retailPrice
      wholeSalePrice
      percentOff
      photo
      photoUrls
      seller {
        id
        brandName
        ratingCount
      }
      images {
        id
        referenceId
        imageName
        imageType
        description
        fullPath
      }
      productListingsOptionGroups {
        optionsGroup {
          groupId
          optionValues {
            value
            defaultOptionValue
          }
        }
      }
    }
  }
`;

/**
 * @Depreciated
 * @query  allProductListingsDTO
 *
 * allProductListingsDTO(sortfield: String!, sortDirection: String!, pageNo: Int, pageSize: Int):[ProductListingDTO]
 *
 * ProductListingDTO { id: ID!  photo: String  productName: String  rating: Int numberOfReviews: Int  wholeSalePrice: Float
 *  retailPrice: Float  percentOff: Int closedDate: Date  progressBarValue: Float }
 *
 */
// export const ALL_PRODUCT_LISTINGS_DTO = gql`
//   query AllProductListingsDTO(
//     $sortfield: String!
//     $sortDirection: String!
//     $pageNo: Int!
//     $pageSize: Int!
//   ) {
//     allProductListingsDTO(
//       sortfield: $sortfield
//       sortDirection: $sortDirection
//       pageNo: $pageNo
//       pageSize: $pageSize
//     ) {
//       id
//       photo
//       productName
//       rating
//       numberOfReviews
//       wholeSalePrice
//       retailPrice
//       percentOff
//       closedDate
//       progressBarValue
//     }
//   }
// `;

/**
 * @Depreciated
 * query getProductListings(lattitude: Float!, longitude: Float!, filter: FilterType, filterParams: String[],
 *                                  sortDirection: SortDirection, pageNo: Int, pageSize: Int): [ProductListing])
 *
 *
 */
// export const GET_PRODUCT_LISTINGS = gql`
//   query GetProductListings(
//     $lattitude: Float!, $longitude: Float!, $filter: FilterType, $filterParams: String[],
//                                  $sortDirection: SortDirection, $pageNo: Int, $pageSize: Int
//   ) {
//     getProductListings(
//       lattitude: $sortfield
//       longitude: $sortDirection
//       filter: $filter
//       filterParams:$filterParams
//       sortDirection:$sortDirection
//       pageNo: $pageNo
//       pageSize: $pageSize
//     ) {
//       id
//       photo
//       productName
//       rating
//       numberOfReviews
//       wholeSalePrice
//       retailPrice
//       percentOff
//       closedDate
//       progressBarValue
//     }
//   }
// `;

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
 *  @Depreciated
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
 *  @Depreciated
 *  @query  activeProductListingsByStoreId(storeId: String, sortfield: String, sortDirection: SortDirection, pageNo: Int, pageSize: Int)
 *  : [ProductListingDTO]
 *
 * StoreDTO{ id: ID! name: String productListingDTOList: [ProductListingDTO] }
 *
 * enum SortDirection{ UNDEFINED, ASCENDING, DESCENDING}
 *
 * ProductListingDTO {id: ID! productId: ID! photo: String productName: String rating: Int numberOfReviews: Int
 * wholeSalePrice: Float retailPrice: Float percentOff: Int deliveryDate: Date closedDate: Date progressBarValue: Float
 * noOfOrderedItems: Int noOfItemsInStock: Int numberOfItemsAvailable: Int minQuantityPerCart: Int maxQuantityPerCart: Int
 * shippingMethodsAvailable:[ShippingMethodType] returnAddress: Address collectionPointAddress: Address}
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
      noOfOrderedItems
      numberOfItemsAvailable
      minQuantityPerCart
      maxQuantityPerCart
    }
  }
`;

/**
 * @query   announcementsByOnlineStore(storeId: String): [Announcement]
 * Announcement{id: ID! referenceId: String validityInterval: Int  announcementText: String announcementDatetime: DateTime
    createdAt: DateTime updatedAt: DateTime}
 *
 */
export const ANNOUNCEMENTS_BY_ONLINE_STORE = gql`
  query AnnouncementsByOnlineStore($storeId: String) {
    announcementsByOnlineStore(storeId: $storeId) {
      id
      referenceId
      validityInterval
      announcementText
      announcementDatetime
      createdAt
      updatedAt
    }
  }
`;

/**
 * @Depreciated
 * @query announcementByProductListing(productListingId: String!) : Announcement
 * schema see announcementsByOnlineStore
 */
export const ANNOUNCEMENT_BY_PRODUCT_LISTING = gql`
  query AnnouncementByProductListing($productListingId: String) {
    announcementByProductListing(productListingId: $productListingId) {
      id
      referenceId
      validityInterval
      announcementText
      announcementDatetime
      createdAt
      updatedAt
    }
  }
`;

/**
 * @query  announcementsByListingId(productListingId: String): [AnnouncementDTO]
 *
 * AnnouncementDTO{ announcementText: String validityInterval:Int announcementDatetime: DateTime productLongName: String
 * sellerBusinessName: String retailPrice: Float wholeSalePrice: Float percentageOff: Float deliveryDate: Date
 * minOrderRequired: Int infoIcon: String}
 */
export const ANNOUNCEMENT_BY_LISTING_ID = gql`
  query AnnouncementsByListingId($productListingId: String) {
    announcementsByListingId(productListingId: $productListingId) {
      announcementText
      validityInterval
      announcementDatetime
      productLongName
      sellerBusinessName
      retailPrice
      wholeSalePrice
      percentageOff
      deliveryDate
      minOrderRequired
    }
  }
`;
