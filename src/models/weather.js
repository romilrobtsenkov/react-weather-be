const mongoose = require('mongoose')
const Schema = mongoose.Schema

const WeatherSchema = new Schema(
  {
    query: { type: String, required: true },
    data: { type: String, required: true },
    deleted: { type: Date },
    expires: {
      type: Date,
      expires: 60 // 60 seconds after expires
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Curriculum', WeatherSchema)
