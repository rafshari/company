import Navbar from '@/components/Navbar/Navbar'
import Companies from '@/components/companies/Companies'
import  axios from 'axios'

const CompaniesPage = ({ companies }) => {
  return (
    <>
      <Navbar />
    <Companies companies={companies} /> 
    </>
  )
}

export async function getServerSideProps() {
  const res = await axios.get('http://localhost:5000/api/v1/companies')
  let companies = res.data
  // console.log('companies:', companies)
  return {
    props: {
      companies,
    },
  }
}

export default CompaniesPage
