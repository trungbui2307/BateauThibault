#!/bin/bash

cd /code
export PYTHONPATH=/code;$PYTHONPATH

python run/manage.py migrate --noinput
python run/manage.py init_admin
