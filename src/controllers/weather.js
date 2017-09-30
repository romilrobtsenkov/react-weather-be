const Weather = require('../models/weather')
const rp = require('request-promise')
const { removeEmptyFromObject } = require('../utils/common')

module.exports.getWeather = async (req, res) => {
  const { q, lat, lng, id } = req.query
  const qs = removeEmptyFromObject({
    q,
    lat,
    lng,
    id
  })

  if (!Object.keys(qs).length) {
    return res.status(400).send({ msg: 'please provide query params' })
  }

  const queryWithoutId = JSON.parse(JSON.stringify(qs))
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
  ).select('data')

  if (cachedData) {
    return res.json({ status: 'cached', data: cachedData.data })
  }

  qs.appid = process.env.WEATHER_API_KEY

  const options = {
    uri: process.env.WEATHER_API_URL + 'forecast',
    qs,
    json: true
  }

  const data = await rp(options)
  if (data.cod !== '200') return res.status(400).send()

  const cacheUntil = new Date(new Date() * 1 + parseInt(process.env.CACHE_TIMEOUT))
  const newWeather = new Weather({
    query: queryWithoutId,
    data: data,
    expires: cacheUntil
  })

  await newWeather.save()

  res.status(200).send({ status: 'api', data })
}
