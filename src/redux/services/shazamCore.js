import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shazamCoreApi = createApi({
  reducerPath: 'shazamCoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam-core7.p.rapidapi.com/',
    prepareHeaders: (headers) => {
      headers.set('x-rapidapi-key', "59cd43aa72msh7de49211ed76d6ap1035e1jsn84a8350cb9a1");

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({ query: () => 'charts/get-top-songs-in-world?limit=10' }),
    
  }),
});

export const {
    useGetTopChartsQuery,
  
} = shazamCoreApi;