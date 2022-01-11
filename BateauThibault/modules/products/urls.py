from django.urls import path
from . import views

urlpatterns = [
    path('infoproducts/', views.ProductListAPIView.as_view(), name='products_list'),
    path('infoproduct/<int:id>/', views.ProductRetrieveAPIView.as_view(), name='product_detail'),
]