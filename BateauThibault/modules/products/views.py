from django.shortcuts import render
from rest_framework import generics
from .serializers import ProductSerializer, ProductDetailSerializer
from .models import Product

class ProductListAPIView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductRetrieveAPIView(generics.RetrieveAPIView):
    lookup_field = "id"
    queryset = Product.objects.all()
    serializer_class = ProductDetailSerializer
