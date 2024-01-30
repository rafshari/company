import React, { Fragment, useState } from 'react'

//import { getCompanies } from "../../redux/actions/Companies";

export const FilterCompanyForm = ({ getCompanies }) => {
  const [filters, setFilters] = useState({averageRating: ''})

  const { averageCost, averageRating, careers } = filters

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    getCompanies(filters)
    setFilters({
      averageRating: '',
      averageCost: '',
      careers: '',
    })
  }

  return (
    <Fragment>
      
        <h4 className='fw-bold'>فیلتر:</h4>
      
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className='form-group'>
          <label> نوع فعالیت شرکت: </label>
          <select
            className='custom-select mb-2'
            name='careers'
            onChange={(e) => handleChange(e)}
            value={careers}
          >
            <option defaultValue>همه موارد</option>
            <option value='Web Development'>حمل و نقل داخلی</option>
            <option value='Mobile Development'>حمل و نقل بین المللی</option>
          </select>
        </div>

        <div className='form-group'>
          <label> امتیاز: </label>
          <select
            className='custom-select mb-2'
            name='averageRating'
            onChange={(e) => handleChange(e)}
            value={averageRating}
          >
            <option defaultValue>انتخاب کنید</option>
            <option value='9'>9+</option>
            <option value='8'>8+</option>
            <option value='7'>7+</option>
            <option value='6'>6+</option>
            <option value='5'>5+</option>
            <option value='4'>4+</option>
            <option value='3'>3+</option>
            <option value='2'>2+</option>
            <option value='1'>1+</option>
          </select>
        </div>

        <div className='form-group'>
          <label> بودجه :</label>
          <select
            className='custom-select mb-2'
            name='averageCost'
            onChange={(e) => handleChange(e)}
            value={averageCost}
          >
            <option defaultValue>انتخاب کنید</option>
            <option value='20000'>$20,000</option>
            <option value='15000'>$15,000</option>
            <option value='10000'>$10,000</option>
            <option value='8000'>$8,000</option>
            <option value='6000'>$6,000</option>
            <option value='4000'>$4,000</option>
            <option value='2000'>$2,000</option>
          </select>
        </div>
        <input
          type='submit'
          value='جستجو'
          className='btn btn-danger btn-block px-3'
        />
      </form>
    </Fragment>
  )
}
