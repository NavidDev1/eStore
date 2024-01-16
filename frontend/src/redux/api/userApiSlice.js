import { apiSlice } from './apiSlice';
import { USERS_URL } from '../features/constants';

// Create a new API slice specific to the 'users' domain by injecting endpoints
// Define the endpoints for the 'users' domain using the injectEndpoints method
export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation } = userApiSlice;
