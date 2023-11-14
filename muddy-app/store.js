import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import likedImagesReducer from "./reducers/likedImages"

const store = configureStore({
    reducer: {
        user: userReducer,
        likedImages: likedImagesReducer
    },
});

export default store;