from django.db import models

# Create your models here.

class Product(models.Model):
    name = models.CharField(max_length=20, verbose_name="Name of product", unique=True)
    category = models.IntegerField(default=5, verbose_name="Category", blank=False, null=False)
    price = models.FloatField(default=0, verbose_name="Price", blank=False, null=False)
    unit = models.CharField(max_length=20, verbose_name="Unit")
    price = models.FloatField(default=0, verbose_name="Price")
    price_selling = models.FloatField(default=0, verbose_name="Price selling")
    price_on_sale = models.FloatField(default=0, verbose_name="Price on sale", blank=False, null=False)
    number_prod_sold = models.IntegerField(default=0, verbose_name="Number of product sold", blank=False, null=False)
    availability = models.BooleanField(default=True, verbose_name="Availability")
    sale = models.BooleanField(default=False, verbose_name="Sale")
    discount = models.FloatField(default=0, verbose_name="Discount")
    comments = models.TextField(verbose_name="Comment", blank=True, null=True)
    owner = models.CharField(max_length=20, verbose_name="Name of owner", blank=False, null=False)
    quantity_in_stock = models.IntegerField(default=0, verbose_name="Stock quantity", blank=False, null=False)

    class Meta:
        ordering = ('name',)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if self.price:
            self.price_selling = self.price + 5.0
        super(Product, self).save(*args, **kwargs)

class Transaction(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    date = models.DateTimeField(blank=False, null=False, verbose_name="Date de transaction")
    quantity_retrait = models.IntegerField(default=0, verbose_name= "Quantite de retrait")
    amount_total = models.FloatField(verbose_name="Sum of money")

    class Meta:
        ordering = ('date',)

    """
    def __str__(self):
        return self.amount_total
    """