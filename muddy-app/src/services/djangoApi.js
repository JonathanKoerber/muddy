import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { useDispatch} from "react-redux";
import { login } from "../../reducers/userReducer";
import {URL, LOGIN_PATH, TOKEN_KEY, REFRESH_TOKEN_KEY} from '../utils/constants';

const djangoAPI = axios.create({
    baseURL: URL,
    timeout: 1000,
    httpsAgent: {
        rejectUnauthorized: false,
    }
});


export const loginRequest = async (username, password) => {

    try {
        const response = await djangoAPI.post(LOGIN_PATH, {
            username: username,
            password: password
        });
        return response.data.user
        await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, response.data.refresh);
        await SecureStore.setItemAsync(TOKEN_KEY, response.data.access);
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
            // Something happened in setting up the request that triggered an Error
            console.log("Error during request setup:", error.message);
        }

        console.log("Error logging in", error);
    }
};

export const getPosts = async () => {
    try{
        const response = await djangoAPI({
        headers: {
            Authorization: 'Bearer ' + await SecureStore.getItemAsync(TOKEN_KEY)
        },
        });
    }catch (e) {
        console.log(e);
        console.log("Error logging in", e);
        // Handle login error if needed
    }
}