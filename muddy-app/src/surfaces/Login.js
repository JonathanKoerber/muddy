import React, {useEffect, useState} from "react";
import { View, TextInput, Pressable, Text } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useDispatch } from "react-redux";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import {TOCKEN_KEY, LOGIN_URL_BASE, URL} from "../utils/constants";

export const Login = () => {
  const dispatch = useDispatch();
  const headerHeight = useHeaderHeight();
  const [username, onChangeUsername] = useState('');
  const [password, onChangePassword] = useState('');

// axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;  
  const login = async (username, password) => {
      console.log(LOGIN_URL_BASE, TOCKEN_KEY)
      const ping = async () => {
              try {
                  const response = await axios.get(URL + "post/");
                  console.log("ping")
                  console.log(response.data)
              } catch (err) {
                  console.log("ping error")
                  console.log(err);
              }
          };
            ping();
    try{
    const response = await axios.post(LOGIN_URL_BASE, { "password": password, "username": username});
    console.log("response")
    console.log(response.data)
    // dispatch({type: "login", payload: response.data});
    await SecureStore.setItemAsync(TOCKEN_KEY, response.data.token);
    }catch(e){
      console.log(e);
    }
    
  };
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: headerHeight }}>
      
      <View style={{}}>
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
        onPress={() => login(username, password)}
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