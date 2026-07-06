FROM node:24.18.0

WORKDIR /app

COPY pacage*.json ./

RUN npm install

COPY . .

ENV port=5201

EXPOSE 5201

RUN ["npm", "run", "dev"]