FROM node:14.17-alpine

WORKDIR /usr/app

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 4000

CMD ["npm", "run", "watch"]