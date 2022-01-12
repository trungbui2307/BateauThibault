import requests
from modules.products.models import Product
from django.core.management.base import BaseCommand
from datetime import datetime
from django.shortcuts import reverse

class Command(BaseCommand):
    help = 'Destockage chez Bateau Thibault'
    baseUrl = "http://localhost:8000"
    processTime = str(datetime.now())

    def handle(self, *args, **options):
        self.stdout.write(f"{self.processTime}: Collect data...")
        res = requests.get(self.baseUrl + reverse('products_list'))
        listProduct = res.json()
        for prod in listProduct:
            quantityInStock = prod["quantityInStock"]
            priceToSale = prod["price"]
            id = prod["id"]
            product = Product.objects.get(id=id)
            if quantityInStock:
                if quantityInStock > 16:
                    self.stdout.write(f"{self.processTime}: Summer Timeee...")
                    product.sale = True
                    if quantityInStock < 64:
                        self.stdout.write(f"{self.processTime}: 50% for this time...")
                        product.price_on_sale = round(0.8*priceToSale, 1)
                    else:
                        self.stdout.write(f"{self.processTime}: More sale in this time...")
                        product.price_on_sale = round(0.5*priceToSale, 1)
                else:
                    self.stdout.write(f"{self.processTime}: It's time to stop sale...")
                    product.sale = False
                    product.price_on_sale = 0
            self.stdout.write(f"{self.processTime}: Save to database...")
            try:
                print(f"{self.processTime}: Saving....")
                product.save()
                print(f"Succes...")
            except:
                print(f"Failed or already exist")

