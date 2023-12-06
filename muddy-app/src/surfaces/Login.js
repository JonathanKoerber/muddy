import React, {useEffect, useState} from "react";
import { View, TextInput, Pressable, Text } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { login } from "../../reducers/userReducer"
import { useDispatch, useSelector } from "react-redux";
import { loginRequest, createPost } from "../services/djangoApi";
import {catchRejection} from "@reduxjs/toolkit/src/listenerMiddleware/utils";

export const Login = () => {
  const dispatch = useDispatch();
  const headerHeight = useHeaderHeight();
  const [username, onChangeUsername] = useState('betty');
  const [password, onChangePassword] = useState('password');
const post = () => {
createPost(
    "body A simple posted part two with not id")
}
  const handleLogin = async () => {
      console.log("########", "login", "login",  "########");
     await loginRequest(username, password).then(function (user){
         if(user !== undefined){
             console.log(user)
             dispatch(login(user));
         }
     });
  };

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: headerHeight }}>
      
      <View style={{paddingTop: 60}}>
        <View style={{ marginBottom: 30 }}>
          <TextInput
            style={{
              fontSize: 14,
              paddingVertical: 12,
              paddingLeft: 40,
              marginHorizontal: 17,
              borderRadius: 15,
              backgroundColor: "#ffffff",
              shadowColor: "#000000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 9,
              elevation: 3,
            }}
            onChangeText={onChangeUsername}
            value={username}
            placeholder='username'
          />
        </View>
        <View>
          <TextInput
            style={{
              fontSize: 14,
              paddingVertical: 12,
              paddingLeft: 40,
              marginHorizontal: 17,
              borderRadius: 15,
              backgroundColor: "#ffffff",
              shadowColor: "#000000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 9,
              elevation: 3,
            }}
            onChangeText={onChangePassword}
            value={password}
            placeholder='password'
          />
          <Ionicons
            name='eye-off-outline'
            size={24}
            color='#000000'
            style={{ position: "absolute", right: 28, top: 6 }}
          />
        </View>
      </View>
      <Pressable
        onPress={async () => await handleLogin()}
        style={{
          position: "absolute",
          bottom: 300,
          left: "43%",
        }}
      >

        <View
          style={{
            position: "absolute",
            backgroundColor: "#000000",
            padding: 30,
            top: -16,
            left: -15,
            borderRadius: 23,
            transform: [{ rotate: "-45deg" }],
            shadowColor: "#000000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
          }}
        />
        <Ionicons name='paper-plane-outline' color='#ffffff' size={26} />
        </Pressable>
    </SafeAreaView>
  );
};