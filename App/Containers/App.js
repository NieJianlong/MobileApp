import React, { useEffect } from "react";
import RootContainer from "./Root";
/**
 * we are using apollo for gql and state
 * see https://www.apollographql.com/docs/react/api/react/hooks/
 */
import { ApolloProvider } from "@apollo/client";
/** pubClient is gql client for public api and is also the global cache */
import * as SplashScreen from "expo-splash-screen";
import Realm from "realm";
import { RealmConnector } from "../db/connector";
import { client } from "../Apollo/apolloClient";
const realm = await Realm.open(RealmConnector);

/// ReactNativeFlipperDatabases - START

if (__DEV__) {
  // Import connectDatabases function and required DBDrivers
  const {
    connectDatabases,
    RealmDB,
  } = require("react-native-flipper-databases");

  connectDatabases([
    new RealmDB("mobile.realm", realm), // Pass in a realm name and an open realm reference
  ]);
}

const App = () => {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <ApolloProvider client={client}>
      <RootContainer />
      {/* <View /> */}
    </ApolloProvider>
  );
};

export default App;
