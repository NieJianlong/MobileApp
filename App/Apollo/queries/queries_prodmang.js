import { gql } from '@apollo/client';

/**
 * @query  productListingPagedAndSorted 
 * 
 * productListingPagedAndSorted(sortfield: String!, sortDirection: String!, pageNo: Int, pageSize: Int):[ProductListing]
 * 
 * ProductListing {id: ID! product: Product store: Store chat: Chat announcement: Announcement address: Address 
 * chatMuteFlag: Boolean wholeSalePrice: Float retailPrice: Float discount: Float numberOfItems: Int maxQuantityPerCart: Int 
 * closedDate: Date deliveryDate: Date createdAt: DateTime updatedAt: DateTime }
 * 
 * Product{id: ID! shortName: String longName: String description: String}
 * 
 */

 export const PRODUCT_LISTING_PAGED_AND_SORTED = gql`
 query ProductListingPagedAndSorted($sortfield: String!, $sortDirection: String!, $pageNo: Int!, $pageSize: Int!)  {
    productListingPagedAndSorted(sortfield: $sortfield, sortDirection: $sortDirection, pageNo: $pageNo, pageSize: $pageSize)  {
        id
        wholeSalePrice
   }
 }
 `;