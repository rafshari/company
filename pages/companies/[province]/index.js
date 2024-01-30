import Navbar from '@/components/Navbar/Navbar'
import Companies from '@/components/companies/Companies'
import Head from 'next/head'
import { useRouter } from 'next/router'

function companiesStateList({ companies }) {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>شرکتهای حمل و نقل استان {router.query.province}</title>
      </Head>
      <Navbar />
      <Companies companies={companies} />
    </>
  )
}
export default companiesStateList

export async function getServerSideProps(context) {
  const { province } = context.query
  const res = await fetch(
    `http://localhost:5000/api/v1/companies?state=${province}`
  )

  const companies = await res.json()

  return {
    props: {
      companies,
    },
  }
}
