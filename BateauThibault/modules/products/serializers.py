from rest_framework import serializers
from .models import Product

class ProductDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'category', 'price', 'unit',
            'availability', 'sale', 'discount', 'comments', 'owner',
            'quantityInStock',]

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
