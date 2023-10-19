import { configureStore } from "@reduxjs/toolkit";

import { userReducer } from "./reducer/user"
import likedImagesReducer from "./reducer/likedImages"

const store = configureStore({
    reducer: {
        user: userReducer,
        likedImages: likedImagesReducer
    },
});

export default store;