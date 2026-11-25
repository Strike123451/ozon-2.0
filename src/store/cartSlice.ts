import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { load } from './storage';
import type { CartItem, Product } from '../types';

const slice = createSlice({
  name: 'cart',
  initialState: { items: load<CartItem[]>('cart', []) },
  reducers: {
    addToCart(s, a: PayloadAction<Product>) {
      const found = s.items.find((i) => i.product.id === a.payload.id);
      if (found) found.qty += 1; else s.items.push({ product: a.payload, qty: 1 });
    },
    setQty(s, a: PayloadAction<{ id: string; qty: number }>) {
      const item = s.items.find((i) => i.product.id === a.payload.id);
      if (item) item.qty = Math.max(1, a.payload.qty);
    },
    removeFromCart(s, a: PayloadAction<string>) {
      s.items = s.items.filter((i) => i.product.id !== a.payload);
    },
    clearCart(s) { s.items = []; },
  },
});
export const { addToCart, setQty, removeFromCart, clearCart } = slice.actions;
export default slice.reducer;
