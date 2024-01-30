import React, { useEffect } from 'react'
import EditReviews from './EditReviews'
import AddReview from './add-review'
import Spinner from '../companies/spinner/spinner'

//import { getUserReviews } from '../../redux/actions/reviews'

const ManageReviews = ({ user, loading, getUserReviews, reviews }) => {
  useEffect(() => {
    getUserReviews(user._id)
  }, [getUserReviews, user])

  if (user && user.role === 'publisher') {
    return <Navigate to='/Companies' />
  }

  return loading && !reviews ? (
    <Spinner />
  ) : reviews.length > 0 ? (
    <EditReviews reviews={reviews} />
  ) : (
    <AddReview />
  )
}

ManageReviews.propTypes = {
  user: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  getUserReviews: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  loading: state.reviews.loading,
  reviews: state.reviews.reviews,
})

export default ManageReviews

export async function getStaticProps(ctx) {
getUserReviews

  return {
    props:{
      data:null
    }
  }
}
