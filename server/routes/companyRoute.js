import express from 'express'
import {
  getCompanies,
  getCompany,
  createCompany,
  updateCompany,
  deleteCompany,
  getCompaniesInRadius,
  CompanyPhotoUpload,
} from '../controllers/companyController.js'

import Company from '../models/CompanyModel.js'

// Include other resource routers
import truckRouter from './truckRoute.js'
import reviewRouter from './reviewsRoute.js'

const router = express.Router()

import advancedResults from '../middleware/advancedResults.js'
import { protect, authorize } from '../middleware/auth.js'

// Re-route into other resource routers
router.use('/:CompanyId/Trucks', truckRouter)
router.use('/:CompanyId/reviews', reviewRouter)

router.route('/radius/:zipcode/:distance').get(getCompaniesInRadius)

router
  .route('/:id/photo')
  .put(protect, authorize('publisher', 'admin'), CompanyPhotoUpload)
router
  .route('/')
  .post(createCompany)
  .get(advancedResults(Company, 'trucks'), getCompanies)
  //.post(protect, authorize('publisher', 'admin'), createCompany)
router
  .route('/:id')
  .get(getCompany)
  .put(protect, authorize('publisher', 'admin'), updateCompany)
  .delete(protect, authorize('publisher', 'admin'), deleteCompany)

export default router
