'use client'

import Head from 'next/head'
import Navbar from '@/components/Navbar/Navbar'
import ProgressBar from '@/components/companies/ManageCompanies/CompanyForm/ProgressBar'
import SecondStep from '@/components/companies/ManageCompanies/CompanyForm/SecondStep'

const addCompanyFormFirstStepPage = () => {
  return (
    <>
      <Head>
        <title> اضافه کردن شرکت جدید مرحله دوم</title>
      </Head>
      <ProgressBar />
      <SecondStep />
    </>
  )
}

export default addCompanyFormFirstStepPage
