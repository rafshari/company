import mongoose from 'mongoose'

const CompanySchema = new mongoose.Schema({
  companyName: {
    type: String,
    //required: [true, 'Please add a Company name'],
    maxlength: [50, 'name connot be more than 50 characters'],
  },
  category: {
    type: String,
  },

  phone: {
    type: String,
    maxlength: [20, 'Phone number can not be longer than 20 characters'],
  },
  address: {
    type: String,
  },
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },

  state: {
    type: String,
  },
  city: {
    type: String,
  },
  location: {
    // GeoJSON Point
    type: {
      type: String,
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],
      index: '2dsphere',
    },
  },
  website: {
    type: String,
    match: [
      /http?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      'لطفا یک آدرس معتبر وارد نمایید',
    ],
  },
  description: {
    type: String,
    maxlength: [500, 'description connot be more than 500 characters'],
  },
  numOfBranches: {
    type: String,
    maxlength: [20, 'Phone number can not be longer than 20 characters'],
  },
  branches: {
    // Array of strings
    type: [String],
    // enum: ['tehran', 'esfahan'],
  },
  averageRating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [10, 'Rating must can not be more than 10'],
  },
  ceoName: {
    type: String,
    maxlength: [50, 'name cannot be more than 50 characters'],
  },
  ceoPhone: {
    type: String,
  },
  nationalId: {
    type: Number,
  },

  numOfTrucks: {
    type: Number,
  },
  dateOfEstablishment: {
    type: Date,
  },
  active: {
    type: Boolean,
    default: true,
  },
  images: [{
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    }],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
})
CompanySchema.virtual('trucks', {
  ref: 'Truck',
  localField: '_id',
  foreignField: 'company',
  justOne: false,
})

CompanySchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'company',
})
const Company = mongoose.model('Company', CompanySchema)

export default Company
// Create Company slug from the name
// CompanySchema.pre('save', function (next) {
//   this.slug = slugify(this.companyName, { lower: true })
//   next()
// })

// Geocode & create location field

// Cascade delete Trucks when a Company is deleted

//  Reverse populate with virtual


