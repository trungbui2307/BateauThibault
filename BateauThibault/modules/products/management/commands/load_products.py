import urllib.request, json
from modules.products.models import Product
from django.core.management.base import BaseCommand

class Command(BaseCommand):
    help = 'Collect list products and then save to the database '

    def handle(self, *args, **options):
        with urllib.request.urlopen('http://51.255.166.155:1352/tig/products/?format=json') as url:
            data = json.loads(url.read().decode())
            product = Product()

        for prod in data:
            print(f"{product} to Database")
            for k, v in prod.items():
                setattr(product, k, v)
            try:
                print("Saved with succes")
                product.save()
            except:
                print("Already exist!")

