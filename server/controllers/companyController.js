import Company from '../models/CompanyModel.js'
import asyncHandler from 'express-async-handler'
import path from 'path'
import geocoder from '../utils/geocoder.js'
import jwt from 'jsonwebtoken'
import { stringify } from 'querystring'
import { json } from 'express'
import ApiError from '../utils/APIError.js'
import cloudinary from 'cloudinary'


// @desc      Create new Company
// @route     POST /api/v1/companies
// @access    Private
const createCompany = asyncHandler(async (req, res, next) => {
 og(cloudinary.config())
   let images = [...req.body.companyData.images]
   let imagesBuffer = []
  for (let i = 0; i < images.length; i++) {
    console.log("www:", "image")
        const result = await cloudinary.uploader.upload(images[i], {
          folder: 'cargo/companies',
        })
        imagesBuffer.push({
          public_id: result.public_id,
          url: result.secure_url,
        })
  }
  
  req.body.companyData.images = imagesBuffer
  //console.log('imagesLinks:', imagesLinks)
    //console.log('req.body.companyData:', req.body.companyData)
  const company = await Company.create(req.body.companyData)
  console.log('company', company)
  res.status(201).json({
    success: true,
   data: company,
  })
})

  // cloudinary.config({
  //   cloud_name: 'dxb4gek9t',
  //   api_key: '517861677599238',
  //   api_secret: '3f2a8OTskk-3gBKp7S_SX-OAxwQ',
  //   secure: true,
  // })

// @desc      Get all Companies
// @route     GET /api/v1/companies
// @access    Public
const getCompanies = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults)
  // res.status(200).json(result)
  //res.status(200).json({meg:'companies'})
})

// @desc      Get single Company
// @route     GET /api/v1/companies/:id
// @access    Public
const getCompany = asyncHandler(async (req, res, next) => {
  const company = await Company.findById(req.params.id)

  if (!company) {
    return next(
      new ApiError(`Company not found with id of ${req.params.id}`, 404)
    )
  }

  res.status(200).json({ success: true, data: company })
})

const getCompaniesInFilter = asyncHandler(async (req, res, next) => {
  const { state, city } = req.params

  const companies = await Company.find({ state, city })

  res.status(200).json({
    success: true,
    count: companies.length,
    data: companies,
  })
})

// @desc      Get Companies within a radius
// @route     GET /api/v1/Companies/radius/:zipcode/:distance
// @access    Private
const getCompaniesInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params

  // Get lat/lng from geocoder
  const loc = await geocoder.geocode(zipcode)
  const lat = loc[0].latitude
  const lng = loc[0].longitude

  // Calc radius using radians
  // Divide dist by radius of Earth
  // Earth Radius = 3,963 mi / 6,378 km
  const radius = distance / 3963

  const companies = await Company.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  })

  res.status(200).json({
    success: true,
    count: companies.length,
    data: companies,
  })
})


// @desc      Update Company
// @route     PUT /api/v1/Companies/:id
// @access    Private
const updateCompany = asyncHandler(async (req, res, next) => {
  let Company = await Company.findById(req.params.id)

  if (!Company) {
    return next(
      new ApiError(`Company not found with id of ${req.params.id}`, 404)
    )
  }

  // Make sure user is Company owner
  if (Company.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ApiError(
        `User ${req.user.id} is not authorized to update this Company`,
        401
      )
    )
  }

  Company = await Company.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(200).json({ success: true, data: Company })
})

// @desc      Delete Company
// @route     DELETE /api/v1/Companies/:id
// @access    Private
const deleteCompany = asyncHandler(async (req, res, next) => {
  const Company = await Company.findById(req.params.id)

  if (!Company) {
    return next(
      new ApiError(`Company not found with id of ${req.params.id}`, 404)
    )
  }

  // Make sure user is Company owner
  if (Company.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ApiError(
        `User ${req.user.id} is not authorized to delete this Company`,
        401
      )
    )
  }

  await Company.remove()

  res.status(200).json({ success: true, data: {} })
})

// @desc      Upload photo for Company
// @route     PUT /api/v1/Companies/:id/photo
// @access    Private
const CompanyPhotoUpload = asyncHandler(async (req, res, next) => {
  const Company = await Company.findById(req.params.id)

  if (!Company) {
    return next(
      new ApiError(`Company not found with id of ${req.params.id}`, 404)
    )
  }

  // Make sure user is Company owner
  if (Company.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ApiError(
        `User ${req.user.id} is not authorized to update this Company`,
        401
      )
    )
  }

  if (!req.files) {
    return next(new ApiError(`Please upload a file`, 400))
  }

  const file = req.files.file

  // Make sure the image is a photo
  if (!file.mimetype.startsWith('image')) {
    return next(new ApiError(`Please upload an image file`, 400))
  }

  // Check file size
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ApiError(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    )
  }

  // Create custom filename
  file.name = `photo_${Company._id}${path.parse(file.name).ext}`

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.error(err)
      return next(new ApiError(`Problem with file upload`, 500))
    }

    await Company.findByIdAndUpdate(req.params.id, { photo: file.name })

    res.status(200).json({
      success: true,
      data: file.name,
    })
  })
})



export {
  getCompanies,
  getCompany,
  getCompaniesInRadius,
  getCompaniesInFilter,
  createCompany,
  updateCompany,
  deleteCompany,
  CompanyPhotoUpload,
}
