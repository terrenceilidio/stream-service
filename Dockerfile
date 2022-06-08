FROM node:16-alpine

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 3000

USER node

CMD ["npm", "start"]
