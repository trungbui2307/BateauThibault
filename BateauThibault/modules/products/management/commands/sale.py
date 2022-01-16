import requests
from modules.products.models import Product
from django.core.management.base import BaseCommand
from datetime import datetime
from django.shortcuts import reverse

class Command(BaseCommand):
    help = 'Destockage chez Bateau Thibault'
    processTime = str(datetime.now())

    def handle(self, *args, **options):
        self.stdout.write(f"{self.processTime}: Collect data...")
        queryProducts = Product.objects.all()
        print(queryProducts)
        for prod in queryProducts:
            quantityInStock = prod.quantity_in_stock
            priceToSale = prod.price_selling
            if quantityInStock:
                if quantityInStock > 16:
                    self.stdout.write(f"{self.processTime}: Summer Timeee...")
                    prod.sale = True
                    if quantityInStock < 64:
                        self.stdout.write(f"{self.processTime}: 50% for this time...")
                        prod.price_on_sale = round(0.8 * priceToSale, 1)
                    else:
                        self.stdout.write(f"{self.processTime}: More sale in this time...")
                        prod.price_on_sale = round(0.5 * priceToSale, 1)
                else:
                    self.stdout.write(f"{self.processTime}: It's time to stop sale...")
                    prod.sale = False
                    prod.price_on_sale = 0
                self.stdout.write(f"{self.processTime}: Save to database...")
                try:
                    print(f"{self.processTime}: Saving....")
                    prod.save()
                    print(f"Succes...")
                except:
                    print(f"Failed or already exist")

