import urllib.request, json
from modules.products.models import Product
from django.core.management.base import BaseCommand

class Command(BaseCommand):
    def handle(self, *args, **options):
        with urllib.request.urlopen('http://51.255.166.155:1352/tig/products/?format=json') as url:
            data = json.loads(url.read().decode())
            product = Product()
            print(data)

        for prod in data:
            for k, v in prod.items():
                print(f"{k}/{v} in {product}")
                setattr(product, k, v)
            product.save()

