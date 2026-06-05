import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import deviceReducer from "./deviceSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    devices: deviceReducer,
  },
});
