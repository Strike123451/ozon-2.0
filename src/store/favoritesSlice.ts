import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { load } from './storage';

const slice = createSlice({
  name: 'favorites',
  initialState: { ids: load<string[]>('favorites', []) },
  reducers: {
    toggleFavorite(s, a: PayloadAction<string>) {
      s.ids = s.ids.includes(a.payload) ? s.ids.filter((id) => id !== a.payload) : [...s.ids, a.payload];
    },
  },
});
export const { toggleFavorite } = slice.actions;
export default slice.reducer;
