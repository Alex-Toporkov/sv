from rest_framework import serializers
from .models import Product, CartProduct, Trading, Opers

class ProductSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)
    class Meta:
        model = Product
        fields = '__all__'

class CartProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartProduct
        fields = '__all__'

class TradingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trading
        fields = '__all__'

class OpersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Opers
        fields = '__all__'



