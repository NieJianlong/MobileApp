import React, { useState, useCallback, useEffect } from "react";
import { View, SafeAreaView } from "react-native";
import ChatHeader from "./ChatHeader";
import colors from "../../Themes/Colors";

function Chat() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, []);

  // const onSend = useCallback((messages = []) => {
  //   setMessages((previousMessages) =>
  //     // GiftedChat.append(previousMessages, messages)
  //   );
  // }, []);

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ backgroundColor: "white" }}>
        <ChatHeader />
      </SafeAreaView>
      {/* <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
      /> */}
    </View>
  );
}
export default Chat;
