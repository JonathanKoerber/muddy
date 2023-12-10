import React, { useState } from "react";
import { View, TextInput, Pressable, Text, Keyboard, Alert } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { login } from "../../reducers/userReducer"
import { useDispatch } from "react-redux";
import { loginRequest } from "../services/djangoApi";

export const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const headerHeight = useHeaderHeight();
  const [username, onChangeUsername] = useState();
  const [password, onChangePassword] = useState();

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
    console.log(errors)
  }

  const validate = async () => {
    Keyboard.dismiss();
    let isValid = true;
    if(!username) {
      handleError('Please enter username', 'username');
      isValid = false;
    }
    if(!password){
      handleError('Please enter password', 'password');
      isValid = false;
    }
    if(isValid){
      handleLogin();
    }
  };

  const handleLogin = async () => {
      console.log("########", "login", "login",  "########");
      await loginRequest(username, password).then(function (user){
          if(user !== undefined){
              console.log(user)
              dispatch(login(user));
          }else{
            Alert.alert('Error', 'Invalid credentials');
          }
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: headerHeight }}>
      <View style={{paddingTop: 60, alignContent: "center", marginTop: 50}}>
        <View style={{ marginBottom: 20, alignContent: "center" }}>
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
            onFocus={() => handleError(null, 'username')}
            value={username}
            placeholder='Username'
          />
          {errors.username && <Text style={{paddingLeft: 20, paddingTop: 5, color: "#ff0505"}}>{errors.username}</Text>}
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
            secureTextEntry={!showPassword}
            onChangeText={onChangePassword}
            onFocus={()=> handleError(null, 'password')}
            value={password}
            placeholder='Password'
          />
          {errors.password && <Text style={{paddingLeft: 20, paddingTop: 5, color: "#ff0505"}}>{errors.password}</Text>}
          <Ionicons
            name={showPassword ? 'eye-off-outline': 'eye-outline'}
            size={24}
            color='#A100FF'
            style={{ position: "absolute", right: 30, top: 10}}
            onPress={toggleShowPassword}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <Pressable
            onPress={validate}
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
              }}> Login</Text>
            </Ionicons>
          </Pressable>
        </View>
        <View style={{ alignItems: "center", paddingTop: 30 }}>
          <Text style={{ fontSize: 14 }}>Don't have an account?
            <Pressable onPress={() => {navigation.navigate("Register")}}>
              <Text style={{ color: "#A100FF", fontWeight: "bold", fontSize: 14 }}> Sign Up.</Text>
            </Pressable>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};