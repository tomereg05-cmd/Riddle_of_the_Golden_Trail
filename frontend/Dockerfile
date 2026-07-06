FROM node:24.18.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV port=5201

EXPOSE 5201

CMD ["npm", "run", "dev"]