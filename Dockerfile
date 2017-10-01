FROM node:8

RUN mkdir /var/react-weather-be
WORKDIR /var/react-weather-be

COPY package.json /var/react-weather-be/package.json
COPY package-lock.json /var/react-weather-be/package-lock.json
RUN npm install
RUN npm install pm2 -g

VOLUME /var/react-weather-be