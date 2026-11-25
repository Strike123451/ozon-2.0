import { configureStore } from '@reduxjs/toolkit';
import products from './productsSlice';
import auth from './authSlice';
import cart from './cartSlice';
import favorites from './favoritesSlice';

export const store = configureStore({ reducer: { products, auth, cart, favorites } });

// Сохраняем корзину, избранное и сессию в localStorage
store.subscribe(() => {
  const { auth, cart, favorites } = store.getState();
  try {
    localStorage.setItem('auth', JSON.stringify({ user: auth.user, token: auth.token }));
    localStorage.setItem('cart', JSON.stringify(cart.items));
    localStorage.setItem('favorites', JSON.stringify(favorites.ids));
  } catch { /* ignore */ }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
