FROM node:lts-alpine3.21

ARG REST_API
ENV REST_API="https://cesium-api.uniclogs.org"

ARG APP_HOST
ENV APP_HOST="mission.uniclogs.org"

ARG APP_PORT
ENV APP_PORT=3000

ARG APP_DIR
ENV APP_DIR="/srv/cesium"

RUN adduser -h ${APP_DIR} -D cesium users
COPY --chown=cesium:users --chmod=600 next.config.js ${APP_DIR}
COPY --chown=cesium:users --chmod=600 package.json ${APP_DIR}
COPY --chown=cesium:users --chmod=600 yarn.lock ${APP_DIR}

USER cesium
WORKDIR ${APP_DIR}

RUN yarn install

COPY --chown=cesium:users --chmod=700 components ${APP_DIR}/components
COPY --chown=cesium:users --chmod=700 pages ${APP_DIR}/pages
COPY --chown=cesium:users --chmod=700 public ${APP_DIR}/public

RUN yarn build

EXPOSE ${APP_PORT}

CMD yarn start -p ${APP_PORT}
