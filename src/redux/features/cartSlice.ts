import { IMedicineType } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem extends IMedicineType {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id,
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }

      state.totalPrice = state.items.reduce(
        (total, item) => total + Number(item.price) * item.quantity,
        0,
      );
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload,
      );

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.items = state.items.filter(
            (item) => item.id !== action.payload,
          );
        }
      }

      state.totalPrice = state.items.reduce(
        (total, item) => total + Number(item.price) * item.quantity,
        0,
      );
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.totalPrice = state.items.reduce(
        (total, item) => total + Number(item.price) * item.quantity,
        0,
      );
    },
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart, decreaseQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
