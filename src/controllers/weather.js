const Weather = require('../models/weather')
const rp = require('request-promise')
// rp.debug = true
const { removeEmptyFromObject } = require('../utils/common')

module.exports.getWeather = async (req, res) => {
  const { q, lat, lon, id } = req.query
  const qs = removeEmptyFromObject({
    q,
    lat,
    lon,
    id
    // cnt: 9 // results for next 24h
  })

  if (!Object.keys(qs).length) {
    return res.status(400).send({ msg: 'please provide query params' })
  }

  const queryWithoutId = JSON.stringify(qs)
  const cachedData = await Weather.findOneAndUpdate(
    {
      query: queryWithoutId,
      expires: { $gt: new Date() }
    },
    {
      $inc: { requestCount: 1 },
      $push: { requests: new Date() }
    },
    { new: true }
  ).select('data createdAt')

  if (cachedData) {
    return res.json({
      status: 'cached',
      data: cachedData.data,
      dateModified: cachedData.createdAt
    })
  }

  qs.appid = process.env.WEATHER_API_KEY

  const options = {
    uri: process.env.WEATHER_API_URL + 'forecast',
    qs,
    json: true
  }

  const data = await rp(options)
  if (data.cod !== '200') return res.status(400).send({ msg: 'unable to get data from API' })

  // one result per day at noon, except first for current weather
  let keepFirst = true
  data.list = data.list.filter(item => {
    if (keepFirst) {
      keepFirst = false
      return true
    }
    return item.dt_txt.substring(11, 13) === '12'
  })

  const cacheUntil = new Date(new Date() * 1 + parseInt(process.env.CACHE_TIMEOUT))
  const newWeather = new Weather({
    query: queryWithoutId,
    data: data,
    expires: cacheUntil
  })

  const savedWeather = await newWeather.save()
  res.status(200).send({
    status: 'api',
    data,
    dateModified: savedWeather.createdAt
  })
}
