import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
      cartProducts: []
    },
    reducers: {
      addToCart: (state, action) => {
        state.cartProducts.push(action.payload)
      }
    }
  })

  export const { addToCart } = cartSlice.actions

  export default cartSlice.reducer