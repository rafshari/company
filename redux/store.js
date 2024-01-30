import { configureStore } from '@reduxjs/toolkit'
import filterReducer from '@/redux/slices/filterSlice'
import companyReducer from '@/redux/slices/companySlice'
import authReducer from '@/redux/slices/authSlice'
import formReducer from '@/redux/slices/formSlice'

//import apiSlice from '@/services/api'
import { authAPI } from '@/services/authApi'
import { userAPI } from '@/services/userApi'
import { companyAPI } from '@/services/companyApi'

//? Actions
export * from '@/redux/slices/filterSlice'

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    company: companyReducer,
    auth: authReducer,
    form: formReducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
    [companyAPI.reducerPath]: companyAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authAPI.middleware,
      userAPI.middleware,
      companyAPI.middleware
    ),
})

export default store
