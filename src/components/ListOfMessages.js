import React, { useState, useEffect } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { requestBase } from "../utils/constants";

SplashScreen.preventAutoHideAsync();
export const ListOfMessages = ({ conversationId }) => {
  
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndLoadMessages = async () => {
      try {
        const response = await fetch(requestBase + "/messages/" + conversationId + ".json");
        const messages = await response.json();
        setMessages(messages);
      } catch (error) {
        console.log("Error loading messages:", error);
      } finally {
        SplashScreen.hideAsync();
        setLoading(false);
      }
    };
  
    fetchAndLoadMessages();
  }, []);
  
  
  if(loading) {
    return <View><Text>Loading ... </Text></View>;
  } 

  const renderItem = ({ item }) => {
    return (
      <View
        style={[
          styles.text,
          item.type === "from" ? styles.textTo : styles.textFrom,
        ]}
      >
        <Text style={{}}>{item.text}</Text>
      </View>
    );
  };
  return (
    <View
      style={{
        paddingHorizontal: 20,
      }}
    >
      <FlatList
        data={messages.messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        inverted
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    backgroundColor: "#FAFAFA",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    fontSize: 14,
    padding: 10,
    maxWidth: "65%",
    marginVertical: 14,
  },
  textFrom: {
    borderTopLeftRadius: 20,
    alignSelf: "flex-end",
  },
  textTo: {
    borderTopRightRadius: 20,
    alignSelf: "flex-start",
  },
});