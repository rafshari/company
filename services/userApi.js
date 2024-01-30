import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from '@/services/api'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const userAPI = createApi({
  baseQuery: axiosBaseQuery(),
  reducerPath: 'userAPI',
  endpoints: (builder) => ({
    getUser: builder.mutation({
      query: () => ({
        url: `/user`,
        method: 'GET',
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `/auth/profile`,
        method: 'PUT',
        body: data,
      }),
    }),
    getUsers: builder.query({
      query: ({ page }) => ({
        url: `/api/user?page=${page}`,
        method: 'GET',
      }),
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.users.map(({ _id }) => ({
                type: 'User',
                id: _id,
              })),
              'User',
            ]
          : ['User'],
    }),

    createUser: builder.mutation({
      query: ({ body }) => ({
        url: '/auth/register',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),

    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `/user/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),

    editUser: builder.mutation({
      query: ({ body }) => ({
        url: '/user',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (result, err, arg) => [
        { type: 'User', id: arg.body._id },
      ],
    }),
  }),
})

export const { useGetUserMutation, useUpdateUserMutation } = userAPI
