// import {createReducer} from "@reduxjs/toolkit";

// const initialState = {
//       wishlist: localStorage.getItem("wishlistItems")
//        ? JSON.parse(localStorage.getItem("wishlistItems"))
//        : [],
// };

// export const wishlistReducer = wishlistReducer (initialState, {
//      addToWishlist : (state,action) =>{
//         const item = action.payload;
//         const isItemExist = state.wishlist.find((i) = i._id === item._id);


//         if (isItemExist) {
//             return {
//                  ...state,
//                   wishlist: state.wishlist.map((i) => (i._id === isItemExist._id ? item : i)),
//             };
//         } else{
//             return {
//                 ...state,
//                 wishlist: [...state.wishlist, item],
//             };
//         }
//      },
//          removeFromWishlist: (state, action) => {
//             return {
//                 ...state,
//                 wishlist: state.wishlist.filter((i) => i._id !== action.payload),
//             };
//          },
// });


import { createReducer } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  wishlist: localStorage.getItem("wishlistItems")
    ? JSON.parse(localStorage.getItem("wishlistItems"))
    : [],
};

// Reducer using builder callback
export const wishlistReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("addToWishlist", (state, action) => {
      const item = action.payload;
      const isItemExist = state.wishlist.find((i) => i._id === item._id);

      if (isItemExist) {
        state.wishlist = state.wishlist.map((i) =>
          i._id === isItemExist._id ? item : i
        );
      } else {
        state.wishlist.push(item);
      }

      localStorage.setItem("wishlistItems", JSON.stringify(state.wishlist));
    })
    .addCase("removeFromWishlist", (state, action) => {
      state.wishlist = state.wishlist.filter((i) => i._id !== action.payload);
      localStorage.setItem("wishlistItems", JSON.stringify(state.wishlist));
    });
});

// Optional: async actions (thunks)
export const addToWishlistAction = (data) => async (dispatch) => {
  dispatch({ type: "addToWishlist", payload: data });
  return data;
};

export const removeFromWishlistAction = (data) => async (dispatch) => {
  dispatch({ type: "removeFromWishlist", payload: data._id });
  return data;
};
