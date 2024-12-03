FROM node:lts-alpine

ARG REST_API
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

CMD ["yarn","start"]
