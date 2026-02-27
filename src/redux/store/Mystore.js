import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "../slices/AuthSlice";


const Mystore = configureStore({
    reducer: {
        auth: AuthSlice
    }
})

export default Mystore;