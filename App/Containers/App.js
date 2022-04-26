import React, { useEffect } from "react";
import RootContainer from "./Root";
import { ApolloProvider } from "@apollo/client";

import { client } from "../Apollo/apolloClient";
import FlipperAsyncStorage from "rn-flipper-async-storage-advanced";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { enableFlipperApolloDevtools } from "react-native-flipper-apollo-devtools";

// Instruct SplashScreen not to hide yet, we want to do this manually
// SplashScreen.preventAutoHideAsync().catch(() => {
//   /* reloading the app might trigger some race conditions, ignore them */
// });
/// ReactNativeFlipperDatabases - START

const App = () => {
  useEffect(() => {}, []);

  // const realm = useRealm();
  // useEffect(() => {
  //   if (__DEV__) {
  //     // Import connectDatabases function and required DBDrivers
  //     const {
  //       connectDatabases,
  //       RealmDB,
  //     } = require("react-native-flipper-databases");

  //     connectDatabases([
  //       new RealmDB("Realm", realm), // Pass in a realm name and an open realm reference
  //     ]);
  //   }
  // }, [realm]);
  // useEffect(() => {
  //   async function openRealm() {
  //     // Since this is a non-sync realm (there is no "sync" field defined in the "config" object),
  //     // the realm will be opened synchronously when calling "Realm.open"
  //     const realm = await Realm.open(RealmConnector);

  //     /// FlipperDatabasesPlugin - START

  //     if (__DEV__) {
  //       // Import connectDatabases function and required DBDrivers
  //       const {
  //         connectDatabases,
  //         RealmDB,
  //       } = require("react-native-flipper-databases");

  //       connectDatabases([
  //         new RealmDB("Realm", realm), // Pass in realm reference
  //       ]);
  //     }

  //     /// FlipperDatabasesPlugin - END
  //   }

  //   openRealm();

  //   // Return a cleanup callback to close the realm to prevent memory leaks
  // }, []);
  enableFlipperApolloDevtools(client);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ApolloProvider client={client}>
        <FlipperAsyncStorage />
        <RootContainer />
        {/* <View /> */}
      </ApolloProvider>
    </GestureHandlerRootView>
  );
};

export default App;
