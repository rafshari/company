import CompanyItem from '@/components/companies/CompanyItem'
import Navbar from '@/components/Navbar/Navbar'
import Spinner from '@/components/Spinner/Spinner'
import { Fragment } from 'react'

const CompanyPage = ({ company }) => {
  const Company = company.data

  return (
    <>
      <Navbar />

      <CompanyItem company={Company} />
    </>
  )
}

export async function getServerSideProps(context) {
  const { companyId } = context.query

  const res = await fetch(`http://localhost:5000/api/v1/companies/${companyId}`)

  const company = await res.json()
  return {
    props: {
      company,
    },
  }
}

export default CompanyPage
