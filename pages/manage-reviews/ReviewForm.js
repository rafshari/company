import React from 'react'
import PropTypes from 'prop-types'
import { Link, Navigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { addReview, updateReview } from '../../redux/actions/reviews'

class ReviewForm extends React.Component {
  state = {
    rating: 8,
    title: '',
    text: '',
  }

  componentDidMount() {
    if (this.props.user.role === 'publisher') {
      return <Navigate to='/Companies' />
    }

    const review = this.props.review
    if (review) {
      const reviewDetails = {}
      for (const key in review) {
        if (key in this.state) {
          reviewDetails[key] = review[key]
        }
      }
      this.setState(reviewDetails)
    }
  }

  render() {
    const { rating, title, text } = this.state
    const { addReview, updateReview, review, history, Company } = this.props

    const handleChange = (e) => {
      this.setState({ [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
      e.preventDefault()

      if (review) {
        updateReview(review._id, this.state, history)
      } else {
        addReview(Company._id, this.state, history)
      }
    }

    return (
      <section className='container mt-5'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <div className='card bg-white py-2 px-4'>
              <div className='card-body'>
                <Link
                  to={`/Company/${review ? review.Company._id : Company._id}`}
                  className='btn btn-link text-secondary my-3'
                >
                  <i className='fas fa-chevron-left'></i> Company Info
                </Link>
                <h1 className='mb-2'>
                  {review ? review.Company.name : Company.name}
                </h1>
                <h3 className='text-primary mb-4'>
                  {review ? 'Update' : 'Write a'} Review
                </h3>
                <p>
                  You must have attended and graduated this Company to review
                </p>
                <form onSubmit={handleSubmit}>
                  <div className='form-group'>
                    <label htmlFor='rating'>
                      Rating: <span className='text-primary'>{rating}</span>
                    </label>
                    <input
                      type='range'
                      className='custom-range'
                      min='1'
                      max='10'
                      step='1'
                      id='rating'
                      name='rating'
                      value={rating}
                      onChange={handleChange}
                    />
                  </div>
                  <div className='form-group'>
                    <input
                      type='text'
                      name='title'
                      className='form-control'
                      placeholder='Review title'
                      value={title}
                      onChange={handleChange}
                    />
                  </div>
                  <div className='form-group'>
                    <textarea
                      name='text'
                      rows='10'
                      className='form-control'
                      placeholder='Your review'
                      value={text}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div className='form-group'>
                    <input
                      type='submit'
                      value={review ? 'Update Review' : 'Submit Review'}
                      className='btn btn-dark btn-block'
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

ReviewForm.propTypes = {
  addReview: PropTypes.func.isRequired,
  updateReview: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  Company: state.Companies.Company,
  review: state.reviews.review,
})

export default connect(mapStateToProps, { addReview, updateReview })(ReviewForm)
