import express from 'express'
import {
  getTrucks,
  getTruck,
  addTruck,
  updateTruck,
  deleteTruck,
} from '../controllers/truckController.js'
import Truck from '../models/TruckModel.js'
import advancedResults from '../middleware/advancedResults.js'
const router = express.Router({ mergeParams: true })

import { protect, authorize } from '../middleware/auth.js'

router
  .route('/')
  .get(
    advancedResults(Truck, {
      path: 'Company',
      select: 'name description',
    }),
    getTrucks
  )
  .post(protect, authorize('publisher', 'admin'), addTruck)
router
  .route('/:id')
  .get(getTruck)
  .put(protect, authorize('publisher', 'admin'), updateTruck)
  .delete(protect, authorize('publisher', 'admin'), deleteTruck)

export default router
