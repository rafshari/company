import asyncHandler from 'express-async-handler'
import Review from '../models/ReviewModel.js'
import Company from'../models/CompanyModel.js'
import ApiError from '../utils/APIError.js'

// @desc      Get reviews
// @route     GET /api/v1/reviews
// @route     GET /api/v1/Companies/:CompanyId/reviews
// @access    Public
const getReviews = asyncHandler(async (req, res, next) => {
  if (req.params.CompanyId) {
    const reviews = await Review.find({ Company: req.params.CompanyId })

    return res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    })
  } else {
    res.status(200).json(res.advancedResults)
  }
})

// @desc      Get single review
// @route     GET /api/v1/reviews/:id
// @access    Public
const getReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id).populate({
    path: 'Company',
    select: 'name description',
  })

  if (!review) {
    return next(
      new ApiError(`No review found with the id of ${req.params.id}`, 404)
    )
  }

  res.status(200).json({
    success: true,
    data: review,
  })
})

// @desc      Add review
// @route     POST /api/v1/Companies/:CompanyId/reviews
// @access    Private
const addReview = asyncHandler(async (req, res, next) => {
  req.body.Company = req.params.CompanyId
  req.body.user = req.user.id

  const Company = await Company.findById(req.params.CompanyId)

  if (!Company) {
    return next(
      new ApiError(
        `No Company with the id of ${req.params.CompanyId}`,
        404
      )
    )
  }

  const review = await Review.create(req.body)

  res.status(201).json({
    success: true,
    data: review,
  })
})

// @desc      Update review
// @route     PUT /api/v1/reviews/:id
// @access    Private
const updateReview = asyncHandler(async (req, res, next) => {
  let review = await Review.findById(req.params.id)

  if (!review) {
    return next(
      new ApiError(`No review with the id of ${req.params.id}`, 404)
    )
  }

  // Make sure review belongs to user or user is admin
  if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ApiError(`Not authorized to update review`, 401))
  }

  review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  review.save()

  res.status(200).json({
    success: true,
    data: review,
  })
})

// @desc      Delete review
// @route     DELETE /api/v1/reviews/:id
// @access    Private
const deleteReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id)

  if (!review) {
    return next(
      new ApiError(`No review with the id of ${req.params.id}`, 404)
    )
  }

  // Make sure review belongs to user or user is admin
  if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ApiError(`Not authorized to update review`, 401))
  }

  await review.remove()

  res.status(200).json({
    success: true,
    data: {},
  })
})

export { getReviews, getReview, addReview, updateReview, deleteReview }