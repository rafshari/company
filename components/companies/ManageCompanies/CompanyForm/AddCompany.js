import Link from 'next/link'
import React from 'react'

const AddCompany = () => {
  return (
    <section className='container mt-5'>
      <div className='row'>
        <div className='col-md-8 m-auto'>
          <div className='card bg-white py-2 px-4'>
            <div className='card-body'>
              <h1 className='mb-2'>مدیریت شرکت</h1>
              <p className='lead'> شما هنوز اطلاعات شرکت خود را وارد نکرده اید</p>
              <Link href='/companies/new' className='btn btn-danger btn-block'>
                تعریف شرکت جدید
              </Link>

              <p className='text-muted mt-5'>
                * شما فقط امکان ثبت یک شرکت را با کاربری خود دارید.
              </p>
              <p className='text-muted'>
                * شما بایستی به نوعی به شرکت وابستگی داشته باشید تا بتوانید شرکت را ثبت نمایید مثلا مدیرعامل یا یکی از اعضای هیات مدیره یا نماینده با نامه معرفی نامه.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AddCompany
