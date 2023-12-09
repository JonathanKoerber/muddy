import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, StyleSheet, ActivityIndicator, Pressable, SafeAreaView, Keyboard} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { userProfile, editUserProfile } from '../services/djangoApi';

export const EditProfile = () => {
  const [profileImage, setProfileImage] = useState([]);

  const [isLoading, setLoading] = useState(true)

  const [firstname, setFirstname] = useState()
  const [lastname, setLastname] = useState()
  const [username, setUsername] = useState()
  const [bio, setBio] = useState()
  const [lastupdate, setLastupdate] = useState()
  const [avatar, setAvatar] = useState()

  const [errors, setErrors] = useState({});

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
    if(isValid){
      uploadImage();
    }
  };

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await userProfile();
      setFirstname(response.data.first_name)
      setLastname(response.data.last_name)
      setUsername(response.data.username)
      setBio(response.data.bio)
      setAvatar(response.data.avatar)
      console.log("User Details: ", response.data)

      const dateString = response.data.updated
      const dateObject = new Date(dateString)
      const fullDate = `${dateObject.toDateString()}`;

      setLastupdate(fullDate)
    }catch (error){
      console.log("Error in getting user profile: ", error);
    }finally {
      setLoading(false);
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
        console.log('Media library permission not granted');
        return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });

    if (!result.canceled){
      setProfileImage(result.assets[0]);
      setAvatar(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    try {
        console.log(profileImage);
        const formData = new FormData();
        if(profileImage.length === 0){
            console.log("Not updating the profile picture")
        }else{
            formData.append('avatar', {
                name: profileImage.fileName,
                uri: profileImage.uri,
                type: profileImage.type,
            });
        }
        formData.append('first_name', firstname);
        formData.append('last_name', lastname);
        formData.append('username', username);
        if(bio.length > 1){
          formData.append('bio', bio)
        }else{
          formData.append('bio', "")
        }

        const response = await editUserProfile(formData);
        console.log("Patch response: ", response.data)

    } catch (error) {
      console.log("Error while updating user details:", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {isLoading ? ( 
        <View style={{flex: 1, justifyContent: "center"}}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image style={styles.imageStyle}
              source={{
                uri: avatar
              }}
            />
          </View>
          <Pressable onPress={pickImage}>
            <Text style={styles.imageButton}>Edit Avatar</Text>
          </Pressable>
          <View style={styles.inputContainer}>
            <TextInput 
              value={firstname}
              style={styles.input}
              placeholder='First name'
              onChangeText={setFirstname}
              onFocus={() => handleError(null, 'firstname')}
            />
            {errors.firstname && <Text style={styles.errorText}>{errors.firstname}</Text>}
            <TextInput 
              value={lastname}
              style={styles.input}
              placeholder='Last name'
              onChangeText={setLastname}
              onFocus={() => handleError(null, 'lastname')}
            />
            {errors.lastname && <Text style={styles.errorText}>{errors.lastname}</Text>}
            <TextInput 
              value={username}
              style={styles.input}
              placeholder='Username'
              onChangeText={setUsername}
              onFocus={() => handleError(null, 'username')}
            />
            {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}
            <TextInput 
              value={bio}
              style={styles.input}
              placeholder='Bio'
              onChangeText={setBio}
            />
            <View style={{ alignItems: "center" }}>
                <Pressable onPress={validate} style={styles.button}>
                    <Text style={styles.buttonText}>Save</Text>
                </Pressable>
            </View>
          </View>
          <Text style={styles.updateStyle}>Profile Last Updated on: {lastupdate}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 15, 
    },
    imageContainer: {
        width: 140,
        height: 140,
        borderColor: "#000000",
        borderWidth: 2,
        overflow: "hidden",
        alignSelf: "center",
        transform: [{ rotate: "-45deg" }],
        borderRadius: 70,
    },
    imageStyle: {
        height: 150,
        width: 150,
        transform: [{ rotate: "45deg" }],
        alignSelf: "center",
    },
    imageButton: { 
      color: "#A100FF",
      fontSize: 16,
      paddingTop: 10,
      alignSelf: "center",
    },
    input: {
        fontFamily: "Poppins_400Regular",
        fontSize: 16,
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
        marginTop: 20,
    },
    button: {
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
    },
    buttonText: {
        fontFamily: "Poppins_400Regular",
        fontSize: 20,
        fontWeight: 'bold',
        color: "#5EFF00",
    },
    updateStyle: {
        fontFamily: "Poppins_400Regular",
        fontSize: 16,
        alignSelf: "center",
        paddingTop: 40,
    },
    inputContainer: {
        alignContent: "center"
    },
    errorText: {
      paddingLeft: 20,
      paddingTop: 5,
      color: "#ff0505"
    }
})
