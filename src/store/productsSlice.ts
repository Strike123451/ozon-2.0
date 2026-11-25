import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchProducts } from '../api/products';
import type { Product } from '../types';

export const loadProducts = createAsyncThunk('products/load', fetchProducts);

interface State { items: Product[]; status: 'idle' | 'loading' | 'done' | 'error' }
const initialState: State = { items: [], status: 'idle' };

const slice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (b) => {
    b.addCase(loadProducts.pending, (s) => { s.status = 'loading'; });
    b.addCase(loadProducts.fulfilled, (s, a) => { s.items = a.payload; s.status = 'done'; });
    b.addCase(loadProducts.rejected, (s) => { s.status = 'error'; });
  },
});
export default slice.reducer;
