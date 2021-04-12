import React, { Component } from 'react'
import RootContainer from './Root'
/**
 * we are using apollo for gql and state
 * see https://www.apollographql.com/docs/react/api/react/hooks/
 */
import { ApolloProvider } from '@apollo/client';
/** pubClient is gql client for public api and is also the global cache */
import { pubClient } from '../Apollo/public-api'

class App extends Component {

    render() {
        return (
            <ApolloProvider client={pubClient}>
                <RootContainer />
            </ApolloProvider>

        )
    }
}

export default App