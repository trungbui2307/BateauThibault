# Dockerfile for Django Applications

# Section 1- Base Image
FROM python:3.8

# Section 2- Python Interpreter Flags
ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

# Section 3- Project libraries
RUN mkdir /code
WORKDIR /code
COPY requirements.txt /code/

RUN pip install -r requirements.txt
COPY . /code/

CMD ["/code/init.sh"]

