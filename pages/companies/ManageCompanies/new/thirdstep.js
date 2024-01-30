'use client'

import Head from 'next/head'
import Navbar from '@/components/Navbar/Navbar'
import ProgressBar from '@/components/companies/ManageCompanies/CompanyForm/ProgressBar'
import ThirdStep from '@/components/companies/ManageCompanies/CompanyForm/ThirdStep'

const addCompanyFormThirdStepPage = () => {
  return (
    <>
      <Head>
        <title> اضافه کردن شرکت جدید مرحله سوم</title>
      </Head>

      <ProgressBar />
      <ThirdStep />
    </>
  )
}

export default addCompanyFormThirdStepPage
