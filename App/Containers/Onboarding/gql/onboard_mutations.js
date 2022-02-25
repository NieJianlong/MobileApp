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

/**
 * @mutation createGuestBuyer
 * schema  see @mutation registerBuyer
 *
 */
export const CREATE_GUEST_BUYER = gql`
  mutation CreateGuestBuyer($request: BuyerProfileRequestForCreate!) {
    createGuestBuyer(request: $request) {
      buyerId
    }
  }
`;
