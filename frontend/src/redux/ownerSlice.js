import { createSlice } from "@reduxjs/toolkit";

const ownerSlice = createSlice({
    name: "owner",
    initialState: {
        myShopData: null,
    },
    reducers: {
        setMYShopData: (state, action) => {
            state.myShopData = action.payload
        },


    }
})

export const { setMYShopData } = ownerSlice.actions
export default ownerSlice.reducer