import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: 'include', // Include credentials (cookies) in cross-origin requests
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Product', 'Order', 'Category'],
  endpoints: () => ({}),
});
