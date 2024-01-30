import React from 'react'
import { useRouter } from 'next/router'
import AddCompany from './AddCompany'
import EditCompany from './EditCompany'
import Spinner from '../Spinner/Spinner'

const ManageCompany = ({ user, loading }) => {
  const router = useRouter()
  if (user && user.role === 'user') {
    router.push('/Companies')
  }
  return loading ? (
    <Spinner />
  ) : user.Companies.length > 0 ? (
    <EditCompany />
  ) : (
    <AddCompany />
  )
}

export default ManageCompany
