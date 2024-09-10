import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Create an API service using RTK Query
export const shazamCoreApi = createApi({
  reducerPath: 'shazamCoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam-core7.p.rapidapi.com/',
    prepareHeaders: (headers) => {
      // Set the API key from environment variables
      headers.set('x-rapidapi-key', import.meta.env.VITE_SHAZAM_CORE_RAPID_API_KEY);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({
      query: () => 'charts/get-top-songs-in-world?limit=10',
    }),
    getSongsByGenre: builder.query({
      query: (genre) => `charts/get-top-songs-in-world?genre=${genre}&limit=10`,
    }),
    getSongsByCountry: builder.query({
      query: (countryCode) => `charts/get-top-songs-in-country?country_code=${countryCode}`,
    }),
    getSongsBySearch: builder.query({
      query: (searchTerm) => `search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}`,
    }),
    getArtistDetails: builder.query({
      query: (artistId) => `artists/get-details?id=${artistId}`,
    }),
    getSongDetails: builder.query({
      query: (songId) => `songs/get-details?id=${songId}`,
    }),
    getSongRelated: builder.query({
      query: (songId) => `songs/get-related?id=${songId}`,
    }),
  }),
});

// Export hooks for querying the API
export const {
  useGetTopChartsQuery,
  useGetSongsByGenreQuery,
  useGetSongsByCountryQuery,
  useGetSongsBySearchQuery,
  useGetArtistDetailsQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
} = shazamCoreApi;
