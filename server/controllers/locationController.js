import asyncHandler from 'express-async-handler'
import State from '../models/StateModel.js'
import City from '../models/CityModel.js'

import iranCity from 'iran-city'

// @desc      Get all states
// @route     GET /api/v1/locations/states
// @access    Public
const getStates = asyncHandler(async (req, res, next) => {
  let AllProvinces = iranCity.allProvinces()

  res.status(200).json({ success: true, data: AllProvinces })
})
// @desc      Get cities of the state
// @route     GET /api/v1/states/:id/cities
// @access    Public
const getCitiesOfState = asyncHandler(async (req, res, next) => {
  //console.log('stateId:', req.params.stateId)
  const CitiesOfProvince = await iranCity.citiesOfProvince(
    Number(req.params.stateId)
  )
  //console.log('cities:', CitiesOfProvince)

  res.status(200).json({ success: true, data: CitiesOfProvince })
})

// @desc      Get all cities
// @route     GET /api/v1/locations/cities
// @access    Public
const getCities = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults)
})

// @desc      Get single state
// @route     GET /api/v1/states/:id
// @access    Public
const getState = asyncHandler(async (req, res, next) => {
  const state = await State.findById(req.params.id)

  res.status(200).json({
    success: true,
    data: state,
  })
})

// @desc      Get single city
// @route     GET /api/v1/states/:id
// @access    Public
const getCity = asyncHandler(async (req, res, next) => {
  const cities = await City.find({ state: req.params.id })

  res.status(200).json({
    success: true,
    data: cities,
  })
})

export { getStates, getCities, getState, getCitiesOfState, getCity }
