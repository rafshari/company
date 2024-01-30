import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from '@/services/api'

export const authAPI = createApi({
  baseQuery: axiosBaseQuery(),
  reducerPath: 'authAPI',
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (Data) => ({
        // url: `/auth/register`,
        url: `/register`,
        method: 'POST',
        data: Data,
      }),

      // transformResponse: (response) => response.data
    }),
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: `/auth/login`,
        method: 'POST',
        data: { email, password },
      }),
    }),
    getAccessToken: builder.mutation({
      query: (refreshToken) => ({
        url: `/auth/refresh-token`,
        method: 'POST',
        data: { refreshToken },
      }),
    }),
    logout: builder.mutation({
      query: (refreshToken) => ({
        url: `/auth/logout`,
        method: 'POST',
        data: { refreshToken },
      }),
    }),
  }),
})
export const {
  useRegisterUserMutation,
  useLoginMutation,
  useGetAccessTokenMutation,
  useLogoutMutation,
} = authAPI
