import express from 'express'
import {
  register,
  login,
  logout,
  getUserProfile,
  forgotPassword,
  resetPassword,
  UpdateUserProfile,
  updatePassword,
  refreshToken,
} from '../controllers/authController.js'

// confirmEmail,

const router = express.Router()

import { protect } from '../middleware/auth.js'

router.post('/register', register)
router.post('/login', login)
router.get('/profile', protect, getUserProfile, UpdateUserProfile)
router.post('/forgotPassword', forgotPassword)
router.put('/resetpassword/:resettoken', resetPassword)
router.put('/updatepassword', protect, updatePassword)
router.post('/logout', logout)
router.post('/refresh-token', refreshToken)
// router.get('/confirmemail', confirmEmail);
// router.put('/updatepassword', protect, updatePassword);

export default router
