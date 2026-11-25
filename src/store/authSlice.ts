import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { login } from '../api/auth';
import { load } from './storage';
import type { User } from '../types';

export const loginThunk = createAsyncThunk<
  { user: User; token: string }, { username: string; password: string }, { rejectValue: string }
>('auth/login', async ({ username, password }, { rejectWithValue }) => {
  try {
    const { accessToken, ...user } = await login(username, password);
    return { user, token: accessToken };
  } catch {
    return rejectWithValue('Неверный логин или пароль');
  }
});

interface State { user: User | null; token: string | null; loading: boolean; error: string | null }
const saved = load<{ user: User | null; token: string | null }>('auth', { user: null, token: null });
const initialState: State = { ...saved, loading: false, error: null };

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(s) { s.user = null; s.token = null; },
  },
  extraReducers: (b) => {
    b.addCase(loginThunk.pending, (s) => { s.loading = true; s.error = null; });
    b.addCase(loginThunk.fulfilled, (s, a) => { s.loading = false; s.user = a.payload.user; s.token = a.payload.token; });
    b.addCase(loginThunk.rejected, (s, a) => { s.loading = false; s.error = a.payload ?? 'Ошибка входа'; });
  },
});
export const { logout } = slice.actions;
export default slice.reducer;
