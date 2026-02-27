import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    loginuser: {
        logindata: {},
        loginerror: null,
        loginloading: false,
    }
}

const AuthSlice = createSlice({
    name: "auth",
    initialState,

    reducers: {},
    extraReducers: (builder) => {

    }
})


export default AuthSlice.reducer;