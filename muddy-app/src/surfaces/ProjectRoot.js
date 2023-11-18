import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Login } from "./Login";
import { Home } from "./Home";
import { UserDetailsModal } from "./UserDetailsModal";
import { ImageDetailsModal } from "./ImageDetailsModal";
import { ConversationsNavigation } from "./ConversationsNavigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import * as SplashScreen from "expo-splash-screen";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import {Text, View} from "react-native";

const Stack = createStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "rgb(255, 255, 255)",
  },
};

export const ProjectRoot = () =>{
  
  const userLoggedIn = useSelector((state) => state.user.userLoggedIn )|| false;
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(userLoggedIn)
  }, [userLoggedIn]);
  console.log("loggedIn", loggedIn)
  console.log("userLoggedIn", userLoggedIn)
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return (<View><Text>App is Loading...</Text></View>);
  }

  return (

        <NavigationContainer theme={MyTheme}>
          <Stack.Navigator>
            <Stack.Group>
            { true ? (
                <Stack.Screen name="Login" component={Login}  />
              ) : (
                <>
                  <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="ConversationsNav"
                    component={ConversationsNavigation}
                    options={{ headerShown: false }}
                  />
                </>
              )}
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: "modal" }}>
              <Stack.Screen
                name="UserDetailsModal"
                component={UserDetailsModal}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ImageDetailsModal"
                component={ImageDetailsModal}
                options={{ headerShown: false }}
              />
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>   
  );
}