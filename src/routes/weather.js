const express = require('express')
const router = express.Router()
const weather = require('../controllers/weather')
const { asyncMiddleware } = require('../utils/common')

router.get('/', asyncMiddleware(weather.getWeather))

module.exports = router
