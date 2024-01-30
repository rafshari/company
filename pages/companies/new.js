import Head from 'next/head'
import Navbar from '@/components/Navbar/Navbar'
import CompanyForm from '@/components/companies/ManageCompanies/CompanyForm/CompanyForm'
const addCompanyFormPage = ({ companies }) => {
  return (
    <>
      <Head>
        <title> اضافه کردن شرکت جدید</title>
      </Head>

      <Navbar />
      <CompanyForm />
    </>
  )
}

export default addCompanyFormPage
