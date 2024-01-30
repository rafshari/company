import asyncHandler from 'express-async-handler'
import User from '../models/UserModel.js'
import ApiError from '../utils/APIError.js'
import { getUserFromId } from '../services/userService.js'

// @desc      Get all users
// @route     GET /api/v1/users
// @access    Private/Admin
const getUsers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults)
})

// @desc      Get single user
// @route     GET /api/v1/users/:id
// @access    Private/Admin
const getUser = asyncHandler(async (req, res, next) => {
  //  const userId = req.authData.userId
console.log('getUser:', req.params)
  const user = await User.findById(req.params.id)

  res.status(200).json({
    success: true,
    data: user,
  })
})

// @desc      Create user
// @route     POST /api/v1/users
// @access    Private/Admin
const createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body)

  res.status(201).json({
    success: true,
    data: user,
  })
})

// @desc      Update user
// @route     PUT /api/v1/users/:id
// @access    Private/Admin
const updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(200).json({
    success: true,
    data: user,
  })
})

// @desc      Delete user
// @route     DELETE /api/v1/users/:id
// @access    Private/Admin
const deleteUser = asyncHandler(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id)

  res.status(200).json({
    success: true,
    data: {},
  })
})

const getUserInfo = async (req, res, next) => {
  const userId = req.authData.userId
  try {
    const user = await getUserFromId(userId)
    const responseUser = {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    }
    res.json({ user: responseUser })
  } catch (error) {
    next(error)
  }
}

export { getUsers, getUser, createUser, updateUser, deleteUser, getUserInfo }
