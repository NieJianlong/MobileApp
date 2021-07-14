import { gql } from "@apollo/client";
/**
 * @mutation savePreferredCategories
 * schema  see @mutation savePreferredCategories
 *
 */
export const SAVE_PREFERRED_CATEGORIES = gql`
  mutation SavePreferredCategories($buyerId: ID!, $categories: [ID]) {
    savePreferredCategories(buyerId: $buyerId, categories: $categories)
  }
`;
