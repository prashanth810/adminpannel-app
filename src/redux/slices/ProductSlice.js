import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handlecreateproducts, handlegetproducts } from "../services/ProductService";

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

// create products 
export const createproducts = createAsyncThunk('products/create', async (data, thunkAPI) => {
    try {
        const response = await handlecreateproducts(data);
        return response.data.data;
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})

const initialState = {
    categoryprods: {
        catpro: [],
        catprodloading: false,
        catproderror: null,
    },
    createdproducts: {
        createdprod: {},
        createdprodloading: false,
        createdproderror: null,
    }
};


const ProductSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetch products by category id
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

            // create products 
            .addCase(createproducts.pending, (state) => {
                state.createdproducts.createdprodloading = true;
                state.createdproducts.createdproderror = null;
            })
            .addCase(createproducts.fulfilled, (state, action) => {
                state.createdproducts.createdprodloading = false;
                state.createdproducts.createdprod = action.payload;
            })
            .addCase(createproducts.rejected, (state, action) => {
                state.createdproducts.createdprodloading = false;
                state.createdproducts.createdproderror = action.payload;
            })
    }
})


export default ProductSlice.reducer;