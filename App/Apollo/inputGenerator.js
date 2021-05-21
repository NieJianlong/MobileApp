/**
 *
 * @param {input ProductListingInput{
    productId : String!
    storeId: String
    chatId: String
    announcementId: String
    addressId: String
    chatMuteFlag: Boolean
    numberOfItems: Int
    maxQuantityPerCart: Int
    wholeSalePrice: Float
    retailPrice: Float
     discount: Float
     closedDate: Date
     deliveryDate: Date
     createdAt: DateTime
     updatedAt: DateTime
      pickupFromSeller: Boolean
}
 */
export const generateProductListingInput = (data) => {
  let ProductListingInput = {
    productId: data.productId,
    storeId: data.storeId,
    chatId: data.chatId,
    announcementId: data.announcementId,
    addressId: data.addressId,
    chatMuteFlag: data.chatMuteFlag,
    numberOfItems: data.numberOfItems,
    maxQuantityPerCart: data.maxQuantityPerCart,
    wholeSalePrice: data.wholeSalePrice,
    retailPrice: data.retailPrice,
    discount: data.discount,
    closedDate: data.closedDate,
    deliveryDate: data.deliveryDate,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    pickupFromSeller: data.pickupFromSeller,
  };
};
