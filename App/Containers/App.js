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
import useRealm from "../hooks/useRealm";

/// ReactNativeFlipperDatabases - START

const App = () => {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);
  const realm = useRealm();
  useEffect(() => {
    if (__DEV__) {
      // Import connectDatabases function and required DBDrivers
      const {
        connectDatabases,
        RealmDB,
      } = require("react-native-flipper-databases");

      connectDatabases([
        new RealmDB("Realm", realm), // Pass in a realm name and an open realm reference
      ]);
    }
  }, [realm]);
  useEffect(() => {
    async function openRealm() {
      // Since this is a non-sync realm (there is no "sync" field defined in the "config" object),
      // the realm will be opened synchronously when calling "Realm.open"
      const realm = await Realm.open(RealmConnector);

      /// FlipperDatabasesPlugin - START

      if (__DEV__) {
        // Import connectDatabases function and required DBDrivers
        const {
          connectDatabases,
          RealmDB,
        } = require("react-native-flipper-databases");

        connectDatabases([
          new RealmDB("Realm", realm), // Pass in realm reference
        ]);
      }

      /// FlipperDatabasesPlugin - END
    }

    openRealm();

    // Return a cleanup callback to close the realm to prevent memory leaks
  }, []);
  return (
    <ApolloProvider client={client}>
      <RootContainer />
      {/* <View /> */}
    </ApolloProvider>
  );
};

export default App;
