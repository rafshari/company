import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      autoIndex: true,
      useNewUrlParser: true,
      //findOneAndUpdate:false
      //useUnifiedTopology: true
    })
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold)
  } catch (error) {
    handleError(error)
  }
}

export default connectDB
