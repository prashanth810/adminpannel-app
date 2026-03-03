import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handlegetproducts } from "../services/ProductService";

// fetch products by category id
export const fetchProductsByCategory = createAsyncThunk(
    "products/fetchByCategory",
    async (categoryId, thunkAPI) => {
        try {
            const res = await handlegetproducts(categoryId);
            return res.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const initialState = {
    categoryprods: {
        catpro: [],
        catprodloading: false,
        catproderror: null,
    },
};


const ProductSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductsByCategory.pending, (state) => {
                state.categoryprods.catprodloading = true;
                state.categoryprods.catproderror = null;
            })
            .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
                state.categoryprods.catprodloading = false;
                state.categoryprods.catpro = action.payload;
            })
            .addCase(fetchProductsByCategory.rejected, (state, action) => {
                state.categoryprods.catprodloading = false;
                state.categoryprods.catproderror = action.payload;
            })
    }
})


export default ProductSlice.reducer;