import {configureStore} from '@reduxjs/toolkit';
import { apiSlice } from './features/api/apiSlice'

const store = configureStore({
    reducer: {
        api: apiSlice.reducer
    },
    devTools: false,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat()
});

export default store;