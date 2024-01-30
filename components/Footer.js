import styles from '../styles/footer.module.css'

const Footer = () => {
  return (
    <footer
      className={`page-footer font-small teal pt-4  ${styles.upper_row}`}
    >
      <div className={`container text-center text-md-left`}>
        <div className='row'>
          <div className='col-md-6 mt-md-0 mt-3 p-5'>
            <h5 className='text-uppercase font-weight-bold'>چشم انداز ما</h5>
            <p>
              انتخاب شرکت حمل و نقل مناسب کاری دشوار و پیچیده است و گاها پس از
              بررسی های فراوان تردیدهایی وجود دارد. حتی گاهی پس از آغاز همکاری،
              متوجه می شویم انتخاب درستی انجام نشده است. امکانات شرکتها ی حمل و
              نقل ایرانی متفاوت هستند. کارگو، با جمع آوری اطلاعات شرکتهای حمل و
              نقل داخلی و بین المللی سعی کرده است، محیطی را فراهم آورد تا
              مطالعه، مقایسه، تصمیم گیری و انتخاب را برای متقاضیان راحت کند.
              کارگو، خود به تنهایی ارائه دهنده خدمات حمل و نقل نیست، صرفاً
              اطلاعات لازم برای انتخاب درست را در اختیار متقاضیان قرار می دهد.
              اطلاعاتی که توسط خود شرکتهای حمل و نقل و سایر کاربران، ارائه شده است. کارگو ، به
              شما کمک می کند تا انتظارات خود را با امکانات ارائه شده هر شرکت حمل
              و نقل بسنجید، شرکتهای گوناگون را با یکدیگر مقایسه نمایید و بتوانید
              به راحتی و با اطمینان کامل همکار تجاری مناسب خود را برای حمل
              محموله های خود انتخاب کنید.
            </p>
          </div>
          <hr className='clearfix w-100 d-md-none pb-3' />

          <div className='col-md-6 mb-md-0 mb-3 p-5 '>
            <h5 className='text-uppercase font-weight-bold'>ماموریت ما</h5>
            <p>
              دیدگاه های مربوط به شرکتهای حمل و نقل را مرور کنید، امتیازها در
              نظر بگیرید و دیدگاه و امتیاز موردنظرتان را ثبت نمایید. یاد بگیرید
              چگونه بهترین شرکت حمل و نقل را انتخاب کنید، چگونه مطمئن ترین، امین
              ترین و مناسبترین شرکت را انتخاب کنید تا بتوانید کسب و کار خود را
              ارتقا دهید.
            </p>
          </div>
        </div>
      </div>

      <div
        className={`footer-copyright text-center py-3 ${styles.lower_row}`}
      >
        © {new Date().getFullYear()} Copyright &nbsp; | &nbsp;{' '}
        <i className='fas fa-laptop-code'></i> &nbsp; Cargo
      </div>
    </footer>
  )
}

export default Footer
