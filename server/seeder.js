const fs = require('fs')
const mongoose = require('mongoose')
const colors = require('colors')
const dotenv = require('dotenv')

// Load env vars
dotenv.config({ path: './config/config.env' })

// Load models
const Company = require('./models/Company')
const Truck = require('./models/Truck')
const User = require('./models/User')
const Review = require('./models/Review')

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  autoIndex: true,
  // useFindAndModify: false,
  // useUnifiedTopology: true
})

// Read JSON files
const companies = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/companies.json`)
)
const trucks = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/trucks.json`)
)
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`)
)
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/reviews.json`)
)

// Import into DB
const importData = async () => {
  try {
    await Company.create(companies)
    await Truck.create(trucks)
    await User.create(users)
    await Review.create(reviews)

    console.log('Data Imported...'.green.inverse)
    process.exit()
  } catch (err) {
    console.error(err)
  }
}

// Delete data
const deleteData = async () => {
  try {
    await Company.deleteMany()
    await Truck.deleteMany()
    await User.deleteMany()
    await Review.deleteMany()

    console.log('Data Destroyed...'.red.inverse)
    process.exit()
  } catch (err) {
    console.error(err)
  }
}

if (process.argv[2] === '-i') {
  importData()
} else if (process.argv[2] === '-d') {
  deleteData()
}
