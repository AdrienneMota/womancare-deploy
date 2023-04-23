FROM node:alpine

WORKDIR /src/usr/

COPY package*.json ./

COPY prisma ./prisma/

COPY .env ./

COPY tsconfig.json ./

COPY . .

EXPOSE 5000

RUN npm i
RUN npm run build

CMD ["npm", "start"]