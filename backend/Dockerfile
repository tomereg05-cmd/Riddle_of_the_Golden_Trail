FROM node:24.18.0

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

RUN npx prisma generate

COPY . .

ENV port=5000

EXPOSE 5000

CMD ["npm", "run", "devStart"]