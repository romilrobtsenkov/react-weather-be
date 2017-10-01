# react-weather-be

Ensure Docker is set up and running.

Add conf file in root dir named `.env`. Sample data is provided!
```
APP_PORT=3000
MONGODB_URI=mongodb://mongoDB/weatherApp
WEATHER_API_URL=http://api.openweathermap.org/data/2.5/
WEATHER_API_KEY=b1b15e88fa797225412429c1c50c122a1
CACHE_TIMEOUT=7200000
```

### Setup dev environment 
```
docker-compose up
```

Application with hot reload will be available from `localhost:3000`

### Start production 
```
docker-compose -f docker-compose.yml -f docker-compose.production.yml up -d
```

Block connections via firewall to MongoDB (27017) and nodeApp ports (3000)
