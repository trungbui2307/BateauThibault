#!/bin/bash

cd /code

python run/manage.py migrate
python run/manage.py init_admin
python run/manage.py load_products
python run/manage.py setup_fake_transaction
python run/manage.py setup_fake_import_stock
