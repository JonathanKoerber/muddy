import React from "react";
import { View, Text } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { useWindowDimensions } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Ionicons from "@expo/vector-icons/Ionicons";
import {AppCamera} from "../components/AppCamera";

export const CreateAssignment = () => {
  const headerHeight = useHeaderHeight();
  const { height, width } = useWindowDimensions();

  return (
    <SafeAreaView style={{ flex: 1}}>

        <AppCamera />
    </SafeAreaView>
  );
};