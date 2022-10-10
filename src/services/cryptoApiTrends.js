import  { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const trandApiHeaders = {
        'X-RapidAPI-Key': 'c287427f61msh47b98b1c90b5864p1f27f4jsn490f8bf98728',
        'X-RapidAPI-Host': 'crypto-tracker.p.rapidapi.com'
}

const baseUrl = 'https://crypto-tracker.p.rapidapi.com/api';
const createRequest = (url) => ({url, headers: trandApiHeaders})

export const trandApi = createApi({
    reducerPath: 'trandApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
        getResentlyAdded: builder.query({
            query: () => createRequest('/recentlyadded')
        })
    })
})

export const {useGetResentlyAddedQuery} = trandApi;
