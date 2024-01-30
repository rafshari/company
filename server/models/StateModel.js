import mongoose from 'mongoose'
const stateSchema = mongoose.Schema({
  id: {
    type: Number,
  },
  state: {
    type: String,
  },
  cities: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'City',
    },
  ],
})

const State = mongoose.model('State', stateSchema)

export default State