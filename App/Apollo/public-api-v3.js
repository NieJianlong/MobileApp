import {
  ApolloClient,
  createHttpLink,
  ApolloLink,
  concat,
} from '@apollo/client';
import globalCache from './cache';

/**
 * need fetch as we are not in a browser
 */
import fetch from 'cross-fetch';

/**
 *
 * @param {*} endpoint
 * @returns
 */
export const PUBLIC_CLIENT_ENDPOINT =
  'http://ec2-18-191-146-179.us-east-2.compute.amazonaws.com:8082/graphql';

const authMiddleware = new ApolloLink((operation, forward) => {
  // add headers
  operation.setContext({
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  return forward(operation);
});
const httpLink = createHttpLink({
  uri: PUBLIC_CLIENT_ENDPOINT,
  fetch: fetch,
});
export const endPointClient = async (endpoint) => {
  return new ApolloClient({
    cache: globalCache,
    link: concat(authMiddleware, httpLink),
  });
};

/**
 * client for the public api and global cache
 */
const pubClient = () => {
  return new ApolloClient({
    cache: globalCache,
    link: concat(authMiddleware, httpLink),
  });
};
export const client = pubClient();
