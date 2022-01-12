from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import ProductSerializer, ProductDetailSerializer
from .models import Product

class ProductListAPIView(APIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = Product.objects.all()
        return queryset

    def get(self, request, *args, **kwargs):
        products = self.get_queryset()
        serializer = ProductSerializer(products, many=True)

        return Response(serializer.data)

class ProductRetrieveAPIView(APIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = Product.objects.all()
        return queryset

    def get(self, request, id, *args, **kwargs):
        if id != None:
            product = Product.objects.get(id=id)
            serializer = ProductSerializer(product)

            return Response(serializer.data)

class ProductDiscountAPIView(APIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = Product.objects.all()
        return queryset

    def get(self, request, id, newprice, *args, **kwargs):
        try:
            if id != None:
                product = Product.objects.get(id=id)
                product.discount = newprice
                product.sale = True
                product.save()
                serializer = ProductSerializer(product)
        except:
            products = self.get_queryset()
            serializer = ProductSerializer(products, many=True)

        return Response(serializer.data)

class ProductRemoveAPIView(APIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = Product.objects.all()
        return queryset

    def get(self, request, id, *args, **kwargs):
        try:
            if id != None:
                product = Product.objects.get(id=id)
                product.sale = False
                product.save()
                serializer = ProductSerializer(product)
        except:
            products = self.get_queryset()
            serializer = ProductSerializer(products, many=True)

        return Response(serializer.data)







