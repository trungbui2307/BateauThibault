import urllib.request, json
from modules.products.models import Product
from django.core.management.base import BaseCommand

class Command(BaseCommand):
    help = 'Collect list products and then save to the database '

    def handle(self, *args, **options):
        with urllib.request.urlopen('http://51.255.166.155:1352/tig/products/?format=json') as url:
            data = json.loads(url.read().decode())
            allProducts = Product.objects.all()
            product = Product()

        for prod in data:
            priceImport = prod["price"]
            idProduct = prod["id"]
            # Get products from server
            if not allProducts:
                print(f"{product} to Database")
                for k, v in prod.items():
                    setattr(product, k, v)
                try:
                    product.save()
                    print("Saved with succes...")
                except:
                    print("Errors")
            else:
                #Update price if change in server
                for product in allProducts:
                    if product.price != priceImport and product.id == idProduct:
                        product.price = priceImport
                        product.save()
                        print("Price changed...")

        self.stdout.write("Finished")
