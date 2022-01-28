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
python server/run/manage.py makemigrations
python server/run/manage.py migrate
python server/run/manage.py init_admin
python server/run/manage.py load_products
python server/run/manage.py setup_fake_transaction
python server/run/manage.py setup_fake_import_stock


echo -e "### Démarrage du conteneur ###"
exec "${launch[@]}"
