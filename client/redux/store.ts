import {configureStore} from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {

    },
    devTools: false,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat()
});

export default store;