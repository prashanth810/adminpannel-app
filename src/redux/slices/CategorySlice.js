import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createcategory, getallcategories } from "../services/CategoryService";

export const fetchallcategories = createAsyncThunk("categories/fetchcategories", async (_, thunkAPI) => {
    try {
        const response = await getallcategories();
        return response.data.data;
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})


// creates categories  
export const handlecreatecategories = createAsyncThunk(
    "category/create",
    async (data, thunkAPI) => {
        try {
            const response = await createcategory(data);
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);


const initialState = {
    categorydata: {
        category: [],
        categoryloading: false,
        categoryerror: null,
    },
    createscat: {
        catdata: {},
        catloading: false,
        caterror: null,
    }
};

const CategorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchallcategories.pending, (state) => {
                state.categorydata.categoryloading = true;
                state.categorydata.categoryerror = null;
            })
            .addCase(fetchallcategories.fulfilled, (state, action) => {
                state.categorydata.categoryloading = false;
                state.categorydata.category = action.payload;
            })
            .addCase(fetchallcategories.rejected, (state, action) => {
                state.categorydata.categoryloading = false;
                state.categorydata.categoryerror = action.payload;
            })

            // creates categories 
            .addCase(handlecreatecategories.pending, (state) => {
                state.createscat.catloading = true;
                state.createscat.caterror = null;
            })
            .addCase(handlecreatecategories.fulfilled, (state, action) => {
                state.createscat.catloading = false;
                state.createscat.catdata = action.payload;
            })
            .addCase(handlecreatecategories.rejected, (state, action) => {
                state.createscat.catloading = false;
                state.createscat.caterror = action.payload;
            })
    }
})


export default CategorySlice.reducer;