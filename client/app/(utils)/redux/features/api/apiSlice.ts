import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const ApiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_SERVER_URI,
    }),
    endpoints: (builder) => ({}),
})

export const {} = ApiSlice;