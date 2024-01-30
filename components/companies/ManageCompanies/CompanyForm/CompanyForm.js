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


//import Alert from '../Alert/Alert'
//import { addCompany, updateCompany } from '../../redux/actions/Companies'

export default function CompanyForm() {


  const loginUser = useSelector((state) => state.auth)
  const router = useRouter()
  const [imagesPreview, setImagesPreview] = useState([])
  const [createCompany, { isLoading }] = useCreateCompanyMutation()
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
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    //console.log('companyData:', companyData)
    //const userId = user.userId
   // console.log('userId:', userId)

    const response = await createCompany({ companyData }).unwrap()
    if (response.success) {
      toast.success('شرکت شما ثبت شد')
      router.push('/companies/managecompany')
    } else {
      toast.error('یک مشکلی پیش اومده، دوباره امتحان کنید.')
    }
    // Add new Company if does not exist, otherwise update it.
  }

  return (
    <section className='container mt-5'>
      <h1 className='mb-2'>{company ? 'بروزرسانی' : 'ثبت'} اطلاعات شرکت</h1>
      <p>
        توجه: شما بایستی مدیرعامل، عضو هیات مدیره یا نماینده شرکت باشید تا
        بتوانید اطلاعات شرکت را ثبت نمایید
      </p>
      {/* <Alert /> */}
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className='row'>
          <div className='col-md-6'>
            <div className='card bg-white py-2 px-4'>
              <div className='card-body'>
                <h3>اطلاعات مکانی و ارتباطی</h3>
                <p className='text-muted'>
                  اگر شرکت شما شعب و یا دفاتر مختلفی دارد در این قسمت اطلاعات
                  دفتر مرکزی را ثبت نمایید.
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
          <div className='col-md-6'>
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
                    <option value='چهارمحال وبختیاری'>
                      چهارمحال و بختیاری
                    </option>
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

                <div className='custom-file mb-4'>
                  <label>تصاویر:</label>
                  <div className='custom-file'>
                    <input
                      type='file'
                      name='company_images'
                      className='custom-file-input'
                      id='customFileLang'
                      lang='fa'
                      onChange={(e) => handleChange(e)}
                      multiple
                    />
                    <label
                      className='custom-file-label'
                      htmlFor='customFileLang'
                    >
                      انتخاب تصویر
                    </label>
                  </div>

                  {imagesPreview.map((img) => (
                    <img
                      src={img}
                      key={img}
                      alt='Images Preview'
                      className='mt-3 ms-2'
                      width='55'
                      height='52'
                    />
                  ))}
                </div>

                <p className='text-muted my-4'>
                  *بعد از ثبت اطلاعات شرکت می توانید اطلاعات ...... را ثبت
                  نمایید
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='d-grid gap-1 mt-4'>
          <button type='submit' className='btn btn-danger d-md-block mb-2'>
            {isLoading ? <ButtonLoader /> : 'ثبت'}
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
