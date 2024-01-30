'use client'
import { provinceList } from '@/utils/provinceList'
import axios from 'axios'
import Link from 'next/link'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useCreateCompanyMutation } from '@/services'
import store from '@/redux/store'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import DatePicker from 'react-multi-date-picker'
import { Calendar } from 'react-multi-date-picker'
import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'
import ButtonLoader from '@/components/ButtonLoader'
import { addCompany } from '@/redux/slices/companySlice'
import { nextStep } from '@/redux/slices/formSlice'

//import Alert from '../Alert/Alert'
//import { addCompany, updateCompany } from '../../redux/actions/Companies'

export default function CompanyForm() {
  const userLoggedIn = useSelector((state) => state.auth.userId)
  const router = useRouter()
  let company = {}
  const [companyData, setCompanyData] = useState({
    companyName: '',
    category: '',
    phone: '',
    address: '',
    email: '',
    state: '',
    city: '',
    location: { type: 'Point', coordinates: [53, 31] },
    website: '',
    description: '',
    numOfBranches: '',
    branches: [],
    ceoName: '',
    ceoPhone: '',
    nationalId: '',
    numOfTrucks: '',
    dateOfEstablishment: '',
    active: true,
    images: [],
    user: '',
  })

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

  // Get recently added/updated Company or Company from database

  // Fill the form with previous data if user has Company

  const [province, setProvince] = useState({})
  const [cities, setCities] = useState([])

  async function getCityOfProvince(provinceId) {
    const { data } = await axios.get(`/api/fetching/${provinceId}`)
    //console.log('cities:', data.data)
    setCities(data.data)
  }

  // Get recently added/updated Company or Company from database

  const handleChange = (e) => {
    setCompanyData({ ...companyData, [e.target.name]: e.target.value })
  }

  const handleSelectProvinceChange = (e) => {
    const selectedProvince = provinceList.find(
      (province) => province.name === e.target.value
    )
    //console.log('selectedProvince:', selectedProvince)
    setProvince(selectedProvince)
    setCompanyData({ ...companyData, state: e.target.value })
    getCityOfProvince(selectedProvince.id)
     setCompanyData({ ...companyData, user: userLoggedIn })

  }

  const handleNext = (e) => {
    e.preventDefault()
    //console.log('companyData:', companyData)
    //const userId = user.userId
    // console.log('userId:', userId)

    store.dispatch(addCompany(companyData))
    store.dispatch(nextStep())
    router.push('/companies/ManageCompanies/new/secondstep')
  }

  return (
    <section className='container mt-5 px-5'>
      <h1 className='mb-2'>{company ? 'بروزرسانی' : 'ثبت'} اطلاعات شرکت</h1>
      <p>
        توجه: شما بایستی مدیرعامل، عضو هیات مدیره یا نماینده شرکت باشید تا
        بتوانید اطلاعات شرکت را ثبت نمایید
      </p>
      {/* <Alert /> */}
      <form onSubmit={(e) => handleNext(e)}>
        <div className='mb-3'>
          <div className='card bg-white py-2 px-4'>
            <div className='card-body'>
              <h3>اطلاعات مکانی و ارتباطی</h3>
              <p className='text-muted'>
                اگر شرکت شما شعب و یا دفاتر مختلفی دارد در این قسمت اطلاعات دفتر
                مرکزی را ثبت نمایید.
              </p>
              <div className='form-group'>
                <label>نام شرکت:</label>
                <input
                  type='text'
                  name='companyName'
                  className='form-control'
                  placeholder=''
                  required
                  value={companyName}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='province_field'> استان: </label>
                <select
                  className='form-control'
                  id='province_field'
                  placeholder=''
                  value={state}
                  onChange={(e) => handleSelectProvinceChange(e)}
                >
                  {provinceList.map((province) => (
                    <option key={province.id} value={province.name}>
                      {province.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className='form-group'>
                <label htmlFor='city_field'> شهر: </label>
                <select
                  className='form-control'
                  id='city_field'
                  placeholder=''
                  onChange={(e) =>
                    setCompanyData({ ...companyData, city: e.target.value })
                  }
                  value={city}
                >
                  {cities?.map((cit) => (
                    <option key={cit.id} value={cit.name}>
                      {cit.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className='form-group'>
                <label>آدرس:</label>
                <input
                  type='text'
                  name='address'
                  className='form-control'
                  placeholder=''
                  required
                  onChange={(e) => handleChange(e)}
                  value={address}
                />
                <small className='form-text text-muted'>
                  استان، شهر و آدرس و ...
                </small>
              </div>
              <div className='form-group'>
                <label>شماره تماس:</label>
                <input
                  type='text'
                  name='phone'
                  className='form-control'
                  placeholder=''
                  onChange={(e) => handleChange(e)}
                  value={phone}
                />
              </div>
              <div className='form-group'>
                <label>ایمیل:</label>
                <input
                  type='text'
                  name='email'
                  className='form-control'
                  placeholder=' '
                  value={email}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className='form-group'>
                <label>آدرس وب سایت:</label>
                <input
                  type='text'
                  name='website'
                  className='form-control'
                  placeholder=''
                  onChange={(e) => handleChange(e)}
                  value={website}
                />
              </div>
            </div>
          </div>
        </div>
        <div className='d-grid gap-1 mt-4'>
          <button type='submit' className='btn btn-danger d-md-block mb-2'>
            بعدی
          </button>
          <Link
            className='btn btn-secondary d-md-block mb-4'
            href='/companies/managecompany'
          >
            انصراف
          </Link>
        </div>
      </form>
    </section>
  )
}
