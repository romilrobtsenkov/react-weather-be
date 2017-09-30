# react-weather-be

Ensure Docker is set up and running.

Add conf file in root dir named `.env`. Sample data is provided!
```
APP_PORT=3000
MONGODB_URI=mongodb://mongoDB/weatherApp
WEATHER_API_URL=http://samples.openweathermap.org/data/2.5/
WEATHER_API_KEY=b1b15e88fa797225412429c1c50c122a1
```

### Setup dev environment 
```
docker-compose up
```

Application with hot reload will be available from `localhost:3000`