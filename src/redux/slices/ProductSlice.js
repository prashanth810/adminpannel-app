import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handlecreateproducts, handlegetproducts } from "../services/ProductService";

// fetch products by category id
export const fetchProductsByCategory = createAsyncThunk(
    "products/fetchByCategory",
    async ({ categoryId, page = 1, limit = 10 }, thunkAPI) => {
        try {
            const res = await handlegetproducts(categoryId, page, limit);
            return {
                data: res.data.data,
                page: res.data.page,
            };
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
        page: 1,
        hasMore: true,
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
                const { data, page } = action.payload;

                if (page === 1) {
                    state.categoryprods.catpro = data;         // fresh / first load
                } else {
                    state.categoryprods.catpro = [...state.categoryprods.catpro, ...data]; // append
                }

                state.categoryprods.page = page;
                state.categoryprods.hasMore = data.length === 10; // false when last page
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