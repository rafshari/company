'use client'

import { updateCompany } from '@/redux/slices/companySlice'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import DatePicker from 'react-multi-date-picker'
import store from '@/redux/store'
import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'
import { nextStep, prevStep } from '@/redux/slices/formSlice'

export default function SecondStep() {
  const router = useRouter()
  const companyDataa = useSelector((state) => state.company.companyDetail)
  //   console.log("companyDataa:", companyDataa)
  const [companyData, setCompanyData] = useState(companyDataa)
 // console.log('companyData2:', companyData)

  const {
    companyName,
    category,
    phone,
    address,
    state,
    city,
    location,
    email,
    website,
    description,
    numOfBranches,
    branches,
    ceoName,
    ceoPhone,
    nationalId,
    numOfTrucks,
    dateOfEstablishment,
    active,
    images,
    user,
  } = companyData

  const handleChange = (e) => {
    setCompanyData({ ...companyData, [e.target.name]: e.target.value })
  }

  const handleNext = (e) => {
    e.preventDefault()
    //console.log('companyData3:', companyData)
    store.dispatch(updateCompany(companyData))
    store.dispatch(nextStep())
    router.push('/companies/ManageCompanies/new/thirdstep')
  }

  return (
    <section className='container mt-5 px-5'>
      <form onSubmit={(e) => handleNext(e)}>
        <div className='mb-3'>
          <div className='card bg-white py-2 px-4'>
            <div className='card-body'>
              <h3>اطلاعات تکمیلی</h3>
              <div className='form-group'>
                <label htmlFor='category_field'>نوع شرکت</label>
                <select
                  className='form-control'
                  id='category_field'
                  onChange={(e) =>
                    setCompanyData({
                      ...companyData,
                      category: e.target.value,
                    })
                  }
                  value={category}
                >
                  {['داخلی', 'بین المللی', 'سراسری', 'بزرگ مقیاس'].map(
                    (categor) => (
                      <option key={categor} value={categor}>
                        {categor}
                      </option>
                    )
                  )}
                </select>
              </div>
              <div className='form-group'>
                <label>توضیحات:</label>
                <textarea
                  name='description'
                  rows='5'
                  className='form-control'
                  placeholder='مثلا خدماتی که ارائه می دهید یا مسیرهایی که بیشتر فعال هستید.'
                  maxLength='500'
                  onChange={(e) => handleChange(e)}
                  value={description}
                ></textarea>
                <small className='form-text text-muted'>
                  توجه: بیشتر از 500 حرف نباشد.
                </small>
              </div>
              <div className='form-group'>
                <label>تعداد شعب فعال شرکت:</label>
                <input
                  type='number'
                  name='numOfBranches'
                  className='form-control'
                  placeholder=''
                  value={numOfBranches}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className='form-group'>
                <label>شعب:</label>
                <select
                  name='branches'
                  className='custom-select'
                  multiple
                  onChange={(e) =>
                    setCompanyData({
                      ...companyData,
                      branches: [...branches, e.target.value],
                    })
                  }
                  value={branches}
                >
                  <option defaultValue>همه</option>
                  <option value='آذربایجان شرقی'>آذربایجان شرقی</option>
                  <option value='آذربایجان غربی'>آذربایجان غربی</option>
                  <option value='اردبیل'>اردبیل</option>
                  <option value='اصفهان'>اصفهان</option>
                  <option value='البرز'>البرز</option>
                  <option value='ایلام'>ایلام</option>
                  <option value='بوشهر'>بوشهر</option>
                  <option value='تهران'>تهران</option>
                  <option value='چهارمحال وبختیاری'>چهارمحال و بختیاری</option>
                  <option value='خراسان جنوبی'>خراسان جنوبی </option>
                  <option value='خراسان رضوی'>خراسان رضوی </option>
                  <option value='خراسان شمالی'>خراسان شمالی </option>
                  <option value='خوزستان'>خوزستان </option>
                  <option value='زنجان'>زنجان </option>
                  <option value='سمنان'>سمنان </option>
                  <option value='فارس'>فارس </option>
                  <option value='قزوین'>قزوین </option>
                  <option value='قم'>قم </option>
                  <option value='سیستان وبلوچستان'>سیستان وبلوچستان </option>
                  <option value='کردستان'>کردستان</option>
                  <option value='کرمان'>کرمان</option>
                  <option value='کرمانشاه'>کرمانشاه</option>
                  <option value='کهگیلویه وبویراحمد'>
                    کهگیلویه وبویراحمد{' '}
                  </option>
                  <option value='گلستان'>گلستان </option>
                  <option value='لرستان'>لرستان </option>
                  <option value='مازندران'>مازندران </option>
                  <option value='مرکزی'>مرکزی </option>
                  <option value='هرمزگان'>هرمزگان </option>
                  <option value='همدان'>همدان</option>
                  <option value='یزد'>یزد</option>
                  <option value='سایر'>سایر</option>
                </select>
              </div>
              <div className='form-check'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  name='active'
                  id='active'
                  checked={active}
                  onChange={(e) =>
                    setCompanyData({ ...companyData, active: !active })
                  }
                />
                <label className='form-check-label' htmlFor='housing'>
                  وضعیت فعالیت:
                </label>
              </div>
              <div className='form-group'>
                <label>نام مدیر عامل:</label>
                <input
                  type='text'
                  name='ceoName'
                  className='form-control'
                  placeholder=''
                  value={ceoName}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className='form-group'>
                <label> شماره همراه مدیرعامل:</label>
                <input
                  type='text'
                  name='ceoPhone'
                  className='form-control'
                  placeholder=''
                  value={ceoPhone}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className='form-group'>
                <label> شناسه ملی شرکت:</label>
                <input
                  type='number'
                  name='nationalId'
                  className='form-control'
                  placeholder=''
                  value={nationalId}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className='form-group my-3'>
                <label className='ms-2'> تاریخ تاسیس شرکت:</label>
                <DatePicker
                  style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    height: '34px',
                  }}
                  value={dateOfEstablishment || ''}
                  placeholder='تاریخ تاسیس را وارد کنید'
                  calendar={persian}
                  locale={persian_fa}
                  onChange={(date) =>
                    setCompanyData({
                      ...companyData,
                      dateOfEstablishment: date?.isValid ? date : '',
                    })
                  }
                />
              </div>
              <div className='form-group'>
                <label>تعداد ناوگان ملکی شرکت:</label>
                <input
                  type='number'
                  name='numOfTrucks'
                  className='form-control'
                  placeholder=''
                  value={numOfTrucks}
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <p className='text-muted my-4'>
                *بعد از ثبت اطلاعات شرکت می توانید اطلاعات ...... را ثبت نمایید
              </p>
            </div>
          </div>
        </div>

        <div className='d-grid gap-1 mt-4'>
          <button type='submit' className='btn btn-danger d-md-block mb-2'>
            بعدی
          </button>
          <button
            type='reset'
            className='btn btn-secondary d-md-block mb-4'
            onClick={() => {
              router.push('/companies/ManageCompanies/new/firststep')
              store.dispatch(prevStep())
            }}
          >
            برگشت
          </button>
        </div>
      </form>
    </section>
  )
}
