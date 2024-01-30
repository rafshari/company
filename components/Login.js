import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { useLoginMutation } from '@/services/authApi'
import { setCredentials } from '@/redux/slices/authSlice'
import store from '@/redux/store'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'
import ButtonLoader from '@/components/ButtonLoader'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const [login, { isLoading }] = useLoginMutation()
  const { userInfo } = useSelector((state) => state.auth)
  const [loginError, setLoginError] = useState()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const userInfo = await login({ email, password }).unwrap()
      //console.log('userInfo', userInfo)
      let date = new Date()
      let accessTokenExpireDate = new Date(date.getTime() + 60 * 1000)
      let refreshTokenExpireDate = new Date(date.getTime() + 86400 * 1000)
      Cookies.set('accessToken', userInfo?.tokens?.accessToken, {
        expires: accessTokenExpireDate,
      })
      Cookies.set('refreshToken', userInfo?.tokens?.refreshToken, {
        expires: refreshTokenExpireDate,
      })
      store.dispatch(
        setCredentials({
          isLoggedIn: true,
          userId: userInfo?.userId,
          name: userInfo?.name,
          role: userInfo?.role,
          email: userInfo?.email,
        })
      )
      toast.success('ورود موفقیت آمیز بود')
      router.push('/')
    } catch (err) {
      console.log('error:', err?.data?.message)
      setLoginError(err?.data?.message)
      toast.error(' اطلاعات نادرست است !')
    }
  }

  useEffect(() => {
    if (userInfo) {
      router.push('/')
    }
  }, [userInfo])

  return (
    <section className='form mt-5'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-6 m-auto'>
            <div className='card bg-white p-4 mb-4'>
              <div className='card-body'>
                <h1>
                  <i className='fas fa-sign-in-alt'></i> ورود
                </h1>
                <p>وارد شوید و اطلاعات شرکت خود را وارد کنید</p>
                <form onSubmit={(e) => handleSubmit(e)}>
                  <div className='form-group'>
                    <label htmlFor='email_field'>آدرس ایمیل</label>
                    <input
                      id='email_field'
                      type='email'
                      name='email'
                      className='form-control'
                      placeholder='ایمیل خود را وارد کنید'
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                  </div>
                  <div className='form-group mb-4'>
                    <label htmlFor='password_field'>رمز عبور</label>
                    <input
                      id='password_field'
                      type='password'
                      name='password'
                      className='form-control'
                      placeholder='رمز عبور خود را وارد کنید'
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                    />
                  </div>
                  <div className='form-group d-grid gap-2'>
                    <button
                      type='submit'
                      className='btn btn-danger  d-md-block'
                    >
                      {isLoading ? <ButtonLoader /> : 'ورود'}
                    </button>
                  </div>
                </form>
                <p>
                  {' '}
                  رمز عبور خود را فراموش کرده اید؟{' '}
                  <Link href='/accounts/forgotpassword'>
                    رمز عبور جدید تعریف کنید
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
