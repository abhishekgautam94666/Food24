import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        userData: null,
        currentCity: null,
        currentState: null,
        currentAddress: null,
        itemsInMyCity: [],
        cartItems: [],
        totalAmount: 0,
        myOrders: null,
        ownerOrders: null


    },
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload
        },
        setCurrentCity: (state, action) => {
            state.currentCity = action.payload
        },
        setCurrentState: (state, action) => {
            state.currentState = action.payload
        },
        setCurrentAddress: (state, action) => {
            state.currentAddress = action.payload
        },
        setItemsInMyCity: (state, action) => {
            state.itemsInMyCity = action.payload
        },
        addToCart: (state, action) => {
            const cartItem = action.payload;
            const existingItem = state.cartItems.find(i => i.id === cartItem.id)
            if (existingItem) {
                existingItem.quantity += cartItem.quantity;
            } else {
                state.cartItems.push(cartItem)
            }
            state.totalAmount = state.cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0)

        },
        increaseQuantity: (state, action) => {
            const id = action.payload;

            const item = state.cartItems.find(
                (i) => i.id === id
            );

            if (item) {
                item.quantity += 1;
            }
            state.totalAmount = state.cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0)
        },
        decreaseQuantity: (state, action) => {
            const id = action.payload;

            const item = state.cartItems.find(
                (i) => i.id === id
            );

            if (item) {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    state.cartItems = state.cartItems.filter(
                        (i) => i.id !== id
                    );
                }
            }
            state.totalAmount = state.cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0)
        },
        setMyOrders: (state, action) => {
            state.myOrders = action.payload
        },
        setOwnerOrders: (state, action) => {
            state.ownerOrders = action.payload
        }
    }
})

export const { setOwnerOrders, setMyOrders, increaseQuantity, decreaseQuantity, addToCart, setUserData, setCurrentCity, setCurrentState, setCurrentAddress, setItemsInMyCity

} = userSlice.actions
export default userSlice.reducer