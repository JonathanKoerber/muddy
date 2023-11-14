import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Login } from "./src/surfaces/Login";
import { Home } from "./src/surfaces/Home";
import { UserDetailsModal } from "./src/surfaces/UserDetailsModal";
import { ImageDetailsModal } from "./src/surfaces/ImageDetailsModal";
import { ConversationsNavigation } from "./src/surfaces/ConversationsNavigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import * as SplashScreen from "expo-splash-screen";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import store from "./store";
import { Provider } from "react-redux";
import {Text, View} from "react-native";

const Stack = createStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "rgb(255, 255, 255)",
  },
};

export default function App() {
  
  const [loggedIn, setLoggedIn] = useState(false);

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return (<View><Text>App is Loading...</Text></View>);
  }

  return (
<SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer theme={MyTheme}>
          <Stack.Navigator>
            <Stack.Group>
              { !loggedIn ? (
                <Stack.Screen name="Login" component={Login} props={setLoggedIn} />
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
      </Provider>
    </SafeAreaProvider>
  );
}