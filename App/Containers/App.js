import React from "react";
import RootContainer from "./Root";
/**
 * we are using apollo for gql and state
 * see https://www.apollographql.com/docs/react/api/react/hooks/
 */
import { ApolloProvider } from "@apollo/client";
/** pubClient is gql client for public api and is also the global cache */
import { client } from "../Apollo/apolloClient";
import { addPlugin } from "react-native-flipper";
if (__DEV__ || true) {
  const mammals = [
    {
      id: "Polar Bear",
      title: "Polar Bear",
      url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Ursus_maritimus_4_1996-08-04.jpg/190px-Ursus_maritimus_4_1996-08-04.jpg",
    },
    {
      id: "Sea Otter",
      title: "Sea Otter",
      url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Sea_otter_cropped.jpg/220px-Sea_otter_cropped.jpg",
    },
    {
      id: "West Indian Manatee",
      title: "West Indian Manatee",
      url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/FL_fig04.jpg/230px-FL_fig04.jpg",
    },
    {
      id: "Bottlenose Dolphin",
      title: "Bottlenose Dolphin",
      url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Tursiops_truncatus_01.jpg/220px-Tursiops_truncatus_01.jpg",
    },
  ];
  // minimal plugin that connects to sea-mammals plugin
  addPlugin({
    getId() {
      return "async-storage";
    },
    onConnect(connection) {
      // mammals.forEach((m) => {
      //   connection.send("newRow", m);
      // });
    },
    onDisconnect() {},
  });
}

const App = () => (
  <ApolloProvider client={client}>
    <RootContainer />
  </ApolloProvider>
);

export default App;
