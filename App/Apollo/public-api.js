import { ApolloClient, createHttpLink, gql } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import globalCache from './cache'

/**
 * need fetch as we are not in a browser
 */
 import fetch from 'cross-fetch';


/** buyer id for public checkout */
const BUYER_ID = "00000000-0000-0000-0000-000000000000"

/**
 * base and url path can change for production and development
 */
const BASE_GQL_URL = ''
const URL_PATH_PART = '/somepath/graphql'


/**
 * headers for the public api
 */
const pubLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    }
});

/**
 * gql endpoint
 */
 let endpoint = 'http://ec2-18-191-146-179.us-east-2.compute.amazonaws.com:8082/graphql'
const httpLink = createHttpLink({
    uri: endpoint, fetch: fetch,
});

/**
 * client for the public api and global cache
 */
export const pubClient = new ApolloClient({
    link: pubLink.concat(httpLink),
    cache: globalCache,
})

