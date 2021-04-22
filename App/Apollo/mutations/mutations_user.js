import { gql } from '@apollo/client';

/** ================== User Management ================ */

/**
 *  @mutation registerUser
 *  schema
 *  registerUser(request: UserProfileRequest!): UserProfileResponse
 * 
 *  UserProfileRequest{ userId:ID buyerId:ID userName:String! password:StringfirstName:String
    lastName:String email:String! phoneNumber:String userType: UserType geoLocation: String 
    vatarUrl: String }
 *
 *  UserProfileResponse{userId:ID userName:String firstName:String lastName:String email:String
    phoneNumber:String userType: UserType createdAt:OffsetDateTime updatedAt:OffsetDateTime
    geoLocation: String avatarUrl: String addresses:[AddressResponse] 
    chatMessages:[ChatMessageResponse] }
 * 
 *  enum UserType {
    ADMIN, BUYER, SELLER, BUYER_SELLER, UNDEFINED, GUEST_USER, RETAIL_BUYER, COMPANY_BUYER }

 *  note javascript implements gql AST ID type as type String
 *  see @NEW_ENTITY_ID for possible default ID values
 */
export const REGISTER_USER = gql`
 mutation RegisterUser($request: UserProfileRequestInput!) {
   registerUser(request: $request) {
    userId
   }
  }
`;

/**
 * @mutation deleteUserProfile
 * schema  see @mutation registerUser
 * 
 */
export const DELETE_USER_PROFILE = gql`
 mutation DeleteUserProfile($userProfileId: ID!) {
  deleteUserProfile(userProfileId: $userProfileId)  
  }
`;

/**
 * @mutation updateUserProfile
 * schema  see @mutation registerUser
 * 
 */
export const UPDATE_USER_PROFILE = gql`
 mutation UpdateUserProfile($request: UserProfileRequestInput!) {
  updateUserProfile(request: $request) {
    userId
   }
  }
`;



/**
 *  @mutation registerBuyer
 *  schema
 *  registerBuyer(request: BuyerProfileRequest!) : BuyerProfileResponse
 * 
 *  BuyerProfileRequest{userId:ID buyerId:ID password:String userName:String firstName:String
 *  lastName:String email:String phoneNumber:String userType: UserType oneClickPurchaseOn:Boolean
 *  guestBuyer:Boolean geoLocation: String areaRegion:String languages:[String] currencies:[String]
 *  avatarUrl: String applicationSettings: String salamiCreditAvailable: Int categoryPreferences:[String]
 *  productPreferences:[String] sellerPreferences:[String]}
 *
 *  BuyerProfileResponse{userId:ID buyerId:ID firstName:String lastName:String email:String
 *  phoneNumber:String userType: UserType createdAt:OffsetDateTime updatedAt:OffsetDateTime
 *  oneClickPurchaseOn:Boolean guestBuyer:Boolean geoLocation: areaRegion:String
 *  languages:[String] currencies:[String] avatarUrl: String applicationSettings: String
 *  salamiCreditAvailable: Int addresses:[AddressResponse] paymentOptions:[PaymentDetailResponse]
 *  notifications:[NotificationResponse] preferences:[PreferenceResponse] wishLists:[WishListResponse]
 *  shareInformations:[ShareInformationResponse] categoryPreferences:[String] productPreferences:[String]
 *  sellerPreferences:[String] billingDetails:BillingDetailsResponse }
 * 
 *  note javascript implements gql AST ID type as type String
 *  see @NEW_ENTITY_ID for possible default ID values
 */
export const REGISTER_BUYER = gql`
 mutation RegisterBuyer($request: BuyerProfileRequestInput!) {
  registerBuyer(request: $request) {
    userId
    buyerId
   }
  }
`;

/**
 * @mutation deleteBuyerProfile
 * schema  see @mutation registerBuyer
 * 
 */
export const DELETE_BUYER_PROFILE = gql`
 mutation DeleteBuyerProfile($userProfileId: ID!) {
  deleteBuyerProfile(userProfileId: $userProfileId)  
  }
`;

/**
 * @mutation updateUserProfile
 * schema  see @mutation registerBuyer
 * 
 */
export const UPDATE_BUYER_PROFILE = gql`
 mutation UpdateBuyerProfile($request: BuyerProfileRequestInput!) {
  updateBuyerProfile(request: $request) {
    userId
    buyerId
   }
  }
`;

/**
 * @mutation createGuestBuyer
 * schema  see @mutation registerBuyer
 * 
 */
export const CREATE_GUEST_BUYER = gql`
 mutation CreateGuestBuyer($request: BuyerProfileRequestInput!) {
  createGuestBuyer(request: $request) {
    userId
    buyerId
   }
  }
`;


/**
 *  @mutation registerSeller
 *  schema
 *  registerSeller(request: SellerProfileRequest!) : SellerProfileResponse
 * 
 *  SellerProfileRequest{userId:ID sellerId:ID userName:String password:String firstName:String
 *  lastName:String email:String phoneNumber:String userType: UserType businessName:String
 *  geoLocation: String avatarUrl: String brandName:String biography:String  govCompanyId:String
 *  vstGstNumber:String usersRating:Float }
 *
 *  SellerProfileResponse{userId:ID sellerId:ID userName:String firstName:String lastName:String
 *  email:String phoneNumber:String userType: UserType createdAt:OffsetDateTime updatedAt:OffsetDateTime
 *  businessName:String geoLocation: String avatarUrl:String brandName:String biography:String
 *  govCompanyId:String vstGstNumber:String usersRating:String addresses:[AddressResponse] }
 * 
 *  note javascript implements gql AST ID type as type String
 *  see @NEW_ENTITY_ID for possible default ID values
 */
export const REGISTER_SELLER = gql`
 mutation RegisterSeller($request:SellerProfileRequestInput!) {
  registerSeller(request: $request) {
    userId
    sellerId
   }
  }
`;

/**
 * @mutation deleteSellerProfile
 * schema  see @mutation registerSeller
 * 
 */
export const DELETE_SELLER_PROFILE = gql`
 mutation DeleteSellerProfile($userProfileId: ID!) {
  deleteSellerProfile(userProfileId: $userProfileId)  
  }
`;

/**
 * @mutation updateSellerProfile
 * schema  see @mutation registerSeller
 * 
 */
export const UPDATE_SELLER_PROFILE = gql`
 mutation UpdateSellerProfile($request: SellerProfileRequestInput!) {
  updateSellerProfile(request: $request) {
    userId
    buyerId
   }
  }
`;


/**
 * @mutation createAddress
 * 
 * schema
 * AddressRequest
 *  AddressRequest{ addressId:ID, flat:String, floor:String, defaultAddress:Boolean
    block:String, building:String, houseNumber:String, streetAddress1:String
    streetAddress2:String, streetAddress3:String, townCity:String, villageArea:String
    district:String, provinceState:String, country:String, areaCode:String, landMark:String
    pinCode:String, addressType:AddressType, referenceId:String}
 *
 * AddressResponse {addressId:ID flat:String floor:String defaultAddress:Boolean block:String 
 * building:String houseNumber:String streetAddress1:String streetAddress2:String streetAddress3:String
 * townCity:String villageArea:String district:String provinceState:String country:String areaCode:String
 * landMark:String pinCode:String addressType:AddressType referenceId:ID billingDetails:BillingDetailsResponse
 * createdAt:OffsetDateTime updatedAt:OffsetDateTime }
 */
export const CREATE_ADDRESS = gql`
    mutation CreateAddress($request: AddressRequestInput!) {
     createAddress(request: $request) {
       addressId
      }
     }
   `;

/**
 * @mutation updateAddress
 * schema  see @mutation createAddress
 * 
 */
export const UPDATE_ADDRESS = gql`
    mutation UpdateAddress($request: AddressRequestInput!) {
      updateAddress(request: $request) {
       addressId
      }
     }
   `;

/**
 * @mutation deleteAddress
 * schema  see @mutation createAddress
 * 
 */
export const DELETE_ADDRESS = gql`
    mutation DeleteAddress($addressId: String!) {
      deleteAddress(addressId: $addressId)  
     }
   `;

/**
 * @mutation createPaymentDetail
 *  schema
 * PaymentDetailRequest{paymentDetailId:ID buyerId:ID paymentType:PaymentType 
 *  isDefaultPaymentType:Boolean paymentTypeDetails:String}
 */
export const CREATE_PAYMENT_DETAIL = gql`
 mutation CreatePaymentDetail($request:PaymentDetailRequestInput!) {
  createPaymentDetail(request: $request) {
    paymentDetailId
    buyerId
   }
  }
`;

/**
 * @mutation deletePaymentDetail
 * schema  see @mutation createPaymentDetail
 * 
 */
export const DELETE_PAYMENT_DETAIL = gql`
 mutation DeletePaymentDetail($paymentDetailId: ID!) {
  deletePaymentDetail(paymentDetailId: $paymentDetailId)  
  }
`;

/**
 * @mutation updatePaymentDetail
 * schema  see @mutation createPaymentDetail
 * 
 */
export const UPDATE_PAYMENT_DETAIL = gql`
 mutation UpdatePaymentDetail($request: PaymentDetailRequestInput!) {
  updatePaymentDetail(request: $request) {
    userId
    buyerId
   }
  }
`;


/**
 * @mutation createNotification
 *  schema
 * NotificationRequest{ notificationId:ID text:String notificationStatus:NotificationStatus
    buyerId:ID dateTime:OffsetDateTime }
 */
export const CREATE_NOTIFICATION = gql`
 mutation CreateNotification($request:NotificationRequestInput!) {
  createNotification(request: $request) {
    notificationId
    buyerId
   }
  }
`;

/**
 * @mutation deleteNotification
 * schema  see @mutation createNotification
 * 
 */
export const DELETE_NOTIFICATION = gql`
 mutation DeleteNotification($notificationId: ID!) {
  deleteNotification(notificationId: $notificationId)  
  }
`;

/**
 * @mutation updateNotification
 * schema  see @mutation createNotification
 * 
 */
export const UPDATE_NOTIFICATION = gql`
 mutation UpdateNotification($request: NotificationRequestInput!) {
  updateNotification(request: $request) {
    notificationId
    buyerId
   }
  }
`;


/**
 * @mutation createPreference
 *  schema
 * createPreference(request: PreferenceRequest!) : PreferenceResponse
 * PreferenceRequest{ preferenceId:ID  preferenceType:PreferenceType
 * profileId:ID referenceId:ID }
 */
export const CREATE_PREFERENCE = gql`
    mutation CreatePreference($request:PreferenceRequestInput!) {
      createPreference(request: $request) {
        preferenceId
        profileId
      }
     }
   `;

/**
 * @mutation deletePreference
 * schema  see @mutation createPreference
 * 
 */
export const DELETE_PREFERENCE = gql`
    mutation DeletePreference($notificationId: ID!) {
      deletePreference(notificationId: $notificationId)  
     }
   `;

/**
 * @mutation updatePreference
 * schema  see @mutation createPreference
 * 
 */
export const UPDATE_PREFERENCE = gql`
    mutation UpdatePreference($request: PreferenceRequestInput!) {
      updatePreference(request: $request) {
        preferenceId
        profileId
      }
     }
   `;





/**
 * @mutation createShareInformation
 *  schema
 * createShareInformation(request: ShareInformationRequest!) : ShareInformationResponse
 * ShareInformationRequest{ shareInformationId:ID  targetEmailAddress:String shareMessage:String
 * buyerId:ID productId:ID hashtags:[String] shareTitle:String productPageUrl:String 
 * shareChannel:ShareChannel }
 */
export const CREATE_SHARE_INFORMATION = gql`
    mutation CreateShareInformation($request:ShareInformationRequestInput!) {
      createShareInformation(request: $request) {
        shareInformationId
        buyerId
      }
     }
   `;

/**
 * @mutation deleteShareInformation
 * schema  see @mutation createShareInformation
 * 
 */
export const DELETE_SHARE_INFORMATION = gql`
    mutation DeleteShareInformation($shareInformationId: ID!) {
      deleteShareInformation(shareInformationId: $shareInformationId)  
     }
   `;

/**
 * @mutation updateShareInformation
 * schema  see @mutation createShareInformation
 * 
 */
export const UPDATE_SHARE_INFORMATION = gql`
    mutation UpdateShareInformation($request: ShareInformationRequestInput!) {
      updateShareInformation(request: $request) {
        shareInformationId
        buyerId
      }
     }
   `;

/**
 * @mutation createWishList
 *  schema
 *  createWishList(request: WishListRequest!) : WishListResponse
 *  WishListRequest{ wishListId:ID profileId:ID productId:ID addedDateTime:OffsetDateTime }
 */
export const CREATE_WISHLIST = gql`
 mutation CreateWishList($request:WishListRequestInput!) {
   createWishList(request: $request) {
    wishListId
    profileId
   }
  }
`;

/**
 * @mutation deleteWishList
 * schema  see @mutation createWishList
 * 
 */
export const DELETE_WISHLIST = gql`
 mutation DeleteWishList($wishListId: ID!) {
  deleteWishList(wishListId: $wishListId)  
  }
`;

/**
 * @mutation updateWishList
 * schema  see @mutation createWishList
 * 
 */
export const UPDATE_WISHLIST = gql`
 mutation UpdateWishList($request: WishListRequestInput!) {
  updateWishList(request: $request) {
    wishListId
    profileId
   }
  }
`;

/**
 * @mutation createBillingDetails
 * schema  
 * BillingDetailsRequest{ billingDetailsId:ID buyerId:ID firstName:String lastName:String
 *  companyName:String email:String phoneNumber:String billingAddressId:ID taxCode:String }
 * 
 * BillingDetailsResponse { billingDetailsId:ID buyerId:ID firstName:String lastName:String
 *  companyName:String email:String phoneNumber:String billingAddressId:ID taxCode:String
 *  createdAt:OffsetDateTime updatedAt:OffsetDateTime}
 */
export const CREATE_BILLING_DETAILS = gql`
  mutation CreateBillingDetails($request:BillingDetailsRequestInput!) {
    createBillingDetails(request: $request) {
      billingDetailsId
      buyerId
    }
   }
 `;

/**
 * @mutation deleteBillingDetails
 * schema  see @mutation createBillingDetails
 * 
 */
export const DELETE_BILLING_DETAILS = gql`
  mutation DeleteBillingDetails($billingDetailsId: ID!) {
    deleteBillingDetails(billingDetailsId: $billingDetailsId)  
   }
 `;

/**
 * @mutation updateBillingDetails
 * schema  see @mutation createBillingDetails
 * 
 */
export const UPDATE_BILLING_DETAILS = gql`
  mutation UpdateBillingDetails($request: BillingDetailsRequestInput!) {
    updateBillingDetails(request: $request) {
      billingDetailsId
      buyerId
    }
   }
 `;


/**
 * @mutation createChat
 * schema  
 * eateChat(request: ChatRequest!) : ChatResponse
 * ChatRequest{ chatId:ID productListingId:ID  productName:String  muteFlagForCustomer:Boolean
 * chatStatus:ChatStatus chatOpenPeriodStartDate:OffsetDateTime chatOpenPeriodEndDate:OffsetDateTime}
 */
export const CREATE_CHAT = gql`
 mutation CreateChat($request:ChatRequestInput!) {
  createChat(request: $request) {
    chatId
    productListingId
   }
  }
`;

/**
 * @mutation deleteChat
 * schema  see @mutation createChat
 * 
 */
export const DELETE_CHAT = gql`
 mutation DeleteChat($chatId: ID!) {
  deleteChat(chatId: $chatId)  
  }
`;

/**
 * @mutation updateChat
 * schema  see @mutation createChat
 * 
 */
export const UPDATE_CHAT = gql`
 mutation UpdateChat($request: ChatRequestInput!) {
  updateChat(request: $request) {
    chatId
    productListingId
   }
  }
`;


/**
 * @mutation createChatMessage
 * schema  
 * createChatMessage(request: ChatMessageRequest!) : ChatMessageResponse
 * ChatMessageRequest{ chatId:ID productListingId:ID  productName:String  muteFlagForCustomer:Boolean
 * chatStatus:ChatStatus chatOpenPeriodStartDate:OffsetDateTime chatOpenPeriodEndDate:OffsetDateTime}
 */
export const CREATE_CHAT_MESSAGE = gql`
 mutation CreateChatMessage($request:ChatRequestInput!) {
  createChatMessage(request: $request) {
    chatId
    productListingId
   }
  }
`;

/**
 * @mutation deleteChatMessage
 * schema  see @mutation createChatMessage
 * 
 */
export const DELETE_CHAT_MESSAGE = gql`
 mutation DeleteChatMessage($chatMessageId: ID!) {
  deleteChatMessage(chatMessageId: $chatMessageId)  
  }
`;

/**
 * @mutation updateChatMessage
 * schema  see @mutation createChatMessage
 * 
 */
export const UPDATE_CHAT_MESSAGE = gql`
 mutation UpdateChatMessage($request: ChatRequestInput!) {
  updateChatMessage(request: $request) {
    chatMessageId
    chatId
   }
  }
`;


/**
 * @mutation createChatSubscriber
 * schema  
 * createChatSubscriber(request: ChatSubscriberRequest!) : ChatSubscriberResponse
 * ChatSubscriberRequest{ buyerId:ID!  chatId:ID!}
 */
export const CREATE_CHAT_SUBSCRIBER = gql`
 mutation CreateChatSubscriber($request:ChatSubscriberRequestInput!) {
  createChatSubscriber(request: $request) {
    buyerId
    chatId
   }
  }
`;

/**
 * @mutation deleteChatSubscriber
 * schema  see @mutation createChatSubscriber
 * 
 */
export const DELETE_CHAT_SUBSCRIBER = gql`
 mutation DeleteChatSubscriber($buyerId: ID!, $chatId: ID!) {
  deleteChatSubscriber(buyerId: $buyerId, chatId: $chatId)  
  }
`;

/**
 * @mutation updateChatSubscriber
 * schema  see @mutation createChatSubscriber
 * 
 */
export const UPDATE_CHAT_SUBSCRIBER = gql`
 mutation UpdateChatSubscriber($request: ChatSubscriberRequestInput!) {
  updateChatSubscriber(request: $request) {
    buyerId
    chatId
   }
  }
`;

/**
* @mutation createDeliveryAddressGeoCoordinate
* 
* schema
* DeliveryAddressGeoCoordinateRequest{ addressId:ID! coordinates:PointRequest }
* 
* DeliveryAddressGeoCoordinateResponse{addressId:ID! coordinates:PointResponse }
*/
export const CREATE_DELIVERY_ADDRESS_GEOCOORDINATE = gql`
  mutation CreateDeliveryAddressGeoCoordinate($addressId: String!) {
   createDeliveryAddressGeoCoordinate(request: DeliveryAddressGeoCoordinateRequest!) :DeliveryAddressGeoCoordinateResponse {
     addressId
     coordinates
  }
  
 }
 `;

/**
 * @mutation deleteDeliveryAddressGeoCoordinate
 * 
 * schema   see @mutation createDeliveryAddressGeoCoordinate
 * 
 */
export const DELETE_DELIVERY_ADDRESS_GEOCOORDINATE = gql`
  mutation DeleteDeliveryAddressGeoCoordinate($addressId: String!) {
   deleteDeliveryAddressGeoCoordinate(addressId: String!)   
 }
 `;

/**
 * @mutation updateDeliveryAddressGeoCoordinate
 * 
 * schema see @mutation createDeliveryAddressGeoCoordinate
 * 
 * 
 */
export const UPDATE_DELIVERY_ADDRESS_GEOCOORDINATE = gql`
  mutation UpdateDeliveryAddressGeoCoordinate($addressId: String!) {
   updateDeliveryAddressGeoCoordinate(request: DeliveryAddressToOnlineStoreRequest!) :DeliveryAddressGeoCoordinateResponse {
     addressId
     coordinates
  }
 }
 `;


/**
 * @mutation createDeliveryAddressToOnlineStore
 * 
 * schema
 * DeliveryAddressToOnlineStoreRequest{ addressId:ID! storeId:ID!}
 * 
 * DeliveryAddressToOnlineStoreResponse {addressId:ID! storeId:ID!}
 */
export const CREATE_DELIVERY_ADDRESS_TO_ONLINE_STORE = gql`
 mutation CreateDeliveryAddressToOnlineStore($addressId: String!) {
   createDeliveryAddressToOnlineStore(request: DeliveryAddressToOnlineStoreRequest!) :DeliveryAddressToOnlineStoreResponse {
    addressId
    storeId
 }
 
}
`;

/**
 * @mutation deleteDeliveryAddressToOnlineStore
 * 
 * schema   see @mutation createDeliveryAddressToOnlineStore
 * 
 * note confusing scalar response in mutation, fpr red hat looks like
 * {"data":{"deleteAddress":true}}
 * 
 */
export const DELETE_DELIVERY_ADDRESS_TO_ONLINE_STORE = gql`
 mutation DeleteDeliveryAddressToOnlineStore($addressId: String!) {
  deleteDeliveryAddressToOnlineStore(addressId: String!)   
}
`;

/**
 * @mutation updateDeliveryAddressToOnlineStore
 * 
 * schema see @mutation createDeliveryAddressToOnlineStore
 * 
 * 
 */
export const UPDATE_DELIVERY_ADDRESS_TO_ONLINE_STORE = gql`
 mutation UpdateDeliveryAddressToOnlineStore($addressId: String!) {
  updateDeliveryAddressToOnlineStore(request: DeliveryAddressToOnlineStoreRequest!) :DeliveryAddressToOnlineStoreResponse {
    addressId
    storeId
 }
 
}
`;

/**
 * @mutation createShippingDetail
 * schema  
 * 
 * ShippingDetailRequest{ shippingId:ID orderId:ID shippingAddressId:ID carrier:String
 * carrierUrl:String trackingNum:String deliveryDate:OffsetDateTime shippingInstructions:String
 * shippingStatus:ShippingStatus shippingMethod:ShippingMethod failedDeliveryReason:String
 * shippingDate:OffsetDateTime expectedDeliveryDate:OffsetDateTime }
 */
export const CREATE_SHIPPING_DETAIL = gql`
 mutation CreateShippingDetail($request:ShippingDetailRequestInput!) {
  createShippingDetail(request: $request) {
    shippingId
    orderId
   }
  }
`;

/**
 * @mutation deleteShippingDetail
 * schema  see @mutation createShippingDetail
 * 
 */
export const DELETE_SHIPPING_DETAIL = gql`
 mutation DeleteShippingDetail($shippingId: ID!  {
  deleteShippingDetail(shippingId: $shippingId )  
  }
`;

/**
 * @mutation updateShippingDetail
 * schema  see @mutation createShippingDetail
 * 
 */
export const UPDATE_SHIPPING_DETAIL = gql`
 mutation UpdateShippingDetail($request: ShippingDetailRequestInput!) {
  updateShippingDetail(request: $request) {
    shippingId
    orderId
   }
  }
`;


/**
 * @mutation createSellerToOnlineStore
 * schema  
 * createSellerToOnlineStore(request: SellerToOnlineStoreRequest!) :SellerToOnlineStoreResponse
 * 
 * SellerToOnlineStoreRequest{ shippingId:ID orderId:ID shippingAddressId:ID carrier:String
 * carrierUrl:String trackingNum:String deliveryDate:OffsetDateTime shippingInstructions:String
 * shippingStatus:ShippingStatus shippingMethod:ShippingMethod failedDeliveryReason:String
 * shippingDate:OffsetDateTime expectedDeliveryDate:OffsetDateTime }
 */
export const CREATE_SELLER_TO_ONLINE_STORE = gql`
 mutation CreateSellerToOnlineStore($request:SellerToOnlineStoreRequestInput!) {
  createSellerToOnlineStore(request: $request) {
    sellerId
    storeId
   }
  }
`;

/**
 * @mutation deleteSellerToOnlineStore
 * schema  see @mutation createSellerToOnlineStore
 * 
 */
export const DELETE_SELLER_TO_ONLINE_STORE = gql`
 mutation DeleteSellerToOnlineStore($sellerId: ID!, $storeId: ID!) {
  deleteSellerToOnlineStore(sellerId: $sellerId, storeId: $storeId )  
  }
`;

/**
 * @mutation updateSellerToOnlineStore
 * schema  see @mutation createSellerToOnlineStore
 * 
 */
export const UPDATE_SELLER_TO_ONLINE_STORE = gql`
 mutation UpdateSellerToOnlineStore($request: SellerToOnlineStoreRequestInput!) {
  updateSellerToOnlineStore(request: $request) {
    sellerId
    storeId
   }
  }
`;






