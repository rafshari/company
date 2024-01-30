import mongoose from 'mongoose'

const ReviewSchema = mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Please add a title for the review'],
    maxlength: 100,
  },
  text: {
    type: String,
    required: [true, 'Please add some text'],
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
    required: [true, 'Please add a rating between 1 and 10'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  Company: {
    type: mongoose.Schema.ObjectId,
    ref: 'Company',
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
})

// Prevent user from submitting more than one review per Company
ReviewSchema.index({ Company: 1, user: 1 }, { unique: true })

// Static method to get avg rating and save
ReviewSchema.statics.getAverageRating = async function (CompanyId) {
  const obj = await this.aggregate([
    {
      $match: { Company: CompanyId },
    },
    {
      $group: {
        _id: '$Company',
        averageRating: { $avg: '$rating' },
      },
    },
  ])

  try {
    await this.model('Company').findByIdAndUpdate(CompanyId, {
      averageRating: obj[0].averageRating,
    })
  } catch (err) {
    console.error(err)
  }
}

// Call getAverageCost after save
ReviewSchema.post('save', async function () {
  await this.constructor.getAverageRating(this.company)
})

// Call getAverageCost before remove
ReviewSchema.pre('remove', async function () {
  await this.constructor.getAverageRating(this.company)
})


const Review = mongoose.model('Review', ReviewSchema)

export default Review