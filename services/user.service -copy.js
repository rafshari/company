import apiSlice from 'services/api'
import { HYDRATE } from 'next-redux-wrapper'

export const userApiSlice = apiSlice.injectEndpoints({
  extractRehydrationInfo(action, { reducerPath }) {
    return action.payload[reducerPath]
  },
  endpoints: (builder) => ({
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
        url: '/api/auth/register',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),



    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `/api/user/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),

    editUser: builder.mutation({
      query: ({ body }) => ({
        url: '/api/user',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (result, err, arg) => [
        { type: 'User', id: arg.body._id },
      ],
    }),

  }),
})

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useLoginMutation,
  useDeleteUserMutation,
  useEditUserMutation,
  useGetUserInfoQuery,
} = userApiSlice
