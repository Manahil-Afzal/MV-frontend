// import {createReducer} from "@reduxjs/toolkit";

// const initialState = {
//     isLoading: true,
// }

// export const productReducer = createReducer(initialState, {
//     productCreateRequest: (state) =>{
//         state.isLoading = true;
//     },
//     productCreateSuccess : (state,action) =>{
//         state.isLoading = false;
//         state.product = action.payload;
//         state.success = true;
//     },
//     productCreateFail:(state,action) =>{
//         state.isLoading= false;
//         state.error = action.payload;
//         state.success = false;
//     },
//     clearErrors :(state) =>{
//         state.error = null;
//     },
// });

import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const productReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("productCreateRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("productCreateSuccess", (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
      state.success = true;
    })
    .addCase("productCreateFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});
