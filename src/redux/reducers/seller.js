import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isSeller: false,
   shop: null, 
   loading: true,
   isLoading: false,
  // isLoading:true,
   error: null,
};

//builder callback notation
export const sellerReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("LoadSellerRequest", (state) => {
      state.loading = true;
    })
    .addCase("LoadSellerSuccess", (state, action) => {
      state.loading = false;
      state.isSeller = true;
      state.isSeller = action.payload;
    })
    .addCase("LoadSellerFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isSeller = false;
    })
     .addCase("clearErrors", (state) => {
      state.error = null;
    })
 
});
