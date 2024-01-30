import express from 'express'
import {
  getStates,
  getCitiesOfState,
  getCities,
  getState,
  getCity,
} from '../controllers/locationController.js'

const router = express.Router()


router.route('/states').get(getStates)
router.route('/states/cities/:stateId').get(getCitiesOfState)
router.route('/cities').get(getCities)


export default router
