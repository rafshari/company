import Head from 'next/head'
import Navbar from '@/components/Navbar/Navbar'
import Login from '@/components/Login'

export default function LoginPage() {
  return (
    <>
      <Head>
        <title> وارد شوید</title>
        <meta
          name='description'
          content=' حمل بار به تمام نقاط ایران از طریق باربری ها و شرکتهای حمل و نقل منتخب، امتیازدهی به شرکت ها حمل و نقل، حمل و نقل بین المللی و داخلی'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/mini-logo.ico' />
      </Head>
      <Navbar />
      <Login />
    </>
  )
}
