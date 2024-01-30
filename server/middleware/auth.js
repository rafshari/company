import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/UserModel.js'
import RefreshToken from '../models/RefreshTokenModel.js'
import httpStatus from 'http-status'
import { tokenTypes } from '../config/tokens.js'
import { verify } from '../utils/jwtHelpers.js'
import ApiError from '../utils/APIError.js'
// Protect routes
const protect = asyncHandler(async (req, res, next) => {
  let token
  token = req.cookies.jwt
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decoded.userId).select('-password')
      next()
    } catch (error) {
      res.status(401)
      throw new Error('Not authorized, invalid token')
    }
  } else {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})


const protectN = async (req, res, next) => {
  try {
    const accessToken = req.get('Authorization')
    if (!accessToken) new ApiError(httpStatus.UNAUTHORIZED, 'Invalid Access Token')

    let tokenPayload = await verify(accessToken, process.env.JWT_SECRET)
    if (!tokenPayload || tokenPayload.type !== tokenTypes.ACCESS) new                           ApiError(httpStatus.UNAUTHORIZED, 'Invalid Access Token')

    let userExists = await User.exists({
      _id: tokenPayload.userId,
    })

    if (!userExists)
      throw new ApiError(
        httpStatus.FORBIDDEN,
        'Invalid Access Token - logout'
      )

    let refreshTokenExists = await RefreshToken.exists({
      userRef: tokenPayload.userId,
      loginTime: tokenPayload.loginTime,
    })

    if (!refreshTokenExists)
      throw new ApiError(
        httpStatus.FORBIDDEN,
        'Invalid Access Token - logout'
      )

    req.authData = tokenPayload

    next()
  } catch (error) {
    next(error)
  }
}
// oldway
//  const protect = asyncHandler(async (req, res, next) => {
//   let token;

//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith('Bearer')
//   ) {
//     // Set token from Bearer token in header
//   token = req.headers.authorization.split(' ')[1];
//     // Set token from cookie
//   }
//   else if (req.cookies.token) {
//     token = req.cookies.token;
//   }

//   // Make sure token exists
//   if (!token) {
//     return next(new ApiError('Not authorized to access this route', 401));
//   }

//   try {
//     // Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log(decoded);
//     req.user = await User.findById(decoded.id);

//     next();
//   } catch (err) {
//     return next(new ApiError('Not authorized to access this route', 401));
//   }
// });

// Grant access to specific roles
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError(
          `User role ${req.user.role} is not authorized to access this route`,
          403
        )
      )
    }
    next()
  }
}

export { protect, protectN, authorize }
