import { useGetCompaniesQuery } from '@/services/companyApi'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

//import iranCity from 'iran-city'
//? Form Hook

function Search() {
  const router = useRouter()

  //? Assets
  //let AllProvinces = iranCity.allProvinces()

  //? State
  const [province, setProvince] = useState('')
  const [city, setCity] = useState('')

  
  const handleSubmit = (e) => {
    e.preventDefault()
    //? Search Companies Query
    // const { data, isLoading, error, isError } =
    //   useGetCompaniesQuery({
    //    //     state,
    //     city,
    //   })

    // getCompanies(null, { zipcode, miles });
    if (city && province) {
      router.push(`/companies/${province}/${city}`)
    } else if (city) {
      router.push(`/companies/استان/${city}`)
    } else if (province) {
      router.push(`/companies/${province}`)
    }
  }

  return (
    <section className='showcase'>
      <div className='dark-overlay'>
        <div className='showcase-inner container'>
          <h1 className='display-5'>
            جستجوی نزدیکترین و مطمئن ترین شرکت حمل و نقل
          </h1>
          <p className='lead'>
            شرکت حمل و نقل مورد نظرتون رو پیدا کنید و سپس امتیاز دهید
          </p>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className='row form-floating mb-2'>
              <div className='col-md-6'>
                <div className='form-group '>
                  <input
                    dir='rtl'
                    type='text'
                    name='province'
                    className='form-control mb-3'
                    placeholder='  استان مبدا بارگیری'
                    onChange={(e) => setProvince(e.target.value)}
                    value={province}
                  />
                </div>
              </div>
              <div className='col-md-6'>
                <div className='form-group'>
                  <input
                    dir='rtl'
                    type='text'
                    className='form-control'
                    name='city'
                    placeholder=' شهر مبدا بارگیری '
                    onChange={(e) => setCity(e.target.value)}
                    value={city}
                  />
                </div>
              </div>
            </div>
            <input
              type='submit'
              value='جستجو'
              className='btn btn-danger btn-block fs-4 m-3 px-5 '
            />
          </form>
        </div>
      </div>
    </section>
  )
}
export async function getServerSideProps() {
  return {
    props: {
      data,
    },
  }
}
export default Search
