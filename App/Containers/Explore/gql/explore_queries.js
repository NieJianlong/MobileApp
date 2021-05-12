import { gql } from '@apollo/client';

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
     query GetGuestBuyerAddressesById($buyerId: ID!)  {
      getGuestBuyerAddressesById(buyerId: $buyerId)  {
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
    query GetBuyerAddressesById($buyerId: ID!)  {
      getBuyerAddressesById(buyerId: $buyerId)  {
            addressId
      }
    }
    `;