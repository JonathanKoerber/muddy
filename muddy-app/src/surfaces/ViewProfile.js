import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Pressable, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { userProfile } from "../services/djangoApi";

import Ionicons from "@expo/vector-icons/Ionicons";

export const ViewProfile = ({ navigation }) => {

  const [isLoading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [profileCreation, setProfileCreation] = useState()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await userProfile();
      setData(response.data);
      
      const dateString = response.data.created
      const dateObject = new Date(dateString)
      const fullDate = `${dateObject.toDateString()}`;

      setProfileCreation(fullDate)
      
      console.log("User Details: ", response.data)
    }catch (error){
      console.log("Error in getting user profile: ", error);
    }finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {isLoading ? ( 
        <View style={{flex: 1, justifyContent: "center"}}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View>
          <View style={styles.bgStyle1} />
          <View style={styles.bgStyle2} />
          <View style={styles.bgStyle3} />
          <View style={styles.container}>
            <View style={styles.imageContainer}>
              <Image style={styles.imageStyle}
                source={{
                  uri: data.avatar
                }}
              />
            </View>
            <Text style={styles.nameStyle}>{data.name}</Text>
            <Text style={styles.usernameStyle}>@{data.username}</Text>
            <Text style={styles.bioStyle}>{data.bio}</Text>
            <Text style={styles.postCount}>{data.posts_count} Posts</Text>
            <Pressable style={styles.button} onPress={() => {navigation.navigate("Edit Profile")}}>
              <Ionicons name='create-outline' color="#5EFF00" size={24}>
                <Text style={styles.text}>Edit Profile</Text>
              </Ionicons>
            </Pressable>
          </View>
          <View style={styles.bottomContainer}>
            <Text style={styles.createStyle}>Joined Muddy on: {profileCreation}</Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bgStyle1: {
    width: 650,
    height: 570,
    borderRadius: 155,
    borderWidth: 1,
    borderColor: "#EEF2E2",
    position: "absolute",
    top: -210,
    left: -120,
    transform: [{ rotate: "-45deg" }],
  },
  bgStyle2: {
    width: 650,
    height: 570,
    borderRadius: 155,
    borderWidth: 1,
    borderColor: "#EEF2E2",
    position: "absolute",
    top: -260,
    left: -120,
    transform: [{ rotate: "-45deg" }],
  },
  bgStyle3: {
    width: 650,
    height: 570,
    borderRadius: 155,
    position: "absolute",
    top: -320,
    left: -120,
    backgroundColor: "#E1F6F4",
    transform: [{ rotate: "-45deg" }],
  },
  container: {
    paddingTop: 40, 
    alignItems: "center",
  },
  imageContainer: {
    width: 160,
    height: 160,
    borderColor: "#000000",
    borderWidth: 2,
    overflow: "hidden",
    alignSelf: "center",
    transform: [{ rotate: "-45deg" }],
    borderRadius: 80,
  },
  imageStyle: {
    height: 158,
    width: 158,
    transform: [{ rotate: "45deg" }],
    alignSelf: "center",
  },
  nameStyle: {
    fontFamily: "Poppins_700Bold",
    fontSize: 26,
    alignSelf: "center",
    marginTop: 10,
  },
  usernameStyle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    alignSelf: "center",
  },
  bioStyle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 18,
    alignSelf: "center",
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 10,
    textAlign: "justify",
  },
  postCount: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    alignSelf: "center",
    marginTop: 10,
  },
  button: {
    width: 180,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    elevation: 3,
    backgroundColor: "#A100FF",
    marginTop: 20,
  },
  text: {
    fontFamily: "Poppins_400Regular",
    fontSize: 18,
    fontWeight: 'bold',
    color: "#5EFF00",
  },
  bottomContainer: {
    marginTop: 40,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
  },
  createStyle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    alignSelf: "baseline",
  },
})