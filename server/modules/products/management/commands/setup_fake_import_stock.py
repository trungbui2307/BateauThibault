import random
from django.db import transaction
from django.core.management.base import BaseCommand
from modules.products.models import ImportStock, Product
from random import randint, random, randrange
from datetime import datetime, date, timedelta


NUM_TRANSACTION = 500

class Command(BaseCommand):
    help = "Generates fake data"

    def random_date(self, start, end):
        delta = end - start
        int_delta = (delta.days * 24 * 60 * 60) + delta.seconds
        random_second = randrange(int_delta)
        return start + timedelta(seconds=random_second)

    @transaction.atomic
    def handle(self, *args, **options):
        self.stdout.write("Creating new data...")
        start_date = datetime.strptime('2019-1-1 00:00:00', '%Y-%m-%d %H:%M:%S')
        end_date = datetime.strptime('2023-1-1 00:00:00', '%Y-%m-%d %H:%M:%S')

        for _ in range(NUM_TRANSACTION):
            id = randint(1, 7)
            random_days = str(self.random_date(start_date, end_date))
            stock = ImportStock()
            stock.product = Product.objects.get(id=id)
            random_days = str(self.random_date(start_date, end_date))
            stock.import_date = random_days
            stock.import_quantity = randint(1,100)
            stock.amount_spending = randint(80, 400)
            stock.save()

        all_stock = ImportStock.objects.all().count()
        self.stdout.write(f"Finished {all_stock}...")
