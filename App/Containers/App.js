import React from "react";
import RootContainer from "./Root";
/**
 * we are using apollo for gql and state
 * see https://www.apollographql.com/docs/react/api/react/hooks/
 */
import { ApolloProvider } from "@apollo/client";
/** pubClient is gql client for public api and is also the global cache */
import { client } from "../Apollo/apolloClient";

const App = () => (
  <ApolloProvider client={client}>
    <RootContainer />
  </ApolloProvider>
);

export default App;
