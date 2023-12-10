import React, {useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import { login } from "../../reducers/userReducer";
import { View, TextInput, Pressable, Text } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { regesterRequest } from "../services/djangoApi";


export const Regester = ({navigation}) => {
    dispatch = useDispatch();
    const headerHeight = useHeaderHeight();
    const [username, onChangeUsername] = useState('');
    const [firstName, onChangeFirstName] = useState('')
    const [lastName, onChangeLastName] = useState('')
    const [email, onChangeEmail] = useState('')
    const [password, onChangePassword] = useState('');
    const [message, setMessage] = useState('Fill out the form to register');
    

    const handleRegister = async () => {
        console.log("########", "login", "login",  "########");
        await regesterRequest(username, 
                                          password, 
                                          firstName, 
                                          lastName, 
                                          email)
        .then(function (user){
          dispatch(login(user))
          console.log(user)
     }).catch(function (error){
         console.log("error", error)
         setMessage("Error: " + error)
     });
  };

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: headerHeight }}>
      
      <View style={{paddingTop: 60}}>
      <View >
          <Text
            style={{
              fontSize: 14,
              paddingVertical: 12,
              paddingLeft: 40,
              marginHorizontal: 17,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 9,
              elevation: 3,
            }}
          >  {message}</Text>
        </View>
      
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
            placeholder='Username'
          />
        </View>
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
            onChangeText={onChangeFirstName}
            value={firstName}
            placeholder='First Name'
          />
        </View>
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
            onChangeText={onChangeLastName}
            value={lastName}
            placeholder='Last Name'
          />
        </View>
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
            onChangeText={onChangeEmail}
            value={email}
            placeholder='Email'
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
            placeholder='Password'
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
        onPress={ () =>  handleRegister()}
        style={{
          position: "absolute",
          bottom: 175,
          left: "42%",
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
        <MaterialCommunityIcons name="lead-pencil" size={24} color="#5EFF00" />
        </Pressable>
    </SafeAreaView>
  );
};