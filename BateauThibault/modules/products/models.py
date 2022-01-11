from django.db import models

# Create your models here.

class Product(models.Model):
    name = models.CharField(max_length=20, verbose_name="Name of product", unique=True)
    category = models.IntegerField(default=5, verbose_name="Category", blank=False, null=False)
    price = models.FloatField(default=10, verbose_name="Price", blank=False, null=False)
    unit = models.CharField(max_length=20, verbose_name="Unit")
    availability = models.BooleanField(default=True, verbose_name="Availability")
    sale = models.BooleanField(default=False, verbose_name="Sale")
    discount = models.FloatField(default=10, verbose_name="Discount")
    comments = models.TextField(verbose_name="Comment", blank=True, null=True)
    owner = models.CharField(max_length=20, verbose_name="Name of owner", blank=False, null=False)
    quantityInStock = models.IntegerField(default=10, verbose_name="Stock quantity", blank=False, null=False)

    class Meta:
        ordering = ('name',)

    def __str__(self):
        return self.name

