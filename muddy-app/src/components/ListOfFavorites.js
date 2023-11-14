import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import { Card } from "./Card";
import * as SplashScreen from "expo-splash-screen";
import { requestBase } from "../utils/constants";
import { useSelector } from "react-redux";

SplashScreen.preventAutoHideAsync();

export const ListOfFavorites = () => {
  const {linkedImages} = useSelector((state) => state.linkedImages);
  const [imageList, setImageList] = useState([]);
  
  
  if (linkedImages === null) {
    return <View><Text>Loading ... </Text></View>;
  }

  useEffect(() => {
    const reversedImages = [...likedImages].reverse();
    setImageList(reversedImages);
  }, [likedImages]);

 
  const renderItem = ({ item }) => {
    return <Card item={item} navigation={navigation} />;
  };
  return (
    <View
      style={{
        paddingHorizontal: 20,
      }}
    >
      <FlatList
        data={imageList}
        renderItem={renderItem}
        keyExtractor={(item) => item.itemId}
        showsVerticalScrollIndicator={false}
        snapToInterval={312}
        decelerationRate='fast'
      />
    </View>
  );
};