import Link from 'next/link'
import React from 'react'

const AddReview = () => {
  return (
    <section className='container mt-5'>
      <div className='row'>
        <div className='col-md-8 m-auto'>
          <div className='card bg-white py-2 px-4'>
            <div className='card-body'>
              <h1 className='mb-2'>Manage Reviews</h1>
              <p className='lead'>You have not yet added any reviews</p>
              <Link href='/Companies' className='btn btn-primary btn-block'>
                Browse Companies and add your first review.
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AddReview
