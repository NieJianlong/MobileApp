import { gql } from "@apollo/client";

/**
 *  @mutation registerBuyer
 *  schema
 *  registerBuyer(request: BuyerProfileRequestForCreate!) : BuyerProfileResponse
 *
 *  BuyerProfileRequestForCreate{ password:String userName:String firstName:String lastName:String
 *  email:String phoneNumber:String userType: UserType oneClickPurchaseOn:Boolean guestBuyer:Boolean!
 *  geoLocation: String areaRegion:String languages:[String] currencies:[String]}
 *
 *  BuyerProfileResponse{userId:ID buyerId:ID userName:String firstName:String lastName:String
 *  email:String phoneNumber:String userType: UserType createdAt:DateTime updatedAt:DateTime
 *  oneClickPurchaseOn:Boolean guestBuyer:Boolean geoLocation: String areaRegion:String
 *  languages:[String] currencies:[String] applicationSettings: String
 *  paymentOptions:[PaymentDetailResponse] notifications:[NotificationResponse]
 *  preferences:[PreferenceResponse] wishLists:[WishListResponse]
 *  shareInformations:[ShareInformationResponse] categoryPreferences:[String]
 *  productPreferences:[String] sellerPreferences:[String] billingDetails:BillingDetailsResponse
 *  refundSalamiCredit:Float bonusSalamiCredit:Float bonusSalamiCreditExpire:DateTime }
 *
 *  enum AddressType { SHIPPING, BILLING, BUSINESS, RETURN, COLLECTION_POINT,UNDEFINED }
 */
export const REGISTER_BUYER = gql`
  mutation RegisterBuyer($request: BuyerProfileRequestForCreate!) {
    registerBuyer(request: $request) {
      buyerId
      userId
    }
  }
`;
export const SendVerifyEmail = gql`
  mutation SendVerifyEmail($userId: ID!) {
    sendVerifyEmail(userId: $userId)
  }
`;
