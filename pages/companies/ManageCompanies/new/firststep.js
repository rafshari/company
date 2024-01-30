'use client'

import Head from 'next/head'
import Navbar from '@/components/Navbar/Navbar'
import FirstStep from '@/components/companies/ManageCompanies/CompanyForm/FirstStep'
import ProgressBar from '@/components/companies/ManageCompanies/CompanyForm/ProgressBar'
import SecondStep from '@/components/companies/ManageCompanies/CompanyForm/SecondStep'
import ThirdStep from '@/components/companies/ManageCompanies/CompanyForm/ThirdStep'

const addCompanyFormFirstStepPage = () => {
  return (
    <>
      <Head>
        <title> اضافه کردن شرکت جدید مرحله اول</title>
      </Head>
      <ProgressBar />
      <FirstStep />
    </>
  )
}

export default addCompanyFormFirstStepPage
