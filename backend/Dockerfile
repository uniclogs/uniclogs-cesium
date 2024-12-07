FROM python:3.10-alpine

ARG VERSION

ARG API_HOST
ENV API_HOST=0.0.0.0

ARG API_PORT
ENV API_PORT=9000

ARG DATA_DIR
ENV DATA_DIR=/var/cesium-api/

ARG API_PREFIX
ENV API_PREFIX=/

ARG WHL_NAME
ENV WHL_NAME=cesium_api-${VERSION}-py3-none-any.whl

COPY build/${WHL_NAME} /
RUN pip install /${WHL_NAME}
RUN rm /${WHL_NAME}

EXPOSE ${API_PORT}

CMD cesium-api --host ${API_HOST} --port ${API_PORT} --data-dir ${DATA_DIR} --prefix ${API_PREFIX}
