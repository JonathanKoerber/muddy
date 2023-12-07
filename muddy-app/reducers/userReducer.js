import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({      
name: "user",
initialState: {
    userRegistered: false,
    userLoggedIn: false,
    user: null,
},
reducers: {
    register: (state, action) => {
        state.userRegistered = true;
        state.userLoggedIn = true;
        state.user = action.payload;
    },
    login: (state, action) => {
        state.userLoggedIn = true;
        state.user = action.payload;
    },
    logout: (state) => {
        state.userLoggedIn = false;
        state.user = null;
    },
},
});

export const { register, login, logout } = userSlice.actions;
export default userSlice.reducer;
