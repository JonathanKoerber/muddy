import { createAsyncThunk } from "@reduxjs/toolkit";
import { requestBase } from "./utils/constants";

export const fetchLikedImages = createAsyncThunk(
    "likedImages/initLikedImages",
    async () => {
        const response = await fetch(requestBase + "/likedImages.json");
        return await response.json();
    }
);