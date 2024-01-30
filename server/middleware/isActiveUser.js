import RefreshToken from '../models/RefreshTokenModel.js'
import User from '../models/UserModel.js'
import httpStatus from 'http-status'
import { tokenTypes } from '../config/tokens.js'
import { verify } from '../utils/jwtHelpers.js'
import ApiError from '../utils/APIError.js'

const isActiveUser = async (req, res, next) => {
  try {
    const accessToken = req.get('Authorization')
    if (!accessToken)
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid Access Token')

    let tokenPayload = await verify(accessToken, process.env.JWT_SECRET)
    if (!tokenPayload || tokenPayload.type !== tokenTypes.ACCESS)
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid Access Token')

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

export default isActiveUser 
