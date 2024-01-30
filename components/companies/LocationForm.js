import React, { useState } from 'react'

export const LocationForm = ({ getCompanies }) => {
  const [locationData, setLocation] = useState({
    province: '',
    city: '',
  })

  const { province, city } = locationData

  const handleChange = (e) => {
    setLocation({ ...locationData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    getCompanies(null, { province, city })
    setLocation({ province: '', city: '' })
  }

  return (
    <>
      <h4 className='mb-3 fw-bold'>بر اساس موقعیت:</h4>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className='row'>
          <div className='col-md-6'>
            <div className='form-group'>
              <input
                type='text'
                className='form-control'
                name='province'
                placeholder='استان'
                value={province}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <div className='col-md-6'>
            <div className='form-group'>
              <input
                type='text'
                className='form-control'
                name='city'
                value={city}
                onChange={(e) => handleChange(e)}
                placeholder='نام شهر'
              />
            </div>
          </div>
        </div>
        <input
          type='submit'
          value='جستجو'
          className='btn btn-danger btn-block m-1 px-4'
        />
      </form>
    </>
  )
}
