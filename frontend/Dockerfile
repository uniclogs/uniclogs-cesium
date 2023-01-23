FROM node:lts-alpine

COPY next.config.js /next.config.js
COPY package.json /package.json
COPY yarn.lock /yarn.lock

RUN yarn install

COPY components /components/
COPY pages /pages/
COPY public /public/

ENV BACKEND_PORT=9000

RUN yarn build

CMD ["yarn","start"]
