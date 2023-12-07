import React, {useEffect, useState} from "react";
import { View, TextInput, Pressable, Text, Button } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { login } from "../../reducers/userReducer"
import { useDispatch, useSelector } from "react-redux";
import { loginRequest, createPost } from "../services/djangoApi";
import {catchRejection} from "@reduxjs/toolkit/src/listenerMiddleware/utils";

export const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const headerHeight = useHeaderHeight();
  const [username, onChangeUsername] = useState('john-doe');
  const [password, onChangePassword] = useState('testing321');
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
      
      <View style={{paddingTop: 60, alignContent: "center", marginTop: 50}}>
        <View style={{ marginBottom: 30, alignContent: "center" }}>
          <Text
            style={{
              fontFamily: "Poppins_700Bold",
              fontSize: 50,
              alignSelf: "center",
              marginTop: 10,
              color: "#A100FF",
            }}>Muddy</Text>
          <TextInput
            style={{
              fontFamily: "Poppins_400Regular",
              fontSize: 18,
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
              marginTop: 20,
            }}
            onChangeText={onChangeUsername}
            value={username}
            placeholder='username'
          />
        </View>
        <View style={{ alignContent: "center" }}>
          <TextInput
            style={{
              fontFamily: "Poppins_400Regular",
              fontSize: 18,
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
            color='#A100FF'
            style={{ position: "absolute", right: 28, top: 6 }}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <Pressable
            onPress={async () => await handleLogin()}
            style={{
              width: 200,
              height: 55,
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 12,
              paddingHorizontal: 32,
              borderRadius: 25,
              elevation: 3,
              backgroundColor: "#A100FF",
              marginTop: 40,
            }}
          >
            <Ionicons name='paper-plane-outline' color='#5EFF00' size={26}>
            <Text 
              style={{
                fontFamily: "Poppins_400Regular",
                fontSize: 20,
                fontWeight: 'bold',
                color: "#5EFF00",
              }}>Login</Text>
            </Ionicons>
          </Pressable>
          <Text 
            style={{
              marginTop: 50,
            }}>Don't have an account? </Text>
            <Button title="Sign up" onPress={() => {navigation.navigate("Register")}} />
        </View>
      </View>
    </SafeAreaView>
  );
};