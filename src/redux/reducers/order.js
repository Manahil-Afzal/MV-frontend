
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  // isLoading: true,
   isLoading: false,
  allOrders: [],
  product: null,
  error: null,
  success: false, 
  message: null,
};

export const orderReducer = createReducer(initialState, (builder) => {
  builder
 .addCase("getAllOrdersUserRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllOrdersUserSuccess", (state, action) => {
      state.isLoading = false;
      state.allOrders = action.payload;
    })
    .addCase("getAllOrdersUserFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

// get all orders of shop
 .addCase("getAllOrdersShopRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllOrdersShopSuccess", (state, action) => {
      state.isLoading = false;
      state.allOrders = action.payload;
    })
    .addCase("getAllOrdersShopFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});
