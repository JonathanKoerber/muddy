import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ViewProfile } from "./ViewProfile";
import { EditProfile } from "./EditProfile";

export const Profile = () => {

  const Stack = createStackNavigator()

  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen name="Profile" component={ViewProfile} options={{ headerShown: false }} />
        <Stack.Screen name="Edit Profile" component={EditProfile} />
      </Stack.Group>
    </Stack.Navigator>
  );
};