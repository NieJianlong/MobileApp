import { gql } from "@apollo/client";

/** ================== User Management ================ */
// scripts for processing schema data
// tr --delete '\n'  < temp.txt > temp2.txt
// tr -s \  <  temp2.txt

/**
 *  @query  userProfiles
 *
 * schema
 * userProfiles : [UserProfileResponse]
 * UserProfileResponse{userId:ID userName:String firstName:String lastName:String email:String
 * phoneNumber:String userType: UserType  createdAt:OffsetDateTime updatedAt:OffsetDateTime
 * geoLocation: String avatarUrl: String addresses:[AddressResponse]
 * chatMessages:[ChatMessageResponse] }
 *
 */
export const USER_PROFILES = gql`
  query UserProfiles {
    userProfiles {
      userId
    }
  }
`;

/**
 *  @query  userProfile
 *
 * schema
 * userProfile(userProfileId : ID!) : UserProfileResponse
 * see @query userProfiles
 */
export const FIND_USER_PROFILE = gql`
  query UserProfile($userProfileId: ID!) {
    userProfile(userProfileId: $userProfileId) {
      firstName
      lastName
      email
      phoneNumber
      userName
      userId
    }
  }
`;

/**
 *  @query  buyerProfiles
 *
 * schema
 * buyerProfiles : [BuyerProfileResponse]
 * BuyerProfileResponse{userId:ID buyerId:ID userName:String firstName:String lastName:String
 * email:String  phoneNumber:String userType: UserType createdAt:OffsetDateTime  updatedAt:OffsetDateTime
 * oneClickPurchaseOn:Boolean guestBuyer:Boolean geoLocation: String areaRegion:String languages:[String]
 * currencies:[String] avatarUrl: String applicationSettings: String salamiCreditAvailable: Int
 * addresses:[AddressResponse] paymentOptions:[PaymentDetailResponse] notifications:[NotificationResponse]
 *  preferences:[PreferenceResponse] wishLists:[WishListResponse] shareInformations:[ShareInformationResponse]
 * categoryPreferences:[String] productPreferences:[String]  sellerPreferences:[String]
 * billingDetails:BillingDetailsResponse}
 *
 */
export const BUYER_PROFILES = gql`
  query BuyerProfiles {
    buyerProfiles {
      buyerId
      userName
    }
  }
`;

/**
 *  @query  buyerProfile
 *
 * schema
 * buyerProfile(buyerId : ID!) : BuyerProfileResponse
 * see @query buyerProfiles
 */
export const FIND_BUYER_PROFILE = gql`
  query BuyerProfile($buyerId: ID!) {
    buyerProfile(buyerId: $buyerId) {
      firstName
      lastName
      email
      phoneNumber
      userName
      userId
    }
  }
`;

/**
 *  @query buyerProfileByUserId(userProfileId : ID!) : BuyerProfileResponse
 *
 * BuyerProfileResponse { userId:ID buyerId:ID userName:String firstName:String lastName:String email:String phoneNumber:String
 * userType: UserType createdAt:DateTime updatedAt:DateTime oneClickPurchaseOn:Boolean guestBuyer:Boolean geoLocation: String
 * areaRegion:String languages:[String] currencies:[String] applicationSettings: String paymentOptions:[PaymentDetailResponse]
 * notifications:[NotificationResponse] preferences:[PreferenceResponse] wishLists:[WishListResponse]
 * shareInformations:[ShareInformationResponse] categoryPreferences:[String] productPreferences:[String]
 * sellerPreferences:[String] billingDetails:BillingDetailsResponse refundSalamiCredit:Float bonusSalamiCredit:Float
 * bonusSalamiCreditExpire:DateTime}
 *
 */

export const BUYER_PROFILE_BY_USERID = gql`
  query BuyerProfileByUserId($userProfileId: ID!) {
    buyerProfileByUserId(userProfileId: $userProfileId) {
      buyerId
      firstName
      lastName
      email
      phoneNumber
      userName
      userId
    }
  }
`;

/**
 * @query  oneClickBuy
 *
 * schema
 * oneClickBuy(buyerId : ID!) : OneClickBuyResponse
 *
 *  OneClickBuyResponse{defaultAddress: AddressResponse defaultPaymentMethod: PaymentDetailResponse}
 */
export const FIND_ONE_CLICK_BUY = gql`
  query OneClickBuy($buyerId: ID!) {
    oneClickBuy(buyerId: $buyerId) {
      defaultAddress {
        addressId
        flat
        floor
        defaultAddress
        block
        building
        houseNumber
        streetAddress1
        streetAddress2
        streetAddress3
        townCity
        villageArea
        district
        provinceState
        country
        areaCode
        landMark
        pinCode
        addressType
        referenceId
        createdAt
        updatedAt
      }
      defaultPaymentMethod {
        paymentDetailId
        buyerId
        paymentType
        isDefaultPaymentType
        createdAt
        updatedAt
      }
    }
  }
`;

/**
 *  @query  sellerProfiles
 *
 * schema
 * sellerProfiles : [SellerProfileResponse]
 * SellerProfileResponse{sellerId:ID userName:String firstName:String lastName:String
 * email:String phoneNumber:String userType: UserType createdAt:OffsetDateTime
 * updatedAt:OffsetDateTime businessName:String geoLocation: String avatarUrl:String
 * brandName:String biography:String govCompanyId:String vstGstNumber:String usersRating:String
 * addresses:[AddressResponse]}
 *
 */
export const SELLER_PROFILES = gql`
  query sellerProfiles {
    sellerProfiles {
      sellerId
    }
  }
`;

/**
 *  @query  sellerProfile
 *
 * schema
 * sellerProfile(sellerId : ID!) : SellerProfileResponse
 * see @query sellerProfiles
 */
export const FIND_SELLER_PROFILE = gql`
  query SellerProfile($sellerId: ID!) {
    sellerProfile(sellerId: $sellerId) {
      sellerId
    }
  }
`;

/**
 *  @query  addresses
 *
 * schema
 * addresses : [AddressResponse]
 * AddressResponse{addressId:ID flat:String floor:String defaultAddress:Boolean block:String
 * building:String houseNumber:String streetAddress1:String streetAddress2:String
 * streetAddress3:String townCity:String villageArea:String district:String provinceState:String
 * country:String areaCode:String landMark:String pinCode:String addressType:AddressType
 * referenceId:ID billingDetails:BillingDetailsResponse createdAt:OffsetDateTime
 * updatedAt:OffsetDateTime}
 *
 */
export const ADDRESSES = gql`
  query Addresses {
    addresses {
      addressId
    }
  }
`;

/**
 * @query  addressById
 *
 * schema
 * addressById(addressId : ID!) : AddressResponse
 * see @query addresses
 */
export const FIND_ADDRESS_BY_ID = gql`
  query AddressById($addressId: ID!) {
    addressById(addressId: $addressId) {
      addressId
    }
  }
`;

/**
 * @query  getSellerAddressesById
 *
 * schema
 *  getSellerAddressesById(sellerId : ID!) : [AddressResponse]
 * see @query addresses
 */
export const FIND_SELLER_ADDRESS_BY_ID = gql`
  query GetSellerAddressesById($sellerId: ID!) {
    getSellerAddressesById(sellerId: $sellerId) {
      addressId
    }
  }
`;
/**
 * @query  getSellerDefaultAddressBySellerId
 *
 * schema
 *  getSellerDefaultAddressBySellerId(sellerId : ID!) : AddressResponse
 * see @query addresses
 */
export const FIND_SELLER_DEFAULT_ADDRESS_BY_ID = gql`
  query GetSellerDefaultAddressBySellerId($sellerId: ID!) {
    getSellerDefaultAddressBySellerId(sellerId: $sellerId) {
      addressId
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
      flat
      floor
      defaultAddress
      block
      building
      houseNumber
      streetAddress1
      streetAddress2
      streetAddress3
      townCity
      villageArea
      district
      provinceState
      country
      areaCode
      landMark
      pinCode
      addressType
      referenceId
      createdAt
      updatedAt
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
export const FIND_BUYER_ADDRESS_BY_ID_AND_TPYE = gql`
  query GetBuyerAddressByType($buyerId: ID!, $addressType: AddressType) {
    getBuyerAddressByType(buyerId: $buyerId, addressType: $addressType) {
      addressId
      flat
      floor
      defaultAddress
      block
      building
      houseNumber
      streetAddress1
      streetAddress2
      streetAddress3
      townCity
      villageArea
      district
      provinceState
      country
      areaCode
      landMark
      pinCode
      addressType
      referenceId
      createdAt
      updatedAt
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
      villageArea
      provinceState
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
      villageArea
      provinceState
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

/**
 *  @query  paymentDetails
 *
 * schema
 * paymentDetails : [PaymentDetailResponse]
 * PaymentDetailResponse{paymentDetailId:ID buyerId:ID paymentType:String isDefaultPaymentType:Boolean
 * paymentTypeDetails:String createdAt:OffsetDateTime updatedAt:OffsetDateTime}
 *
 */
export const PAYMENT_DETAILS = gql`
  query Addresses {
    paymentDetails {
      paymentDetailId
    }
  }
`;

/**
 * @query  paymentDetailById
 *
 * schema
 * paymentDetailById(paymentDetailId : ID!) : PaymentDetailResponse
 * see @query addresses
 */
export const FIND_PAYMENT_DETAIL_BY_ID = gql`
  query PaymentDetailById($paymentDetailId: ID!) {
    paymentDetailById(paymentDetailId: $paymentDetailId) {
      paymentDetailId
    }
  }
`;

/**
 *  @query  preferences
 *
 * schema
 * preferences : [PreferenceResponse]
 * PreferenceResponse{preferenceId:ID preferenceType:PreferenceType profileId:ID referenceId:ID
 * createdAt:OffsetDateTime updatedAt:OffsetDateTime}
 *
 */
export const PREFERENCES = gql`
  query Preferences {
    preferences {
      preferenceId
    }
  }
`;

/**
 * @query  preferenceById
 *
 * schema
 * preferenceById(preferenceId : ID!) : PreferenceResponse
 * see @query preferences
 */
export const FIND_PREFERENCE_BY_ID = gql`
  query PreferenceById($paymentDetailId: ID!) {
    preferenceById(preferenceId: $preferenceId) {
      preferenceId
    }
  }
`;

/**
 *  @query  shareInformations
 *
 * schema
 * shareInformations : [ShareInformationResponse]
 * ShareInformationResponse{shareInformationId:ID targetEmailAddress:String shareMessage:String
 * buyerId:ID productId:ID hashtags:[String] shareTitle:String productPageUrl:String
 * shareChannel:ShareChannel createdAt:OffsetDateTime updatedAt:OffsetDateTime}
 *
 */
export const SHAREINFORMATIONS = gql`
  query ShareInformations {
    shareInformations {
      shareInformationId
    }
  }
`;

/**
 * @query  shareInformationById
 *
 * schema
 * shareInformationById(shareInformationId : ID!) : ShareInformationResponse
 * see @query shareInformations
 */
export const FIND_SHAREINFORMATION_BY_ID = gql`
  query ShareInformationById($shareInformationId: ID!) {
    shareInformationById(shareInformationId: $shareInformationId) {
      shareInformationId
    }
  }
`;

/**
 *  @query  wishLists
 *
 * schema
 * wishLists : [WishListResponse]
 * WishListResponse{wishListId:ID profileId:ID productId:ID addedDateTime:OffsetDateTime
 * createdAt:OffsetDateTime updatedAt:OffsetDateTime}
 *
 */
export const WISHLISTS = gql`
  query WishLists {
    wishLists {
      wishListId
    }
  }
`;

/**
 * @query  wishListById
 *
 * schema
 * wishListById(wishListId : ID!) : WishListResponse
 * see @query wishLists
 */
export const FIND_WISHLIST_BY_ID = gql`
  query WishListById($wishListId: ID!) {
    wishListById(wishListId: $wishListId) {
      wishListId
    }
  }
`;

/**
 *  @query  notifications
 *
 * schema
 * notifications : [NotificationResponse]
 * NotificationResponse{notificationId:ID text:String notificationStatus:NotificationStatus buyerId:ID
 * dateTime:OffsetDateTime createdAt:OffsetDateTime updatedAt:OffsetDateTime}
 *
 */
export const NOTIFICATIONS = gql`
  query Notifications {
    notifications {
      notificationId
    }
  }
`;

/**
 * @query  notificationById
 *
 * schema
 * notificationById(notificationId : ID!) : NotificationResponse
 * see @query notifications
 */
export const FIND_NOTIFICATIONS_BY_ID = gql`
  query NotificationById($notificationId: ID!) {
    notificationById(notificationId: $notificationId) {
      notificationId
    }
  }
`;

/**
 *  @query  billingDetails
 *
 * schema
 * billingDetails : [BillingDetailsResponse]
 * BillingDetailsResponse{billingDetailsId:ID buyerId:ID firstName:String lastName:String
 * companyName:String email:String phoneNumber:String billingAddressId:ID taxCode:String
 * createdAt:OffsetDateTime updatedAt:OffsetDateTime}
 *
 */
export const BILLINGDETAILS = gql`
  query BillingDetails {
    billingDetails {
      billingDetailsId
    }
  }
`;

/**
 * @query  billingDetails
 *
 * schema
 * billingDetailsById(billingDetailsId : ID!) : BillingDetailsResponse
 * see @query notifications
 */
export const FIND_BILLINGDETAILS_BY_ID = gql`
  query BillingDetailsById($billingDetailsId: ID!) {
    billingDetailsById(billingDetailsId: $billingDetailsId) {
      billingDetailsId
    }
  }
`;

/**
 *  @query  chats
 *
 * schema
 * chats : [ChatResponse]
 * ChatResponse{chatId:ID productListingId:ID productName:String muteFlagForCustomer:Boolean
 * chatStatus:ChatStatus chatOpenPeriodStartDate:OffsetDateTime chatOpenPeriodEndDate:OffsetDateTime
 * messages:[ChatMessageResponse] buyerProfiles:[BuyerProfileResponse] createdAt:OffsetDateTime
 * updatedAt:OffsetDateTime}
 *
 */
export const CHATS = gql`
  query Chats {
    chats {
      chatId
    }
  }
`;

/**
 * @query  chatById
 *
 * schema
 * chatById(chatId : ID!) : ChatResponse
 * see @query chats
 */
export const FIND_CHAT_BY_ID = gql`
  query ChatById($chatId: ID!) {
    chatById(chatId: $chatId) {
      chatId
    }
  }
`;

/**
 *  @query  chatMessages
 *
 * schema
 * chatMessages : [ChatMessageResponse]
 * NotificationResponse{chatMessageId:ID chatId:ID postedBy:String msgText:String
 * createdAt:OffsetDateTime updatedAt:OffsetDateTime}
 *
 */
export const CHAT_MESSAGES = gql`
  query ChatMessages {
    chatMessages {
      chatMessageId
    }
  }
`;

/**
 * @query  chatMessageById
 *
 * schema
 * chatMessageById(chatMessageId : ID!) : ChatMessageResponse
 * see @query chatMessages
 */
export const FIND_CHAT_MESSAGE_BY_ID = gql`
  query ChatMessageById($chatMessageId: ID!) {
    chatMessageById(chatMessageId: $chatMessageId) {
      chatMessageId
    }
  }
`;

/**
 *  @query  chatSubscribers
 *
 * schema
 * chatSubscribers : [ChatSubscriberResponse]
 * ChatSubscriberResponse{buyerId:ID chatId:ID createdAt:OffsetDateTime updatedAt:OffsetDateTime}
 *
 */
export const CHAT_SUBSCRIBERS = gql`
  query ChatSubscribers {
    chatSubscribers {
      buyerId
      chatId
    }
  }
`;

/**
 * @query  chatSubscriberById
 *
 * schema
 * chatSubscriberById(buyerId : ID!, chatId: ID!) : ChatSubscriberResponse
 * see @query chatSubscribers
 */
export const FIND_CHAT_SUBSCRIBER_BY_ID = gql`
  query ChatSubscriberById($buyerId: ID!, $chatId: ID!) {
    chatSubscriberById(buyerId: $buyerId, chatId: $chatId) {
      buyerId
      chatId
    }
  }
`;

/**
 *  @query  deliveryAddressGeoCoordinates
 *
 * schema
 * deliveryAddressGeoCoordinates : [DeliveryAddressGeoCoordinateResponse]
 * DeliveryAddressGeoCoordinateResponse{addressId:ID coordinates:PointResponse}
 *
 */
export const DELIVERY_ADDRESS_GEOCOORDINATES = gql`
  query DeliveryAddressGeoCoordinates {
    deliveryAddressGeoCoordinates {
      addressId
    }
  }
`;

/**
 * @query  deliveryAddressGeoCoordinateById
 *
 * schema
 * deliveryAddressGeoCoordinateById(addressId : ID!) : DeliveryAddressGeoCoordinateResponse
 * see @query deliveryAddressGeoCoordinates
 */
export const FIND_DELIVERY_ADDRESS_GEOCOORDINATE_BY_ID = gql`
  query DeliveryAddressGeoCoordinateById($addressId: ID!) {
    deliveryAddressGeoCoordinateById(addressId: $addressId) {
      addressId
    }
  }
`;

/**
 *  @query  deliveryAddressToOnlineStores
 *
 * schema
 * deliveryAddressToOnlineStores : [DeliveryAddressToOnlineStoreResponse]
 * DeliveryAddressToOnlineStoreResponse{addressId:ID storeId:ID}
 *
 */
export const DELIVERY_ADDRESS_TO_ONLINE_STORES = gql`
  query DeliveryAddressToOnlineStores {
    deliveryAddressesByOnlineStores {
      addressId
      storeId
    }
  }
`;

/**
 * @query  deliveryAddressToOnlineStoreById
 *
 * schema
 * deliveryAddressToOnlineStoreById(addressId : ID!, storeId : ID!) : DeliveryAddressToOnlineStoreResponse
 * see @query deliveryAddressToOnlineStores
 */
export const FIND_DELIVERY_ADDRESS_TO_ONLINE_STORE_BY_ID = gql`
  query DeliveryAddressToOnlineStoreById($addressId: ID!, $storeId: ID) {
    deliveryAddressToOnlineStoreById(addressId: $addressId, storeId: $storeId) {
      addressId
      storeId
    }
  }
`;

/**
 *  @query  sellerToOnlineStores
 *
 * schema
 * sellerToOnlineStores : [SellerToOnlineStoreResponse]
 * SellerToOnlineStoreResponse{sellerId:ID storeId:ID}
 *
 */
export const SELLER_TO_ONLINE_STORES = gql`
  query SellerToOnlineStores {
    sellerToOnlineStores {
      sellerId
      storeId
    }
  }
`;

/**
 * @query  sellerToOnlineStoreById
 *
 * schema
 * sellerToOnlineStoreById(sellerId : ID!, storeId : ID!) : SellerToOnlineStoreResponse
 * see @query sellerToOnlineStores
 */
export const FIND_SELLER_TO_ONLINE_STORE_BY_ID = gql`
  query SellerToOnlineStoreById($sellerId: ID!, $storeId: ID) {
    sellerToOnlineStoreById(sellerId: $sellerId, storeId: $storeId) {
      sellerId
      storeId
    }
  }
`;

/**
 *  @query  shippingDetails
 *
 * schema
 * shippingDetails : [ShippingDetailResponse]
 * ShippingDetailResponse{shippingId:ID orderId:ID shippingAddressId:ID carrier:String
 * carrierUrl:String trackingNum:String deliveryDate:OffsetDateTime shippingInstructions:String
 * shippingStatus:ShippingStatus shippingMethod:ShippingMethod failedDeliveryReason:String
 * shippingDate:OffsetDateTime expectedDeliveryDate:OffsetDateTime createdAt:OffsetDateTime
 * updatedAt:OffsetDateTime}
 *
 */
export const SHIPPINGDETAILS = gql`
  query ShippingDetails {
    shippingDetails {
      shippingId
    }
  }
`;

/**
 * @query  shippingDetailById
 *
 * schema
 * shippingDetailById(shippingId : ID!) : ShippingDetailResponse
 * see @query shippingDetails
 */
export const SHIPPING_DETAIL_BY_ID = gql`
  query ShippingDetailById($shippingId: ID!) {
    shippingDetailById(shippingId: $shippingId) {
      shippingId
    }
  }
`;

/**
 * @query  paymentDetailsByBuyerId
 *
 * schema
 * paymentDetailsByBuyerId(buyerId : ID!) : PaymentDetailResponse
 *
 */
export const PAYMENT_METHODS_BY_ID = gql`
  query PaymentDetailsByBuyerId($buyerId: ID!) {
    paymentDetailsByBuyerId(buyerId: $buyerId) {
      paymentDetailId
      buyerId
      paymentType
      isDefaultPaymentType
      createdAt
      updatedAt
    }
  }
`;

/**
 *  @query  billingDetailsByBuyerId
 *
 * schema
 * billingDetailsByBuyerId : [BillingDetailsResponse]
 * PaymentDetailResponse{paymentDetailId:ID buyerId:ID paymentType:String isDefaultPaymentType:Boolean
 * paymentTypeDetails:ID createdAt:DateTime updatedAt:DateTime }
 *
 */
export const BILLING_DETAIL_BY_BUYERID = gql`
  query BillingDetailsByBuyerId($buyerId: ID!) {
    billingDetailsByBuyerId(buyerId: $buyerId) {
      billingDetailsId
    }
  }
`;
