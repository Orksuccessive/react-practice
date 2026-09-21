import {
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import type {
  CartItem,
  Product,
} from "../types/cart";

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    addItem: (
      state,
      action: PayloadAction<Product>
    ) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
        });
      }
    },

    removeItem: (
      state,
      action: PayloadAction<number>
    ) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
    },

    increase: (
      state,
      action: PayloadAction<number>
    ) => {
      const item = state.items.find(
        (item) => item.id === action.payload
      );

      if (item) {
        item.quantity++;
      }
    },

    decrease: (
      state,
      action: PayloadAction<number>
    ) => {
      const item = state.items.find(
        (item) => item.id === action.payload
      );

      if (item) {
        item.quantity--;

        if (item.quantity <= 0) {
          state.items = state.items.filter(
            (item) => item.id !== action.payload
          );
        }
      }
    },
  },
});

export const {
  addItem,
  removeItem,
  increase,
  decrease,
} = cartSlice.actions;

export default cartSlice.reducer;