from modules.products.models import Product
from django.core.management.base import BaseCommand

class Command(BaseCommand):

    def handle(self, *args, **options):
        Product.objects.create(name="Trung")