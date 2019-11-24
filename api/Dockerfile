FROM node:latest

WORKDIR /web

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run-script build

CMD npm start