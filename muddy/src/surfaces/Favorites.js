import React from "react";
import { useHeaderHeight } from "@react-navigation/elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { ListOfFavorites } from "../components/ListOfFavorites";
import {View, Text} from "react-native";

export const Favorites = ({ navigation }) => {
  const headerHeight = useHeaderHeight();

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: headerHeight }}>
        <View>
          <Text>The best Screen:)</Text>
        </View>
    </SafeAreaView>
  );
};