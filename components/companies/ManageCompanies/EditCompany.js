import React, { useState } from 'react'

import CompanyItem from '@/components/companies/CompanyItem'
//import { deleteCompany } from '../../redux/actions/Companies'

//import { uploadCompanyPhoto from '../../redux/actions/Companies'
import Link from 'next/link'
import { toast } from 'react-toastify'

const EditCompany = () => {
  const [file, setFile] = useState('')
  const [fileName, setFileName] = useState('Add Company Image')

  const userCompany = user.Companies[0]

  const handleChange = (e) => {
    setFile(e.target.files[0])
    setFileName(e.target.files[0].name)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('file', file)
    uploadCompanyPhoto(userCompany._id, formData)
  }

  return (
    <section className='container mt-5'>
      <div className='row'>
        <div className='col-md-8 m-auto'>
          <div className='card bg-white py-2 px-4'>
            <div className='card-body'>
              <h1 className='mb-4'>Manage Company</h1>
              <Alert />
              <CompanyItem
                Company={userCompany}
                uploadedPhoto={uploadedPhoto}
              />
              <form className='mb-4' onSubmit={(e) => handleSubmit(e)}>
                <div className='form-group'>
                  <div className='custom-file'>
                    <input
                      type='file'
                      name='photo'
                      className='custom-file-input'
                      id='photo'
                      onChange={(e) => handleChange(e)}
                    />
                    <label className='custom-file-label' htmlFor='photo'>
                      {fileName}
                    </label>
                  </div>
                </div>
                <input
                  type='submit'
                  className='btn btn-light btn-block'
                  value='Upload Image'
                />
              </form>
              <Link href='/add-Company' className='btn btn-primary btn-block'>
                ویرایش جزئیات اطلاعات شرکت{' '}
              </Link>

              <Link
                href='/manage-Trucks'
                className='btn btn-secondary btn-block'
              >
                Manage Trucks
              </Link>
              <Link
                href='#'
                className='btn btn-danger btn-block'
                onClick={() => deleteCompany(userCompany._id)}
              >
                Remove Company
              </Link>
              <p className='text-muted mt-5'>
                * You can only add one Company per account.
              </p>
              <p className='text-muted'>
                * You must be affiliated with the Company in some way in order
                to add it to DevCamper.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EditCompany
