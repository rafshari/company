import crypto from 'crypto'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
//const randomize = require('randomatic');

const DriverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'لطفا نام خود را وارد کنید'],
  },
  email: {
    type: String,
    required: [true, 'لطفا ایمیل ��ود را وارد '],
    unique: true, 
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  role: {
    type: String,
    enum: ['user', 'publisher'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'لطفا رمز عبور خود را وارد کنید'],
    minlength: 6,
    select: false,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
        type: Date,
        default: Date.now,
  },
 });


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
 next();
 }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});


// //Sign JWT and return
// userSchema.methods.getSignedJwtToken = function () {
//   return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRE,
//   });
// };

//  Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate and hash password token
userSchema.methods.getResetPasswordToken = function () {

  //Generate token
  const resetToken = crypto.randomBytes(20).toString('hex');

  //Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

 // Set expire
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

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


const Driver = mongoose.model('Driver', DriverSchema)

export default Driver