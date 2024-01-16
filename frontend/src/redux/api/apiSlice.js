import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../features/constants';

// Configure the baseQuery with the fetchBaseQuery function
// This sets the baseUrl for making HTTP requests
const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

// Create an API slice using createApi function
export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Product', 'Order', 'User', 'Category'],
  endpoints: () => ({}),
});
