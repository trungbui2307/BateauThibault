from django.shortcuts import render
from rest_framework import status
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

    def get(self, request, id, *args, **kwargs):
        try:
            product = Product.objects.get(id=id)
        except Product.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        if id != None:
            serializer = ProductSerializer(product)
            return Response(serializer.data)

class ProductUpdateAPIView(APIView):
    serializer_class = ProductSerializer

    def put(self, request, *args, **kwargs):
        try:
            products = []
            if request.method == "PUT" and request.data:
                for prod in request.data:
                    id = prod["id"]
                    product = Product.objects.get(id=id)
                    for key, val in prod.items():
                        if key in product.__dict__:
                            product.__dict__[key] = val
                    product.save()
                    products.append(product)

            serializer = ProductSerializer(products, many=True)
        except:
            print("Can't find any product")

        return Response(serializer.data)


class ProductRemoveAPIView(APIView):
    serializer_class = ProductSerializer

    def put(self, request, id, *args, **kwargs):
        try:
            if id != None and request.method == "PUT":
                product = Product.objects.get(id=id)
                product.sale = False
                product.save()
                serializer = ProductSerializer(product)
        except:
            print("Can't find any product")

        return Response(serializer.data)

class ProductIncrementStockAPIView(APIView):
    serializer_class = ProductSerializer

    def put(self, request, id, *args, **kwargs):
        try:
            print(request.data)
            if id != None and request.method == "PUT":
                product = Product.objects.get(id=id)
                number = request.data["number"]
                product.quantityInStock = product.quantityInStock + number
                product.save()
                serializer = ProductSerializer(product)
        except:
            print(f"Can't find any product")

        return Response(serializer.data)


class ProductDecrementStockAPIView(APIView):
    serializer_class = ProductSerializer

    def put(self, request, id, *args, **kwargs):
        try:
            if id != None and request.method == "PUT":
                product = Product.objects.get(id=id)
                number = request.data["number"]
                if product.quantityInStock > number:
                    product.quantityInStock = product.quantityInStock - number
                    product.save()
                serializer = ProductSerializer(product)
        except:
            print(f"Can't find any product")

        return Response(serializer.data)




