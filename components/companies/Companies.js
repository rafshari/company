import React, { Fragment } from 'react'
import { LocationForm } from './LocationForm'
import { FilterCompanyForm } from './FilterCompaniesForm'
import Spinner from '../Spinner/Spinner'
import CompanyItem from './CompanyItem'
import { Pagination } from './Pagination'

function Companies({ companies }) {
 // console.log('companies:', companies)
  const { success: loading, count, pagination, data: companiesList } = companies
 // console.log('companiesList:', companiesList)

  return (
    <section className='browse my-5'>
      <div className='container'>
        <div className='row'>
          {/* Sidebar  */}
          <div className='col-md-4'>
            {/* <div className='card card-body mb-4'>{<LocationForm />}</div> */}
            <FilterCompanyForm />
          </div>

          {/* Main col  */}
          <div className='col-md-8'>
            {/* Companies  */}
            <h1>
              <small className='text-muted fw-bold'>
                تعداد شرکت های حمل و نقل :{count}
              </small>
            </h1>
            {!loading ? (
              <Spinner />
            ) : (
              <Fragment>
                {companiesList?.map((company) => (
                  <CompanyItem key={company._id} company={company} />
                ))}
                {/* Pagination */}
                <Pagination />
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Companies
