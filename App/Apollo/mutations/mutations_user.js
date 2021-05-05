import { gql } from '@apollo/client';

/** ================== User Management ================ */

/** buyer id for public checkout */
export const NEW_ID = "00000000-0000-0000-0000-000000000000"

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
 mutation RegisterUser($request: UserProfileRequest!) {
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
 mutation UpdateUserProfile($request: UserProfileRequest!) {
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
 mutation RegisterBuyer($request: BuyerProfileRequest!) {
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
 mutation UpdateBuyerProfile($request: BuyerProfileRequest!) {
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
 mutation CreateGuestBuyer($request: BuyerProfileRequest!) {
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
 mutation RegisterSeller($request:SellerProfileRequest!) {
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
 mutation UpdateSellerProfile($request: SellerProfileRequest!) {
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
 * 
 * enum AddressType {SHIPPING, BILLING, BUSINESS, RETURN, COLLECTION_POINT,UNDEFINED}
 */
    export const CREATE_ADDRESS = gql`
    mutation CreateAddress($request: AddressRequest!) {
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
    mutation UpdateAddress($request: AddressRequest!) {
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
 mutation CreatePaymentDetail($request:PaymentDetailRequest!) {
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
 mutation UpdatePaymentDetail($request: PaymentDetailRequest!) {
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
    mutation CreateNotification($request:NotificationRequest!) {
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
    mutation UpdateNotification($request: NotificationRequest!) {
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
 mutation CreatePreference($request:PreferenceRequest!) {
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
 mutation UpdatePreference($request: PreferenceRequest!) {
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
 mutation CreateShareInformation($request:ShareInformationRequest!) {
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
 mutation UpdateShareInformation($request: ShareInformationRequest!) {
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
 mutation CreateWishList($request:WishListRequest!) {
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
 mutation UpdateWishList($request: WishListRequest!) {
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
  mutation CreateBillingDetails($request:BillingDetailsRequest!) {
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
  mutation UpdateBillingDetails($request: BillingDetailsRequest!) {
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
 mutation CreateChat($request:ChatRequest!) {
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
 mutation UpdateChat($request: ChatRequest!) {
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
 mutation CreateChatMessage($request:ChatRequest!) {
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
 mutation UpdateChatMessage($request: ChatRequest!) {
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
 mutation CreateChatSubscriber($request:ChatSubscriberRequest!) {
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
 mutation UpdateChatSubscriber($request: ChatSubscriberRequest!) {
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
* input PointRequest{ x:Float  y:Float }
*/
export const CREATE_DELIVERY_ADDRESS_GEOCOORDINATE = gql`
  mutation CreateDeliveryAddressGeoCoordinate($request: DeliveryAddressGeoCoordinateRequest!) {
   createDeliveryAddressGeoCoordinate(request: $request) {
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
 deleteDeliveryAddressGeoCoordinate(addressId: $addressId)   
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
 mutation UpdateDeliveryAddressGeoCoordinate($request: DeliveryAddressToOnlineStoreRequest!) {
  updateDeliveryAddressGeoCoordinate(request:$request)  {
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
mutation CreateDeliveryAddressToOnlineStore($request: DeliveryAddressToOnlineStoreRequest!) {
  createDeliveryAddressToOnlineStore(request: $request)  {
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
 deleteDeliveryAddressToOnlineStore(addressId:$addressId)   
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
mutation UpdateDeliveryAddressToOnlineStore($request: DeliveryAddressGeoCoordinateRequest!) {
 updateDeliveryAddressToOnlineStore(request:$request) {
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
mutation CreateShippingDetail($request:ShippingDetailRequest!) {
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
mutation DeleteShippingDetail($shippingId: ID!)  {
 deleteShippingDetail(shippingId: $shippingId )  
 }
`;

/**
* @mutation updateShippingDetail
* schema  see @mutation createShippingDetail
* 
*/
export const UPDATE_SHIPPING_DETAIL = gql`
mutation UpdateShippingDetail($request: ShippingDetailRequest!) {
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
mutation CreateSellerToOnlineStore($request:SellerToOnlineStoreRequest!) {
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
mutation UpdateSellerToOnlineStore($request: SellerToOnlineStoreRequest!) {
 updateSellerToOnlineStore(request: $request) {
   sellerId
   storeId
  }
 }
`;


