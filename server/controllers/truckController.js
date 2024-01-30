import asyncHandler from 'express-async-handler'
import Truck from '../models/TruckModel.js'
import Company from '../models/CompanyModel.js'
import advancedResults from '../middleware/advancedResults.js'
import ApiError from '../utils/APIError.js'

// @desc      Get Trucks
// @route     GET /api/v1/trucks
// @route     GET /api/v1/companies/:CompanyId/Trucks
// @access    Public
const getTrucks = asyncHandler(async (req, res, next) => {
  if (req.params.CompanyId) {
    const trucks = await Truck.find({ Company: req.params.CompanyId })

    return res.status(200).json({
      success: true,
      count: trucks.length,
      data: trucks,
    })
  } else {
    res.status(200).json(res.advancedResults)
  }
})

// @desc      Get single Truck
// @route     GET /api/v1/trucks/:id
// @access    Public
const getTruck = asyncHandler(async (req, res, next) => {
  const Truck = await Truck.findById(req.params.id).populate({
    path: 'Company',
    select: 'name description',
  })

  if (!Truck) {
    return next(
      new ApiError(`No Truck with the id of ${req.params.id}`, 404)
    )
  }

  res.status(200).json({
    success: true,
    data: Truck,
  })
})

// @desc      Add Truck
// @route     POST /api/v1/companies/:CompanyId/Trucks
// @access    Private
const addTruck = asyncHandler(async (req, res, next) => {
  req.body.Company = req.params.CompanyId
  req.body.user = req.user.id
  const Company = await Company.findById(req.params.CompanyId)

  if (!Company) {
    return next(
      new ApiError(`No Company with the id of ${req.params.CompanyId}`),
      404
    )
  }
  // Make sure user is Company owner
  if (Company.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ApiError(
        `User ${req.user.id} is not authorized to add a Truck to Company ${Company._id}`,
        401
      )
    )
  }
  const Truck = await Truck.create(req.body)

  res.status(200).json({
    success: true,
    data: Truck,
  })
})

// @desc      Update Truck
// @route     PUT /api/v1/Trucks/:id
// @access    Private
const updateTruck = asyncHandler(async (req, res, next) => {
  let Truck = await Truck.findById(req.params.id)

  if (!Truck) {
    return next(
      new ApiError(`No Truck with the id of ${req.params.id}`),
      404
    )
  }
  // Make sure user is Truck owner
  if (Truck.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ApiError(
        `User ${req.user.id} is not authorized to update Truck ${Truck._id}`,
        401
      )
    )
  }
  Truck = await Truck.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
  res.status(200).json({
    success: true,
    data: Truck,
  })
})

// @desc      Delete Truck
// @route     DELETE /api/v1/Trucks/:id
// @access    Private
const deleteTruck = asyncHandler(async (req, res, next) => {
  const Truck = await Truck.findById(req.params.id)

  if (!Truck) {
    return next(
      new ApiError(`No Truck with the id of ${req.params.id}`),
      404
    )
  }
  // Make sure user is Truck owner
  if (Truck.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ApiError(
        `User ${req.user.id} is not authorized to delete Truck ${Truck._id}`,
        401
      )
    )
  }
  await Truck.remove()

  res.status(200).json({
    success: true,
    data: {},
  })
})


export { getTrucks, getTruck, addTruck, updateTruck, deleteTruck }