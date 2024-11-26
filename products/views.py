import subprocess
import json
from django.http import JsonResponse
from django.views import View
from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import CartProduct, Opers, Product, Trading
from .serializers import CartProductSerializer, OpersSerializer, ProductSerializer, TradingSerializer

class ProductList(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class CartProductList(generics.ListCreateAPIView):
    queryset = CartProduct.objects.all()
    serializer_class = CartProductSerializer

class CartProductDetail(generics.RetrieveAPIView):
    queryset = CartProduct.objects.all()
    serializer_class = CartProductSerializer

class CartProductByProductID(APIView):
    def get(self, request, product_id):
        # Фильтруем CartProduct по product_id
        cart_products = CartProduct.objects.filter(product_id=product_id)
        serializer = CartProductSerializer(cart_products, many=True)
        return Response(serializer.data)

class TradingList(generics.ListCreateAPIView):
    queryset = Trading.objects.all()
    serializer_class = TradingSerializer

class OpersList(generics.ListCreateAPIView):
    queryset = Opers.objects.all()
    serializer_class = OpersSerializer

class ProductByTypeList(APIView):
    def get(self, request, type_id):
        products = Product.objects.filter(type_product=type_id)
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

class RunTestsView(View):
    def get(self, request):
        # Запускаем pytest и собираем результаты
        result = subprocess.run(['pytest', '--maxfail=1', '--disable-warnings'], 
                                capture_output=True, text=True)
        # Преобразуем результат в текст
        output = {
            'stdout': result.stdout,
            'stderr': result.stderr,
            'returncode': result.returncode
        }
        return JsonResponse(output)

