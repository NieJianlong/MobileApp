import { gql } from "@apollo/client";

/**
 * public api's
 * registerBuyer, createGuestBuyer
 * registerSeller
 * createAddress, updateAddress, deleteAddress
 * getGuestBuyerDefaultAddressByBuyerId,getGuestBuyerAddressesById
 */

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
 * technicalDetails: String announcementId: String highlightBullets: String productOptionValues: [ProductOptionValueView] relatedProducts: String
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
 * OptionValueView{ valueId: ID optionId: ID value: String defaultOptionValue: String priceIncrease: Float discount: Float
 *  name: String description: String}
 *
 */
export const GET_PREFERRED_CATEGORIES = gql`
  query GetPreferredCategories($buyerId: ID!) {
    getPreferredCategories(buyerId: $buyerId) {
      categoryId
      name
      description
    }
  }
`;
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
      highlightBullets
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
      variants {
        optionGroupId
        initialItemsCount
        itemsAvailable
        itemsSold
        optionsGroupPrice
        optionsGroupDiscount
        sku
        defaultOptionGroup
        options {
          key
          value
        }
      }
    }
  }
`;

/**
 * @mutation createAddress
 *
 * schema
 *  createAddress(request: AddressRequestForCreate!) : AddressResponse
 *
 *  AddressRequestForCreate{ flat:String floor:String defaultAddress:Boolean block:String building:String
 *  houseNumber:String streetAddress1:String streetAddress2:String streetAddress3:String
 *  townCity:String villageArea:String district:String provinceState:String country:String
 *  areaCode:String landMark:String pinCode:String addressType:AddressType referenceId:String!}
 *
 * AddressResponse {addressId:ID flat:String floor:String defaultAddress:Boolean block:String
 * building:String houseNumber:String streetAddress1:String streetAddress2:String streetAddress3:String
 * townCity:String villageArea:String district:String provinceState:String country:String areaCode:String
 * landMark:String pinCode:String addressType:AddressType referenceId:ID billingDetails:BillingDetailsResponse
 * createdAt:OffsetDateTime updatedAt:OffsetDateTime }
 *
 * enum AddressType {SHIPPING, BILLING, BUSINESS, RETURN, COLLECTION_POINT,UNDEFINED}
 */
export const CREATE_ADDRESS = gql`
  mutation CreateAddress($request: AddressRequestForCreate!) {
    createAddress(request: $request) {
      addressId
      pinCode
      provinceState
      townCity
      villageArea
      houseNumber
      flat
      landMark
    }
  }
`;

/**
 * @query  getGuestBuyerAddressesById
 *
 * schema
 *  getGuestBuyerAddressesById(sellerId : ID!) : [AddressResponse]
 * see @query addresses
 */
export const FIND_GUEST_BUYER_ADDRESS_BY_ID = gql`
  query GetGuestBuyerAddressesById($buyerId: ID!) {
    getGuestBuyerAddressesById(buyerId: $buyerId) {
      addressId
      streetAddress1
      villageArea
      district
      provinceState
      country
      pinCode
    }
  }
`;

/**
 * @query  getBuyerAddressesById
 *
 * schema
 *  getBuyerAddressesById(buyerId : ID!) : [AddressResponse]
 * see @query addresses
 */
export const FIND_BUYER_ADDRESS_BY_ID = gql`
  query GetBuyerAddressesById($buyerId: ID!) {
    getBuyerAddressesById(buyerId: $buyerId) {
      addressId
    }
  }
`;

/**
 * @query  getGuestBuyerDefaultAddressByBuyerId
 *
 * schema
 *  getGuestBuyerDefaultAddressByBuyerId(sellerId : ID!) : AddressResponse
 * see @query addresses
 */
export const FIND_GUEST_BUYER_DEFAULT_ADDRESS_BY_ID = gql`
  query GetGuestBuyerDefaultAddressByBuyerId($buyerId: ID!) {
    getGuestBuyerDefaultAddressByBuyerId(buyerId: $buyerId) {
      addressId
      pinCode
      provinceState
      townCity
      villageArea
      houseNumber
      flat
      landMark
    }
  }
`;

/**
 * @query  getBuyerDefaultAddressByBuyerId
 *
 * schema
 * getBuyerDefaultAddressByBuyerId(buyerId : ID!) : AddressResponse
 * see @query addresses
 */
/**
 * @query  getBuyerDefaultAddressByBuyerId
 *
 * schema
 * getBuyerDefaultAddressByBuyerId(buyerId : ID!) : AddressResponse
 * see @query addresses
 */
export const FIND_BUYER_DEFAULT_ADDRESS_BY_ID = gql`
  query GetBuyerDefaultAddressByBuyerId($buyerId: ID!) {
    getBuyerDefaultAddressByBuyerId(buyerId: $buyerId) {
      addressId
      pinCode
      provinceState
      townCity
      villageArea
      houseNumber
      flat
      landMark
    }
  }
`;

/**
 *
 *  @Depreciated
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
      shortName
      longName
      rating
      numberOfReviews
      wholeSalePrice
      retailPrice
      percentOff
      closedDate
      progressBarValue
      noOfOrderedItems
      noOfItemsInStock
      numberOfItemsAvailable
      minQuantityPerCart
      maxQuantityPerCart
    }
  }
`;

/**
 *
 * coordinatesForAddressRequest(address : AddressRequestToGetCoordinates!) : CoordinateResponse
 * schema see @query addresses
 *
 * AddressRequestToGetCoordinates{ country:String pinCode:String provinceState:String townCity:String
 *  villageArea:String houseNumber:String flatNumber:String landMark:String streetAddress:String }
 *
 * CoordinateResponse{ latitude:Float longitude:Float }
 */
export const FIND_COORDINATES_FOR_ADDRESS_REQUEST = gql`
  query CoordinatesForAddressRequest(
    $address: AddressRequestToGetCoordinates!
  ) {
    coordinatesForAddressRequest(address: $address) {
      latitude
      longitude
    }
  }
`;

// query { getListings (searchOptions: {})
// {
//     id
//     productId
//     numberOfReviews
//     rating
//     closedDate
//     deliveryDate
//     productListingType
//     shippingMethodsAvailable
//     noOfOrderedItems
//     progressBarValue
//     noOfItemsInStock
//     numberOfItemsAvailable
//     minQuantityPerCart
//     maxQuantityPerCart
//     pickUpFromSeller
//     amountSaved
//     deliveryFee
//     shortName
//     longName
//     description
//     technicalDetails
//     photo
//     photoUrls
//     announcementId
//     ratingDetail {
//         zeroStar
//         oneStar
//         twoStar
//         threeStar
//         fourStar
//         fiveStar
//         sixAndMoreStar
//     }
//     collectionPointAddressId
//     collectionPointAddress {
//         id
//         flat
//         floor
//         block
//         building
//         houseNumber
//         streetAddress1
//         streetAddress2
//         townCity
//         villageArea
//         district
//         provinceState
//         country
//         areaCode
//         landMark
//         pinCode
//         addressType
//         referenceId
//         defaultAddress
//     }
//     returnAddressId
//     returnAddress {
//         id
//         flat
//         floor
//         block
//         building
//         houseNumber
//         streetAddress1
//         streetAddress2
//         townCity
//         villageArea
//         district
//         provinceState
//         country
//         areaCode
//         landMark
//         pinCode
//         addressType
//         referenceId
//         defaultAddress
//     }
//     productOptionValues {
//         valueId
//         productId
//         optionValue
//         defaultValue
//         discount
//         availabilityCounter
//         priceIncrease
//     }
//     relatedProducts
//     sellerId
//     seller {
//         id
//         brandName
//     }
//     reviews {
//         id
//         productId
//         title
//         description
//         ratingVote
//         helpfulCount
//         postedBy
//     }
//     returnPolicies {
//         id
//         productId
//         name
//         description
//     }
//     categories {
//         categoryId
//         productId
//         name
//         description
//     }
//     images {
//         id
//         referenceId
//         imageName
//         imageType
//         description
//         fullPath
//     }
//     variants {
//         initialItemsCount
//         itemsAvailable
//         itemsSold
//         optionGroupId
//         optionsGroupDiscount
//         optionsGroupPrice
//         sku
//         defaultOptionGroup
//         options {
//             key
//             value
//         }
//     }
//     productListingsOptionGroups {
//         groupId
//         listingId
//         itemsAvailable
//         itemsSold
//         productId
//         optionsGroup {
//             defaultOptionGroup
//             groupId
//             initialItemsCount
//             itemsAvailable
//             optionsGroupDiscount
//             optionsGroupPrice
//             optionValues {
//                 defaultOptionValue
//                 description
//                 name
//                 value
//                 priceIncrease
//                 valueId
//             }
//         }
//     }
// }}
