import { gql } from "@apollo/client";

/**
 * public api's
 * registerBuyer, createGuestBuyer
 * registerSeller
 * createAddress, updateAddress, deleteAddress
 * getGuestBuyerDefaultAddressByBuyerId,getGuestBuyerAddressesById
 */

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
      noOfOrderedItems
      noOfItemsInStock
      numberOfItemsAvailable
      minQuantityPerCart
      maxQuantityPerCart
    }
  }
`;
