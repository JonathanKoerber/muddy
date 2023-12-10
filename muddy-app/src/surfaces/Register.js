
import React, { useState} from "react";
import { View, TextInput, Pressable, Text, Keyboard, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { register } from "../../reducers/userReducer"
import { useDispatch } from "react-redux";
import { registerRequest } from "../services/djangoApi";

export const Register = () => {
  const dispatch = useDispatch();
  const [firstname, onChangeFirstname] = useState();
  const [lastname, onChangeLastname] = useState();
  const [username, onChangeUsername] = useState();
  const [email, onChangeEmail] = useState();
  const [password, onChangePassword] = useState();

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
    console.log(errors)
  }

  const validate = async () => {
    Keyboard.dismiss();
    let isValid = true;
    if(!firstname) {
      handleError('Please enter first name', 'firstname');
      isValid = false;
    }
    if(!lastname){
      handleError('Please enter last name', 'lastname');
      isValid = false;
    }
    if(!username) {
      handleError('Please enter username', 'username');
      isValid = false;
    }
    if(!email){
      handleError('Please enter email', 'email');
      isValid = false;
    }else{
      if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)){
        handleError('Invalid email address', 'email');
        isValid = false;
      }
    }
    if(!password){
      handleError('Please enter password', 'password');
      isValid = false;
    }
    if(isValid){
      handleRegister();
    }
  };

  const handleRegister = async () => {
      console.log("########", "Register", "Register",  "########");
     await registerRequest(firstname, lastname, username, email, password).then(function (user){
         if(user !== undefined){
             console.log(user)
             dispatch(register(user));
         }else{
          Alert.alert('Error', 'Registration unsuccessful')
         }
     });
  };

  return (

    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ alignContent: "center"}}>
        <View style={{ marginBottom: 15, alignContent: "center" }}>
          <Text
            style={{
              fontFamily: "Poppins_700Bold",
              fontSize: 40,
              alignSelf: "center",
              color: "#A100FF",
            }}>Create Account</Text>
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
              marginTop: 40,
            }}
            onChangeText={onChangeFirstname}
            onFocus={() => handleError(null, 'firstname')}
            value={firstname}
            placeholder='First Name'
          />
          {errors.firstname && <Text style={{paddingLeft: 20, paddingTop: 5, color: "#ff0505"}}>{errors.firstname}</Text>}
        </View>
        <View style={{ marginBottom: 15, alignContent: "center" }}>
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
            onFocus={() => handleError(null, 'lastname')}
            value={lastname}
            placeholder='Last Name'
          />
          {errors.lastname && <Text style={{paddingLeft: 20, paddingTop: 5, color: "#ff0505"}}>{errors.lastname}</Text>}
        </View>
        <View style={{ marginBottom: 15, alignContent: "center" }}>
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
            onFocus={() => handleError(null, 'username')}
            value={username}
            placeholder='Username'
          />
          {errors.username && <Text style={{paddingLeft: 20, paddingTop: 5, color: "#ff0505"}}>{errors.username}</Text>}
        </View>
        <View style={{ marginBottom: 15, alignContent: "center" }}>
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

            onFocus={() => handleError(null, 'email')}
            value={email}
            placeholder='Email'
          />
          {errors.email && <Text style={{paddingLeft: 20, paddingTop: 5, color: "#ff0505"}}>{errors.email}</Text>}
        </View>
        <View style={{ marginBottom: 15, alignContent: "center" }}>
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
            onFocus={() => handleError(null, 'password')}
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
        <View style={{ marginBottom: 15, alignItems: "center" }}>
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
            <Ionicons name='save-outline' color='#5EFF00' size={26}>
            <Text 
              style={{
                fontFamily: "Poppins_400Regular",
                fontSize: 20,
                fontWeight: 'bold',
                color: "#5EFF00",
              }}> Submit</Text>
            </Ionicons>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};