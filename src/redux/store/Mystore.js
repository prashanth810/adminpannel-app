import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "../slices/AuthSlice.js";
import CategorySlice from '../slices/CategorySlice.js';
import ProductSlice from '../slices/ProductSlice.js';
import UserSlice from '../slices/UserSlice.js';
import OrderSlice from '../slices/OrderSlice.js';


const Mystore = configureStore({
    reducer: {
        auth: AuthSlice,
        categories: CategorySlice,
        products: ProductSlice,
        allusers: UserSlice,
        order: OrderSlice,
    }
})

export default Mystore;