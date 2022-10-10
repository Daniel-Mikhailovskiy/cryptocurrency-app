import  { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
    'X-RapidAPI-Key': 'c287427f61msh47b98b1c90b5864p1f27f4jsn490f8bf98728',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
  }

const baseUrl = 'https://coinranking1.p.rapidapi.com'
const createRequest = (url) => ({url, headers: cryptoApiHeaders})

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`)
        }),
        getCryptoDetails: builder.query({
            query: (coinId) => createRequest(`/coin/${coinId}`),
          }),
        getCryptoHistory: builder.query({
            query: ({coinId, timestamp }) => createRequest(`coin/${coinId}/history?timeperiod=${timestamp}`),
          }),
    })
       
})


export const { useGetCryptosQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } = cryptoApi;