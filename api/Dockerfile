FROM node:latest

COPY . /web
WORKDIR /web

RUN npm install
RUN npm run-script build

CMD npm start