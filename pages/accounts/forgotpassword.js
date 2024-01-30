import Head from 'next/head'
 import Navbar from '@/components/Navbar/Navbar'
import ForgotPassword from '@/components/ManageAccount/ForgotPassword'
//import ForgotPassword from '@/components/ManageAccount/ForgotPassword'

export default function LoginPage() {
  return (
    <>
      <Head>
        <title> تعریف رمز عبور مجدد </title>
        <meta
          name='description'
          content=' حمل بار به تمام نقاط ایران از طریق باربری ها و شرکتهای حمل و نقل منتخب، امتیازدهی به شرکت ها حمل و نقل، حمل و نقل بین المللی و داخلی'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/mini-logo.ico' />
      </Head>

      <Navbar />
      <ForgotPassword />
    </>
  )
}
