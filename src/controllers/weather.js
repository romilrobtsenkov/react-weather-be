// const Weather = require('../models/weather')
const rp = require('request-promise')
const { removeEmptyFromObject } = require('../utils/common')

module.exports.getWeather = async (req, res) => {
  const { q, lat, lng, id } = req.query
  const qs = removeEmptyFromObject({
    q,
    lat,
    lng,
    id,
    appid: process.env.WEATHER_API_KEY
  })
  const options = {
    uri: process.env.WEATHER_API_URL + 'forecast',
    qs,
    json: true
  }

  const data = await rp(options)
  if (data.cod !== '200') return res.status(400).send()

  res.status(200).send(data)
}
