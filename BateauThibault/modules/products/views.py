from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import ProductSerializer, ProductDetailSerializer
from .models import Product

class ProductListAPIView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductRetrieveAPIView(generics.RetrieveAPIView):
    lookup_field = "id"
    queryset = Product.objects.all()
    serializer_class = ProductDetailSerializer

class ProductDiscountAPIView(APIView):
    serializer_class = ProductSerializer

    def get_queryset(self, pk):
        queryset = Product.objects.all()
        return queryset

    def get(self, request, id, *args, **kwargs):
        try:
            if id != None:
                product = Product.objects.get(id=id)
                serializer = ProductSerializer(product)
        except:
            products = self.get_queryset(pk=id)
            serializer = ProductSerializer(products, many=True)

        return Response(serializer.data)

    def put(self, request, newprice, *args, **kwargs):
        print(newprice)
        product = Product.objects.get()

        data = request.data

        product.discount = newprice

        product.save()

        serializer = ProductSerializer(product)
        return Response(serializer.data)







