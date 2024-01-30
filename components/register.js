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
  const [avatar, setAvatar] = useState('')
  const [avatarPreview, setAvatarPreview] = useState(
    '/images/default_avatar.jpeg'
  )
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    password2: '',
    role: 'user',
  })

  const { name, phone, email, password, password2, role } = formData


  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'avatar') {
      const reader = new FileReader()
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatar(reader.result)
          setAvatarPreview(reader.result)
        }
      }
      reader.readAsDataURL(e.target.files[0])
    } else {
      setFormData((preState) => ({
        ...preState,
        [name]: value,
      }))
    }
  }


  

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== password2) {
      toast.error('رمز عبور تطابق ندارد')
    } else {
          
      try {
         const Data = {
           ...formData,
           avatar,
        }
        console.log('userInfo-0:', Data)

        const userInfo = await registerUser(Data).unwrap()
console.log('userInfo:', userInfo)
        // let date = new Date()
        // let accessTokenExpireDate = new Date(date.getTime() + 60 * 1000)
        // let refreshTokenExpireDate = new Date(date.getTime() + 86400 * 1000)
        // Cookies.set('accessToken', userInfo?.tokens?.accessToken, {
        //   expires: accessTokenExpireDate,
        // })
        // Cookies.set('refreshToken', userInfo?.tokens?.refreshToken, {
        //   expires: refreshTokenExpireDate,
        // })
        // store.dispatch(
        //   setCredentials({
        //     isLoggedIn: true,
        //     userId: userInfo?.userId,
        //     name: userInfo?.name,
        //     role: userInfo?.role,
        //     email: userInfo?.email,
        //   })
        // )
        // toast.success('ثبت نام موفقیت آمیز بود')
        // router.push('/companies/managecompany')
      } catch (err) {
        console.log(err?.data?.message)
      // setSignUpError(err?.data?.message)
        toast.error(' اطلاعات نادرست است!')
      }
    }
  }
  return (
    <section className='form mt-3 '>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <div className='card bg-white p-2 mb-2'>
              <div className='card-body'>
                <h1>
                  <i className='bi bi-box-arrow-right ms-2'></i>ثبت نام
                </h1>
                <p>
                  ثبت نام کنید و شرکت تون رو ثبت کنید و از مزایای رتبه بندی،
                  بررسی دیدگاه ها در خصوص شرکت خود بهره مند شوید
                </p>
                <form onSubmit={handleSubmit}>
                  <div className='form-group'>
                    <label htmlFor='name'>نام و نام خانوادگی</label>
                    <input
                      type='text'
                      name='name'
                      className='form-control'
                      placeholder='نام و نام خانوادگی را وارد کنید'
                      onChange={handleChange}
                      value={name}
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='phone'>شماره همراه</label>
                    <input
                      type='number'
                      name='phone'
                      className='form-control'
                      placeholder='شماره همراه را وارد کنید'
                      onChange={handleChange}
                      value={phone}
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='email'>آدرس ایمیل</label>
                    <input
                      type='email'
                      name='email'
                      className='form-control'
                      placeholder='ایمیل را وارد کنید'
                      onChange={handleChange}
                      value={email}
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='password'>رمز عبور</label>
                    <input
                      type='password'
                      name='password'
                      className='form-control'
                      placeholder='رمز عبور را وارد کنید'
                      onChange={handleChange}
                      value={password}
                    />
                  </div>
                  <div className='form-group mb-4'>
                    <label htmlFor='password2'>رمز عبور مجدد</label>
                    <input
                      type='password'
                      name='password2'
                      className='form-control'
                      placeholder='رمز عبور مجدد را وارد کنید'
                      onChange={handleChange}
                      value={password2}
                    />
                  </div>

                  <div className='card card-body mb-3'>
                    <h5>سمت کاربر:</h5>
                    <div className='form-check'>
                      <label className='role' htmlFor='role'>
                        کاربر معمولی (مرور، ثبت دیدگاه و غیره){' '}
                      </label>
                      <input
                        className='form-check-input'
                        type='radio'
                        name='role'
                        value='user'
                        onChange={(e) =>
                          setFormData({ ...formData, role: 'user' })
                        }
                        checked
                      />
                    </div>
                    <div className='form-check'>
                      <input
                        className='form-check-input'
                        type='radio'
                        name='role'
                        value='publisher'
                        onChange={(e) =>
                          setFormData({ ...formData, role: 'publisher' })
                        }
                      />
                      <label className='role' htmlFor='role'>
                        مدیر شرکت حمل و نقل{' '}
                      </label>
                    </div>
                  </div>
                  <div className='mb-3'>
                    <label htmlFor='avatar'>انتخاب تصویر پروفایل</label>
                    <div className='d-flex align-items-center'>
                      <div>
                        <figure className='avatar mr-3 item-rtl'>
                          <img
                            src={avatarPreview}
                            className='rounded-circle'
                            alt='تصویر'
                          />
                        </figure>
                      </div>
                      <div className='custom-file'>
                        <input
                          type='file'
                          accept='.png, .jpg, .jpeg'
                          name='avatar'
                          id='customFile'
                          onChange={handleChange}
                        />
                        <label className='custom-file-label' htmlFor='avatar'>
                          انتخاب تصویر پروفایل:
                        </label>
                      </div>
                    </div>
                  </div>
                  <p className='text-danger fst-italic'>
                    شما بایستی مدیر یا نماینده شرکت باشید تا بتوانید اطلاعات را
                    وارد کنید
                  </p>

                  <div className='form-group d-grid gap-2'>
                    <button className='btn btn-danger d-md-block' type='submit'>
                      {isLoading ? <ButtonLoader /> : 'ثبت نام'}
                    </button>
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
