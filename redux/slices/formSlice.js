import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  step: 1,
}

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    nextStep: (state) => {
   state.step = Math.min(Math.max(state.step + 1, 1), 3)
    },
    prevStep: (state) => {
     state.step = Math.min(Math.max(state.step - 1, 1), 3)
    },
    resetForm(state) {
      return initialState
    },
  },
})

export const { nextStep, prevStep, resetForm } =
  formSlice.actions

export default formSlice.reducer
