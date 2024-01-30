import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import colors from 'colors'
import fileupload from 'express-fileupload'
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js'
import { errorHandler, notFound } from './middleware/error.js'
import mongoSanitize from 'express-mongo-sanitize'
import helmet from 'helmet'
import xss from 'xss-clean'
import rateLimit from 'express-rate-limit'
import hpp from 'hpp'
import cors from 'cors'

// Load env vars
dotenv.config({ path: './config/config.env' })

//connect to database
connectDB()

// route files
import companies from './routes/companyRoute.js'
import trucks from './routes/truckRoute.js'
import auth from './routes/authRoute.js'
import users from './routes/usersRoute.js'
import user from './routes/userRoute.js'

import reviews from './routes/reviewsRoute.js'
import locations from './routes/locationRoute.js'

import mongoose from 'mongoose'

const app = express()

//body parser
app.use(express.json())

// Prevent xss attacks
app.use(xss())

//Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 10 minutes)
})
app.use(limiter)

//pervent http pram polution
app.use(hpp())

//Enable cors
app.use(
  cors({
    origin: 'http://localhost:3000',
    // credentials: true
  })
)

// Cookie parser
app.use(cookieParser())

//Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

//file uploading
//app.use(fileupload())

// Sanitize Data
app.use(mongoSanitize())

// Set security headers
app.use(helmet())

// set static folder
const __dirname = path.resolve()
app.use(express.static(path.join(__dirname, 'public')))

//Mount Routers
app.use('/api/v1/companies', companies)
app.use('/api/v1/trucks', trucks)
app.use('/api/v1/auth', auth)
app.use('/api/v1/users', users)
app.use('/api/v1/user', user)
app.use('/api/v1/reviews', reviews)
app.use('/api/v1/locations', locations)

//Handel errors
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

const server = app.listen(
  PORT,
  console.log(
    `server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold
  )
)
// Handle unhandled promise rejections

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red)
  //close server & exit process
  server.close(() => process.exit(1))
})
