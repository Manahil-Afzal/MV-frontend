

import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
   allEvents: [],
};

export const eventReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("eventCreateRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("eventCreateSuccess", (state, action) => {
      state.isLoading = false;
      state.event = action.payload;
      state.success = true;
    })
    .addCase("eventCreateFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })
    
      // get all events of shop
     .addCase("getAlleventsShopRequest", (state) => {
          state.isLoading = true; 
     })
    .addCase("getAlleventsShopSuccess", (state,action) => {
          state.isLoading = false; 
          state.shopEvents = action.payload;
     })
    .addCase("getAlleventsShopFailed", (state, action)=>{
          state.isLoading = false; 
          state.error = action.payload;
     })

       // delete all events of shop
    .addCase("deleteeventRequest", (state) => {
          state.isLoading = true;
     })
   .addCase("deleteeventSuccess", (state, action) => {
  state.isLoading = false;
  state.success = true;
  state.message = action.payload; // message from backend
})
.addCase("deleteeventFailed", (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
  state.success = false;
})



     // get all events of shop
     .addCase("getAlleventsRequest", (state) => {
          state.isLoading = true; 
     })
    .addCase("getAlleventsSuccess", (state,action) => {
          state.isLoading = false; 
          state.allEvents = action.payload;
     })
    .addCase("getAlleventsFailed", (state, action)=>{
          state.isLoading = false; 
          state.error = action.payload;
     })

    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});
