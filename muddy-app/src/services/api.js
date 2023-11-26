import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { URL, TOKEN_KEY } from '../utils/constants';


const djangoAPI = axios.create({
    baseURL: URL,
    timeout: 1000,
    httpAgent:{
        rejectUnauthorized: false,
    }
});

export const login = async (username, password) => {
    try {
        console.log('service/api/login')
        const response = await djangoAPI({
            method: 'post',
            url: '/api/auth/login/',
            data: {
                username: username,
                password: password
            }
        });
        console.log("response");
        console.log(response.data);
        await SecureStore.setItemAsync(TOKEN_KEY, response.data.token);
    } catch (e) {

        console.log(e);
        console.log("Error logging in", e);
        // Handle login error if needed
    }
}
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