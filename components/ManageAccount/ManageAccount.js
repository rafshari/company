import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import ButtonLoader from '../ButtonLoader'
import { useUpdateUserMutation } from '@/services/userApi'

const ManageAccount = () => {
  const user = useSelector((state) => state.auth)
  const router = useRouter()
  const [updateUser, { isLoading }] = useUpdateUserMutation()
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
  })
  const { name, email, phone } = formData

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const result = await updateUser({ name, email, phone }).unwrap()
      if (result.success) {
        toast.success('ثبت نام موفقیت آمیز بود')
      }
    } catch (error) {
      console.log(err?.data?.message)
      toast.error(' اطلاعات نادرست است!')
    }
  }

  return (
    <section className='container mt-5'>
      <div className='row'>
        <div className='col-md-8 m-auto'>
          <div className='card bg-white py-2 px-4'>
            <div className='card-body'>
              <h1 className='mb-2'>پروفایل کاربر:</h1>
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className='form-group'>
                  <label>نام و نام خانوادگی:</label>
                  <input
                    type='text'
                    name='name'
                    className='form-control'
                    placeholder=''
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    value={name}
                  />
                </div>
                <div className='form-group'>
                  <label>ایمیل:</label>
                  <input
                    type='email'
                    name='email'
                    className='form-control'
                    placeholder=''
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    value={email}
                  />
                </div>
                <div className='form-group'>
                  <label>شماره همراه:</label>
                  <input
                    type='text'
                    name='phone'
                    className='form-control'
                    placeholder=''
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    value={phone}
                  />
                </div>
                <div className='form-group'>
                  <div className='row'>
                    <div className='d-grid gap-1 mt-4'>
                      <button
                        type='submit'
                        className='btn btn-danger d-md-block'
                      >
                        {isLoading ? <ButtonLoader /> : 'ذخیره'}
                      </button>
                    </div>
                    <div className='col-md-6 mt-2'>
                      <Link
                        href='/update-password'
                        className='btn btn-secondary d-md-block'
                      >
                        تغییر رمز عبور
                      </Link>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ManageAccount
