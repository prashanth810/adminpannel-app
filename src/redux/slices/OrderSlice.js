import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getallorders, getsingleorderdata } from "../services/Orderservice";

// get all order list
export const fetchallorders = createAsyncThunk("orders/fetchall", async (_, thunkAPI) => {
    try {
        const resposne = await getallorders();
        return resposne.data.orders;
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

// get single order data 
export const fetchsingleorderdata = createAsyncThunk("order/singlorder", async (id, thunkAPI) => {
    try {
        const response = await getsingleorderdata(id);
        return response.data.order;
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})

const initialState = {
    allordersdata: {
        ordersdata: [],
        orderloading: false,
        ordererror: null,
    },
    singlrorder: {
        singleorderdata: {},
        singleorderloading: false,
        singleordererror: null,
    },
};

const OrderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchallorders.pending, (state) => {
                state.allordersdata.orderloading = true;
                state.allordersdata.ordererror = null;
            })
            .addCase(fetchallorders.fulfilled, (state, action) => {
                state.allordersdata.orderloading = false;
                state.allordersdata.ordersdata = action.payload;
            })
            .addCase(fetchallorders.rejected, (state, action) => {
                state.allordersdata.orderloading = false;
                state.allordersdata.ordererror = action.payload;
            })

            // fetch single order data 
            .addCase(fetchsingleorderdata.pending, (state) => {
                state.singlrorder.singleorderloading = true;
                state.singlrorder.singleordererror = null;
            })
            .addCase(fetchsingleorderdata.fulfilled, (state, action) => {
                state.singlrorder.singleorderloading = false;
                state.singlrorder.singleorderdata = action.payload;
            })
            .addCase(fetchsingleorderdata.rejected, (state, action) => {
                state.singlrorder.singleorderloading = false;
                state.singlrorder.singleordererror = action.payload;
            })
    },
});

export default OrderSlice.reducer;