import crypto from 'crypto'
import mongoose from 'mongoose'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
//const randomize = require('randomatic');

const userSchema = mongoose.Schema(
  {
    username: { type: String },
    name: {
      type: String,
      required: [true, 'لطفا نام خود را وارد کنید'],
    },
    phone: {
      type: String,
      required: [true, 'لطفا شماره همراه خود را وارد کنید'],
    },
    email: {
      type: String,
      required: [true, 'لطفا ایمیل خود را وارد '],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    avatar: {
      public_id: {
        type: String,
        required: false,
      },
      url: {
        type: String,
        required: false,
      },
    },
    role: {
      type: [String],
      enum: ['user', 'admin', 'publisher'],
      default:['user'],
    },
    password: {
      type: String,
      required: [true, 'لطفا رمز عبور خود را وارد کنید'],
      minlength: 6,
    },
    source: { type: String },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: 'users' }
)

userSchema.virtual('companies', {
  ref: 'Company',
  foreignField: 'user',
  localField: '_id',
})
userSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'user',
  localField: '_id',
})

//   confirmEmailToken: String,
//   isEmailConfirmed: {
//     type: Boolean,
//     default: false,
//   },
//   twoFactorCode: String,
//   twoFactorCodeExpire: Date,
//   twoFactorEnable: {
//     type: Boolean,
//     default: false,
//   },
//
//   },
// });

// Encrypt password using bcrypt
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  const salt = await bcryptjs.genSalt(10)
  this.password = await bcryptjs.hash(this.password, salt)
})

//  Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password)
}

// Generate email confirm token
// userSchema.methods.generateEmailConfirmToken = function (next) {
//   email confirmation token
//   const confirmationToken = crypto.randomBytes(20).toString('hex');

//   this.confirmEmailToken = crypto
//     .createHash('sha256')
//     .update(confirmationToken)
//     .digest('hex');

//   const confirmTokenExtend = crypto.randomBytes(100).toString('hex');
//   const confirmTokenCombined = `${confirmationToken}.${confirmTokenExtend}`;
//   return confirmTokenCombined;

const User = mongoose.model('User', userSchema)

export default User
