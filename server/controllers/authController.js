import crypto from 'crypto'
import asyncHandler from 'express-async-handler'
import sendEmail from '../utils/sendEmail.js'
import User from '../models/UserModel.js'
import { OAuth2Client } from 'google-auth-library'
import { v2 as cloudinary } from 'cloudinary'
import ApiError from '../utils/APIError.js'
import {
  fetchUserFromEmailAndPassword,
  verifyCurrentPassword,
  verifyUserFromRefreshTokenPayload,
  createNewUser,
  fetchUserFromEmail,
} from '../services/authService.js'
import {
  generateAuthTokens,
  clearRefreshToken,
  verifyRefreshToken,
  generateAccessTokenFromRefreshTokenPayload,
} from '../services/tokenService.js'


// @desc      Register user
// @route     POST /api/v1/auth/register
// @access    Public
const register = asyncHandler(async (req, res) => {
  console.log('third:', req.body)
  if (req.body.avatar) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_APISECRET,
    })

    const result = await cloudinary.uploader
      .upload(req.body.avatar, {
        folder: 'cargo/avatars',
        width: '150',
        crop: 'scale',
      })
      .then((result) => console.log('4:',result))
  }
  const { name, phone, email, password, role  } = req.body

    const user = await User.create({
      name,
      email,
      phone,
      password,
      avatar: {
        public_id: result?.public_id,
        url: result?.url,
      },
    })
    res
      .status(200)
      .json({ success: true, message: 'User registered successfully' })

})

// @desc      Login user
// @route     POST /api/v1/auth/login
// @access    Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    const tokens = await generateAuthTokens(user)
    res.status(201).json({
      userId: user._id,
      name: user.name,
      email: user.email,
      tokens,
    })
    console.log(user.name, user.email)
  } else {
    res.status(401)
    throw new Error(`ایمیل یا رمز عبور درست نیست`)
  }
})
// @desc      Log user out / clear cookie
// @route     GET /api/v1/auth/logout
// @access    Public
// const logout = asyncHandler(async (req, res) => {
//   console.log('logout:', reg.body)
//   await clearRefreshToken(req.body.refreshToken)
//   res.status(200).send({ message: 'User logged out' })
// })

const logout = async (req, res, next) => {
  try {
    await clearRefreshToken(req.body.refreshToken)
    res.json({})
  } catch (error) {
    next(error)
  }
}


// @desc      Get current logged in user
// @route     GET /api/v1/auth/me
// @access    Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    phone: req.user.phone,
  }

  res.status(200).json({
    success: true,
    data: user,
  })
})

const refreshToken = async (req, res, next) => {
  try {
    let refreshTokenPayload = await verifyRefreshToken(req.body.refreshToken)
    await verifyUserFromRefreshTokenPayload(refreshTokenPayload)
    let newAccessToken = await generateAccessTokenFromRefreshTokenPayload(
      refreshTokenPayload
    )

    res.json({
      accessToken: newAccessToken,
    })
    console.log('new accessToken:', newAccessToken)
  } catch (error) {
    next(error)
  }
}
// @desc      Update user details
// @route     PUT /api/v1/auth/updatedetails
// @access    Private
const UpdateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.phone = req.body.phone || user.phone
    if (req.body.password) {
      user.password = req.body.password
    }
    const updatedUser = await user.save()
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
    })
  } else {
    res.status(404)
    throw new Error(`User not found`)
  }

  res.status(200).send({ message: 'Update User Profile' })
})
// @desc      Update password
// @route     PUT /api/v1/auth/updatepassword
// @access    Private
const updatePassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select('+password')

  // Check current password
  if (!(await user.matchPassword(req.body.currentPassword))) {
    return next(new ApiError('Password is incorrect', 401))
  }

  user.password = req.body.newPassword
  await user.save()

  sendTokenResponse(user, 200, res)
})

// @desc      Forgot password
// @route     POST /api/v1/auth/forgotpassword
// @access    Public
const forgotPassword = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email })

  if (!user) {
    return next(new ApiError('There is no user with that email', 404))
  }

  // Get reset token
  const resetToken = user.getResetPasswordToken()

  await user.save({ validateBeforeSave: false })
  // Create reset url
  const resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/auth/resetpassword/${resetToken}`

  const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`

  try {
    await sendEmail({
      email: user.email,
      subject: 'Password reset token',
      message,
    })

    res.status(200).json({ success: true, data: 'Email sent' })
  } catch (err) {
    console.log(err)
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save({ validateBeforeSave: false })

    return next(new ApiError('Email could not be sent', 500))
  }
})
// @desc      Reset password
// @route     PUT /api/v1/auth/resetpassword/:resettoken
// @access    Public
const resetPassword = asyncHandler(async (req, res, next) => {
  // Get hashed token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resettoken)
    .digest('hex')

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  })

  if (!user) {
    return next(new ApiError('Invalid token', 400))
  }

  // Set new password
  user.password = req.body.password
  user.resetPasswordToken = undefined
  user.resetPasswordExpire = undefined
  await user.save()

  sendTokenResponse(user, 200, res)
})

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken()
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  }
  if (process.env.NODE_ENV === 'production') {
    options.secure = true
  }

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
  })
}

//   // grab token and send to email
//   const confirmEmailToken = user.generateEmailConfirmToken();

//   // Create reset url
//   const confirmEmailURL = `${req.protocol}://${req.get(
//     'host',
//   )}/api/v1/auth/confirmemail?token=${confirmEmailToken}`;

//   const message = `You are receiving this email because you need to confirm your email address. Please make a GET request to: \n\n ${confirmEmailURL}`;

//   user.save({ validateBeforeSave: false });

//   const sendResult = await sendEmail({
//     email: user.email,
//     subject: 'Email confirmation token',
//     message,
//   });

//   sendTokenResponse(user, 200, res);
// });

// /**
//  * @desc    Confirm Email
//  * @route   GET /api/v1/auth/confirmemail
//  * @access  Public
//  */
// exports.confirmEmail = asyncHandler(async (req, res, next) => {
//   // grab token from email
//   const { token } = req.query;

//   if (!token) {
//     return next(new ApiError('Invalid Token', 400));
//   }

//   const splitToken = token.split('.')[0];
//   const confirmEmailToken = crypto
//     .createHash('sha256')
//     .update(splitToken)
//     .digest('hex');

//   // get user by token
//   const user = await User.findOne({
//     confirmEmailToken,
//     isEmailConfirmed: false,
//   });

//   if (!user) {
//     return next(new ApiError('Invalid Token', 400));
//   }

// // update confirmed to true
// user.confirmEmailToken = undefined;
// user.isEmailConfirmed = true;

//   // save
//   user.save({ validateBeforeSave: false });

//   // return token
//   sendTokenResponse(user, 200, res);
//

export {
  register,
  login,
  logout,
  getUserProfile,
  UpdateUserProfile,
  updatePassword,
  forgotPassword,
  resetPassword,
  sendTokenResponse,
  refreshToken,
}
