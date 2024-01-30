import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { apiSlice } from '../api/apiSlice';
import authReducer from '../features/auth/authSlice';
import cartSliceReducer from '../api/cartSlice';
// Configure Redux store using Redux Toolkit with async data fetching setup

// Configure Redux store with apiSlice reducer and middleware
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    cart: cartSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true, // Enable Redux DevTools extension
});

// Setup listeners for async data fetching with Redux Toolkit Query
setupListeners(store.dispatch);

export default store;
