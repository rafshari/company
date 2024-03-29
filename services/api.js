import axios from 'axios';
import { setCredentials, logoutUser } from '@/redux/slices/authSlice'
import store from '@/redux/store';
import Cookies from 'js-cookie'

//const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
const BASE_URL = "/api/posting"

//const BASE_URL = "http://localhost:5000";
//console.log('BASE_URL:', process.env.NEXT_PUBLIC_BASE_URL)

const server = axios.create({
 //baseURL: `${BASE_URL}/api/v1`
 //baseURL: `${BASE_URL}`
 baseURL: `${BASE_URL}`
  
})

// Add a request interceptor
server.interceptors.request.use(
  async function (config) {
    // Do something before request is sent
    // console.log(config)
    const accessToken =  Cookies.get("accessToken");
    if (accessToken) {
      config.headers.Authorization = accessToken;
      }
    console.log('config:',config)
    return config;
  },
  function (error) {
    // Do something with request error
   // console.log(error)
    return Promise.reject(error);
  },
);

// Add a response interceptor
server.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const originalConfig = error.config;
    if (error.response) {
      if (error.response?.status === 401 && !originalConfig._retry) {
        console.log("refreshing")
        originalConfig._retry = true;
        try {
          const currentRefreshToken = Cookies.get("refreshToken");
          const rs = await server.post('/auth/refresh-token', {
            refreshToken: currentRefreshToken,
          });
          const {accessToken} = rs.data;
          if (accessToken) {
            const date = new Date();
            let accessTokenExpireDate=  new Date(date.getTime() +(60*1000));
            Cookies.set("accessToken", accessToken, {expires: accessTokenExpireDate})
            return server(originalConfig);
          }
        } catch (_error) {
          return Promise.reject(_error);
        }
      }

      if (error.response?.status === 403) {
 // Logout user
        store.dispatch(logoutUser())
      }
    }
    return Promise.reject(error);
  },
);

export const axiosBaseQuery = () => async ({ url, method, data }) => {
    try {
      const result = await server(
        { url, method, data }
      )
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError;
      return {
        error: {status: err.response?.status, data: err.response?.data},
      };
    }
  };

export default server;
