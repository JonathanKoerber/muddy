import React from "react";
import { View, Text, Image, Pressable } from "react-native";

export const Worksheet = ({ item, navigation }) => {
console.log("Worksheet item", item);
  return (
      <View
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          flexDirection: "row",
        }}
      >
        <View>
          <Text style={{ color: "#D8D8D8", fontSize: 12 }}>Create Wroksheet</Text>
        </View>
      </View>
  );
};