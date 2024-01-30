'use client'

import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import ButtonLoader from '@/components/ButtonLoader'
import store from '@/redux/store'
import { useCreateCompanyMutation } from '@/services'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { prevStep } from '@/redux/slices/formSlice'
import Image from 'next/image'



export default function ThirdStep() {
  
  const router = useRouter()
  const [imagesPreview, setImagesPreview] = useState([])
  const [createCompany, { isLoading }] = useCreateCompanyMutation()
  // let company = {}
  
 const companyDataa = useSelector((state) => state.company.companyDetail)
   // console.log('companyDataa:', companyDataa)
  const [companyData, setCompanyData] = useState(companyDataa)

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



const handleSubmit = async (e) => {
  e.preventDefault()
  //console.log('companyData:', {companyData})
  // console.log('userId:', userId)
  const response = await createCompany({companyData} ).unwrap()
  console.log(response)
  if (response.success) {
    toast.success('شرکت شما ثبت شد')
    router.push('/companies/managecompany')
  } else {
    toast.error('یک مشکلی پیش اومده، دوباره امتحان کنید.')
  }
  // Add new Company if does not exist, otherwise update it.
}
  const handleChange = (e) => {
  const files = Array.from(e.target.files)
  const images = []
  const imagesPreview = []
  setCompanyData({ ...companyData, images: [] })
    setImagesPreview([])
    
    files.forEach((file) => { 
      const reader = new FileReader()
      reader.onload = () => {
        if (reader.readyState === 2) {
        setCompanyData({
          ...companyData,
          images: [...companyData.images, reader.result],
        })
        setImagesPreview((oldArray) => [...oldArray, reader.result])
      }
    }
    reader.readAsDataURL(file)
  })
}

//  console.log('companyData After Image:', companyData.images)

  return (
    <section className='container mt-5 p-5'>
      <form onSubmit={(e) => handleSubmit(e)}>
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
            <label className='custom-file-label' htmlFor='customFileLang'>
              انتخاب تصویر
            </label>
          </div>

          {imagesPreview.map((img) => (
            <Image
              src={img}
              key={img.id}
              alt='Images Preview'
              className='img-thumbnail img-fluid'
              width= {50}
              height={50}
            />
          ))}
        </div>
        <div className='d-grid gap-1 mt-4'>
          <button type='submit' className='btn btn-danger d-md-block mb-2'>
            {isLoading ? <ButtonLoader /> : 'ثبت'}
          </button>
          <button
            type='reset'
            className='btn btn-secondary d-md-block mb-4'
            onClick={() => {
              router.push('/companies/ManageCompanies/new/secondstep')
              store.dispatch(prevStep())
            }}
          >
            برگشت
          </button>
        </div>
      </form>
      <Link
        className='btn btn-secondary d-md-block mb-4'
        href='/companies/managecompany'
      >
        انصراف
      </Link>
    </section>
  )
}
