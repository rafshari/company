import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useRegisterUserMutation } from '@/services/authApi'
import { setCredentials } from '@/redux/slices/authSlice'
import { toast } from 'react-toastify'
import { useGetUserMutation } from '@/services/userApi'
import Cookies from 'js-cookie'
import ButtonLoader from '@/components/ButtonLoader'
import store from '@/redux/store'

const Register = () => {
  const [registerUser, { isLoading }] = useRegisterUserMutation()
  const router = useRouter()
  const [getUser] = useGetUserMutation()
  const [signUpError, setSignUpError] = useState()

  const [formData, setFormData] = useState({
    name: '',
    phone:'',
    email: '',
    password: '',
    password2: '',
    role: 'user',
  })
  const { name,phone, email, password, password2, role } = formData

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== password2) {
       toast.error('Passwords must match')
    }
    try {
      const userInfo = await registerUser({
        name,
        phone,
        email,
        password,
        role,
      }).unwrap()
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
      toast.success('ثبت نام موفقیت آمیز بود')
      router.push('/companies/managecompany')
    } catch (err) {
      console.log(err?.data?.message)
      setSignUpError(err?.data?.message)
      toast.error(' اطلاعات نادرست است!')
    }
  }

   return (
     <section className='form mt-5'>
       <div className='container'>
         <div className='row'>
           <div className='col-md-6 m-auto'>
             <div className='card bg-white p-4 mb-4'>
               <div className='card-body'>
               
             
                 <form onSubmit={(e) => handleSubmit(e)}>
                   <div className='form-group'>
                     <label htmlFor='name'>نام و نام خانوادگی</label>
                     <input
                       type='text'
                       name='name'
                       className='form-control'
                       placeholder='نام و نام خانوادگی را وارد کنید'
                       onChange={(e) => handleChange(e)}
                       value={name}
                     />
                   </div>
           
                 </form>
                 <p>
                   {' '}
                   قبلا ثبت نام کرده اید?{' '}
                   <Link href='/auth/login'>وارد شوید</Link>
                 </p>
               </div>
             </div>
           </div>
         </div>
       </div>
     </section>
   )
}

export default Register
