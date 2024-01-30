'use client';
import { createSlice } from '@reduxjs/toolkit'

if (typeof window !== 'undefined') {
  const initialState = {
    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,
  }
}
  const authSliceReact = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      setCredentialsReact: (state, action) => {
        state.userInfo = action.payload
        localStorage.setItem('userInfo', JSON.stringify(action.payload))
      },
      logoutReact: (state, action) => {
        state.userInfo = null
        localStorage.removeItem('userInfo')
      },
    },
  })

export const { setCredentialsReact, logoutReact } = authSliceReact.actions 
export default authSliceReact.reducer

