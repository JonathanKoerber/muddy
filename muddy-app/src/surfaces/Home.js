import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Login } from "./Login";
import { Feed } from "./Feed";
import { Profile } from "./Profile";
import { Favorites } from "./Favorites";
import { CreateAssignment } from "./CreateAssignment";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from "../styles/colors";
import { View } from "react-native";
import { fetchLikedImages } from "../../asyncFetches";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";

const Tab = createBottomTabNavigator();

const ConversationsBase = () => <View style={{ flex: 1 }} />;

export const Home = () => {
  
  const userLoggedIn = useSelector((state) => state.userLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLikedImages());
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Feed") {
            iconName = focused ? "md-home" : "md-home-outline";
          } else if (route.name === "ConversationsMain") {
            iconName = focused ? "chatbox" : "chatbox-outline";
          } else if (route.name === "Favorites") {
            iconName = focused ? "heart" : "heart-outline";
          } else if (route.name === "ProfileStack") {
            iconName = focused ? "person-circle" : "person-circle-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.accentStroke,
        tabBarInactiveTintColor: colors.purple,
        tabBarShowLabel: false,
        headerTransparent: true,
        headerTitleAlign: "left",
        headerStyle: {
          height: 160,
        },
        headerTitleStyle: {
          textAlign: "left",
          fontWeight: "bold",
          fontFamily: "Poppins_700Bold",
          fontSize: 24,
        },
      })}
    >
      <Tab.Screen name='Feed' component={Feed} />
      <Tab.Screen name='ConversationsMain' component={ConversationsBase} />
      <Tab.Screen
        name='CreateAssignment'
        component={CreateAssignment}
        options={{
            headerShown: false,
          tabBarIcon: ({ size }) => (
            <View
              style={{
                marginTop: -30,
              }}
            >
              <View
                style={{
                  position: "absolute",
                  backgroundColor: "#A100FF",
                  padding: 30,
                  bottom: -10,
                  left: -13,
                  borderRadius: 23,
                  transform: [{ rotate: "-45deg" }],
                  shadowColor: "#000000",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.2,
                  shadowRadius: 4,
                }}
              />
              <MaterialCommunityIcons name="brain" size={34} color="#5EFF00" />
            </View>
          ),
        }}
      />
      <Tab.Screen name='Favorites' component={Favorites} />
      <Tab.Screen name='ProfileStack' component={Profile} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
  };