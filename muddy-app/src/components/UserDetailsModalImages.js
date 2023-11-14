import React, { useState, useEffect, useMemo } from "react";
import { FlatList, Image, View, Text } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { requestBase } from "../utils/constants";
import { useWindowDimensions } from "react-native";

SplashScreen.preventAutoHideAsync();
export const UserDetailsModalImages = () => {
  const randomImageSet = useMemo(() => Math.round(Math.random() * 4));
  const safeRandomImageSet = randomImageSet === 0 ? 1 : randomImageSet;

  const [imageList, setImageList] = useState(null);
  const [loading, setLoading] = useState(true);
  const { height, width } = useWindowDimensions();

  async function fetchImageData() {
    const response = await fetch(
      requestBase + "/userImages/" + safeRandomImageSet + ".json"
    );
    setImageList(await response.json());
  }

  useEffect(() => {
    const fetchImageData = async () => {
    try{
        const response = await fetch(requestBase + "/userImages/" + safeRandomImageSet + ".json");
        setImageList(await response.json());
    }catch (error){
        console.log("Error loading images:", error);
        setLoading(true);
    }finally{
        SplashScreen.hideAsync();
        setLoading(false);
        setImageList(images);
    }
};
    fetchImageData();
  }, []);

  if (loading) {
    return <View><Text>Loading..</Text></View>;
  }
  const renderItem = ({ item }) => {
    return (
      <Image
        style={{
          height: height * 0.6,
          width: width * 0.75,
          borderRadius: 28,
          marginRight: 30,
        }}
        source={{
          uri: item.url,
        }}
      />
    );
  };

  return (
    <View style={{ paddingTop: 30 }}>
      <FlatList
        data={imageList.listOfitems}
        renderItem={renderItem}
        keyExtractor={(item) => item.itemId}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={width * 0.825}
        decelerationRate='fast'
        ListHeaderComponent={<View style={{ width: width * 0.1 }} />}
      />
    </View>
  );
};