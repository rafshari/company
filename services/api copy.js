import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

const baseQuery = fetchBaseQuery({ baseUrl: '' })

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery,
  extractRehydrationInfo(action, { reducerPath }) {
      return action.payload[reducerPath]
    
  },
  tagTypes: ['Company', 'User'],
  endpoints: (builder) => ({}),
})

export default apiSlice
