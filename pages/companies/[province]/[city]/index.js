import Navbar from '@/components/Navbar/Navbar'
import Companies from '@/components/companies/Companies'
import { useRouter } from 'next/router'

function companiesCityList({ companies }) {
  const router = useRouter()
  return (
    <>
      <Navbar />

      <Companies companies={companies } />
    </>
  )
}

export async function getServerSideProps(context) {
  const { province, city } = context.query
  const res = await fetch(
    `http://localhost:5000/api/v1/companies?state=${province}&city=${city}`
  )
  const companies = await res.json()

  return {
    props: {
      companies,
    },
  }
}

export default companiesCityList
