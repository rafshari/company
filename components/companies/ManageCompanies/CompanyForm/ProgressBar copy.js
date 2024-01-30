import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '@/styles/Form.module.css'

const Progress = () => {
  const router = useRouter()

  const pathname = router.pathname
  // const isFirstStep = pathname === '/firststep';
  // const isSecondStep = pathname === '/secondstep';
  // const isThirdStep = pathname === '/thirdstep';

  const isFirstStep = true
  const isSecondStep = false
  const isThirdStep = false

  return (
    <>
      <div className={styles.progressbar}>
        <div
          className={
            `${isFirstStep}`
              ? `${styles.step} ${styles.active}`
              : `${styles.step}`
          }
        >
          <div className={styles.stepTitle}>
            {isSecondStep || isThirdStep ? (
              <Link href='/'>مرحله اول</Link>
            ) : (
              'مرحله اول'
            )}
          </div>
        </div>
        <div
          className={`${
            isSecondStep ? `${styles.step} ${styles.active}` : `${styles.step}`
          }`}
        >
          <div className={styles.stepTitle}>
            {isThirdStep ? <Link href='/second'>مرحله دوم</Link> : 'مرحله دوم'}
          </div>
        </div>
        <div
          className={`${
            pathname === '/third'
              ? `${styles.step} ${styles.active}`
              : `${styles.step}`
          }`}
        >
          <div className={styles.stepTitle}>مرحله سوم</div>
        </div>
      </div>
    </>
  )
};

export default Progress
