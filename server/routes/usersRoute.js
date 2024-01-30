import express from 'express'
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUserInfo,
} from '../controllers/userController.js'
import User from '../models/UserModel.js'
import  isActiveUser  from '../middleware/isActiveUser.js'


const router = express.Router({ mergeParams: true })

import advancedResults from '../middleware/advancedResults.js'
import { protect,protectN, authorize } from '../middleware/auth.js'

//router.use(protect)
//router.use(protectN)
router.use(authorize('admin'))

router
  .route('/')
  .get(advancedResults(User), getUsers)
  .post(createUser)
router.route('/:id').get(getUser).put(updateUser).delete(deleteUser)
router.route('/user').get(protectN, getUserInfo)
export default router
