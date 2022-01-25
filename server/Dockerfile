# Dockerfile for Django Applications

# Section 1- Base Image
FROM python:3.8

# Section 2- Python Interpreter Flags
ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

# Section 3- Project libraries
RUN mkdir -p /applis/prod/server/
WORKDIR /applis/prod/server/
COPY requirements.txt /applis/prod/server/

RUN pip install -r requirements.txt
COPY . /applis/prod/server/

# RUN python run/manage.py makemigrations && python run/manage.py migrate

CMD ["code/init.sh"]

