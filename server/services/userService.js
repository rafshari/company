import User from '../models/UserModel.js'
import ApiError from '../utils/APIError.js'

const getUserFromId = async (userId) => {
    const user = await User.findById(userId)
  if (!user) throw new ApiError('Invaid User Id')
  return user
}

export { getUserFromId }
