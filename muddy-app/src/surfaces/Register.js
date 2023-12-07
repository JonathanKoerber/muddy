import React, {useEffect, useState} from "react";
import { View, TextInput, Pressable, Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { login, register } from "../../reducers/userReducer"
import { useDispatch, useSelector } from "react-redux";
import { loginRequest, registerRequest } from "../services/djangoApi";

export const Register = () => {
  const dispatch = useDispatch();
  const [firstname, onChangeFirstname] = useState();
  const [lastname, onChangeLastname] = useState();
  const [username, onChangeUsername] = useState();
  const [email, onChangeEmail] = useState();
  const [password, onChangePassword] = useState();
  const [confirmPassword, onChangeConfirmPassword] = useState();

  const handleRegister = async () => {
      console.log("########", "Register", "Register",  "########");
     await registerRequest(firstname, lastname, username, email, password).then(function (user){
         if(user !== undefined){
             console.log(user)
             dispatch(register(user));
         }
     });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      
      <View style={{paddingTop: 60, alignContent: "center"}}>
        <View style={{ marginBottom: 10, alignContent: "center" }}>
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
            onChangeText={onChangeFirstname}
            value={firstname}
            placeholder='First Name'
          />
        </View>
        <View style={{ marginBottom: 10, alignContent: "center" }}>
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
            onChangeText={onChangeLastname}
            value={lastname}
            placeholder='Last Name'
          />
        </View>
        <View style={{ marginBottom: 10, alignContent: "center" }}>
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
            onChangeText={onChangeUsername}
            value={username}
            placeholder='Username'
          />
        </View>
        <View style={{ marginBottom: 10, alignContent: "center" }}>
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
            onChangeText={onChangeEmail}
            value={email}
            placeholder='Email'
          />
        </View>
        <View style={{ marginBottom: 10, alignContent: "center" }}>
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
        <View style={{ marginBottom: 10, alignContent: "center" }}>
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
            onChangeText={onChangeConfirmPassword}
            value={confirmPassword}
            placeholder='Re-enter the Password'
          />
          <Ionicons
            name='eye-off-outline'
            size={24}
            color='#A100FF'
            style={{ position: "absolute", right: 28, top: 6 }}
          />
        </View>
        <View style={{ marginBottom: 10, alignItems: "center" }}>
          <Pressable
            onPress={async () => await handleRegister()}
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
              }}>Submit</Text>
            </Ionicons>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};