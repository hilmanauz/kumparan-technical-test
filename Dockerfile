FROM node:latest
FROM redis:6.2.5
FROM postgres:9.6.23

WORKDIR /usr/src/app

COPY package*.json ./

RUN apt-get update && apt-get install -y curl

RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -

RUN apt-get update && apt-get install -y nodejs

RUN npm install

COPY ormconfig.docker.json ./ormconfig.json

COPY ./ ./

EXPOSE 3000

CMD ["npm", "run", "dev"]
