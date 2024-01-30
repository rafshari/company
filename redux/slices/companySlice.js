import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  companyList: [],
  companiesCount: 0,
  filteredCompaniesCount: 0,
  resPerPage: 4,
  companyDetail: {},
  reviews: [],
}

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    addCompany: (state, action) => {
      state.companyDetail = action.payload
    },
    updateCompany: (state, action) => {
       state.companyDetail = { ...state.companyDetail, ...action.payload }
    },

    deleteCompany: (state, action) => {},

    getCompany: (state, action) => {},

    getCompanies: (state, action) => {},
  },
})

export const {
  addCompany,
  updateCompany,
  deleteCompany,
  getCompany,
  getCompanies,
} = companySlice.actions

export default companySlice.reducer
