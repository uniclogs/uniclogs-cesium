FROM node:lts-alpine

ARG API_HOST
ENV API_HOST=0.0.0.0

ARG API_PORT
ENV API_PORT=9000

ARG REST_API
ENV REST_API="http://localhost:9123"

EXPOSE 3000

COPY next.config.js /next.config.js
COPY package.json /package.json
COPY yarn.lock /yarn.lock

RUN yarn install

COPY components /components/
COPY pages /pages/
COPY public /public/

ENV REST_API=$REST_API
RUN yarn build

EXPOSE ${API_PORT}

CMD ["yarn","start"]
