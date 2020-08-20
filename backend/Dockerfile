FROM python:3.8-alpine
ADD requirements.txt /tmp/requirements.txt
RUN pip install --no-cache-dir -r /tmp/requirements.txt && \
    rm /tmp/requirements.txt
ADD . /usr/src/app
WORKDIR /usr/src/app
ENV PYTHONUNBUFFERED 1
EXPOSE 8000
CMD gunicorn -b 0.0.0.0:8000 cfg.wsgi
#python manage.py runserver 0.0.0.0:8000