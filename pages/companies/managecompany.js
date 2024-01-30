import React from 'react'

import AddCompany from '@/components/companies/ManageCompanies/AddCompany'
import EditCompany from '@/components/companies/ManageCompanies/EditCompany'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import Spinner from '@/components/Spinner/Spinner'
import Navbar from '@/components/Navbar/Navbar'

const manageCompanyPage = () => {
  const user = useSelector((state) => state.auth)
  const router = useRouter()
  let isLoading = false

  if (user && user.role === 'user') {
    return router.push('/Companies')
  }

  return (
    <>
      <Navbar />
      {isLoading ? (
        <Spinner />
      ) : user?.companies?.length > 0 ? (
        <EditCompany />
      ) : (
        <AddCompany />
      )}
    </>
  )
}

export default manageCompanyPage
