import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from '@/services/api'

export const companyAPI = createApi({
  baseQuery: axiosBaseQuery(),
  reducerPath: 'companyAPI',
  endpoints: (builder) => ({
    getCompanies: builder.query({
      query: ({ page, state, city }) => ({
        url: `/companies?page=${page}&state=${state}&city=${city}`,
        method: 'GET',
      })
    }),
    getSingleCompany: builder.query({
      query: ({ id }) => ({
        url: `/companies/${id}`,
        method: 'GET',
      })
    }),

    deleteCompany: builder.mutation({
      query: ({ id, token }) => ({
        url: `/companies/${id}`,
        method: 'DELETE',
      })
    }),

    createCompany: builder.mutation({
      query: ( companyData ) => ({
        url: `/companies`,
        method: 'POST',
        data: companyData,
      }),

    }),

    updateCompany: builder.mutation({
      query: ({ id, token, body }) => ({
        url: `/companies/${id}`,
        method: 'PUT',
        body,
      })
    }),
  }),
})

export const {
  useCreateCompanyMutation,
  useGetCompaniesQuery,
  useGetSingleCompanyQuery,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
} = companyAPI
