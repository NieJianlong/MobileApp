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

export const endPointClient = async (endpoint) => {
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
    uri: endpoint,
    fetch: fetch,
  });

  return new ApolloClient({
    cache: globalCache,
    link: concat(authMiddleware, httpLink),
  });
};

export const pubClient = async () => {
  let endpoint =
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
    uri: endpoint,
    fetch: fetch,
  });

  return new ApolloClient({
    cache: globalCache,
    link: concat(authMiddleware, httpLink),
  });
};
