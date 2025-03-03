import {configureStore} from '@reduxjs/toolkit';
import { apiSlice } from './features/api/apiSlice';
import authSlice from './features/auth/authSlice';

const store = configureStore({
    reducer: {
        api: apiSlice.reducer,
        auth: authSlice
    },
    devTools: false,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
});

//call refresh token on every page load
const initializeApp = async () => {
    await store.dispatch(apiSlice.endpoints.refreshToken.initiate({}, {forceRefetch: true}))
}

initializeApp();

export default store;