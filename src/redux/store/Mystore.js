import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "../slices/AuthSlice.js";
import CategorySlice from '../slices/CategorySlice.js';
import ProductSlice from '../slices/ProductSlice.js';


const Mystore = configureStore({
    reducer: {
        auth: AuthSlice,
        categories: CategorySlice,
        products: ProductSlice,
    }
})

export default Mystore;