"use client";
import { configureStore } from "@reduxjs/toolkit";
import {ApiSlice} from './features/api/apiSlice'

export const store = configureStore({
  reducer: {
    [ApiSlice.reducerPath]: ApiSlice.reducer
  },
  devTools: false,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ApiSlice.middleware),
});
