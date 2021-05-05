import { ApolloClient, createHttpLink, ApolloLink, concat } from '@apollo/client';
import globalCache from './cache'

/**
 * need fetch as we are not in a browser
 */
 import fetch from 'cross-fetch';

export const endPointClient = async (endpoint) => {
    const authMiddleware = new ApolloLink((operation, forward) => {

        // add headers
        operation.setContext({
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });

        return forward(operation);
    });

    const httpLink = createHttpLink({
        uri: endpoint, fetch: fetch,
    });

    return new ApolloClient({
        cache: globalCache,
        link: concat(authMiddleware, httpLink),
    });
}
 