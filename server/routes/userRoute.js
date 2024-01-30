import express from 'express'
import {
  getUserInfo,
} from '../controllers/userController.js'
import { protectN } from '../middleware/auth.js'

const router = express.Router({ mergeParams: true })


router.route('/').get(protectN, getUserInfo)
export default router
