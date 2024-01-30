import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Search from '@/components/Search/Search'
import Navbar from '@/components/Navbar/Navbar'
import Register from '@/components/register'

export default function LoginPage() {
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
      <Register />
    </>
  )
}
