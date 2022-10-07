import React, { useEffect, useState } from "react";
import RootContainer from "./Root";
import { ApolloProvider } from "@apollo/client";
import * as SplashScreen from "expo-splash-screen";
import { client } from "../Apollo/apolloClient";
import FlipperAsyncStorage from "rn-flipper-async-storage-advanced";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { enableFlipperApolloDevtools } from "react-native-flipper-apollo-devtools";
import { StatusBar } from "expo-status-bar";
import useStatusBar from "../hooks/useStatusBar";
import { Provider as PaperProvider } from "react-native-paper";
import * as Sentry from "@sentry/react-native";
import * as Updates from "expo-updates";
import useAlert from "../hooks/useAlert";
import useActionAlert from "../hooks/useActionAlert";
import useLoading from "../hooks/useLoading";
import colors from "../Themes/Colors";
import mainStore from "../mobx/mainStore";
import { observer, Provider } from "mobx-react";
import { spy } from "mobx";
import { createMobxDebugger } from "mobx-flipper";
if (__DEV__) {
  spy(createMobxDebugger(mainStore));
  Sentry.init({
    dsn: "https://f78da4265e8748798f55bb5aa00757e6@o1285889.ingest.sentry.io/6500559",
    environment: "dev",
  });
} else {
  Sentry.init({
    dsn: "https://f78da4265e8748798f55bb5aa00757e6@o1285889.ingest.sentry.io/6500559",
    environment: Updates.releaseChannel,
  });
}

const App = () => {
  const { hidden, color, setStatusBar } = useStatusBar();
  const { setAlert } = useActionAlert();
  const { setAlert: setToast } = useAlert();
  const { setLoading } = useLoading();
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const update = await Updates.checkForUpdateAsync();

        if (update.isAvailable) {
          setAlert({
            title: "Update Available!",
            content:
              "You need to update this app. The version you are using does not include the latest security features.",
            buttons: [
              {
                title: "Get Latest Update",
                onPress: async () => {
                  try {
                    setLoading({ show: true });
                    await Updates.fetchUpdateAsync();
                    setLoading({ show: false });
                    setToast({
                      color: colors.success,
                      title: "Update successful!",
                      visible: true,
                      onDismiss: () => {
                        setAlert({ visible: false });
                      },
                    });

                    setTimeout(async () => {
                      await Updates.reloadAsync();
                    }, 2500);
                  } catch (error) {
                    setToast({
                      color: colors.success,
                      title: "Unable to update.",
                      visible: true,
                      onDismiss: () => {
                        setAlert({ visible: false });
                      },
                    });
                  }

                  // // NOTIFY USER HERE
                },
              },
            ],
            show: true,
          });
        }
      } catch (e) {
        console.log("====================================");
        console.log(e);
        console.log("====================================");
        // HANDLE ERROR HERE
      }
    };
    // setInterval(() => {
    //   fetchData();
    // }, 60 * 1000);
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
      <Provider {...mainStore}>
        <ApolloProvider client={client}>
          <PaperProvider>
            <FlipperAsyncStorage />
            {/* <FlipperTicTacToe /> */}
            <StatusBar
              hidden={hidden}
              backgroundColor={color}
              translucent={true}
            />
            <RootContainer />
          </PaperProvider>
        </ApolloProvider>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default Sentry.wrap(App);
