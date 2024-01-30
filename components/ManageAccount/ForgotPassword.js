import React, { useState } from 'react'
import Alert from '@/components/Alert/Alert'
import Link from 'next/link'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')

  const handleChange = (e) => {
    setEmail(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
   // forgotPassword(email)
    console.log('email')
  }

  return (
    <section className='container mt-5'>
      <div className='row'>
        <div className='col-md-8 m-auto'>
          <div className='card bg-white py-2 px-4'>
            <div className='card-body'>
              <Link href='/login'>بازگشت به صفحه ورود</Link>
              <h1 className='mb-2'>تعریف رمز عبور مجدد</h1>
              <p>
                {' '}
                با استفاده از ایمیل خود رمز عبور جدید خود را تعریف کنید.
              </p>
              <form onSubmit={handleSubmit}>
                <div className='form-group'>
                  <label>آدرس ایمیل خود را وارد کنید:</label>
                  <input
                    type='email'
                    name='email'
                    className='form-control'
                    placeholder='آدرس ایمیل'
                    onChange={handleChange}
                    value={email}
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='submit'
                    value='ایجاد رمز جدید'
                    className='btn btn-dark btn-block'
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ForgotPassword
