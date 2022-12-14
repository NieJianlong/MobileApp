import { gql } from "@apollo/client";

/**
 * public api's
 * registerSeller
 * createAddress, updateAddress, deleteAddress
 * getGuestBuyerDefaultAddressByBuyerId,getGuestBuyerAddressesById
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
export const GET_ALL_CATEGORIES = gql`
  query GetAllCategories {
    getAllCategories {
      categoryId
      name
      description
    }
  }
`;
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

export const GET_LISTINGS = gql`
  query GetListings($searchOptions: SearchOptions) {
    getListings(searchOptions: $searchOptions) {
      content {
        ...ProductListingViewField
      }
      pageNo
      pageSize
      totalPages
      totalElements
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

export const OnlineStoreByGeoCoordinates = gql`
  query OnlineStoreByGeoCoordinates(
    $latitude: Float!
    $longitude: Float!
    $pageable: StorePageable!
  ) {
    onlineStoreByGeoCoordinates(
      latitude: $latitude
      longitude: $longitude
      pageable: $pageable
    ) {
      content {
        id
      }
      pageNo
      pageSize
      totalPages
      totalElements
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
export const GetCountries = gql`
  query GetCountries {
    getCountries {
      id
      countryName
    }
  }
`;
export const FIND_COORDINATES_FOR_ADDRESSID = gql`
  query CoordinatesForAddress($address: String) {
    coordinatesForAddress(address: $address) {
      latitude
      longitude
    }
  }
`;
export const GetStatesByCountryId = gql`
  query GetStatesByCountryId($countryId: ID!) {
    getStatesByCountryId(countryId: $countryId) {
      id
      stateName
      countryId
    }
  }
`;
