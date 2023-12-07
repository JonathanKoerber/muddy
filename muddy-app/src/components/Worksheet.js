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
      // itter item and render question. 
      //   {
      //     'id': '1',
      //     'title': 'Worksheet 1',
      //     'description': 'This is the first worksheet',
      //     'questions': [
      //         {'questionId': '1', 'question': '1 + 1 = ?', 'answer': '2'},
      //         {'questionId': '2', 'question': '1 + 2 = ?', 'answer': '3'},
      //         {'questionId': '3', 'question': '1 + 3 = ?', 'answer': '4'},
      //         {'questionId': '4', 'question': '1 + 4 = ?', 'answer': '5'},
      //         {'questionId': '5', 'question': '1 + 5 = ?', 'answer': '6'},
      //     ]
      // },
      // item.question.map((quesiton)=>{

      // })
      >
        <View>
          <Text style={{ color: "#D8D8D8", fontSize: 12 }}>Create Wroksheet</Text>
        </View>
      </View>
  );
};