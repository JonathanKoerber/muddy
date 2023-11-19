import { WORKSHEETS}    from "../src/utils/constants";
import { createSlice} from "@reduxjs/toolkit";

const worksheetsSlice = createSlice({
    name: "worksheets",
    initialState: {
        // starting with dummy data form constance.js
        worksheets: [...WORKSHEETS]
    },
    reducers: {
        addWorksheet: (state, action) => {
            state.worksheets.push(...action.payload);
        },
        deleteWorksheet: (state, action) => {
            state.worksheets = state.worksheets.filter(
                (worksheet) => worksheet.id !== action.payload.id
            );
        },
        updateWorksheet: (state, action) => {
            const index = state.worksheets.findIndex(
                (worksheet) => worksheet.id === action.payload.id
            );
            state.worksheets[index] = action.payload;
        },
    },
});

export const { addWorksheet, deleteWorksheet, updateWorksheet } = worksheetsSlice.actions;
export default worksheetsSlice.reducer;