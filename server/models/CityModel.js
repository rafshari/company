import mongoose from 'mongoose'
const citySchema = mongoose.Schema({
  name: {
    type: String,
  },
  state: {
    type: mongoose.Schema.ObjectId,
    ref: 'State',
    required: true,
  },
})



const City = mongoose.model('City', citySchema)

export default City