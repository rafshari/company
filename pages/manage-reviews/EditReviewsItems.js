import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
//import { loadReview, removeReview } from '../../redux/actions/reviews'
import Link from 'next/link'

const EditReviewsItems = ({ reviews, loadReview, removeReview }) => {
  return (
    <table className='table table-striped'>
      <thead>
        <tr>
          <th scope='col'>Company</th>
          <th scope='col'>Rating</th>
          <th scope='col'></th>
        </tr>
      </thead>
      <tbody>
        {reviews.map(({ _id, rating, Company }) => (
          <tr key={_id}>
            <td>{Company.name}</td>
            <td>{rating}</td>
            <td>
              <Link
                href='/add-review'
                className='btn btn-secondary'
                onClick={() => loadReview(_id)}
              >
                <i className='fas fa-pencil-alt'></i>
              </Link>{' '}
              <button
                className='btn btn-danger'
                onClick={() => removeReview(_id)}
              >
                <i className='fas fa-times'></i>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}


export default EditReviewsItems
