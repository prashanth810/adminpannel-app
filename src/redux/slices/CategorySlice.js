import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createcategory, getallcategories, handledeletecat } from "../services/CategoryService";

// categories fetch all
export const fetchallcategories = createAsyncThunk("categories/fetchcategories", async ({ page = 1, limit = 10 } = {}, thunkAPI) => {
    try {
        const response = await getallcategories(page, limit);
        return {
            data: response.data.data,
            page: response.data.page,
            totalPages: response.data.totalPages,
        };
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

// delete category
export const deletecategory = createAsyncThunk("category/delete", async (id, thunkAPI) => {
    try {
        await handledeletecat(id);
        return id;
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})

const initialState = {
    categorydata: {
        category: [],
        categoryloading: false,
        categoryerror: null,
        page: 1,
        hasMore: true,
    },
    createscat: {
        catdata: {},
        catloading: false,
        caterror: null,
    },
    deletecat: {                  // ← add this
        deleteloading: false,
        deleteerror: null,
    }
};

const CategorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetch all categories
            .addCase(fetchallcategories.pending, (state) => {
                state.categorydata.categoryloading = true;
                state.categorydata.categoryerror = null;
            })
            .addCase(fetchallcategories.fulfilled, (state, action) => {
                state.categorydata.categoryloading = false;
                const { data, page, totalPages } = action.payload;

                if (page === 1) {
                    state.categorydata.category = data;                                     // fresh load
                } else {
                    state.categorydata.category = [...state.categorydata.category, ...data]; // append
                }

                state.categorydata.page = page;
                state.categorydata.hasMore = page < totalPages;
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

            // delete category
            .addCase(deletecategory.pending, (state) => {
                state.deletecat.deleteloading = true;
                state.deletecat.deleteerror = null;
            })
            .addCase(deletecategory.fulfilled, (state, action) => {
                state.deletecat.deleteloading = false;
                state.categorydata.category = state.categorydata.category.filter((cat) => cat._id !== action.payload);
            })
            .addCase(deletecategory.rejected, (state, action) => {
                state.deletecat.deleteloading = false;
                state.deletecat.deleteerror = action.payload;
            })
    }
})


export default CategorySlice.reducer;