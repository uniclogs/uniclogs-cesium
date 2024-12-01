FROM node:lts-alpine

COPY next.config.js /next.config.js
COPY package.json /package.json
COPY yarn.lock /yarn.lock

RUN yarn install

COPY components /components/
COPY pages /pages/
COPY public /public/

#ENV REST_API=https://mission.oresat.org/data
#ENV REST_API=https://localhost:9000/data

#RUN yarn build

CMD ["yarn","dev"]
