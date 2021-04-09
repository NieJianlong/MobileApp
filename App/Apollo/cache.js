import { makeVar, gql } from '@apollo/client';
import { InMemoryCache } from '@apollo/client';


/**
 * there will be aditional logic required to handle email|phone choice
 * on user login
 */
const userProfile = {
  email: '',
  isAuth: false,
  phone: 0
}

export const userProfileVar = makeVar(userProfile);

export const GET_USER_PROFILE = gql`
  query getUserProfileVar {
    userProfileVar @client
  }
`
export default new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        userProfileVar: {
          read() {
            return userProfileVar();
          }
        }
      }
    }
  }
})
