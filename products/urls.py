from django.urls import path
from .views import (
    ProductList,
    ProductDetail,
    CartProductList,
    CartProductDetail,
    CartProductByProductID,  # Импорт нового класса
    TradingList,
    OpersList,
    ProductByTypeList,
    RunTestsView,
)

urlpatterns = [
    path('products/', ProductList.as_view(), name='product-list'),  # Список всех продуктов
    path('products/<int:pk>/', ProductDetail.as_view(), name='product-detail'),  # Детали продукта
    path('cart-products/', CartProductList.as_view(), name='cartproduct-list'),  # Список всех карт-продуктов
    path('cart-products/<int:pk>/', CartProductDetail.as_view(), name='cart-product-detail'),  # Детали карт-продукта
    path('cart-products/product/<int:product_id>/', CartProductByProductID.as_view(), name='cart-product-by-product-id'),  # Новый маршрут для карт-продукта по product_id
    path('tradings/', TradingList.as_view(), name='trading-list'),  # Список торговых операций
    path('opers/', OpersList.as_view(), name='opers-list'),  # Список операций
    path('products/type/<int:type_id>/', ProductByTypeList.as_view(), name='get-products-by-type'),  # Получение продуктов по типу
    path('run-tests/', RunTestsView.as_view(), name='run-tests'),
]
