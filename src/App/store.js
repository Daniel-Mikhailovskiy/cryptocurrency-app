import { configureStore } from '@reduxjs/toolkit';
import { cryptoApi } from '../services/cryptoApi';
import { cryptoNewsApi } from '../services/cryptoNewsApi';
import { trandApi } from '../services/cryptoApiTrends';
// import { cryptoApiDetails } from '../services/cryptoApiDetails';

export default configureStore({
    reducer: {
        [cryptoApi.reducerPath]: cryptoApi.reducer,
        [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
        // [cryptoApiDetails.reducerPath]: cryptoApiDetails.reducer,
        [trandApi.reducerPath]: trandApi.reducer,
    }
});