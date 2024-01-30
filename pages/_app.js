import 'bootstrap/dist/css/bootstrap.css'
import 'react-toastify/dist/ReactToastify.css'

import '../styles/globals.css'
import localFont from 'next/font/local'

import { store } from '@/redux/store'
import Script from 'next/script'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'

const myFont = localFont({ src: './fonts/vazir/Vazir.woff2' })

export default function App({ Component, pageProps }) {
  return (
    <main className={myFont.className}>
      <Provider store={store}>
        <Component {...pageProps} />
        <ToastContainer />
      </Provider>
    </main>
  )
}
