import Head from 'next/head'
import Navbar from '@/components/Navbar/Navbar'
import Search from '@/components/Search/Search'
import Latest from '@/components/Latest'
import Footer from '@/components/Footer'

export default function Home({ companies }) {
  return (
    <>
      <Head>
        <title>نزدیک ترین باربری و شرکت حمل و نقل</title>
        <meta
          name='description'
          content=' حمل بار به تمام نقاط ایران از طریق باربری ها و شرکتهای حمل و نقل منتخب، امتیازدهی به شرکت ها حمل و نقل، حمل و نقل بین المللی و داخلی'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/mini-logo.ico' />
      </Head>

      <Navbar />
      <Search />
      <Latest companies={companies} />
      <Footer />
    </>
  )
}

export async function getServerSideProps() {
  const raw = await fetch(
    `http://localhost:5000/api/v1/companies?limit=3&sort=createdAt`
  )
  const {data} = await raw.json()
  //console.log("data:",data)

  return {
    props: { companies: data },
  }
}