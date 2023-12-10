import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import {URL, POST_PATH, LOGIN_PATH, TOKEN_KEY, OCR_PATH, REFRESH_TOKEN_KEY, USER_PATH, USER_ID, REGISTER_PATH} from '../utils/constants';


const djangoAPI = axios.create({
    baseURL: URL,
    timeout: 10000,
    httpsAgent: {
        rejectUnauthorized: false,
    }
});
             
export const registerRequest = async (firstname, lastname, username, email, password) => {
 // we are working with passwrods in plain text for now 
    // we will add encryption later
    try {
        const response = await djangoAPI.post(REGISTER_PATH, {
            first_name: firstname,
            last_name: lastname,
            username: username,
            email: email,
            password: password
        },
          {
           headers: {
            'Content-Type': 'application/json',      
                }
              });

        console.log('refresh', response.data.refresh)
        await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, response.data.refresh);
        console.log("access", response.data.access)
        await SecureStore.setItemAsync(TOKEN_KEY, response.data.token);
        console.log("user_id: ", response.data.user.id)
        await SecureStore.setItemAsync(USER_ID, response.data.user.id);
        console.log("store", SecureStore.getItemAsync(TOKEN_KEY))
        return response.data.user
    } catch (error) {
        console.log("Error Object:", error);

        if (error.response) {
            // The request was made and the server responded with a status code
            console.log("Response Data:", error.response.data);
            console.log("Status Code:", error.response.status);
            console.log("Status Text:", error.response.statusText);
            console.log("Headers:", error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            console.log("No response received. Request details:", error.request);
        } else {
            // Something happened in setting up the request that triggered an Error;
            console.log("Error during request setup:", error.message);
        }

        console.log("Error Registering user in", error);
    }
};


export const loginRequest = async (username, password) => {

    try {
        const response = await djangoAPI.post(LOGIN_PATH, {
            username: username,
            password: password
        });

        console.log('refresh', response.data.refresh)
        await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, response.data.refresh);
        console.log("access", response.data.access)
        await SecureStore.setItemAsync(TOKEN_KEY, response.data.access);
        console.log("user_id: ", response.data.user.id)
        await SecureStore.setItemAsync(USER_ID, response.data.user.id);
        console.log("store", SecureStore.getItemAsync(TOKEN_KEY))
        return response.data.user
    } catch (error) {
        console.log("Error Object:", error);

        if (error.response) {
            // The request was made and the server responded with a status code
            console.log("Response Data:", error.response.data);
            console.log("Status Code:", error.response.status);
            console.log("Status Text:", error.response.statusText);
            console.log("Headers:", error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            console.log("No response received. Request details:", error.request);
        } else {
            // Something happened in setting up the request that triggered an Error;
            console.log("Error during request setup:", error.message);
        }

        console.log("Error logging in", error);
    }
};

export const regesterRequest = async (username, password, firstName, lastName, email) => {
    // we are working with passwrods in plain text for now 
    // we will add encryption later
    try {
        const response = await djangoAPI.post(
             REGISTER_PATH,
            {
                "username": username,
                "first_name": firstName,
                "last_name": lastName,
                "password": password,
                "email": email
            },
            {
         headers: {
                  'Content-Type': 'application/json',
                  
                }
              }
        );
        console.log(response.data)
        return response.status
    } catch (error) {
        console.log("Error Object:", error);

        if (error.response) {
            // The request was made and the server responded with a status code
            console.log("Response Data:", error.response.data);
            console.log("Status Code:", error.response.status);
            console.log("Status Text:", error.response.statusText);
            console.log("Headers:", error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            console.log("No response received. Request details:", error.request);
        } else {
            // Something happened in setting up the request that triggered an Error;
            console.log("Error during request setup:", error.message);
        }

        console.log("Error logging in", error);
    }
}

export const imageToWorksheet = async (userId, payload) =>{
    const accessToken = await SecureStore.getItemAsync((TOKEN_KEY))
    console.log('Image Payload Entries:');
    // console.log(imagePayload.get('image'))
    console.log(payload)
    try{
        const response = await djangoAPI.post(
            OCR_PATH,
     payload,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${accessToken}`,
                "User-Agent": "muddy-app",
            }
        })
        console.log(response)
        return response;
    }catch (error) {

        if (error.response) {
            // The request was made and the server responded with a status code
            console.log("Response Data:", error.response.data);
            console.log("Status Code:", error.response.status);
            console.log("Status Text:", error.response.statusText);
            console.log("Headers:", error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            console.log("No response received. Request details:", error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error during request setup:", error.message);
        }

        console.log("Error logging in", error);
        throw(error);
    }
}
export const createPost = async (userId, postBody) => {

    try {
        // Get the access token from SecureStore
        const accessToken = await SecureStore.getItemAsync(TOKEN_KEY);
        // Make a POST request to create a post
        const response = await djangoAPI.post(
            POST_PATH,
            {
                author: userId,
                body: postBody,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                    'User-Agent': "muddy-app",
                },
            }
        );
        // Handle the response as needed
        console.log('Post created successfully:', response.data);

    } catch (error) {
        console.error('Error creating post:', error);
        // Handle error if needed
    }
};

export const userProfile = async () =>{
    const userId = await SecureStore.getItemAsync((USER_ID))
    const accessToken = await SecureStore.getItemAsync((TOKEN_KEY))
    const path = USER_PATH+userId+"/"
    console.log("GET: ",path);
    try{
        const response = await djangoAPI.get(
            path,{
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "User-Agent": "muddy-app",
            }
        })
        return response;
    }catch (error) {
        console.log("Error get user profile: ", error);
    }
}

export const editUserProfile = async ( formdata ) =>{
    const userId = await SecureStore.getItemAsync((USER_ID))
    const accessToken = await SecureStore.getItemAsync((TOKEN_KEY))
    const path = USER_PATH+userId+"/"
    console.log("PATCH:",path);
    try{
        const response = await djangoAPI.patch(
            path,
            formdata, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "User-Agent": "muddy-app",
            }
        })
        return response;
    }catch (error) {
        console.log("Error get user-edit profile: ", error);
    }
}