import os
import django
import urllib.request, json

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from BateauThibault.modules.products.models import Product

def run():
    with urllib.request.urlopen('http://51.255.166.155:1352/tig/products/?format=json') as url:
        data = json.loads(url.read().decode())
        product = Product()

    for k, v in data.items():
        setattr(product, k, v)
    product.save()

if __name__ == '__main__':
    run()