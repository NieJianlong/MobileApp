import React, { useEffect, useState } from "react";
import RootContainer from "./Root";
import { ApolloProvider } from "@apollo/client";
import * as SplashScreen from "expo-splash-screen";
import { client } from "../Apollo/apolloClient";
import FlipperAsyncStorage from "rn-flipper-async-storage-advanced";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { enableFlipperApolloDevtools } from "react-native-flipper-apollo-devtools";
import MapScreen from "./MapScreen";
import { StatusBar } from "expo-status-bar";
import useStatusBar from "../hooks/useStatusBar";
import * as Sentry from "sentry-expo";

Sentry.init({
  dsn: "https://908e7b35c4824794aecc2e070deccf59@o1261296.ingest.sentry.io/6438866",
  enableInExpoDevelopment: true,
  debug: true, // Sentry will try to print out useful debugging information if something goes wrong with sending an event. Set this to `false` in production.
});
// Sentry.Native.nativeCrash();
// Instruct SplashScreen not to hide yet, we want to do this manually
// SplashScreen.preventAutoHideAsync().catch(() => {
//   /* reloading the app might trigger some race conditions, ignore them */
// });
/// ReactNativeFlipperDatabases - START

const App = () => {
  const { hidden, color, setStatusBar } = useStatusBar();
  useEffect(() => {
    async function prepare() {
      setStatusBar({ hidden: true, color: color });
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        // Pre-load fonts, make any API calls you need to do here
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setStatusBar({ hidden: false, color: "#CC0000" });
      }
    }

    prepare();
  }, []);

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
        <StatusBar hidden={hidden} backgroundColor={color} translucent={true} />
        <RootContainer />
      </ApolloProvider>
    </GestureHandlerRootView>
  );
};

export default App;
