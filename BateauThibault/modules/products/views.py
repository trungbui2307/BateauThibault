from django.http import Http404
from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import ProductSerializer, ProductDetailSerializer, TransactionSerializer
from .models import Product, Transaction
from datetime import datetime
from rest_framework import generics
from time import time

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
    serializer_class = ProductDetailSerializer

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

    def get_object(self, id):
        try:
            return Product.objects.get(id=id)
        except Product.DoesNotExist:
            raise Http404

    def save_transaction(self, product, quantityRetrait):
        transaction = Transaction()
        transaction.product = product
        transaction.selling_date = str(datetime.now())
        transaction.selling_quantity = quantityRetrait
        if product.sale is True:
            transaction.amount_total = quantityRetrait * product.price_on_sale
        else:
            transaction.amount_total = quantityRetrait * product.price_selling
        transaction.save()

    def put(self, request, *args, **kwargs):
        try:
            products = []
            if request.method == "PUT" and request.data:
                for prod in request.data:
                    product = self.get_object(prod["id"])
                    quantityInStock = product.quantity_in_stock

                    for key, val in prod.items():
                        if key in product.__dict__:
                            product.__dict__[key] = val

                    if product.quantity_in_stock < quantityInStock:
                        quantityRetrait = quantityInStock - product.quantity_in_stock
                        self.save_transaction(product, float(quantityRetrait))

                    product.save()
                    products.append(product)
            serializer = ProductSerializer(products, many=True)
        except UnboundLocalError as e:
            print(e)
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

class TransactionRetrieveAPIView(APIView):
    serializer_class = TransactionSerializer

    def get_queryset(self):
        queryset = Transaction.objects.all()
        startDate = self.request.query_params.get('start_date')
        startDate = datetime.strptime(startDate + ' 00:00:00', '%Y-%m-%d %H:%M:%S')
        endDate = self.request.query_params.get('end_date')
        endDate = datetime.strptime(endDate + ' 00:00:00', '%Y-%m-%d %H:%M:%S')
        queryset = Transaction.objects.filter(selling_date__range=[startDate, endDate])
        return queryset

    def get(self, request, *args, **kwargs):
        try:
            transaction = self.get_queryset()
            somme = 0
            for trans in transaction:
                somme += trans.amount_total
        except:
            print("Something broken")
        return Response({'income': somme})




