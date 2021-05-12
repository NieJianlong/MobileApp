import { ApolloClient, HttpLink, ApolloLink, InMemoryCache, concat } from '@apollo/client';
import { LOCAL_STORAGE_TOKEN_KEY, getLocalStorageValue } from '../Apollo/local-storage' 

/**
 * need fetch as we are not in a browser
 */
 import fetch from 'cross-fetch';

// const endpointDev = 'http://10.0.2.2:8080/graphql'

const endpointDev = 'http://ec2-18-191-146-179.us-east-2.compute.amazonaws.com:8082/graphql'

const httpLink = new HttpLink({ uri: endpointDev,fetch: fetch, });

export const getPrivateClient = async()=> {

    const token = await getLocalStorageValue(LOCAL_STORAGE_TOKEN_KEY)
    const authMiddleware = new ApolloLink((operation, forward) => {

        // add the authorization to the headers
        operation.setContext({
          headers: {
            'Authorization': token ? `Bearer ${token}` : "",
            'Content-Type': 'application/json',
            'Accept': 'application/json',
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

export const getPrivateTestClient = async(token)=> {

  // const token = await getLocalStorageValue(LOCAL_STORAGE_TOKEN_KEY)
  const authMiddleware = new ApolloLink((operation, forward) => {

      // add the authorization to the headers
      operation.setContext({
        headers: {
          'Authorization': token ? `Bearer ${token}` : "",
          'Content-Type': 'application/json',
          'Accept': 'application/json',
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





