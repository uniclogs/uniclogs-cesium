FROM python:alpine

EXPOSE 5000

RUN mkdir /app
WORKDIR /app
COPY app /app/

RUN pip install -r /app/requirements.txt

ENV FLASK_APP=/app
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_ENV=production

CMD [ "flask", "run"]
