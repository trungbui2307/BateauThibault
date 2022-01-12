from django.urls import path, register_converter
from . import views, converter

register_converter(converter.FloatUrlParameterConverter, 'float')

urlpatterns = [
    path('infoproducts/', views.ProductListAPIView.as_view(), name='products_list'),
    path('infoproduct/<int:id>/', views.ProductRetrieveAPIView.as_view(), name='product_detail'),
    path('putonsale/<int:id>/', views.ProductDiscountAPIView.as_view(), name='product_on_sale'),
    path('remove/<int:id>/', views.ProductRemoveAPIView.as_view(), name='product_sale_remove'),
    path('incrementStock/<int:id>/', views.ProductIncrementStockAPIView.as_view(), name='product_increment'),
    path('decrementStock/<int:id>/', views.ProductDecrementStockAPIView.as_view(),name='product_decrement'),
]