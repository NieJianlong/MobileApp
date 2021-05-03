import { ApolloClient, HttpLink, ApolloLink, InMemoryCache, concat } from '@apollo/client';
import { LOCAL_STORAGE_TOKEN_KEY, getLocalStorageValue } from '../mixins/local-storage'

const endpointDev = 'http://10.0.2.2:8080/graphql'


const httpLink = new HttpLink({ uri: endpointDev });

export const getPrivateClient = async()=> {

    const token = await getLocalStorageValue(LOCAL_STORAGE_TOKEN_KEY)
    const authMiddleware = new ApolloLink((operation, forward) => {

        // add the authorization to the headers
        operation.setContext({
          headers: {
            'Authorization': token ? `Bearer ${token}` : "",
          }
        });
      
        return forward(operation);
      })

      const client = new ApolloClient({
        cache: new InMemoryCache(),
        link: concat(authMiddleware, httpLink),
      });

      return client

}





