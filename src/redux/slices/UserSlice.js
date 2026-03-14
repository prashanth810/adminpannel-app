import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getalluserslist } from "../services/Userservice";

// getall suers 
export const fetchallusers = createAsyncThunk("users/fetchusers", async (_, thunkAPI) => {
    try {
        const response = await getalluserslist();
        return response.data.data;
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})

const initialState = {
    userdata: {
        allusers: [],
        userloading: false,
        usererror: null,
    }
};

const UserSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //fetch all users
            .addCase(fetchallusers.pending, (state) => {
                state.userdata.userloading = true;
                state.userdata.usererror = null;
            })
            .addCase(fetchallusers.fulfilled, (state, action) => {
                state.userdata.userloading = false;
                state.userdata.allusers = action.payload;
            })
            .addCase(fetchallusers.rejected, (state, action) => {
                state.userdata.userloading = false;
                state.userdata.usererror = action.payload;
            })
    }
});

export default UserSlice.reducer;