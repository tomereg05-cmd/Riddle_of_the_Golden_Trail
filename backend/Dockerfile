FROM node:24.18.0

WORKDIR /appno

COPY pacage*.json ./

RUN npm install

COPY . .

ENV port=5201

EXPOSE 5201

RUN ["npm", "run", "devStart"]