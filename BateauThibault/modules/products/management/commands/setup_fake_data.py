import random
from django.db import transaction
from django.core.management.base import BaseCommand
from modules.products.models import Transaction, Product
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
            transaction = Transaction()
            transaction.product = Product.objects.get(id=id)
            transaction.selling_date = random_days
            transaction.selling_quantity = randint(1,100)
            transaction.amount_total = randint(80, 400)
            transaction.save()

        all_transaction = Transaction.objects.all().count()
        self.stdout.write(f"Finished {all_transaction}...")




