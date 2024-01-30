import mongoose from 'mongoose'

const TruckSchema = new mongoose.Schema({
  plate: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
  },
  bargir: {
    type: String,
  },
  smartCardNo: {
    type: Number,
  },
  active: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  company: {
    type: mongoose.Types.ObjectId,
    ref: 'Company',
    unique: false,
    required: false,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
})

const Truck = mongoose.model('Truck', TruckSchema)

export default Truck