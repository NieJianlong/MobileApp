import { gql } from '@apollo/client';

/**
 * @query  allProductListingsDTO 
 * 
 * allProductListingsDTO(sortfield: String!, sortDirection: String!, pageNo: Int, pageSize: Int):[ProductListingDTO]
 * 
 * ProductListingDTO { id: ID!  photo: String  productName: String  rating: Int numberOfReviews: Int  wholesalePrice: Float
 *  retailPrice: Float  percentOff: Int closedDate: Date  progressBarValue: Float }
 * 
 */

 export const ALL_PRODUCT_LISTINGS_DTO = gql`
 query AllProductListingsDTO($sortfield: String!, $sortDirection: String!, $pageNo: Int!, $pageSize: Int!)  {
  allProductListingsDTO(sortfield: $sortfield, sortDirection: $sortDirection, pageNo: $pageNo, pageSize: $pageSize)  {
        id
        wholesalePrice
   }
 }
 `;