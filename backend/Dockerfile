FROM python:3.10-alpine

EXPOSE 9000

COPY requirements.txt /
RUN pip install -r requirements.txt

COPY app /app/

ENV FLASK_APP=/app
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_DEBUG=0

CMD ["gunicorn", "-b", "0.0.0.0:9000", "app:app"]
