#!/bin/bash

while [[ $# -gt 0 ]]; do
  case "$1" in
    --)
        shift
        launch=("$@")
        break
        ;;
    *)
        echo "Unknown argument: $1"
        exit 1
        ;;
  esac
done

echo -e "### Préparation du conteneur ###"

python run/manage.py makemigrations
python run/manage.py migrate
python run/manage.py init_admin
python run/manage.py load_products
python run/manage.py setup_fake_transaction
python run/manage.py setup_fake_import_stock


echo -e "### Démarrage du conteneur ###"
exec "${launch[@]}"
