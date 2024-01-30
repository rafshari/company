import apiSlice from 'services/api'

const COMPANIES_URL = 'http://localhost:5000'
export const CompanyApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCompanies: builder.query({
      query: ({ page, state, city }) => ({
        url: `${COMPANIES_URL}/api/v1/companies?page=${page}&state=${state}&city=${city}`,
        method: 'GET',
      }),
      providesTags: ['Company'],
    }),
    getSingleCompany: builder.query({
      query: ({ id }) => ({
        url: `${COMPANIES_URL}/api/v1/companies/${id}`,
        method: 'GET',
      }),
      providesTags: ['Company'],
    }),

    deleteCompany: builder.mutation({
      query: ({ id, token }) => ({
        url: `${COMPANIES_URL}/api/v1/companies/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Company'],
    }),

    createCompany: builder.mutation({
      query: ({ body, token }) => ({
        url: `/api/companies`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Company'],
    }),

    updateCompany: builder.mutation({
      query: ({ id, token, body }) => ({
        url: `${COMPANIES_URL}/api/v1/api/companies/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Company'],
    }),
  }),
})

export const {
  useDeleteCompanyMutation,
  useCreateCompanyMutation,
  useGetCompaniesQuery,
  useGetSingleCompanyQuery,
  useUpdateCompanyMutation,
} = CompanyApiSlice
