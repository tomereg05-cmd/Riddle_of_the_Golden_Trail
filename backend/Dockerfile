FROM node:24.18.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV port=5000

EXPOSE 5000

CMD ["npm", "run", "devStart"]