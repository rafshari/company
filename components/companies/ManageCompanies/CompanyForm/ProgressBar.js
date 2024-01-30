import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '@/styles/Form.module.css'
import { useSelector } from 'react-redux';
import store from '@/redux/store';
import { resetForm } from '@/redux/slices/formSlice';
import Navbar from '@/components/Navbar/Navbar';

const Progress = () => {
  const router = useRouter()
  const formStep = useSelector((state) => state.form.step)
  //console.log('step:', formStep)

    const pathname = router.pathname
   // console.log('pathname:', pathname)

    const isFirstStep = pathname === '/companies/ManageCompanies/new/firststep'
    const isSecondStep =
      pathname === '/companies/ManageCompanies/new/secondstep'
  const isThirdStep = pathname === '/companies/ManageCompanies/new/thirdstep'
  
  if (formStep === 3  && isFirstStep) {
    store.dispatch(resetForm())
  }


// console.log('isFirstStep:', isFirstStep, isSecondStep, isThirdStep)
// console.log("isSecondStep:", isFirstStep, isSecondStep, isThirdStep)
// console.log("isThirdStep:", isFirstStep, isSecondStep, isThirdStep)


  return (
    <>
          <Navbar />

      <div className={styles.progressbar}>
        <div
          className={
            formStep === 1 || 2
              ? `${styles.step} ${styles.active}`
              : `${styles.step}`
          }
        >
          <div className={styles.stepTitle}>
            {formStep === 2 || formStep === 3 ? (
              <Link
                className='text-decoration-none text-reset'
                href='/companies/ManageCompanies/new/firststep'
              >
                اطلاعات مکانی
              </Link>
            ) : (
              'اطلاعات مکانی'
            )}
          </div>
        </div>
        <div
          className={
            formStep === 2 || formStep === 3
              ? `${styles.step} ${styles.active}`
              : `${styles.step}`
          }
        >
          <div className={styles.stepTitle}>
            {formStep === 3 ? (
              <Link
                className='text-decoration-none text-reset'
                href='/companies/ManageCompanies/new/secondstep'
              >
                اطلاعات تکمیلی
              </Link>
            ) : (
              'اطلاعات تکمیلی'
            )}
          </div>
        </div>
        <div
          className={
            formStep === 3
              ? `${styles.step} ${styles.active}`
              : `${styles.step}`
          }
        >
          <div className={styles.stepTitle}>
            <Link
              className='text-decoration-none text-reset'
              href='/companies/ManageCompanies/new/thirdstep'
            >
              ارسال تصویر
            </Link>
          </div>
        </div>
      </div>
    </>
  )
};

export default Progress
