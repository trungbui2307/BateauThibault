from datetime import datetime
from .models import Product
import sys

def refresh_sale_list():
    processTime = str(datetime.now())
    print(f"{processTime}: Collect data...")

    queryProducts = Product.objects.all()
    print(queryProducts)
    for prod in queryProducts:
        quantityInStock = prod.quantity_in_stock
        priceToSale = prod.price_selling
        if quantityInStock:
            if quantityInStock > 16:
                print(f"{processTime}: Summer Timeee...")
                prod.sale = True
                if quantityInStock < 64:
                    print(f"{processTime}: 50% for this time...")
                    prod.price_on_sale = round(0.8 * priceToSale, 1)
                else:
                    print(f"{processTime}: More sale in this time...")
                    prod.price_on_sale = round(0.5 * priceToSale, 1)
            else:
                print(f"{processTime}: It's time to stop sale...")
                prod.sale = False
                prod.price_on_sale = 0
            print(f"{processTime}: Save to database...")
            try:
                print(f"{processTime}: Saving....")
                prod.save()
                print(f"Succes...")
            except:
                print(f"Failed or already exist")

def print_to_stdout(*a):
    print(*a, file=sys.stdout)

def test_cron():
    Product.objects.create(name="Trung")
