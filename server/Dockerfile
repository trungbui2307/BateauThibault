FROM python:3.8 AS compile-image

RUN python -m venv /opt/venv
# Make sure we use the virtualenv:
ENV PATH /opt/venv/bin:$PATH

COPY requirements.txt .

RUN pip install -r requirements.txt

RUN pip install psycopg2-binary

FROM python:3.8-slim AS build-image

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

RUN mkdir -p /applis/prod/server

WORKDIR /applis/prod/server

COPY . /applis/prod/server

COPY --from=compile-image /opt/venv /opt/venv

# Make sure we use the virtualenv:
ENV PATH /opt/venv/bin:$PATH


ADD entrypoint.sh /entrypoint.sh
RUN chmod a+x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh", "--"]
CMD ["python", "server/run/manage.py", "runserver", "0.0.0.0:8000"]
