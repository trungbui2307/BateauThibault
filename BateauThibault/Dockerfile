# Dockerfile for Django Applications

# Section 1- Base Image
FROM python:3.8
RUN apt-get update && apt-get -y install cron

# Section 2- Python Interpreter Flags
ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

# Section 3- Project libraries
RUN mkdir /code
WORKDIR /code
COPY requirements.txt /code/
COPY engine_refresh_sale_list /code/engine_refresh_sale_list

RUN chmod 0644 engine_refresh_sale_list
RUN crontab engine_refresh_sale_list
RUN pip install -r requirements.txt
COPY . /code/

CMD ["cron", "-f"]

