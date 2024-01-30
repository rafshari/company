import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    userId: null,
    name: null,
    phone: null,
    email: null,
    role: null,
  },
  reducers: {
    setCredentials: (
      state,
      {
        payload: {
          isLoggedIn = null,
          userId = '',
          name = '',
          phone = '',
          email = '',
          role = '',
        },
      }
    ) => {
      if (isLoggedIn) {
        state.isLoggedIn = isLoggedIn
      }
      if (userId) {
        state.userId = userId
      }
      if (name) {
        state.name = name
      }
      if (phone) {
        state.phone = phone
      }
      if (email) {
        state.email = email
      }
      if (role) {
        state.role = role
      }
     
    },
    removeUser: (state) => {
      state.isLoggedIn = false
      state.userId = ''
      state.name = ''
      state.phone = ''
      state.email = ''
      state.role = ''
    
    },
  },
})

export const { setCredentials, removeUser } = authSlice.actions

export const logoutUser = () => async (dispatch) => {
  Cookies.remove('accessToken', { path: '/' })
  Cookies.remove('refreshToken', { path: '/' })
  dispatch(removeUser())
}

export default authSlice.reducer
