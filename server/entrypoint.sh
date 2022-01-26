#!/bin/bash

ls

python server/run/manage.py makemigrations
python server/run/manage.py migrate
python server/run/manage.py init_admin
python server/run/manage.py load_products
python server/run/manage.py setup_fake_transaction
python server/run/manage.py setup_fake_import_stock
python server/run/manage.py runserver 0.0.0.0:8000