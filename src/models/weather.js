const mongoose = require('mongoose')
const Schema = mongoose.Schema

const WeatherSchema = new Schema(
  {
    query: { type: Object, required: true },
    data: { type: Object, required: true },
    requestCount: { type: Number, required: true, default: 0 },
    requests: [{ type: Date }],
    expires: { type: Date, required: true }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Weather', WeatherSchema)
